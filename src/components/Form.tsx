import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

//Chakra UI
import {
  FormControl,
  Input,
  Button,
  VStack,
  Text,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import AlbumContainer from "../views/AlbumContainer";

//Components
import RelatedArtistList from "./RelatedArtistList";

//Enviroment Variables
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const SECRET_CLIENT = import.meta.env.VITE_SECRET_CLIENT;

function Form() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [artistID, setArtistID] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");

  //Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openModal, _setOpenModal] = useState(true);

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
        setArtistName(artistIDFound.data.artists.items[0].name);
        setSearchInput("");
      } catch (error) {
        console.error(error);
      }
    }
  }

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
      {artistName && (
        <HStack
          width={"full"}
          px={20}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Text color={"white"} fontSize={36} fontWeight={"semibold"}>
            Artist:{" "}
            <Text as={"span"} fontWeight={"light"}>
              {artistName}
            </Text>
          </Text>
          <Button
            colorScheme={"whatsapp"}
            size={"md"}
            variant={"outline"}
            onClick={onOpen}
          >
            Related Artists
          </Button>
          {openModal && (
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent minW={"fit-content"} bgColor={"#1A1A1A"}>
                <ModalHeader color={"white"} fontSize={32}>
                  Related Artists
                </ModalHeader>
                <ModalCloseButton color={"white"} />
                <ModalBody>
                  <RelatedArtistList
                    artistID={artistID}
                    accessToken={accessToken}
                    setArtistID={setArtistID}
                    setArtistName={setArtistName}
                    onClose={onClose}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </HStack>
      )}
      <AlbumContainer accessToken={accessToken} artistID={artistID} />
    </VStack>
  );
}

export default Form;
