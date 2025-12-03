import { createTheme } from "@mui/material/styles";
import { typography } from "./typography";
import { palette } from "./palette";
import { overrides } from "./overrides";

const lightTheme = createTheme({
  palette,
  typography: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    ...typography,
  },
  components: {
    ...overrides,
  },
});

export default lightTheme;
