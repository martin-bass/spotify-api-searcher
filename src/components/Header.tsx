import { Stack, Image, Text } from "@chakra-ui/react";

//Logo
import Logo from "../assets/logoSpotify.png";

function Header() {
  return (
    <Stack
      h={20}
      display={"flex"}
      justify={"center"}
      flexDir={"row"}
      alignItems={"center"}
      spacing={4}
    >
      <Image src={Logo} boxSize={10} />
      <Text color={"white"} fontSize={36} fontWeight={"bold"}>
        Spotify API Searcher
      </Text>
    </Stack>
  );
}

export default Header;
