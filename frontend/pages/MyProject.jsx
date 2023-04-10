import Layout from "@/components/Layout/Layout";
import { abi, contractAddress } from "@/public/constants";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useProvider,
  useContractEvent,
} from "wagmi";

const MyProject = () => {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const route = useRouter();
  const [ids, setIds] = useState([""]);
  const [project, setProject] = useState([]);

  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "idOfMyProjects",
  });

  useContractEvent({
    address: contractAddress,
    abi: abi,
    eventName: "ProjectCreated",
    listener(projectAddress, owner, id) {
      console.log(projectAddress, owner, id);
      setProject(projectAddress);
    },
  });

  useEffect(() => {
    if (isConnected) {
      if (data) {
        const prov = [];
        for (let i = 0; i < data.length; i++) {
          prov.push("  Projet ", i, " : ", data[i]._hex.slice(3));
        }
        setIds(prov);
      }
    } else {
      route.replace("/");
    }
  }, [isConnected, route, data, project]);

  return (
    <>
      {isConnected ? (
        <Layout>
          <Text>
            Les projets dont vous êtes promoteurs : {ids} adresse :{project}
          </Text>
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
