import { palette } from "../palette";
export const MuiTextField = {
  styleOverrides: {
    root: {
      "& label.Mui-focused": {
        color: palette.primary.dark,
      },

      "& .MuiOutlinedInput-root": {
        backgroundColor: "transparent",

        "& fieldset": {
          borderColor: palette.primary.lightGray,
        },
        "&:hover fieldset": {
          borderColor: palette.primary.lightGray,
        },
        "&.Mui-focused fieldset": {
          borderColor: palette.primary.main,
          borderRadius: "4px",
          outline: "none",
        },
        "&.Mui-disabled fieldset": {
          borderColor: "#E8E9E9",
        },

        "& .MuiOutlinedInput-input": {
          display: "flex",
          alignItems: "center",
          padding: "5px 12px",
          height: "36px",
          background: "rgba(255, 255, 255, 1)",
          color: palette.primary.dark,
        },
        background: "rgba(255,255,255,0.1)",
        color: palette.primary.dark,
        fontSize: "13px",
        fontFamily: "Poppins-Regular",
        borderRadius: "4px",

        "& ::placeholder": {
          color: "#666666",
          fontFamily: "Poppins-Regular",
          fontSize: "12px",
          textAlign: "left",
          opacity: 0.8,
        },
      },

      "& .MuiFormHelperText-root": {
        fontSize: "12px",
        backgroundColor: "transparent",
      },
      "&  .MuiFormHelperText-root.Mui-error": {
        backgroundColor: "transparent",
        margin: 0,
        paddingLeft: 10,
      },
      // input: {
      //   "&.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":
      //     {
      //       "-webkit-text-fill-color": "rgba(128, 132, 136, 1) !important",
      //     },
      // },
     
    },
  },
};
