const { expect } = require("chai");
const { ethers } = require("hardhat");
require("solidity-coverage");

describe("Project", function () {
  let Project, project, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Project = await ethers.getContractFactory("Project");
    project = await Project.deploy(owner.address);
    await project.deployed();
  });

  describe("Project owner and architect management", function () {
    it("Should set the owner correctly", async function () {
      expect(await project.owner()).to.equal(owner.address);
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
  });
  describe("Project phases and materials management", function () {
    beforeEach(async function () {
      await project.connect(owner).setArchitect(addr1.address);
    });

    it("Should create a new phase correctly", async function () {
      await project.connect(addr1).newPhase("Phase 1", "Type 1");
      const [, phaseType, ,] = await project.getPhase(1);
      expect(phaseType).to.equal("Type 1");
    });

    it("Should revert if non-architect tries to create a new phase", async function () {
      await expect(
        project.connect(addr2).newPhase("Phase 1", "Type 1")
      ).to.be.revertedWith("Caller is not the architect");
    });

    it("Should create a new material correctly", async function () {
      await project.createMaterial(
        "Material 1",
        "Description 1",
        "Company 1",
        "Utilisation 1"
      );
      const [, name, , , , , , , , ,] = await project.materials(0);
      expect(name).to.equal("Material 1");
    });

    it("Should add a material to a phase correctly", async function () {
      await project.connect(addr1).newPhase("Phase 1", "Type 1");
      await project.createMaterial(
        "Material 1",
        "Description 1",
        "Company 1",
        "Utilisation 1"
      );
      await project.connect(addr1).addMaterialToPhase(0, 1);
      const [, , materialIndices] = await project.getPhase(1);
      expect(materialIndices[0]).to.equal(0);
    });

    it("Should revert if non-architect tries to add a material to a phase", async function () {
      await project.connect(addr1).newPhase("Phase 1", "Type 1");
      await project.createMaterial(
        "Material 1",
        "Description 1",
        "Company 1",
        "Utilisation 1"
      );
      await expect(
        project.connect(addr2).addMaterialToPhase(0, 1)
      ).to.be.revertedWith("Caller is not the architect");
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
          "My Project",
          "Residential",
          "123 Main St",
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
      expect(projectName).to.equal("My Project");
      expect(typeOfProject).to.equal("Residential");
      expect(addresseOfProject).to.equal("123 Main St");
      expect(surfaceSquareMeter).to.equal(1000);
      expect(projectValue).to.equal(1000000);
      expect(startDate).to.equal(1648873193);
      expect(endDate).to.equal(1654227993);
    });
  });
});
