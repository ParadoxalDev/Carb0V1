// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "./Project.sol";

///@title Carb0 - A contract to create and manage worksite projects for track the c02

contract Carb0 {
    uint128 public numberOfProjects;

    // Structure to represent a project and its owner
    struct ProjectOwner {
        uint idProject;
        address owner;
        address project;
    }

    // Array to store project owners
    ProjectOwner[] public projectOwners;

    // Constant to represent the cost of creating a new project
    uint128 public constant PROJECT_CREATION_COST = 0.1 ether;

    // Event to be emitted when a new project is created
    event ProjectCreated(address projectAddress, address owner, uint id);

    Project newProject;

    /// @notice Create a new project with the sender as the owner
    /// @dev Requires the sender to send at least PROJECT_CREATION_COST in ETH
    function createProject() public payable {
        // Verify that enough ETH was sent
        require(msg.value >= PROJECT_CREATION_COST, "Not enough ETH sent");
        // Create a new project with the sender as the owner
        newProject = new Project(msg.sender);
        // Push the new project to the projectOwners array
        projectOwners.push(
            ProjectOwner(numberOfProjects, msg.sender, address(newProject))
        );
        // Increment the number of projects
        numberOfProjects++;
        // Emit the ProjectCreated event
        emit ProjectCreated(address(newProject), msg.sender, numberOfProjects);

        // If the sender sent more than PROJECT_CREATION_COST, refund the excess
        if (msg.value > PROJECT_CREATION_COST) {
            uint256 excessAmount = msg.value - PROJECT_CREATION_COST;
            (bool success, ) = msg.sender.call{value: excessAmount}("");
            require(success, "Failed to send back excess ETH");
        }
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
