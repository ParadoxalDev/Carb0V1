const { expect } = require("chai");
const { ethers } = require("hardhat");
const { add } = require("lodash");

describe("Project", function () {
  let Carb0, carb0, Project, project, owner, addr1, addr2, addr3, supplier;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3, supplier] = await ethers.getSigners();
    Carb0 = await ethers.getContractFactory("Carb0");
    carb0 = await Carb0.deploy();
    await carb0.deployed();

    const tx = await carb0
      .connect(owner)
      .createProject({ value: ethers.utils.parseEther("0.01") });

    const txReceipt = await tx.wait();
    const projectCreatedEvent = txReceipt.events.find(
      (event) => event.event === "ProjectCreated"
    );

    const projectAddress = projectCreatedEvent.args.projectAddress;

    Project = await ethers.getContractFactory("Project");
    project = await Project.attach(projectAddress);
    expect(await project.owner()).to.equal(owner.address);
  });

  describe("Project owner and architect management", function () {
    it("Should verify the owner correctly", async function () {
      expect(await project.owner()).to.equal(owner.address);
    });
  });

  it("Should set the architect correctly", async function () {
    await project.connect(owner).setArchitect(addr1.address);
    expect(await project.architect()).to.equal(addr1.address);
  });

  it("Should revert if non-owner tries to set the architect", async function () {
    await expect(
      project.connect(addr2).setArchitect(addr1.address)
    ).to.be.revertedWith("Caller is not the owner");
  });

  it("Shoud add a worker if architect", async function () {
    await project.connect(owner).setArchitect(addr1.address);
    await project
      .connect(addr1)
      .addWorker(addr2.address, "jon", "paradoxe", 123);
    expect(await project.connect(addr2).verifyWorker()).to.equal(true);
  });
  it("Shoud revert if not architect try to add worker", async function () {
    await project.connect(owner).setArchitect(addr1.address);
    await expect(
      project.connect(addr3).addWorker(addr2.address, "jon", "paradoxe", 123)
    ).to.be.revertedWith("Caller is not the architect");
  });

  describe("Project phases and materials management", function () {
    beforeEach(async function () {
      await project.connect(owner).setArchitect(addr1.address);
      await project
        .connect(addr1)
        .setProjectDetails(
          "Project 1",
          "Residential",
          "123 Main St",
          1000,
          1000000,
          1648873193,
          1654227993
        );
      await project
        .connect(addr1)
        .addWorker(addr2.address, "jon", "paradoxe", 123);
    });

    it("Should not create a new phase correctly", async function () {
      await expect(
        project.connect(addr2).newPhase("Phase 1", "Type 1")
      ).to.be.revertedWith("Caller is not the architect");
    });

    it("Should revert if non-architect tries to create a new phase", async function () {
      await expect(
        project.connect(addr3).newPhase("Phase 1", "Type 1")
      ).to.be.revertedWith("Caller is not the architect");
    });

    it("Should create a new material correctly", async function () {
      await project
        .connect(addr2)
        .createMaterial(
          "Material 1",
          "Description 1",
          "Company 1",
          "Utilisation 1",
          200
        );
      const [, name, , , , , , , , , ,] = await project.materials(0);
      expect(name).to.equal("Material 1");
    });

    it("Should add a material to a phase correctly", async function () {
      await project.connect(addr1).newPhase("Phase 1", "Type 1");
      await project
        .connect(addr2)
        .createMaterial(
          "Material 1",
          "Description 1",
          "Company 1",
          "Utilisation 1",
          200
        );

      await project.connect(owner).approvedByTheOwner(0);
      await project
        .connect(addr2)
        .createSupplier(supplier.address, "test", "bxl", 10);
      await project.connect(supplier).createDocument("test", 0);
      await project.connect(addr2).addMaterialToPhase(0, 1);
      const [, , materialIndices] = await project.getPhase(1);
      expect(materialIndices[0]).to.equal(0);
    });

    it("Should revert if non offical-worker tries to add supplier", async function () {
      await project.connect(addr1).newPhase("Phase 1", "Type 1");
      await project.createMaterial(
        "Material 1",
        "Description 1",
        "Company 1",
        "Utilisation 1",
        200
      );

      await expect(
        project
          .connect(addr2)
          .createSupplier(supplier.address, "test", "bxl", 10)
      ).to.be.revertedWith(
        "Caller is not a official worker, wait for owner's approval"
      );
    });
  });

  describe("newPhase", function () {
    it("should create a new phase", async function () {
      await project.connect(owner).setArchitect(addr1.address);
      await project.connect(addr1).newPhase("Phase 1", "Construction");
      const [phaseName, phaseType, materialIndices, carbonOfPhase] =
        await project.getPhase(1);
      expect(phaseName).to.equal("Phase 1");
      expect(phaseType).to.equal("Construction");
      expect(carbonOfPhase).to.equal(0);
    });

    it("should set project details", async function () {
      await project.connect(owner).setArchitect(addr1.address);
      await project
        .connect(addr1)
        .setProjectDetails(
          "test",
          "maison",
          "bxl",
          1000,
          1000000,
          1648873193,
          1654227993
        );
      const [
        projectName,
        typeOfProject,
        addresseOfProject,
        surfaceSquareMeter,
        projectValue,
        startDate,
        endDate,
      ] = await project.getProjectDetails();
      expect(projectName).to.equal("test");
      expect(typeOfProject).to.equal("maison");
      expect(addresseOfProject).to.equal("bxl");
      expect(surfaceSquareMeter).to.equal(1000);
      expect(projectValue).to.equal(1000000);
      expect(startDate).to.equal(1648873193);
      expect(endDate).to.equal(1654227993);
    });
  });
  describe("Project closing", function () {
    beforeEach(async function () {
      await project.connect(owner).setArchitect(addr1.address);
      await project
        .connect(addr1)
        .setProjectDetails(
          "Project 1",
          "Residential",
          "123 Main St",
          1000,
          1000000,
          1648873193,
          1654227993
        );
      await project
        .connect(addr1)
        .addWorker(addr2.address, "jon", "paradoxe", 123);
    });
    it("Shoud not closing the project if no phase was create", async function () {
      await expect(project.connect(addr1).closeProject()).to.be.revertedWith(
        "no phase created"
      );
    });
    it("Shoud not closing the project if no material was added", async function () {
      await project.connect(addr1).newPhase("Phase 1", "Construction");
      await expect(project.connect(addr1).closeProject()).to.be.revertedWith(
        "no material added"
      );
    });
    it("Shoud closing the project", async function () {
      await project.connect(addr1).newPhase("Phase 1", "Type 1");
      await project
        .connect(addr2)
        .createMaterial(
          "Material 1",
          "Description 1",
          "Company 1",
          "Utilisation 1",
          200
        );

      await project.connect(owner).approvedByTheOwner(0);
      await project
        .connect(addr2)
        .createSupplier(supplier.address, "test", "bxl", 10);
      await project.connect(supplier).createDocument("test", 0);
      await project.connect(addr2).addMaterialToPhase(0, 1);
      await expect(project.connect(addr1).closeProject());
    });
  });
});
