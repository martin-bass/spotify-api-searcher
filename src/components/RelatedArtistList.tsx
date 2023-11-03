import {
  Grid,
  GridItem,
  Stack,
  Text,
  Image,
  Button,
  Box,
} from "@chakra-ui/react";
import { RelatedArtist } from "../types/types";
import axios, { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";

type Props = {
  accessToken: string;
  artistID: string;
  setArtistID: any;
  setArtistName: any;
  onClose: () => void | any;
};

function RelatedArtistList({
  accessToken,
  artistID,
  setArtistID,
  setArtistName,
  onClose,
}: Props) {
  const [relatedArtist, setrelatedArtist] = useState<RelatedArtist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //Obtener artistas relacionados
  useEffect(() => {
    if (artistID) {
      const albumParameters: AxiosRequestConfig = {
        method: "GET",
        url: `https://api.spotify.com/v1/artists/${artistID}/related-artists`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios(albumParameters)
        .then((response) => {
          setrelatedArtist(response.data.artists);
          setLoading(!loading);
        })
        .catch((error) => {
          console.error(error);
          setLoading(!loading);
        });
    }
  }, [artistID, accessToken]);

  async function searchRelatedArtist(id: string, name: string) {
    await setArtistID(id);
    await setArtistName(name);
    onClose();
  }

  return (
    <Stack>
      {!loading ? (
        <Text color={"white"}>Loading...</Text>
      ) : (
        <Grid
          p={4}
          minH={"100vh"}
          width={"full"}
          templateColumns="repeat(5, 1fr)"
          gap={8}
        >
          {relatedArtist.map((artist: RelatedArtist) => (
            <GridItem key={artist.id} m={"auto"}>
              <Image
                src={artist.images[1].url}
                boxSize={48}
                borderRadius={"full"}
                fit={"cover"}
              />
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  onClick={() => searchRelatedArtist(artist.id, artist.name)}
                  variant={"unstyled"}
                  color={"white"}
                  alignSelf={"center"}
                  _hover={{ color: "green.400" }}
                >
                  {artist.name}
                </Button>
              </Box>
            </GridItem>
          ))}
        </Grid>
      )}
    </Stack>
  );
}

export default RelatedArtistList;
