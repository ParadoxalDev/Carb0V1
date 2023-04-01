// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Project {
    address private owner;
    address public architect;

    //uint id;
    string projectName;
    string typeOfProject;
    string addresseOfProject;
    uint128 surfaceSquareMeter;
    uint256 projectValue;
    uint startDate;
    uint endDate;
    //uint projectPhase;
    uint256 scoringCarbon;

    struct Intervenant {
        address account;
        string companyName;
        string companyAddresse;
        uint siretNumber;
    }

    struct Phase {
        string phaseName;
        string phaseType;
        uint[] materialIndices;
    }

    struct Material {
        uint id;
        string name;
        string description;
        string companyBrand;
        string utilisationType;
        uint transportA4;
        string unit;
        uint UF;
        string unitUF;
        int totalLcConstruction;
        bool approveByTheArchi;
    }
    Phase[] public phases;
    Material[] public materials;

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }
    modifier onlyArchi() {
        require(msg.sender == architect, "Caller is not the architect");
        _;
    }

    function setArchitect(address _architect) public onlyOwner {
        architect = _architect;
    }

    function setProjectDetails(
        string memory _projectName,
        string memory _typeOfProject,
        string memory _addresseOfProject,
        uint128 _surfaceSquareMeter,
        uint256 _projectValue,
        uint _startDate,
        uint _endDate
    ) public onlyArchi {
        require(msg.sender == owner, "Caller is not owner");
        projectName = _projectName;
        typeOfProject = _typeOfProject;
        addresseOfProject = _addresseOfProject;
        surfaceSquareMeter = _surfaceSquareMeter;
        projectValue = _projectValue;
        startDate = _startDate;
        endDate = _endDate;
    }

    function newPhase(
        string memory _name,
        string memory _phaseType
    ) public onlyArchi {
        if (phases.length == 0) {
            Phase memory phase;
            phase.phaseName = "genesis";
            phase.phaseType = "genesis";
            phase.materialIndices = new uint[](0);
            phases.push(phase);
        }
        phases.push(Phase(_name, _phaseType, new uint[](0)));
    }

    function createMaterial(
        string memory _a,
        string memory _b,
        string memory _c,
        string memory _d
    ) public {
        materials.push(Material(0, _a, _b, _c, _d, 0, _a, 0, _a, 1, false));
    }

    function addMaterialToPhase(
        uint _idMaterial,
        uint _idPhase
    ) public onlyArchi {
        uint numberOfPhases = phases.length;
        uint numberOfMaterials = materials.length;
        require(_idPhase < numberOfPhases, "this phase doesn t exist");
        require(_idMaterial < numberOfMaterials, "this material doesn t exist");
        phases[_idPhase].materialIndices.push(_idMaterial);
    }
}
