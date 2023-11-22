import { useEffect, useState } from "react";

import {
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Button,
  Link,
  Box,
  Spinner,
} from "@chakra-ui/react";

//Axios
import axios, { AxiosRequestConfig } from "axios";

//Types
import { Album } from "../types/types";

type Props = {
  accessToken: string;
  AlbumID: string;
  AlbumCoverImg: string;
  OpenInSpotify: string;
  Album?: Album;
};

function AlbumTRacks({
  accessToken,
  AlbumID,
  AlbumCoverImg,
  OpenInSpotify,
}: Props) {
  const [tracks, setTracks] = useState<Album[]>([]);
  const [loadingTracks, setLoadingTracks] = useState<boolean>(false);

  useEffect(() => {
    const getTracks = (albumChoiseID: string) => {
      const albumParameters: AxiosRequestConfig = {
        method: "GET",
        url: `https://api.spotify.com/v1/albums/${albumChoiseID}/tracks`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios(albumParameters)
        .then((response) => {
          setTracks(response.data.items);
          setLoadingTracks(true); // Actualiza el estado con los tracks
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getTracks(AlbumID);
  }, []);

  function milisegundosAMinutosSegundos(milisegundos: number) {
    var fecha = new Date(milisegundos);
    var minutos = fecha.getUTCMinutes();
    var segundos = fecha.getUTCSeconds();
    return minutos + ":" + (segundos < 10 ? "0" : "") + segundos;
  }

  return (
    <VStack>
      {!loadingTracks ? (
        <Spinner color={"white"} m={12} />
      ) : (
        <Stack
          spacing={12}
          display={"flex"}
          alignItems={"start"}
          mb={8}
          direction={{ base: "column", lg: "row" }}
        >
          <Box w={"full"} mt={10}>
            <Image
              src={AlbumCoverImg}
              boxSize={{ base: "300px", sm: "400px", md: "500px" }}
              rounded={5}
              m={"auto"}
            />
          </Box>
          <Stack w={{ base: "340px", md: "auto" }}>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr fontSize={{ base: "smaller", sm: "small" }}>
                    <Th color={"green.400"} textAlign={"center"}>
                      Track
                    </Th>
                    <Th color={"green.400"}>Song</Th>
                    <Th color={"green.400"} textAlign={"center"}>
                      Duration
                    </Th>
                  </Tr>
                </Thead>
                <Tbody color={"white"}>
                  {tracks.map((track) => (
                    <Tr
                      key={track.id}
                      fontSize={{ base: "smaller", sm: "small" }}
                    >
                      <Td py={2} textAlign={"center"}>
                        {track.track_number}
                      </Td>
                      <Td py={2}>{track.name}</Td>
                      <Td py={2} textAlign={"center"}>
                        {milisegundosAMinutosSegundos(track.duration_ms)}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
      )}

      <Link href={OpenInSpotify} isExternal>
        <Button colorScheme="green" mb={4}>
          Play in Spotify
        </Button>
      </Link>
    </VStack>
  );
}

export default AlbumTRacks;
