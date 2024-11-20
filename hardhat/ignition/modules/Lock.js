// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
 
module.exports = buildModule("MLM", (m) => {
 
  const token = m.contract("Token", [
    "TokenName", "SYM", 21
  ]);
 
  console.log("------------------>", token);
  const user = m.contract("UserContract", [
    token,
  ]);
 
});
 