import {
  Image,
  HStack,
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
} from "@chakra-ui/react";

//Axios
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
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
          setTracks(response.data.items); // Actualiza el estado con los tracks
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
      <HStack spacing={12} display={"flex"} alignItems={"start"} mb={8}>
        <Box w={"full"} mt={10}>
          <Image src={AlbumCoverImg} boxSize={"md"} rounded={5} />
        </Box>
        <Stack w={"full"}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th
                    fontSize={"medium"}
                    color={"green.400"}
                    textAlign={"center"}
                  >
                    Track
                  </Th>
                  <Th fontSize={"medium"} color={"green.400"}>
                    Song
                  </Th>
                  <Th
                    fontSize={"medium"}
                    color={"green.400"}
                    textAlign={"center"}
                  >
                    Duration
                  </Th>
                </Tr>
              </Thead>
              <Tbody color={"white"}>
                {tracks.map((track) => (
                  <Tr key={track.id} fontSize={"small"}>
                    <Td py={2} textAlign={"center"} pl={0}>
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
      </HStack>
      <Link href={OpenInSpotify} isExternal>
        <Button colorScheme="green">Play in Spotify</Button>
      </Link>
    </VStack>
  );
}

export default AlbumTRacks;
