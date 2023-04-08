import { abi, contractAddress } from "@/public/constants";
import { Box, Button, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";
import { useAccount, useProvider } from "wagmi";

const CoWithCarb0 = () => {
  const { address, isConnected } = useAccount();
  const provider = useProvider();

  const [number, setNumber] = useState(null);

  const getTheTotalCarbon = async () => {
    const contract = new ethers.Contract(contractAddress, abi, provider);
    let number = await contract.numberOfProjects();
    setNumber(number.toString());
  };
  return;
};

export default CoWithCarb0;
