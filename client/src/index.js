import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider, ColorModeProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import React from "react";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <AuthProvider>
          <Router>
            <App />
          </Router>
        </AuthProvider>
      </ColorModeProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// ReactDOM.render(
//   <React.StrictMode>
//     <Box>hi</Box>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
