import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { BigNumber, ethers } from "ethers";

import { useContractWrite, usePrepareContractWrite, useContract } from "wagmi";
import { abi, contractAddress } from "@/public/constants";
import { useState } from "react";

const CreateNewProject = () => {
  //------------------- // WAGMI // -----------------------------
  //   const { address, isConnected } = useAccount();
  //   const { config } = usePrepareSendTransaction({
  //     request: { to: "moxey.eth", value: BigNumber.from("10000000000000000") },
  //   });
  //   const { data, isLoading, isSuccess, sendTransaction } =
  //     useSendTransaction(config);
  //   return (
  //     <div>
  //       <button disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
  //         Send Transaction
  //       </button>
  //       {isLoading && <div>Check Wallet</div>}
  //       {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
  //     </div>
  //   );
  //------------------- // WAGMI // -----------------------------
  //   const { config } = usePrepareContractWrite({
  //     address: contractAddress,
  //     abi: abi,
  //     functionName: "createProject",
  //   });
  //   const { data, isLoading, isSuccess, write } = useContractWrite(config);
  //   const { data: signer, isError, isLoading2 } = useSigner();

  //   const contract = useContract({
  //     address: contractAddress,
  //     abi: abi,
  //     signerOrProvider: signer,
  //   });

  //   return (
  //     <div>
  //       <button disabled={!write} onClick={() => write?.(1)}>
  //         Feed
  //       </button>
  //       {isLoading && <div>Check Wallet</div>}
  //       {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
  //     </div>
  //   );
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const [value, setValue] = useState(1);

  const createProject = async () => {
    try {
      const contract = new ethers.ContractFactory(contractAddress, abi, signer);
      await contract.createProject(value);
    } catch {
      console.error();
    }
  };

  return (
    <Box textAlign={"center"} marginBottom="3rem">
      <Text>Vous souhaitez créer votre projet ?</Text>
      {isConnected ? (
        <Button
          colorScheme={"green"}
          margin="1rem"
          onClick={() => {
            createProject();
          }}
        >
          Start here!
        </Button>
      ) : (
        <Text>Veuillez vous connecter pour creer un projet</Text>
      )}
    </Box>
  );
};
export default CreateNewProject;
