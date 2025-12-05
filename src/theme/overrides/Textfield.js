import palette from "../palette";

export default function TextField() {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: palette.primary.dark,
          },

          "& .MuiOutlinedInput-root": {
            fontSize: "13px",
            fontFamily: "Roboto-Regular",
            color: palette.primary.dark,
            backgroundColor: palette.primary.white,
            borderRadius: "4px",

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
              borderColor: palette.primary.lightGray,
            },

            "& .MuiOutlinedInput-input": {
              display: "flex",
              alignItems: "center",
              padding: "0px 16px !important",
              height: "36px",
              background: "rgba(255, 255, 255, 1)",
              color: palette.primary.dark,
              // overflow: "hidden",
              textOverflow: "ellipsis",
            },

            "& ::placeholder": {
              color: palette.primary.darkgray,
              fontFamily: "Roboto-Regular",
              fontSize: "13px",
              textAlign: "left",
              opacity: 0.8,
              "@media (max-width: 600px)": {
                fontSize: "11px",
              },
            },
          },

          "& .MuiInputBase-multiline": {
            padding: "12px 0",
          },

          "& .MuiFormHelperText-root": {
            fontSize: "13px",
            backgroundColor: "transparent",
          },
          "&  .MuiFormHelperText-root.Mui-error": {
            backgroundColor: "transparent",
            margin: 0,
            paddingLeft: 10,
          },
          input: {
            "&.Mui-disabled": {
              WebkitTextFillColor: `${palette.primary.gray} !important`,
            },
          },
        },
      },
    },
  };
}
