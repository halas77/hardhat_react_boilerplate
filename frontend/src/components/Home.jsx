import React, { useContext, useState } from "react";
import { TokenContext } from "../context/TokenContext";
import Loader from "./Loader";

function Home() {
  const {
    account,
    amount,
    setAccount,
    setAmount,
    transferToken,
    connectMetamask,
    isLoading,
  } = useContext(TokenContext);

  const handlesubmit = (e) => {
    if (!account || !amount) return;
    e.preventDefault();
    transferToken();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="flex flex-col md:flex-row w-11/12 md:w-3/5 max-w-4xl shadow-2xl rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="w-full md:w-1/2 p-8 bg-gradient-to-b from-indigo-800 via-indigo-700 to-indigo-600">
          <h2 className="text-4xl font-bold mb-4">Empower the Future</h2>
          <p className="text-lg">
            Your Ether can be the key to unlocking innovation and supporting
            change. Every transaction is a step towards a brighter future.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 bg-gray-800 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Transfer Ether
          </h2>
          <input
            type="text"
            placeholder="Recipient Address"
            className="p-4 rounded mb-4 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <input
            type="number"
            step="0.001"
            placeholder="Amount in ETH"
            className="p-4 rounded mb-6 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <button
              className="p-4 rounded bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700 font-bold shadow-lg"
              onClick={handlesubmit}
            >
              Send Ether
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
