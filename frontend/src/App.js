import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Purchase from "./components/Purchase";
import UserInfo from "./components/UserInfo";
import CodeInfo from "./components/CodeInfo";
import abi from "./artifacts/contracts/UserContract.sol/UserContract.json";
import { BrowserProvider, Contract } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
      const contractABI = abi.abi;

      try {
        if (window.ethereum !== null) {
          const account = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new Contract(contractAddress, contractABI, signer);

          setAccount(account[0]);
          setState({ provider, signer, contract });
        } else {
          alert("Install Metamask");
        }
      } catch (error) {
        console.error(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Register state={state} account={account} />}
        />
        <Route
          path="/login"
          element={<Login state={state} account={account} />}
        />
        <Route
          path="/purchase"
          element={<Purchase state={state} account={account} />}
        />
        <Route
          path="/userInfo"
          element={<UserInfo state={state} account={account} />}
        />
        <Route
          path="/codeInfo"
          element={<CodeInfo state={state} account={account} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

// 0x5FbDB2315678afecb367f032d93F642f64180aa3
