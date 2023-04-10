import { Box, Flex, Text } from "@chakra-ui/react";

const WhatIsCarb0 = () => {
  return (
    <Flex width={"100%"}>
      <Text marginTop="1rem" fontSize={"3xl"}>
        Carb-0 c'est quoi?
      </Text>
      <Box backgroundColor={"whiteAlpha.900"}>
        <Flex flexWrap="wrap" flexDirection={"column"} alignContent="center">
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
          <Text>TEST</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default WhatIsCarb0;
