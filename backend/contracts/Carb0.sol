// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "./Project.sol";
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

///@title Carb0 - A contract to create and manage worksite projects for track the c02

contract Carb0 {
    AggregatorV3Interface internal priceFeed;
    IERC20 internal usdtToken;
    address public projectImplementation;
    TransparentUpgradeableProxy[] public projectsArray;

    uint128 public numberOfProjects;

    // Structure to represent a project and its owner
    struct ProjectOwner {
        uint idProject;
        address owner;
        address project;
    }

    // Array to store project owners
    ProjectOwner[] public projectOwners;
    mapping(address => uint) public projectid;

    // Constant to represent the cost of creating a new project
    uint public constant PROJECT_CREATION_COST = 0.01 ether; //

    // Event to be emitted when a new project is created
    event ProjectCreated(address projectAddress, address owner, uint id);

    Project newProject;

    // -------------------- CONSTRUCTOR --------------------

    constructor() {
        projectImplementation = address(new Project());
        priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );
        // usdtToken = IERC20(A REMPLIR AVEC L'ADRESSE DE L USDT); // A REMPLIR !!!!!
    }

    // -------------------- CONSTRUCTOR --------------------
    // -------------------- CHAINLINK PRICE FEED ETH/USD SEPOLIA  --------------------

    // function getLatestPrice() public view returns (int) {
    //     (
    //         ,
    //         /* uint80 roundID */ int price /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/,
    //         ,
    //         ,

    //     ) = priceFeed.latestRoundData();

    //     return price;
    // }

    // -------------------- TEST 2 ------------------------
    // function getEthUsdPrice() public view returns (uint256) {
    //     (, int256 price, , , ) = priceFeed.latestRoundData();
    //     return uint256(price);
    // }

    // -------------------- CHAINLINK PRICE FEED ETH/USD SEPOLIA  --------------------

    /// @notice Create a new project with the sender as the owner
    /// @dev Requires the sender to send at least PROJECT_CREATION_COST in ETH
    function createProject() public payable {
        // Verify that enough ETH was sent
        //int EthUsdfedFromChainlink = getLatestPrice();
        //  uint EthUsd = uint(EthUsdfedFromChainlink / 100000000);
        // uint price = getEthUsdPrice();
        require(msg.value >= PROJECT_CREATION_COST, "Not enough ETH sent");

        TransparentUpgradeableProxy projectProxy = new TransparentUpgradeableProxy(
            projectImplementation,
            0xFeD86fDF751B3896Bcf3768B3A29aBFa6Ce9b1cB, // The admin who can upgrade the proxy - possible improvement: Gnosis Safe Wallet managed by the team
            abi.encodeWithSignature("initialize(address)", msg.sender) // project's initializer -> Project's owner address
        );

        projectsArray.push(projectProxy);
        // Push the new project to the projectOwners array
        projectOwners.push(
            ProjectOwner(numberOfProjects, msg.sender, address(newProject))
        );
        // Increment the number of projects
        numberOfProjects++;
        // Emit the ProjectCreated event
        emit ProjectCreated(
            address(projectProxy),
            msg.sender,
            numberOfProjects
        );

        projectid[msg.sender] = numberOfProjects;

        // If the sender sent more than PROJECT_CREATION_COST, refund the excess
        if (msg.value > PROJECT_CREATION_COST) {
            uint256 excessAmount = msg.value - PROJECT_CREATION_COST;
            (bool success, ) = msg.sender.call{value: excessAmount}("");
            require(success, "Failed to send back excess ETH");
        }
    }

    function getProxyAdmin(uint256 projectIndex) public returns (address) {
        require(projectIndex < projectsArray.length, "Invalid project index");

        TransparentUpgradeableProxy projectProxy = projectsArray[projectIndex];
        return projectProxy.admin();
    }

    function upgradeProject(
        uint256 projectIndex,
        address newImplementation
    ) public {
        require(projectIndex < projectsArray.length, "Invalid project index");

        TransparentUpgradeableProxy projectProxy = projectsArray[projectIndex];
        require(msg.sender == projectProxy.admin(), "Only admin can upgrade");

        projectProxy.upgradeTo(newImplementation);
    }

    /// @notice Get the IDs of all projects owned by the sender
    /// @return An array of project IDs owned by the sender
    function idOfMyProjects() public view returns (uint[] memory) {
        uint[] memory index = new uint[](projectOwners.length);
        uint count = 0;
        // Loop through projectOwners to find projects owned by the sender
        for (uint i = 0; i < projectOwners.length; i++) {
            if (projectOwners[i].owner == msg.sender) {
                index[count] = i;
                count++;
            }
        }
        // Create a new array to store the project IDs owned by the sender
        uint[] memory result = new uint[](count);
        for (uint i = 0; i < count; i++) {
            result[i] = index[i];
        }
        // Return the array of project IDs owned by the sender
        return result;
    }
}
