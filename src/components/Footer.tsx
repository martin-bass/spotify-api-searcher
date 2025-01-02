import {
  Box,
  Container,
  HStack,
  Stack,
  Text,
  IconButton,
  Link,
  Tooltip,
} from "@chakra-ui/react";

//React Icons
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function Footer() {
  const anioActual: number = new Date().getFullYear();
  return (
    <Box color="whiteAlpha.600" w={"full"}>
      <Container
        as={Stack}
        maxW={"7xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Box w={"auto"}>
          <Text>© {anioActual} Developed by Martín Lopez</Text>
        </Box>
        <HStack spacing={3}>
          <Link href="https://github.com/martin-bass" isExternal>
            <Tooltip label="GitHub" bg="gray.300" color="black">
              <IconButton
                variant="unstyled"
                size={"lg"}
                aria-label="github"
                icon={<BsGithub size="28px" />}
                color="white"
              />
            </Tooltip>
          </Link>
          <Link
            href="https://www.linkedin.com/in/martinariellopez/"
            isExternal
          >
            <Tooltip label="Linkedin" bg="gray.300" color="black">
              <IconButton
                variant="unstyled"
                size={"lg"}
                aria-label="github"
                icon={<BsLinkedin size="28px" />}
                color="white"
              />
            </Tooltip>
          </Link>
        </HStack>
      </Container>
    </Box>
  );
}
