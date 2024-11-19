import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Purchase = ({ state, account }) => {
  const { contract } = state;
  const navigate = useNavigate();
  const [amount, setAmount] = useState();

  const purchaseTokenFn = async (e) => {
    e.preventDefault();
    try {
      const token = await contract.purchaseToken(amount);
      // await token.wait();

      toast.success("Token purchased successfully");
    } catch (error) {
      console.log("Purchase error: ", error);
      toast.error(error.reason);
    }
  };

  const logoutFn = async () => {
    try {

      const logout = await contract.logOut();
      await logout.wait();

      toast.success("User logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log("logout error: ", error);
      toast.error(error.reason);
    }
  }

  return (
    <div className="flex flex-col justify-center min-h-screen items-center bg-gray-800 p-4">
      <div className="flex flex-row gap-60">
        <div className="flex mb-10">
          <Link to="/userInfo">
            <button className="bg-blue-300  text-gray-800 text-center p-2 rounded-lg shadow-lg">
              User Details
            </button>
          </Link>
        </div>
        <div className="flex mb-10">
          <Link to="/codeInfo">
            <button className="bg-purple-300  text-gray-800 text-center p-2 rounded-lg shadow-lg">
              Code Details
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full max-w-md bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 rounded-lg shadow-lg p-8">
        <div>
          <Link to="/login">
            <FaArrowLeft className="text-lg" />
          </Link>
          <h2 className="text-3xl font-bold text-gray-800 text-center -mt-7 mb-6">
            Purchase
          </h2>
        </div>
        <form onSubmit={purchaseTokenFn}>
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
              htmlFor="amount"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount"
              required
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 mt-5 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Purchase
          </button>
            <button
            onClick={logoutFn}
              type="button"
              className="w-full bg-blue-600 text-white font-medium py-2 mt-5 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Log out
            </button>
          
        </form>
      </div>
    </div>
  );
};

export default Purchase;
