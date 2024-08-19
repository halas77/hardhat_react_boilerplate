import { createContext, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const connectMetamask = async () => {
    if (typeof window.ethereum === "undefined") {
      console.error("MetaMask is not installed!");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      console.log("Provider:", provider);

      // Request account access if needed
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log("Accounts:", accounts);

      // Get the signer
      const signer = provider.getSigner();
      console.log("Signer:", signer);

      // Initialize the contract
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      console.log("Contract:", contract);

      return {
        signer: signer,
        provider: provider,
        account: accounts,
        contract: contract,
      };
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      return null;
    }
  };

  //   transfer token
  const transferToken = async () => {
    if (!account || !amount) return;
    if (!window.ethereum) return;

    setIsLoading(true);

    const { contract } = await connectMetamask();

    const sendToken = contract.transfer(
      account,
      ethers.utils.parseEther(amount)
    );

    await sendToken.wait();

    setIsLoading(false);

    console.log("sendToken", sendToken);
  };

  return (
    <TokenContext.Provider
      value={{
        account,
        amount,
        setAccount,
        setAmount,
        transferToken,
        connectMetamask,
        isLoading
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
