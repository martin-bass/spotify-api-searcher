import { Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import ArtistCard from "../components/Card";
import { Albums } from "../types/types";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

type Props = {
  accessToken: string;
  artistID: string;
};

function AlbumContainer({ accessToken, artistID }: Props) {
  const [albums, setAlbums] = useState<Albums[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Realizar la solicitud de álbumes cuando artistID cambie
  useEffect(() => {
    if (artistID) {
      // Obtener álbumes del artista
      const albumParameters: AxiosRequestConfig = {
        method: "GET",
        url: `https://api.spotify.com/v1/artists/${artistID}/albums?album_type=album&limit=50`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios(albumParameters)
        .then((response) => {
          if (response.data.items.length > 0) {
            setAlbums(response.data.items);
            setLoading(false);
          } else {
            setLoading(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [artistID, accessToken]);

  return (
    <Stack w={"full"} mt={12}>
      {artistID && (
        <Text fontSize={48} fontWeight={"bold"} ml={20} color={"white"}>
          Albums
        </Text>
      )}
      {loading ? (
        <Stack
          p={18}
          minH={"100vh"}
          width={"full"}
          color={"white"}
          textAlign={"center"}
        >
          <Text fontSize={48} fontWeight={"medium"}>
            Ooops!
          </Text>
          <Text>
            It seems that there is no official discography for this artist...
          </Text>
        </Stack>
      ) : (
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
      )}
    </Stack>
  );
}

export default AlbumContainer;
