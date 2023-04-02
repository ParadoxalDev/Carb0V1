// const Carb0 = artifacts.require("./Carb0");
const { expect } = require("chai");

// contract("Carb0", (accounts) => {
//   const _owner = accounts[0];
//   const _voter1 = accounts[1];
//   const _voter2 = accounts[2];
//   const _voter3 = accounts[3];

//   let carb0launch;

//   describe("Try to create a new project", () => {
//     beforeEach(async function () {
//       carb0launch = await Carn0.new({ from: _owner });
//     });

//     it("create a new project", async () => {

//     })
//   });
// });

const { ethers } = require("hardhat");
const { BN, expectRevert } = require("@openzeppelin/test-helpers");

describe("Carb0", function () {
  let Carb0, carb0, Project, project, owner, addr1, addr2;

  beforeEach(async function () {
    Carb0 = await ethers.getContractFactory("Carb0");
    carb0 = await Carb0.deploy();
    await carb0.deployed();

    Project = await ethers.getContractFactory("Project");

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  describe("Project creation", function () {
    it("Should create a new project correctly", async function () {
      const tx = await carb0
        .connect(owner)
        .createProject({ value: ethers.utils.parseEther("0.1") });

      const txReceipt = await tx.wait();
      const projectCreatedEvent = txReceipt.events.find(
        (event) => event.event === "ProjectCreated"
      );

      const newProjectAddress = projectCreatedEvent.args.projectAddress;
      const projectId = projectCreatedEvent.args.id;

      expect(projectCreatedEvent.args.owner).to.equal(owner.address);

      const projectOwner = await carb0.projectOwners(0);
      expect(projectOwner.idProject).to.equal(0); // Expect the correct project ID here
      expect(projectOwner.owner).to.equal(owner.address);

      project = await Project.attach(newProjectAddress);
      expect(await project.owner()).to.equal(owner.address);
    });

    it("Should revert if not enough ETH is sent", async function () {
      await expectRevert.unspecified(
        carb0
          .connect(owner)
          .createProject({ value: ethers.utils.parseEther("0.05") }),
        "Not enough ETH sent"
      );
    });

    it("Should refund excess ETH", async function () {
      const initialBalance = await owner.getBalance();
      const tx = await carb0
        .connect(owner)
        .createProject({ value: ethers.utils.parseEther("0.2") });
      const txReceipt = await tx.wait();

      const finalBalance = await owner.getBalance();
      const gasCost = txReceipt.gasUsed.mul(tx.gasPrice);

      expect(finalBalance).to.equal(
        initialBalance.sub(ethers.utils.parseEther("0.1")).sub(gasCost)
      );
    });
  });

  describe("Get IDs of owner's projects", function () {
    beforeEach(async function () {
      await carb0
        .connect(owner)
        .createProject({ value: ethers.utils.parseEther("0.1") });
      await carb0
        .connect(addr1)
        .createProject({ value: ethers.utils.parseEther("0.1") });
      await carb0
        .connect(owner)
        .createProject({ value: ethers.utils.parseEther("0.1") });
    });

    it("Should return the correct project IDs for the owner", async function () {
      const projectIds = await carb0.connect(owner).idOfMyProjects();
      expect(projectIds.length).to.equal(2);
      expect(projectIds[0]).to.equal(0);
      expect(projectIds[1]).to.equal(2);
    });

    it("Should return an empty array if the owner has no projects", async function () {
      const projectIds = await carb0.connect(addr2).idOfMyProjects();
      expect(projectIds.length).to.equal(0);
    });
  });
});
