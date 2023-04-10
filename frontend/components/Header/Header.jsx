import { Flex, Box, Link, Spacer, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import NextLink from "next/link";

export default function Header() {
  return (
    <Flex
      as="header"
      p="4"
      bg="teal.500"
      width={"100%"}
      justifyContent="space-between"
    >
      <Box>
        <Text>Mon Logo</Text>
      </Box>

      <Flex justifyContent="space-between" width={"60%"}>
        <NextLink href="/home" passHref>
          <Link px="4" color="white">
            Home
          </Link>
        </NextLink>
        <NextLink href="/projets-realise" passHref>
          <Link px="4" color="white">
            Projets réalisé
          </Link>
        </NextLink>
        <NextLink href="/mes-projets" passHref>
          <Link px="4" color="white">
            Mes projets
          </Link>
        </NextLink>
      </Flex>

      <Box>
        <ConnectButton />
      </Box>
    </Flex>
  );
}
