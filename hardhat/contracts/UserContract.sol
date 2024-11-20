// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Token.sol";

contract UserContract {
    // 0x0000000000000000000000000000000000000000

    struct User {
        address userAddress;
        string username;
        bytes4 referralCode;
        address receivedReferralCodeFrom;
        bytes4 receivedReferralCode;
    }

    mapping(address => User) userDetails;
    mapping(address => bool) isRegistered;
    mapping(address => bool) isLoggedIn;
    mapping(string => bool) isUsernameUnavailable;
    mapping(bytes4 => address) referrerAdd;
    mapping(bytes4 => address[]) referralCodeUsedBy;

    Token public tokenContractRef;
    address owner; // 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

    constructor(address _tokenContractAddress) {
        tokenContractRef = Token(_tokenContractAddress);
        owner = msg.sender;
    }

    // user1: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2    --
    // user2: 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db    --
    // user3: 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB    --
    // user4: 0x617F2E2fD72FD9D5503197092aC168c91465E7f2    --
    // user5: 0x17F6AD8Ef982297579C203069C1DbfFE4348c372    --

    modifier loggedInOnly() {
        require(
            isLoggedIn[msg.sender],
            "You have to Login to access this function"
        );
        _;
    }

    function registerUser(string memory _username, bytes4 _receivedReferralCode)
        public
    {
        require(msg.sender != owner, "Owner can not register");
        require(
            !isRegistered[msg.sender],
            "User is already registered with this account"
        );
        require(!isUsernameUnavailable[_username], "Username unavailable");

        address referralCodeFrom = referrerAdd[_receivedReferralCode];

        bytes4 refCode = bytes4(
            keccak256(
                abi.encodePacked(msg.sender, referralCodeFrom, block.timestamp)
            )
        );

        User memory userInstance = User(
            msg.sender,
            _username,
            refCode,
            referralCodeFrom,
            _receivedReferralCode
        );
        userDetails[msg.sender] = userInstance;

        isRegistered[msg.sender] = true;
        isUsernameUnavailable[_username] = true;
        referrerAdd[refCode] = msg.sender;
        referralCodeUsedBy[_receivedReferralCode].push(msg.sender);
    }

    function loginUser(string memory _username) public {
        require(
            isRegistered[msg.sender],
            "User is not registered with this account"
        );
        require(
            keccak256(abi.encodePacked(userDetails[msg.sender].username)) ==
                keccak256(abi.encodePacked(_username)),
            "Invalid username for this account"
        );
        require(
            !isLoggedIn[msg.sender],
            "You are already Llogged In with this account"
        );

        isLoggedIn[msg.sender] = true;
    }

    function logOut() public loggedInOnly {
        isLoggedIn[msg.sender] = false;
    }

    function purchaseToken(uint256 _amount) public loggedInOnly {
        require(
            isRegistered[msg.sender],
            "User is not registered with this account"
        );

        tokenContractRef.mint(msg.sender, _amount);

        // give 5% of the amount to the 1st referrer
        address referrer = userDetails[msg.sender].receivedReferralCodeFrom;
        if (referrer != address(0)) {
            tokenContractRef.mint(referrer, (_amount * 5) / 100);
        }

        // give 2.5% of the amount to the 1st referrer
        address secondReferrer = userDetails[referrer].receivedReferralCodeFrom;
        if (secondReferrer != address(0)) {
            tokenContractRef.mint(secondReferrer, (_amount * 25) / 1000);
        }
    }

    function isReferralCodeValid(bytes4 _refCode) public view returns (bool) {
        address userAddress = referrerAdd[_refCode];
        if (userAddress != address(0)) {
            return true;
        }
        return false;
    }

    function getUserDetails(address _userAdd)
        public
        view
        returns (User memory)
    {
        return userDetails[_userAdd];
    }

    function getReferralCodeUsedByInfo(bytes4 _referralCode)
        public
        view
        loggedInOnly
        returns (address[] memory)
    {
        return referralCodeUsedBy[_referralCode];
    }
}
