// theme/index.js
import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import { styles } from "./styles";
import { colors } from "./colors";
import { fonts } from "./fonts";
// import { Button } from "./components/Button";

// // Foundational style overrides
// import borders from "./foundations/borders"

// // Component style overrides
// import Button from "./components/button"

const overrides = {
  styles,
  colors,
  fonts,
  // components: {
  //   Button,
  // },
};

export default extendTheme(overrides);
