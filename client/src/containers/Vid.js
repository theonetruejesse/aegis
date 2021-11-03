import { Box, Heading, Center, Flex } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";

export default function Vid(props) {
  const vidId = props.match.params.id;
  const urlString =
    "https://storage.googleapis.com/aegis-5fd8e.appspot.com/" + vidId;
  return (
    <Wrapper>
      <Center>
        <Flex direction="column">
          <Heading pb={10}>Check Video</Heading>
          <iframe
            title="potential threat video"
            src={urlString}
            allowFullScreen
          />
        </Flex>
      </Center>
    </Wrapper>
  );
}
