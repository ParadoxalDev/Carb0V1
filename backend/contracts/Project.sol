// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

///@title Project - A contract to manage construction project details
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
    uint256 scoringCarbon;

    // Structure to represent a project participant
    struct Intervenant {
        address account;
        string companyName;
        string companyAddresse;
        uint siretNumber;
        bool isApprovedByTheOwner;
    }

    // Structure to represent a project phase
    struct Phase {
        string phaseName;
        string phaseType;
        uint[] materialIndices;
        uint carbonOfPhase;
    }

    // Structure to represent a material used in the project
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

    event ArchitectSeted(address architect);
    event PhaseCreated(string phaseName, string phaseType);
    event MaterialCreated(uint id, string name, string description);
    event MaterialAddToPhase(uint materialId, uint phaseId);

    Phase[] public phases;
    Material[] public materials;

    /// @notice Constructor to set the owner of the project
    /// @param _owner The address of the project owner
    constructor(address _owner) {
        owner = _owner;
    }

    /// @notice Modifier to restrict access to only the owner of the project
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    /// @notice Modifier to restrict access to only the architect of the project
    modifier onlyArchi() {
        require(msg.sender == architect, "Caller is not the architect");
        _;
    }

    /// @notice Set the architect of the project
    /// @param _architect The address of the architect
    function setArchitect(address _architect) public onlyOwner {
        architect = _architect;
        emit ArchitectSeted(_architect);
    }

    /// @notice Set the project details
    /// @param _projectName The name of the project
    /// @param _typeOfProject The type of the project
    /// @param _addresseOfProject The address of the project
    /// @param _surfaceSquareMeter The surface area of the project in square meters
    /// @param _projectValue The monetary value of the project
    /// @param _startDate The start date of the project
    /// @param _endDate The end date of the project
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

    /// @notice Create a new phase for the project
    /// @param _name The name of the phase
    /// @param _phaseType The type of the phase
    function newPhase(
        string memory _name,
        string memory _phaseType
    ) public onlyArchi {
        // If there are no phases, create a genesis phase
        if (phases.length == 0) {
            Phase memory phase;
            phase.phaseName = "genesis";
            phase.phaseType = "genesis";
            phase.materialIndices = new uint[](0);
            phases.push(phase);
        }
        // Add the new phase to the phases array
        phases.push(Phase(_name, _phaseType, new uint[](0), 0));
        emit PhaseCreated(_name, _phaseType);
    }

    /// @notice Create a new material for the project
    /// @param _a The name of the material
    /// @param _b The description of the material
    /// @param _c The company brand of the material
    /// @param _d The type of utilization for the material
    function createMaterial(
        string memory _a,
        string memory _b,
        string memory _c,
        string memory _d
    ) public {
        materials.push(Material(0, _a, _b, _c, _d, 0, _a, 0, _a, 1, false));
        emit MaterialCreated(materials.length - 1, _a, _b);
    }

    /// @notice Add a material to a specific phase of the project
    /// @param _idMaterial The ID of the material to add
    /// @param _idPhase The ID of the phase to add the material to
    function addMaterialToPhase(
        uint _idMaterial,
        uint _idPhase
    ) public onlyArchi {
        uint numberOfPhases = phases.length;
        uint numberOfMaterials = materials.length;
        // Check if the phase and material exist
        require(_idPhase < numberOfPhases, "this phase doesn't exist");
        require(_idMaterial < numberOfMaterials, "this material doesn't exist");
        // Add the material ID to the phase's materialIndices array
        phases[_idPhase].materialIndices.push(_idMaterial);
        emit MaterialAddToPhase(_idMaterial, _idPhase);
    }
}
