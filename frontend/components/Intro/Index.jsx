import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import CreateNewProject from "./CreateNewProject";
import WhatIsCarb0 from "./WhatIsCarb0";

const Intro = () => {
  return (
    <Box width={"80%"} margin={"5px"} border="2px">
      <Flex flexDirection={"column"} width={"100%"}>
        <Box>
          <Heading as={"h1"} size="3xl">
            CARB-0 : Follow the carbone
          </Heading>
        </Box>
        <WhatIsCarb0 />
      </Flex>
      <Flex
        justifyContent={"center"}
        marginTop="3rem"
        alignItems={"center"}
      ></Flex>
      <CreateNewProject />
    </Box>
  );
};

export default Intro;
