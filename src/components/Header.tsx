import { Stack, Image, Text, Link } from "@chakra-ui/react";

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
        <Text color={"white"} fontSize={36} fontWeight={"bold"}>
          Spotify Album Explorer
        </Text>
      </Stack>
    </Link>
  );
}

export default Header;
