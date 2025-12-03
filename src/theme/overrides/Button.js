import palette from "../palette";
import { Poppins } from "../typography";

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            boxShadow: "none",
          },
          fontFamily: `${Poppins} !important`,
        },
        sizeLarge: {
          height: 48,
        },
        contained: {
          background: "#F9F9F9",
          color: palette.common.black,
          fontSize: "18px",
          fontWeight: 700,
          borderRadius: "40px",
          minWidth: "230px",
          minHeight: "50px",
          "@media (max-width: 600px)": {
            fontSize: "16px",
          },
          "&:hover": {
            backgroundColor: "#F9F9F9",
            color: palette.common.black,
          },
          "@media (max-width:600px)": {
            minWidth: "auto",
          },
          "&.Mui-disabled": {
            color: "#999999",
            opacity: 1,
            background: "#E1E1E1",
            boxShadow: "0px",
          },
        },
        outlined: {
          background: "#E9F1FF",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "24px",
          textTransform: "capitalize",
          color: "#3f6dfd",
          textAlign: "left",
          justifyContent: "flex-start",
          "@media (max-width: 600px)": {
            fontSize: "15px",
          },
          "&.Mui-disabled": {
            color: "#999999",
            opacity: 1,
            background: "#E1E1E1",
            boxShadow: "0px",
          },
        },
        containedInherit: {
          background: "linear-gradient(251.38deg, #00F0FF 0%, #123476 99.76%)",
          color: palette.common.white,
          fontSize: 20,
          fontWeight: 700,
          padding: "7px 30px",
          boxShadow: "0px 4px 30px rgba(38, 58, 67, 0.15)",
          borderRadius: "56px !important",
          width: "100%",
          "@media (max-width: 600px)": {
            fontSize: "16px",
          },
          "&.Mui-disabled": {
            color: "#999999",
            opacity: 1,
            background: "#E1E1E1",
            boxShadow: "0px",
          },
        },
        signup: {
          background: palette.primary.light,
          color: "#F9F9F9",
          fontSize: "12.6px",
          fontWeight: 500,
          borderRadius: "36px ",
          textTransform: "capitalize",
          "@media (max-width: 600px)": {
            fontSize: "11px",
          },
          "&.Mui-disabled": {
            color: "#999999",
            opacity: 1,
            background: "#E1E1E1",
            boxShadow: "0px",
          },
        },
        btnlog: {
          background: palette.primary.light,
          color: "red",
          fontSize: "12.6px",
          fontWeight: 500,
          borderRadius: "36px ",
          textTransform: "capitalize",
          "@media (max-width: 600px)": {
            fontSize: "11px",
          },
          "&.Mui-disabled": {
            color: "#999999",
            opacity: 1,
            background: "#E1E1E1",
            boxShadow: "0px",
          },
        },

        outlinedInherit: {
          background: palette.common.white,
          boxShadow: "0px 0px 10px rgba(186, 186, 186, 0.25)",
          borderRadius: "50px",
          fontSize: "18px",
          fontWeight: 400,
          "@media (max-width: 600px)": {
            fontSize: "16px",
          },
          "&:hover": {
            color: palette.common.white,
          },
          "&.Mui-disabled": {
            color: "#999999",
            opacity: 1,
            background: "#E1E1E1",
            boxShadow: "0px",
          },
        },
      },
    },
  };
}
