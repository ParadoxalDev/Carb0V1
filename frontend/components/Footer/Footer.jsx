import { Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const Footer = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems="center"
      width={"100%"}
      height="10vh"
      p={"2rem"}
    >
      <Text>
        &copy;{" "}
        <Link as={NextLink} href="https://github.com/ParadoxalDev">
          ParadoxalDev Github
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
