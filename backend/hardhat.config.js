require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

//const { ALCHEMY_API_KEY, SEPOLIA_PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;
// Go to https://alchemy.com, sign up, create a new App in
// its dashboard, and replace "KEY" with its key
//const ALCHEMY_API_KEY = "KEY";

// Replace this private key with your Sepolia account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts

/** @type import('hardhat/config').HardhatUserConfig */
(
  module.exports = {
    solidity: "0.8.18",
    defaultNetwork: "hardhat",
    networks: {
      localhost: {
        url: "http://127.0.0.1:8545",
        chainId: 31337,
      },
      sepolia: {
        url: process.env.ALCHEMY_API_KEY,
        accounts: [process.env.SEPOLIA_PRIVATE_KEY],
      },
    },
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
    },
  }
);
