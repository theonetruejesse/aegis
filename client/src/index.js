import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import theme from "./theme";
import { Fonts } from "./theme/fonts";
import React from "react";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <Fonts />
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
