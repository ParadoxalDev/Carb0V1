import { Box, Flex } from "@chakra-ui/react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <Box backgroundColor={"green.200"}>
      <Flex
        justifyContent={"space-between"}
        alignItems="center"
        direction={"column"}
        height="100vh"
      >
        <Header />
        {children}
        <Footer />
      </Flex>
    </Box>
  );
};

export default Layout;
