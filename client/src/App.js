import { Wrapper } from "./components/Wrapper";
import Routes from "./Routes";
import { Box } from "@chakra-ui/react";

const App = ({ children }) => {
  return (
    <Box>
      <Wrapper>
        <Routes />
      </Wrapper>
    </Box>
  );
};

export default App;
