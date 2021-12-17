import { Box, Heading, Link } from "@chakra-ui/react";
// import { ReactComponent as Logo } from "../assets/full_logo.svg";
// import { IconButton } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";

// todo -> add more info about how no threat + intgerate view past vids
export default function Home() {
  return (
    <Wrapper variant="small">
      <Heading py={3} fontSize="42px">
        Welcome to Project Aegis!
      </Heading>
      <Box fontSize="24px" py={2}>
        We're a team of high school students developing software to combat
        on-campus threats. We utilize ML + serverless tech to quickly scale &
        notify authorities—automatically.
      </Box>
      <Box fontSize="24px" py={2}>
        For more information, click{" "}
        <Link
          color="primary.130"
          href="https://amplified-scion-5cb.notion.site/Project-Aegis-bc46794c5d1647fcb038c4d27233e7bb"
        >
          <b>here</b>
        </Link>
        .
      </Box>
    </Wrapper>
  );
}
