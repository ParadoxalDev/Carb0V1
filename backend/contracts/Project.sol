// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

///@title Project - A contract to manage carbon in construction project
///@author Macarez Jonathan  https://github.com/ParadoxalDev
contract Project is Initializable {
    address public owner;
    address public architect;
    uint16 public numberOfPhases;
    uint16 private documentIdCounter;
    bool public closed = false;
    uint16 public constant CARBON_TRESHOLD_2022 = 640;

    struct ProjectDetails {
        string projectName;
        string typeOfProject;
        string addresseOfProject;
        uint32 surfaceSquareMeter;
        uint256 projectValue;
        uint startDate;
        uint endDate;
        uint64 scoringCarbon;
    }

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
        uint64 carbonOfPhase;
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
        uint16 totalLcConstruction;
        bool approveByTheArchi;
        DeliveryInfo delivery;
    }

    struct DeliveryInfo {
        bool proofUploadedByTheSupplier;
        uint16 documentId;
        uint16 quantity;
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
    event CloseProject(
        string projectName,
        string typeOfProject,
        uint scoringCarbon
    );

    Worker[] public workers;
    Phase[] public phases;
    Supplier[] public suppliers;
    Material[] public materials;
    ProjectDetails public projectDetails;
    DeliveryInfo[] public deliveryInfos;

    mapping(address => Supplier) public suppliersMap;
    mapping(uint32 => string) private _documentURIs;

    /// @notice Constructor = Initializer in upgradable contract to set the owner of the project
    /// @param _owner The address of the project owner

    // -------------------- INITIALIZER --------------------
    function initialize(address _owner) public payable initializer {
        owner = _owner;
    }

    // -------------------- INITIALIZER --------------------

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
        require(
            verifyWorker(),
            "Caller is not a official worker, wait for owner's approval"
        );
        require(
            verifyApprovedByTheOwner(),
            "Caller is not a official worker, wait for owner's approval"
        );
        _;
    }
    /// @notice Modifier to restrict access if the project is closed
    modifier isClosed() {
        require(
            !closed,
            "Caller is not a official worker, wait for owner's approval"
        );
        _;
    }

    /// @notice Set the architect of the project
    /// @param _architect The address of the architect
    function setArchitect(address _architect) public onlyOwner isClosed {
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
        uint32 _surfaceSquareMeter,
        uint256 _projectValue,
        uint _startDate,
        uint _endDate
    ) public onlyArchi isClosed {
        _setProjectDetails(
            _projectName,
            _typeOfProject,
            _addresseOfProject,
            _surfaceSquareMeter,
            _projectValue,
            _startDate,
            _endDate
        );
    }

    /// @notice Internal function to set the project details
    /// @param _projectName The name of the project
    /// @param _typeOfProject The type of the project
    /// @param _addresseOfProject The address of the project
    /// @param _surfaceSquareMeter The surface area of the project in square meters
    /// @param _projectValue The monetary value of the project
    /// @param _startDate The start date of the project
    /// @param _endDate The end date of the project
    function _setProjectDetails(
        string memory _projectName,
        string memory _typeOfProject,
        string memory _addresseOfProject,
        uint32 _surfaceSquareMeter,
        uint256 _projectValue,
        uint _startDate,
        uint _endDate
    ) internal {
        projectDetails.projectName = _projectName;
        projectDetails.typeOfProject = _typeOfProject;
        projectDetails.addresseOfProject = _addresseOfProject;
        projectDetails.surfaceSquareMeter = _surfaceSquareMeter;
        projectDetails.projectValue = _projectValue;
        projectDetails.startDate = _startDate;
        projectDetails.endDate = _endDate;
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
            projectDetails.projectName,
            projectDetails.typeOfProject,
            projectDetails.addresseOfProject,
            projectDetails.surfaceSquareMeter,
            projectDetails.projectValue,
            projectDetails.startDate,
            projectDetails.endDate
        );
    }

    /// @notice Create a new phase for the project
    /// @param _name The name of the phase
    /// @param _phaseType The type of the phase
    function newPhase(
        string memory _name,
        string memory _phaseType
    ) public onlyArchi isClosed {
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
        string memory _d,
        uint16 _quantity
    ) public isClosed {
        _createMaterial(_a, _b, _c, _d, 0, _quantity);
    }

    /// @notice Internal function to create a new material for the project
    /// @param _a The name of the material
    /// @param _b The description of the material
    /// @param _c The company brand of the material
    /// @param _d The type of utilization for the material
    function _createMaterial(
        string memory _a,
        string memory _b,
        string memory _c,
        string memory _d,
        //bool _proofUploadedByTheSupplier,
        uint16 _documentId,
        uint16 _quantity
    ) internal {
        DeliveryInfo memory newDelivery = DeliveryInfo(
            false,
            _documentId,
            _quantity
        );
        materials.push(
            Material(
                materials.length,
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
                newDelivery
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
        uint16 _idMaterial,
        uint _idPhase
    ) public onlyWorker isClosed {
        // Check if the phase and material exist
        require(_idPhase < phases.length, "this phase doesn't exist");
        require(_idMaterial < materials.length, "this material doesn't exist");
        require(
            materials[_idMaterial].delivery.proofUploadedByTheSupplier,
            "the proof of delivery is not yet done"
        );
        // Add the material ID to the phase's materialIndices array
        phases[_idPhase].materialIndices.push(_idMaterial);
        // Check the amount carbon of the material and add to the total of phase
        uint32 value = calculatesTotalCarbon(_idMaterial);
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
    ) public onlyArchi isClosed {
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

    function approvedByTheOwner(uint8 _id) external onlyOwner isClosed {
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
    ) public onlyWorker isClosed {
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

    ///@notice update a supplier
    ///@param _account The Ethereum address of the worker
    ///@param _companyName The name of the worker's company
    ///@param _companyAddress The address of the worker's company
    function updateSupplier(
        address _account,
        string memory _companyName,
        string memory _companyAddress,
        uint8 _siretNumber
    ) public onlyWorker isClosed {
        Supplier storage supplier = suppliersMap[_account];
        supplier.companyName = _companyName;
        supplier.companyAddress = _companyAddress;
        supplier.siretNumber = _siretNumber;
    }

    ///@notice add the URI in the contract gived with the upload of document
    ///@param _documentURI the document URI

    function createDocument(
        string memory _documentURI,
        uint16 _materialId
    ) public isClosed {
        require(suppliersMap[msg.sender].account != address(0));
        _documentURIs[documentIdCounter] = _documentURI;
        linkDocumentToMaterial(_materialId, documentIdCounter);
        documentIdCounter++;
    }

    ///@notice retrieve the URI of one document whith is id
    ///@return documentURI
    function getDocumentURI(
        uint32 _documentId
    ) public view returns (string memory) {
        return _documentURIs[_documentId];
    }

    ///@notice link the document upload to a material
    ///@param _materialId the id of the material
    ///@param _documentId the id of the document
    function linkDocumentToMaterial(
        uint16 _materialId,
        uint16 _documentId
    ) private {
        require(_materialId < materials.length, "Material does not exist");
        require(
            suppliersMap[msg.sender].account != address(0),
            "Only suppliers can link documents"
        );
        require(
            bytes(_documentURIs[_documentId]).length > 0,
            "Document does not exist"
        );

        materials[_materialId].delivery.proofUploadedByTheSupplier = true;
        materials[_materialId].delivery.documentId = _documentId;
    }

    ///@notice the function to calculate carbon per m2
    ///@param _materialId the id of the material
    ///@return carbonValuePerSm the value of carbon of this material in phases worksite
    function calculatesTotalCarbon(
        uint16 _materialId
    ) private view returns (uint32) {
        uint32 value = materials[_materialId].delivery.quantity *
            materials[_materialId].totalLcConstruction;
        uint32 carbonValuePerSm = value / projectDetails.surfaceSquareMeter;
        return carbonValuePerSm;
    }

    ///@notice Close the project, calculate the final carbon score, and emit a CloseProject event.
    ///@dev This function can only be called by the architect and when the project is not already closed.

    function closeProject() external onlyArchi isClosed {
        require(phases.length > 0, "no phase created");

        require(phases[1].materialIndices.length != 0, "no material added");
        uint64 temporaryCarbon;
        for (uint16 i = 1; i <= numberOfPhases; i++) {
            temporaryCarbon = phases[i].carbonOfPhase;
        }
        projectDetails.scoringCarbon = temporaryCarbon;
        closed = true;

        emit CloseProject(
            projectDetails.projectName,
            projectDetails.typeOfProject,
            projectDetails.scoringCarbon
        );
    }
}
