import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const UserInfo = ({ state, account }) => {
  const { contract } = state;
  const [addr, setAddr] = useState();
  const [details, setDetails] = useState({
    userAddress: "",
    username: "",
    refferalCode: "",
    receivedRefferalCodeFrom: "",
    receivedRefferalCode: "",
  });

  const searchUserDetailsFn = async (e) => {
    e.preventDefault();
    try {
      const userDetails = await contract.getUserDetails(addr);

      setDetails({
        userAddress: userDetails[0],
        username: userDetails[1],
        refferalCode: userDetails[2],
        receivedRefferalCodeFrom: userDetails[3],
        receivedRefferalCode: userDetails[4],
      });
      // console.log("user Details from setDetails-------", details);

      toast.success("User details found successfully");
    } catch (error) {
      console.log("Error finding user details: ", error);
      toast.error(error.reason);
    }
  };

  // console.log("user Details from setDetails-------", details);

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-800">
      <div className="w-full max-w-2xl bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300  rounded-lg shadow-lg p-8">
        <div>
          <Link to="/purchase">
            <FaArrowLeft className=" text-lg" />
          </Link>
          <h2 className="text-3xl font-bold text-gray-800 text-center -mt-7 mb-6">
            User Information
          </h2>
        </div>
        <form onSubmit={searchUserDetailsFn}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Connected Account
            </label>
            <input
              type="text"
              value={account}
              disabled
              className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="userAddress"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              User Address
            </label>
            <input
              type="text"
              id="userAddress"
              placeholder="Enter user address"
              required
              onChange={(e) => {
                setAddr(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 mt-4 mb-8 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </form>
        <table className="w-full text-left bg-transparent rounded-lg">
          <thead>
            <tr className="bg-transparent">
              <th className="px-4 py-2 border border-gray-800">User Address</th>
              <th className="px-4 py-2 border border-gray-800">User Name</th>
              <th className="px-4 py-2 border border-gray-800">
                Referral Code
              </th>
              <th className="px-4 py-2 border border-gray-800">
                Received Referral From
              </th>
              <th className="px-4 py-2 border border-gray-800">
                Received Referral Code
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 border-gray-800">
                {details.userAddress?.slice(0, 6)}...
                {details.userAddress?.slice(-4)}
              </td>
              <td className="border px-4 py-2 border-gray-800">
                {details.username}
              </td>
              <td className="border px-4 py-2 border-gray-800">
                {details.refferalCode}
              </td>
              <td className="border px-4 py-2 border-gray-800">
                {details.receivedRefferalCodeFrom?.slice(0, 6)}...
                {details.receivedRefferalCodeFrom?.slice(-4)}
              </td>
              <td className="border px-4 py-2 border-gray-800">
                {details.receivedRefferalCode}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInfo;