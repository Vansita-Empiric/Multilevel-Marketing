const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserContract", function () {
  let Token, token, UserContract, userContract;
  let owner, user1, user2, user3;

  beforeEach(async function () {
    [owner, user1, user2, user3] = await ethers.getSigners();

    // Deploy Token contract
    Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("TestToken", "TTK", ethers.utils.parseEther("1000"));
    await token.deployed();

    // Deploy UserContract with Token address
    UserContract = await ethers.getContractFactory("UserContract");
    userContract = await UserContract.deploy(token.address);
    await userContract.deployed();
  });

  it("should allow users to register", async function () {
    const referralCode = ethers.utils.formatBytes32String(""); // No referral for first user

    await userContract.connect(user1).registerUser("user1", referralCode);
    const userDetails = await userContract.userDetails(user1.address);

    expect(userDetails.username).to.equal("user1");
    expect(await userContract.isRegistered(user1.address)).to.equal(true);
  });

//   it("should prevent duplicate registration", async function () {
//     await userContract.connect(user1).registerUser("user1", ethers.utils.formatBytes32String(""));

//     await expect(
//       userContract.connect(user1).registerUser("user1", ethers.utils.formatBytes32String(""))
//     ).to.be.revertedWith("User is already registered with this account");
//   });

//   it("should allow users to login and logout", async function () {
//     await userContract.connect(user1).registerUser("user1", ethers.utils.formatBytes32String(""));

//     await userContract.connect(user1).loginUser("user1");
//     expect(await userContract.isLoggedIn(user1.address)).to.equal(true);

//     await userContract.connect(user1).logOut();
//     expect(await userContract.isLoggedIn(user1.address)).to.equal(false);
//   });

//   it("should allow token purchase and reward referrers", async function () {
//     const referralCode = ethers.utils.formatBytes32String(""); // No referral for first user
//     await userContract.connect(user1).registerUser("user1", referralCode);

//     // Register user2 with user1's referral code
//     const user1Details = await userContract.userDetails(user1.address);
//     await userContract.connect(user2).registerUser("user2", user1Details.referralCode);

//     await userContract.connect(user1).loginUser("user1");
//     await userContract.connect(user2).loginUser("user2");

//     // User2 purchases tokens
//     await userContract.connect(user2).purchaseToken(ethers.utils.parseEther("100"));

//     expect(await token.balanceOf(user2.address)).to.equal(ethers.utils.parseEther("100"));

//     // Referrer (user1) gets 5% reward
//     expect(await token.balanceOf(user1.address)).to.equal(ethers.utils.parseEther("5"));
//   });

//   it("should distribute secondary referral rewards", async function () {
//     await userContract.connect(user1).registerUser("user1", ethers.utils.formatBytes32String(""));
//     const user1Referral = (await userContract.userDetails(user1.address)).referralCode;

//     await userContract.connect(user2).registerUser("user2", user1Referral);
//     const user2Referral = (await userContract.userDetails(user2.address)).referralCode;

//     await userContract.connect(user3).registerUser("user3", user2Referral);

//     await userContract.connect(user3).loginUser("user3");
//     await userContract.connect(user3).purchaseToken(ethers.utils.parseEther("100"));

//     expect(await token.balanceOf(user2.address)).to.equal(ethers.utils.parseEther("5")); // 5% to user2
//     expect(await token.balanceOf(user1.address)).to.equal(ethers.utils.parseEther("2.5")); // 2.5% to user1
//   });
});
