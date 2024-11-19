import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ state, account }) => {
  const { contract } = state;
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [refCode, setRefCode] = useState();

  const registerUserFn = async (e) => {
    e.preventDefault();
    try {
      // console.log("data---------", name, refCode);
      // console.log("contract--------", contract);

      const register = await contract.registerUser(name, refCode);
      await register.wait();

      // console.log("Register ------------", register);

      toast.success("User registered successfully");
      navigate("/login");
    } catch (error) {
      console.log("Registration error: ", error);
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
    <div className="flex justify-center min-h-screen bg-gray-800 items-center ">
      <div className="w-full max-w-xl bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 rounded-lg shadow-lg p-14">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Register
        </h2>

        <form onSubmit={registerUserFn}>
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
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="referralCode"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Referral Code (Optional)
            </label>
            <input
              type="text"
              id="referralCode"
              required
              placeholder="Enter referral code"
              onChange={(e) => {
                setRefCode(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 mt-5 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
          <h2 className="font-bold text-gray-800 text-center m-3">Or</h2>
          <Link to="/login">
            <button
              type="button"
              className="w-full bg-blue-600 text-white font-medium py-2  rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Log In
            </button>
          </Link>
          
        </form>
      </div>
    </div>
  );
};

export default Register;
