import "./App.css";
import { ChakraProvider, Container, Text } from "@chakra-ui/react";

//Components
import Form from "./components/Form";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <ChakraProvider>
      <Container
        minH={"100vh"}
        bgColor={"black"}
        centerContent
        overflowX="hidden"
        maxW={"100%"}
        //w={'full'}
        p={0}
      >
        <Header />
        <Text color={"white"}>
          Discover the discography of your favorite artists
        </Text>
        <Form />
        <Footer />
      </Container>
    </ChakraProvider>
  );
}

export default App;
