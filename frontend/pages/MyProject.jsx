import Layout from "@/components/Layout/Layout";
import { abi, contractAddress } from "@/public/constants";
import { Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useContractRead, useProvider } from "wagmi";

const MyProject = () => {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const route = useRouter();
  const [ids, setIds] = useState([""]);

  const myproject = async () => {
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const tx = await contract.connect(provider).idOfMyProjects();
    console.log(tx);
    setIds(tx.toString());
  };

  useEffect(() => {
    if (isConnected) {
      myproject();
    } else {
      route.replace("/");
    }
  }, [isConnected, route, provider]);
  //   useEffect(() => {
  //     if (!isConnected) {
  //       route.replace("/");
  //     }
  //   }, [isConnected, route]);

  return (
    <>
      {isConnected ? (
        <Layout>
          <Text>Les projets dont vous êtes promoteurs : {ids}</Text>
        </Layout>
      ) : (
        <Text fontSize={"2xl"}>
          Vous n'avez pas de projet et aller être redirigé vers l'acceuil
        </Text>
      )}
    </>
  );
};

export default MyProject;
