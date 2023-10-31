import { Grid, GridItem, Stack } from "@chakra-ui/react";
//Card
import ArtistCard from "../components/Card";
import { Albums } from "../types/types";

type Props = {
  albums: Albums[];
  accessToken: string;
};

function AlbumContainer({ albums, accessToken }: Props) {
  
  return (
    <Stack w={"full"}>      
      <Grid
        p={4}
        minH={"100vh"}
        width={"full"}
        templateColumns="repeat(3, 1fr)"
        gap={12}
      >
        {albums.map((album) => (
          <GridItem key={album.id}>
            <ArtistCard album={album} accessToken={accessToken} />
          </GridItem>
        ))}
      </Grid>
    </Stack>
  );
}

export default AlbumContainer;
