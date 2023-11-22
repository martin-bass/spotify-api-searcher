import { Stack, Image, Text, Link, VStack } from "@chakra-ui/react";

//Logo
import Logo from "../assets/logoSpotify.png";

function Header() {
  return (
    <Link href="/" style={{ textDecoration: "none" }}>
      <Stack
        h={20}
        display={"flex"}
        justify={"center"}
        flexDir={"row"}
        alignItems={"center"}
        spacing={4}
      >
        <Image src={Logo} boxSize={10} />
        <VStack>
          <Text
            color={"white"}
            fontSize={{ base: 24, sm: 36 }}
            fontWeight={"bold"}
          >
            Spotify Album Explorer
          </Text>
          <Text color={"white"} fontSize={{ base: 12, sm: 16 }} mb={3}>
            Discover the discography of your favorite artists
          </Text>
        </VStack>
      </Stack>
    </Link>
  );
}

export default Header;
