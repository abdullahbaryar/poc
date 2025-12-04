// SETUP COLORS
const GREY = {
  0: "#BCBCBC",
  100: "rgba(19, 19, 19, 0.31)",
};

const PRIMARY = {
  lighter: "linear-gradient(180deg, #FC5A5A 0%, #C2F530 100%)",
  light: "linear-gradient(251.38deg, #4D64C0 10%, #060B1F 99.76%)",
  main: "#2065D1",
  dark: "#17181A",
};

const SECONDARY = {
  lighter: "#BCBCBC",
  light: "#060b1f",
  main: "#000",
  dark: "#013eb7",
};

const INFO = {
  main: "#1890FF",
};



const WARNING = {
  main: "#FFC107",
};

const ERROR = {
  main: "#FF4842",
};

const palette = {
  common: { black: "#000000", white: "#fff" },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  
  
};

export default palette;
