import {
  Box,
  Heading,
  Center,
  Flex,
  AspectRatio,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { storage } from "../firebase";
import React, { useEffect, useState } from "react";
import { NoThreat, NotifyAuthorities } from "../components/Modals";

export default function Vid(props) {
  const vidId = props.match.params.id;
  const [urlString, setUrlString] = useState("");

  const gsReference = storage.refFromURL(
    `gs://aegis-5fd8e.appspot.com/${vidId}.webm`
  );
  gsReference.getDownloadURL().then((url) => setUrlString(url));

  useEffect(() => {}, [urlString]);
  const {
    isOpen: isNoThreatOpen,
    onOpen: onNoThreatOpen,
    onClose: onNoThreatClose,
  } = useDisclosure();

  const {
    isOpen: isNotifyAuthoritiesOpen,
    onOpen: onNotifyAuthoritiesOpen,
    onClose: onNotifyAuthoritiesClose,
  } = useDisclosure();

  return (
    <>
      <Box>
        <Center>
          <Flex direction="column">
            <Heading pb={10}>Review Footage</Heading>
            <AspectRatio w="560px" ratio={4 / 3}>
              <iframe
                title="potential threat video"
                src={urlString}
                allowFullScreen
              />
            </AspectRatio>
            <Flex direction="column" my={6}>
              <Button
                my={3}
                py={8}
                colorScheme="green"
                size="lg"
                fontSize="2xl"
                onClick={onNoThreatOpen}
              >
                No Threat
              </Button>
              <Button
                my={3}
                py={8}
                colorScheme="red"
                size="lg"
                fontSize="2xl"
                onClick={onNotifyAuthoritiesOpen}
              >
                Notify Authorities
              </Button>
            </Flex>
          </Flex>
        </Center>
      </Box>
      <NoThreat isOpen={isNoThreatOpen} onClose={onNoThreatClose} />
      <NotifyAuthorities
        isOpen={isNotifyAuthoritiesOpen}
        onClose={onNotifyAuthoritiesClose}
      />
    </>
  );
}
