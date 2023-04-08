export const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "companyName",
        type: "string",
      },
    ],
    name: "ApprovedByTheOwner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "architect",
        type: "address",
      },
    ],
    name: "ArchitectSeted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "projectName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "typeOfProject",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "scoringCarbon",
        type: "uint256",
      },
    ],
    name: "CloseProject",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "materialId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "phaseId",
        type: "uint256",
      },
    ],
    name: "MaterialAddToPhase",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "MaterialCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "companyBrand",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "utilisationType",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "transportA4",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "unit",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "UF",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "unitUF",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalLcConstruction",
        type: "uint256",
      },
    ],
    name: "MaterialCreatedDetailed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "phaseName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "phaseType",
        type: "string",
      },
    ],
    name: "PhaseCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "companyName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "siretNumber",
        type: "uint256",
      },
    ],
    name: "WorkerAdded",
    type: "event",
  },
  {
    inputs: [],
    name: "CARBON_TRESHOLD_2022",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_idMaterial",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "_idPhase",
        type: "uint256",
      },
    ],
    name: "addMaterialToPhase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
      {
        internalType: "string",
        name: "_companyName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_companyAddresse",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_siretNumber",
        type: "uint256",
      },
    ],
    name: "addWorker",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_id",
        type: "uint8",
      },
    ],
    name: "approvedByTheOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "architect",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "closeProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "closed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_documentURI",
        type: "string",
      },
      {
        internalType: "uint16",
        name: "_materialId",
        type: "uint16",
      },
    ],
    name: "createDocument",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_a",
        type: "string",
      },
      {
        internalType: "string",
        name: "_b",
        type: "string",
      },
      {
        internalType: "string",
        name: "_c",
        type: "string",
      },
      {
        internalType: "string",
        name: "_d",
        type: "string",
      },
      {
        internalType: "uint16",
        name: "_quantity",
        type: "uint16",
      },
    ],
    name: "createMaterial",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
      {
        internalType: "string",
        name: "_companyName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_companyAddress",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_siretNumber",
        type: "uint8",
      },
    ],
    name: "createSupplier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deliveryInfos",
    outputs: [
      {
        internalType: "bool",
        name: "proofUploadedByTheSupplier",
        type: "bool",
      },
      {
        internalType: "uint16",
        name: "documentId",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "quantity",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_documentId",
        type: "uint32",
      },
    ],
    name: "getDocumentURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_idPhase",
        type: "uint256",
      },
    ],
    name: "getPhase",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProjectDetails",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "materials",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "companyBrand",
        type: "string",
      },
      {
        internalType: "string",
        name: "utilisationType",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "transportA4",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "unit",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "UF",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "unitUF",
        type: "string",
      },
      {
        internalType: "uint16",
        name: "totalLcConstruction",
        type: "uint16",
      },
      {
        internalType: "bool",
        name: "approveByTheArchi",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "proofUploadedByTheSupplier",
            type: "bool",
          },
          {
            internalType: "uint16",
            name: "documentId",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "quantity",
            type: "uint16",
          },
        ],
        internalType: "struct Project.DeliveryInfo",
        name: "delivery",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_phaseType",
        type: "string",
      },
    ],
    name: "newPhase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "numberOfPhases",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "phases",
    outputs: [
      {
        internalType: "string",
        name: "phaseName",
        type: "string",
      },
      {
        internalType: "string",
        name: "phaseType",
        type: "string",
      },
      {
        internalType: "uint64",
        name: "carbonOfPhase",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "projectDetails",
    outputs: [
      {
        internalType: "string",
        name: "projectName",
        type: "string",
      },
      {
        internalType: "string",
        name: "typeOfProject",
        type: "string",
      },
      {
        internalType: "string",
        name: "addresseOfProject",
        type: "string",
      },
      {
        internalType: "uint32",
        name: "surfaceSquareMeter",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "projectValue",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endDate",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "scoringCarbon",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_architect",
        type: "address",
      },
    ],
    name: "setArchitect",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_projectName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_typeOfProject",
        type: "string",
      },
      {
        internalType: "string",
        name: "_addresseOfProject",
        type: "string",
      },
      {
        internalType: "uint32",
        name: "_surfaceSquareMeter",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "_projectValue",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_startDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endDate",
        type: "uint256",
      },
    ],
    name: "setProjectDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "suppliers",
    outputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "string",
        name: "companyName",
        type: "string",
      },
      {
        internalType: "string",
        name: "companyAddress",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "siretNumber",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "suppliersMap",
    outputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "string",
        name: "companyName",
        type: "string",
      },
      {
        internalType: "string",
        name: "companyAddress",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "siretNumber",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
      {
        internalType: "string",
        name: "_companyName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_companyAddress",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_siretNumber",
        type: "uint8",
      },
    ],
    name: "updateSupplier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "verifyApprovedByTheOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "verifyWorker",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "workers",
    outputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "string",
        name: "companyName",
        type: "string",
      },
      {
        internalType: "string",
        name: "companyAddresse",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "siretNumber",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isApprovedByTheOwner",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "banned",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
