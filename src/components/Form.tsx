import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

//Chakra UI
import { FormControl, Input, Button, VStack } from "@chakra-ui/react";

//Components
import ArtistCard from "./ArtistCard";
import AlbumContainer from "../views/AlbumContainer";

//types
import { ArtistSelected } from "../types/types";

//Enviroment Variables
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const SECRET_CLIENT = import.meta.env.VITE_SECRET_CLIENT;

function Form() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [artistID, setArtistID] = useState<string>("");
  const [artistInfo, setArtistInfo] = useState<ArtistSelected>();

  // Obtener el token de acceso de la API de Spotify
  useEffect(() => {
    const authParameters: AxiosRequestConfig = {
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${SECRET_CLIENT}`,
    };

    axios(authParameters)
      .then(function (response) {
        setAccessToken(response.data.access_token);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [artistID]);

  // Obtener el ID del artista
  async function search(e: React.FormEvent) {
    if (searchInput) {
      const artistParameters: AxiosRequestConfig = {
        method: "GET",
        url: `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      try {
        e.preventDefault();
        const artistIDFound = await axios(artistParameters);
        setArtistID(artistIDFound.data.artists.items[0].id);
        setSearchInput("");
      } catch (error) {
        console.error(error);
      }
    }
  }

  //Obtener datos del artista
  useEffect(() => {
    if (artistID) {
      const albumParameters: AxiosRequestConfig = {
        method: "GET",
        url: `https://api.spotify.com/v1/artists/${artistID}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios(albumParameters)
        .then((response) => {
          setArtistInfo(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [artistID, accessToken]);

  return (
    <VStack bgColor={"#1A1A1A"} width={"full"} p={6}>
      <FormControl
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        mb={5}
      >
        <Input
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search your artist..."
          w={80}
          bgColor={"gray.800"}
          color={"white"}
          required
          value={searchInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search(e);
            }
          }}
        />
      </FormControl>
      <Button
        bgColor="#358438"
        type="submit"
        onClick={search}
        color={"white"}
        _hover={{ bgColor: "#2d6830" }}
      >
        Search
      </Button>
      {artistInfo && (
        <ArtistCard
          artistInfo={artistInfo}
          artistID={artistID}
          accessToken={accessToken}
          setArtistID={setArtistID}
        />
      )}
      <AlbumContainer accessToken={accessToken} artistID={artistID} />
    </VStack>
  );
}

export default Form;
