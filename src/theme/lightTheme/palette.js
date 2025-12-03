import { red, blueGrey, grey } from "@mui/material/colors";

const blue = "#0575E6";
const white = "#ffff";
const black = "#000";
const darkBlack = "rgba(0, 0, 0, 1)";
const gray = "rgba(116, 121, 130, 1)";
const lightGray = "rgba(233, 236, 239, 1)";
const tableRowColor = "rgba(239, 241, 247, 1)";

export const palette = {
  black,
  white,
  blue,
  gray,
  darkBlack,

  primary: {
    main: blue,
    dark: darkBlack,
    white,
    black,
    gray,
    lightGray,
    tableRowColor,
  },
  error: {
    contrastText: white,
    dark: red[900],
    main: red[600],
    light: red[400],
  },
  text: {
    primary: black,
    secondary: white,
    link: blue[600],
    darkBlack,
  },
  link: blue[800],
  icon: blueGrey[600],
  background: {
    default: white,
    paper: white,
  },
  divider: grey[200],
};
