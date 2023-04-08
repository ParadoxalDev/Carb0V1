import { Flex, Link, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      height={"10vh"}
      width="100%"
      p={"2rem"}
    >
      <Text fontWeight={"bold"}>NOTRE LOGO</Text>
      <Flex width={"40%"} justifyContent="space-between" alignItems={"center"}>
        <Text>
          <Link href="/">Home</Link>
        </Text>
        <Text>
          <Link href="/Projects">Projets suivi</Link>
        </Text>
        <Text>
          <Link href="/MyProject">Mes projets</Link>
        </Text>
      </Flex>
      <ConnectButton
        label="Connectez votre Wallet"
        chainStatus="full"
        showBalance={false}
      />
    </Flex>
  );
};

export default Header;
