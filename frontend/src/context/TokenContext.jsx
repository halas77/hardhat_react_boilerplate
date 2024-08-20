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

  // Transfer token
  const transferToken = async () => {
    try {
      if (!window.ethereum) {
        console.error("Ethereum object not found. Please install MetaMask.");
        return;
      }

      if (!account || !amount) {
        console.error("Account or amount is missing.");
        return;
      }

      setIsLoading(true);

      const { contract, signer } = await connectMetamask();
      if (!contract || !signer) {
        console.error("Failed to connect to Metamask or contract not found.");
        setIsLoading(false);
        return;
      }

      const isValidAccount = /^0x[a-fA-F0-9]{40}$/.test(account);
      if (!isValidAccount) {
        console.error("Invalid Ethereum account address.");
        setIsLoading(false);
        return;
      }

      const sendToken = await contract.transfer(
        account,
        ethers.utils.parseEther(amount)
      );

      console.log("Token transfer Loading:", sendToken.hash);
      await sendToken.wait();
      console.log("Token transfer successful:", sendToken);
    } catch (error) {
      console.error("An error occurred during the token transfer:", error);
    } finally {
      setIsLoading(false);
    }
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
        isLoading,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
