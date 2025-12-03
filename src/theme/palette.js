// SETUP COLORS
const GREY = {
  0: "#BCBCBC",
  100: "rgba(19, 19, 19, 0.31)",
};

// ✅ FIX 1: Yahan sirf Solid Hex Codes rakhein
const PRIMARY = {
  lighter: "#FC5A5A", // Gradient ka start color le liya (Solid)
  light: "#4D64C0",   // Gradient ka start color le liya (Solid)
  main: "#2065D1",
  dark: "#17181A",
};

// ✅ FIX 2: Gradients ko alag object bana kar rakhein
const GRADIENTS = {
  primary: "linear-gradient(251.38deg, #4D64C0 10%, #060B1F 99.76%)",
  warm: "linear-gradient(180deg, #FC5A5A 0%, #C2F530 100%)",
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
  
  // ✅ FIX 3: Custom gradients ko yahan inject karein
  gradients: GRADIENTS, 
};

export default palette;