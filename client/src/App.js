import { Wrapper } from "./components/Wrapper";
import Routes from "./Routes";
// import {GunProvider} from "use-gun"

const App = ({ children }) => {
  // const peers = ["http://localhost:8080/gun"];
  return (
    // <GunProvider peerUrls={peers}>
      <Wrapper>
        <Routes />
      </Wrapper>
    // {/* </GunProvider> */}
  );
};

export default App;
