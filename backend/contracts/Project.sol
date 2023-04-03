// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

///@title Project - A contract to manage construction project details
contract Project {
    address public owner;
    address public architect;
    uint public numberOfPhases;
    uint256 private _documentIdCounter;

    //uint id;
    string projectName;
    string typeOfProject;
    string addresseOfProject;
    uint128 surfaceSquareMeter;
    uint256 projectValue;
    uint startDate;
    uint endDate;
    uint16 scoringCarbon;

    // Structure to represent a project participant
    struct Worker {
        address account;
        string companyName;
        string companyAddresse;
        uint siretNumber;
        bool isApprovedByTheOwner;
        bool banned;
    }

    // Structure to represent a project phase
    struct Phase {
        string phaseName;
        string phaseType;
        uint[] materialIndices;
        uint carbonOfPhase;
    }
    // Structure to represent a supplier
    struct Supplier {
        address account;
        string companyName;
        string companyAddress;
        uint8 siretNumber;
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
        uint totalLcConstruction;
        bool approveByTheArchi;
        bool proofUploadedByTheSupplier;
        uint16 documentId;
    }

    event ArchitectSeted(address architect);
    event PhaseCreated(string phaseName, string phaseType);
    event MaterialCreated(uint id, string name, string description);
    event MaterialAddToPhase(uint materialId, uint phaseId);
    event MaterialCreatedDetailed(
        uint id,
        string name,
        string description,
        string companyBrand,
        string utilisationType,
        uint transportA4,
        string unit,
        uint UF,
        string unitUF,
        uint totalLcConstruction
    );
    event WorkerAdded(address account, string companyName, uint siretNumber);
    event ApprovedByTheOwner(address account, string companyName);

    Worker[] public workers;
    Phase[] phases;
    Supplier[] public suppliers;
    Material[] public materials;

    mapping(address => Supplier) public suppliersMap;
    mapping(uint256 => string) private _documentURIs;

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
    /// @notice Modifier to restrict access to only the architect of the project
    modifier onlyWorker() {
        require(verifyWorker(), "Caller is not a official worker");
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
        projectName = _projectName;
        typeOfProject = _typeOfProject;
        addresseOfProject = _addresseOfProject;
        surfaceSquareMeter = _surfaceSquareMeter;
        projectValue = _projectValue;
        startDate = _startDate;
        endDate = _endDate;
    }

    function getProjectDetails()
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint128,
            uint256,
            uint,
            uint
        )
    {
        return (
            projectName,
            typeOfProject,
            addresseOfProject,
            surfaceSquareMeter,
            projectValue,
            startDate,
            endDate
        );
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
            phase.carbonOfPhase = 0;
            phases.push(phase);
            numberOfPhases++;
        }
        // Add the new phase to the phases array
        uint[] memory emptyArray = new uint[](0);
        phases.push(Phase(_name, _phaseType, emptyArray, 0));
        numberOfPhases++;
        emit PhaseCreated(_name, _phaseType);
    }

    ///@notice Retrieves the information of a project phase using its ID.
    ///@param _idPhase The ID of the project phase.
    ///@return phaseName The name of the phase.
    ///@return phaseType The type of the phase.
    ///@return materialIndices An array containing the indices of materials associated with this phase.
    ///@return carbonOfPhase The carbon score for this phase.
    function getPhase(
        uint _idPhase
    ) public view returns (string memory, string memory, uint[] memory, uint) {
        require(_idPhase < phases.length, "Phase does not exist");
        Phase memory phase = phases[_idPhase];
        return (
            phase.phaseName,
            phase.phaseType,
            phase.materialIndices,
            phase.carbonOfPhase
        );
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
        uint lengthArray = materials.length;
        materials.push(
            Material(
                lengthArray,
                _a,
                _b,
                _c,
                _d,
                5,
                _a,
                0,
                _a,
                10,
                false,
                false,
                0
            )
        );
        emit MaterialCreated(materials.length - 1, _a, _b);

        Material memory material = materials[materials.length - 1];
        emit MaterialCreatedDetailed(
            material.id,
            material.name,
            material.description,
            material.companyBrand,
            material.utilisationType,
            material.transportA4,
            material.unit,
            material.UF,
            material.unitUF,
            material.totalLcConstruction
        );
    }

    /// @notice Add a material to a specific phase of the project
    /// @param _idMaterial The ID of the material to add
    /// @param _idPhase The ID of the phase to add the material to
    function addMaterialToPhase(
        uint _idMaterial,
        uint _idPhase
    ) public onlyWorker {
        // Check if the phase and material exist
        require(_idPhase < phases.length, "this phase doesn't exist");
        require(_idMaterial < materials.length, "this material doesn't exist");
        // Add the material ID to the phase's materialIndices array
        phases[_idPhase].materialIndices.push(_idMaterial);
        // Check the amount carbon of the material and add to the total of phase
        uint value = materials[_idMaterial].totalLcConstruction;
        phases[_idPhase].carbonOfPhase += value;
        emit MaterialAddToPhase(_idMaterial, _idPhase);
    }

    ///@notice Add a worker to the list of workers
    ///@param _account The Ethereum address of the worker
    ///@param _companyName The name of the worker's company
    ///@param _companyAddresse The address of the worker's company
    ///@param _siretNumber The SIRET number of the worker's company

    function addWorker(
        address _account,
        string memory _companyName,
        string memory _companyAddresse,
        uint _siretNumber
    ) public onlyArchi {
        Worker memory worker;
        worker.account = _account;
        worker.companyName = _companyName;
        worker.companyAddresse = _companyAddresse;
        worker.siretNumber = _siretNumber;
        worker.isApprovedByTheOwner = false;
        worker.banned = false;
        workers.push(worker);
        emit WorkerAdded(_account, _companyName, _siretNumber);
    }

    ///@notice Approve a worker by the owner
    ///@param _id The ID of the worker to be approved

    function approvedByTheOwner(uint8 _id) external onlyOwner {
        require(!workers[_id].isApprovedByTheOwner, "Already approved by you");
        workers[_id].isApprovedByTheOwner = true;
        emit ApprovedByTheOwner(workers[_id].account, workers[_id].companyName);
    }

    ///@notice Check if the sender is a worker approved by the owner
    ///@return true if the sender is an approved worker, false otherwise
    function verifyApprovedByTheOwner() public view returns (bool) {
        for (uint i = 0; i < workers.length; i++) {
            if (msg.sender == workers[i].account) {
                if (workers[i].isApprovedByTheOwner) {
                    return true;
                }
            }
        }
        return false;
    }

    ///@notice Check if the sender is a worker in the list of workers
    ///@return true if the sender is a worker, false otherwise
    function verifyWorker() public view returns (bool) {
        for (uint i = 0; i < workers.length; i++) {
            if (msg.sender == workers[i].account) {
                return true;
            }
        }
        return false;
    }

    ///@notice create a new supplier
    ///@param _account The Ethereum address of the worker
    ///@param _companyName The name of the worker's company
    ///@param _companyAddress The address of the worker's company
    function createSupplier(
        address _account,
        string memory _companyName,
        string memory _companyAddress,
        uint8 _siretNumber
    ) public onlyWorker {
        require(
            suppliersMap[_account].account == address(0),
            "Supplier already exists"
        );
        suppliersMap[_account] = Supplier({
            account: _account,
            companyName: _companyName,
            companyAddress: _companyAddress,
            siretNumber: _siretNumber
        });
    }

    function updateSupplier(
        address _account,
        string memory _companyName,
        string memory _companyAddress,
        uint8 _siretNumber
    ) public onlyWorker {
        Supplier storage supplier = suppliersMap[_account];
        supplier.companyName = _companyName;
        supplier.companyAddress = _companyAddress;
        supplier.siretNumber = _siretNumber;
    }

    ///@notice add the URI in the contract gived with the upload of document
    ///@param _documentURI the document URI

    function createDocument(string memory _documentURI) public {
        require(suppliersMap[msg.sender].account != address(0));
        uint256 documentId = _documentIdCounter;
        _documentURIs[documentId] = _documentURI;
        _documentIdCounter++;
    }

    ///@notice retrieve the URI of one document whith is id
    ///@return documentURI
    function getDocumentURI(
        uint256 _documentId
    ) public view returns (string memory) {
        return _documentURIs[_documentId];
    }

    function linkDocumentToMaterial(
        uint _materialId,
        uint16 _documentId
    ) public {
        require(_materialId < materials.length, "Material does not exist");
        require(
            suppliersMap[msg.sender].account != address(0),
            "Only suppliers can link documents"
        );
        require(
            bytes(_documentURIs[_documentId]).length > 0,
            "Document does not exist"
        );

        materials[_materialId].proofUploadedByTheSupplier = true;
        materials[_materialId].documentId = _documentId;
    }
}
