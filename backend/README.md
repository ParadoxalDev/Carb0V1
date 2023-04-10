# Project Carbon Calculator

## Introduction

The Project Carbon Calculator is a smart contract-based system for tracking the carbon footprint of construction projects. This system allows the registration of different phases of the project, materials used, and their respective carbon emissions. It helps stakeholders and builders to assess the environmental impact of their construction projects and make data-driven decisions to reduce their carbon footprint.

## Features

- Create and manage construction projects
- Add different phases to a project
- Add materials and their carbon emissions data
- Calculate the total carbon emissions of a project
- Close the project and emit an event with the final carbon score

## Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/project-carbon-calculator.git
```
2. Install dependencies

```bash
cd project-carbon-calculator
npm install
```
3. Compile and deploy the smart contracts

```bash
npx hardhat compile
npx hardhat test

```
## Usage

The smart contracts can be interacted with using the `ethers.js` library or any other Ethereum-compatible library or tool.

### Creating a new project

Call the `createProject()` function with the required information about the project.

### Managing project phases

Call the `newPhase()` function to add a new phase to the project. Each phase can have multiple materials associated with it.

### Adding materials and their carbon emissions data

Call the `createMaterial()` function to add a new material to the project. Include the material's name, description, company, utilization, and carbon emissions.

### Calculate the total carbon emissions of a project

The total carbon emissions of a project are calculated automatically when materials are added to a phase.

### Closing the project

Call the `closeProject()` function to close the project and emit an event with the final carbon score.

## Tests

To run the tests, execute the following command:

```bash
npx hardhat test

```
## Deployment

To deploy the smart contracts, you can use the Hardhat deployment script located in the `scripts` folder. Modify the script as needed and run the following command:

```bash
npx hardhat run --network <network_name> scripts/deploy.js
```

Replace `<network_name>` with the desired network, such as `mainnet` or `localhost` for a local deployment.

## Contributing

We welcome contributions to this project. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make changes to the code.
4. Commit and push your changes.
5. Create a pull request with a description of the changes.

Please ensure that your code is well-formatted and follows best practices.

## License

This project is licensed under the MIT License.

## Support

If you have any questions or issues, please open an issue on the GitHub repository or contact the project maintainers.

