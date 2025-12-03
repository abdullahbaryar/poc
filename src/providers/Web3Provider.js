/* eslint-disable react-hooks/set-state-in-effect */
import React, { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";

const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Check  MetaMask 
    if (typeof window.ethereum !== "undefined") {
      // Web3 instance 
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      console.log("MetaMask Detected & Web3 Initialized"); // Debugging Log
    } else {
      console.warn("MetaMask not found in this browser");
    }
  }, []);

  return (
    <Web3Context.Provider value={{ web3, account, setAccount }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);