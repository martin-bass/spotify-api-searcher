import { useEffect, useState } from "react";

import {
  Image,
  Card,
  CardBody,
  Stack,
  VStack,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
} from "@chakra-ui/react";

//Styles
import "../styles/Card.css";

//Types
import { Albums } from "../types/types";

//Components
import AlbumTracks from "./AlbumTracks";

type Props = {
  album: Albums;
  accessToken: string;
};

function ArtistCard({ album, accessToken }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openModal, _setOpenModal] = useState(true);
  const [albumsLoading, setAlbumsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (album) {
      setAlbumsLoading(true);
    }
  }, [album, accessToken]);

  return (
    <Stack>
      <Card className="card-container" m={"auto"} p={2}>
        <CardBody className="card">
          <Stack className="img-content">
            {!albumsLoading ? (
              <Spinner size={"lg"} />
            ) : (
              <Image src={album.images[1].url} alt="Image" />
            )}
          </Stack>
          <VStack
            className="content"
            color={"white"}
            textShadow={"black 0.1em 0.1em 0.2em"}
          >
            <Text className="heading">{album.name}</Text>
            <Text textAlign={"left"} w={"full"} fontWeight={"black"}>
              Year:{" "}
              <Text as={"span"} fontWeight={"normal"}>
                {album.release_date.substr(0, 4)}
              </Text>
            </Text>
            <Text textAlign={"left"} w={"full"} fontWeight={"black"}>
              Tracks:{" "}
              <Text as={"span"} fontWeight={"normal"}>
                {album.total_tracks}
              </Text>
            </Text>
          </VStack>
        </CardBody>
        <Button
          colorScheme="green"
          size="xs"
          onClick={onOpen}
          cursor={"pointer"}
          w={20}
          mx={"auto"}
          mt={1}
        >
          See tracks
        </Button>
        {openModal && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent minW={"fit-content"} bgColor={"#1A1A1A"}>
              <ModalHeader color={"white"} fontSize={{ base: 14, lg: 24 }}>
                {album.name}{" "}
                <Text as={"span"}>({album.release_date.substr(0, 4)})</Text>
              </ModalHeader>
              <ModalCloseButton color={"white"} />
              <ModalBody>
                <AlbumTracks
                  accessToken={accessToken}
                  AlbumID={album.id}
                  AlbumCoverImg={album.images[0].url}
                  OpenInSpotify={album.external_urls.spotify}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </Card>
    </Stack>
  );
}

export default ArtistCard;
