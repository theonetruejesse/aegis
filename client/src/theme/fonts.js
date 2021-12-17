import { Global } from "@emotion/react";
import React from "react";

export const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: "Sorts Mill Goudy";
        src: url("/fonts/SortsMillGoudy.ttf")
        font-style: normal;
        font-display: swap;
      } 
      /* latin */
      @font-face {
        font-family: "Futura Pt";
        src: url("/fonts/FuturaPt/book.otf");
        font-style: normal;
        font-weight: 400;
        font-display: swap;
      }
      /* latin */
      @font-face {
        font-family: "Futura Pt";
        src: url("/fonts/FuturaPt/medium.otf");
        font-style: bold;
        font-weight: 700;
        font-display: swap;
      }
      `}
  />
);

export const fonts = {
  heading: "Sorts Mill Goudy",
  body: "Futura Pt",
};
