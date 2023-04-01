// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./Project.sol";

contract Carb0 {
    uint128 public numberOfProjects;

    address[] public projects;
    address[] public ownerOfProjects;

    struct ProjectOwner {
        uint project;
        address owner;
    }

    ProjectOwner[] public projectOwners;

    mapping(address => uint) owners;

    uint128 public constant PROJECT_CREATION_COST = 0.1 ether;

    event ProjectCreated(address projectAddress);

    Project public newProject;

    function createProject() public payable {
        require(msg.value >= PROJECT_CREATION_COST, "Not enough ETH sent");
        newProject = new Project(msg.sender);
        projects.push(address(newProject));
        uint id = numberOfProjects + 1;
        projectOwners.push(ProjectOwner(id, msg.sender));
        numberOfProjects++;
        emit ProjectCreated(address(newProject));

        require(msg.value >= PROJECT_CREATION_COST, "Not enough ETH sent");
        if (msg.value > PROJECT_CREATION_COST) {
            uint256 excessAmount = msg.value - PROJECT_CREATION_COST;
            (bool success, ) = msg.sender.call{value: excessAmount}("");
            require(success, "Failed to send back excess ETH");
        }
    }

    function getMyProjects() public view returns (ProjectOwner memory _owned) {
        uint id = owners[msg.sender];
        _owned = projectOwners[id];
    }
}
