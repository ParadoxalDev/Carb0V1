import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useAccount, useProvider, useSigner, useContractWrite } from "wagmi";
import { BigNumber, ethers, Signer } from "ethers";
import { abi, contractAddress } from "@/public/constants";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CreateNewProject = () => {
  const { isConnected, address } = useAccount();
  const { data: provider } = useProvider();
  const { data: signer } = useSigner();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const router = useRouter();
  const [projectAddress, setProjectAddress] = useState("");
  const [projectId, setProjectId] = useState(0);
  const [owner, setOwner] = useState("");

  const createProject = async () => {
    if (!isConnected) {
      alert("Veuillez vous connecter pour créer un projet");
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);
    setTransactionData(null);

    const contract = new ethers.Contract(contractAddress, abi, signer);
    const valueToSend = ethers.utils.parseEther("0.1");

    try {
      const transaction = await contract.createProject({ value: valueToSend });
      await transaction.wait();
      contract.once("ProjectCreated", (projectAddress, owner, id) => {
        setProjectAddress(projectAddress);
        setProjectId(id.toNumber());
      });

      setIsSuccess(true);
      router.replace("/MyProject");
      setTransactionData(transaction);
    } catch (error) {
      alert("Erreur lors de la création du projet: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <Button onClick={createProject}>
          Créer votre projet pour 0.1eth !
        </Button>

        {isLoading && <div>Check Wallet</div>}
        {/* {isSuccess && (
         
        )} */}
      </div>
    </>
  );
};
export default CreateNewProject;
