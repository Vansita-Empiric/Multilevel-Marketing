const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MLM", (m) => {

  const token = m.contract("Token", [
    "TokenName", "SYM", 21
  ]);
  const user = m.contract("UserContract", [
    token,
  ]);
});
