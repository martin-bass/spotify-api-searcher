import { useState, useEffect } from "react";

import {
  Grid,
  GridItem,
  Stack,
  Image,
  Button,
  Box,
  Spinner,
} from "@chakra-ui/react";

//Types
import { RelatedArtist } from "../types/types";

//Axios
import axios, { AxiosRequestConfig } from "axios";

type Props = {
  accessToken: string;
  artistID: string;
  setArtistID: any;
  onClose: () => void | any;
};

function RelatedArtistList({
  accessToken,
  artistID,
  setArtistID,
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

  async function searchRelatedArtist(id: string) {
    await setArtistID(id);
    onClose();
  }

  return (
    <Stack>
      {!loading ? (
        <Spinner color={"white"} m={"auto"} p={8} />
      ) : (
        <Grid
          p={4}
          minH={"100vh"}
          width={"full"}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
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
                  onClick={() => searchRelatedArtist(artist.id)}
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
