import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ state, account }) => {
  const { contract } = state;
  const navigate = useNavigate();
  const [name, setName] = useState();

  // useEffect(async() => {
    
  // const userDetails = await contract.getUserDetails(account);
  // console.log("Registered User Details: ", userDetails);

  // const referralLink = `${window.location.origin}/register?ref=${userDetails.referralCode}`;
  // console.log("Referral Link: ", referralLink);
  

  // }, [])
  

  const loginUserFn = async (e) => {
    e.preventDefault();
    try {
      console.log("name---", name);

      const login = await contract.loginUser(name);
      await login.wait();

      // console.log("login details:------", login);

      toast.success("Logged in successfully");
      navigate("/purchase");
      
    } catch (error) {
      console.log("Login user error: ", error);
      toast.error(error.reason);
    }
  }
  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-800">
      <div className="w-full max-w-xl bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300  rounded-lg shadow-lg p-14">
        <div>
          <Link to="/">
            <FaArrowLeft className=" text-lg" />
          </Link>
          <h2 className="text-3xl font-bold text-gray-800 text-center -mt-7 mb-6">
            Log In
          </h2>
        </div>
        <form onSubmit={loginUserFn}>
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
              htmlFor="username"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 mt-5 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Log In
            </button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
