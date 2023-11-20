import "./App.css";
import { ChakraProvider, Container } from "@chakra-ui/react";

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
        p={0}
      >
        <Header />
        <Form />
        <Footer />
      </Container>
    </ChakraProvider>
  );
}

export default App;
