import { useState } from "react";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Image,
  useDisclosure,
  HStack,
  VStack,
  Link,
  Box,
} from "@chakra-ui/react";

//Components
import RelatedArtistList from "./RelatedArtistList";

//Types
import { ArtistSelected } from "../types/types";

type Props = {
  artistInfo: ArtistSelected;
  accessToken: string;
  artistID: string;
  setArtistID: any;
};

function ArtistCard({ artistInfo, accessToken, artistID, setArtistID }: Props) {
  //Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openModal, _setOpenModal] = useState(true);

  return (
    <HStack
      bgColor={"black"}
      w={"800px"}
      justifyContent={"space-between"}
      rounded={5}
      mt={12}
    >
      <VStack w={"full"} p={2}>
        <VStack w={"full"} color={"white"}>
          <Text
            fontSize={"4xl"}
            fontWeight={"semibold"}
            mb={5}
            lineHeight={"normal"}
          >
            {artistInfo.name}
          </Text>
          <VStack w={"full"} alignItems={"start"} spacing={4} fontSize={14}>
            <Text fontWeight={"bold"}>
              {" "}
              Total Followers:{" "}
              <Text as={"span"} fontWeight={"normal"}>
                {artistInfo.followers.total.toLocaleString("es-ES", {
                  style: "decimal",
                })}
              </Text>
            </Text>
            <Text fontWeight={"bold"}>
              {" "}
              Genres:{" "}
              {artistInfo.genres.map((genere: string) => (
                <Text key={genere} as={"span"} fontWeight={"normal"}>
                  {genere} -{" "}
                </Text>
              ))}
            </Text>
            <Link
              href={artistInfo.uri}
              style={{ textDecoration: "none" }}
              _hover={{ color: "#9AE6B4" }}
            >
              <Text fontWeight={"black"}>Play in Spotify</Text>
            </Link>
          </VStack>
          <Button
            colorScheme={"whatsapp"}
            size={"md"}
            variant={"outline"}
            onClick={onOpen}
            mt={5}
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
                    onClose={onClose}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </VStack>
      </VStack>
      <Box>
        <Image src={artistInfo.images[0].url} fit={"cover"} roundedRight={5} />
      </Box>
    </HStack>
  );
}

export default ArtistCard;
