// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("UserContract", (m) => {
  const lock = m.contract("UserContract", [
    "0x56044F5Dddff3908f81100fdfc81B4D2d074D280",
  ]);
  console.log("lock-------------", lock);
  

  return { lock };
});

// Deployed Addresses: 0x5FbDB2315678afecb367f032d93F642f64180aa3