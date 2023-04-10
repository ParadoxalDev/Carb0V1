import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import CreateNewProject from "./CreateNewProject";
import WhatIsCarb0 from "./WhatIsCarb0";

const Intro = ({ projectAddress }) => {
  return (
    <Box width={"80%"} margin={"5px"} border="2px">
      <Flex flexDirection={"column"} width={"100%"}>
        <Box>
          <Heading as={"h1"} size="3xl">
            CARB-0 : Follow the carbone
          </Heading>
        </Box>
        <WhatIsCarb0 projectAddress={projectAddress} />
      </Flex>
      <Flex
        justifyContent={"center"}
        marginTop="3rem"
        alignItems={"center"}
      ></Flex>

      <CreateNewProject projectAddress={projectAddress} />
    </Box>
  );
};

export default Intro;
