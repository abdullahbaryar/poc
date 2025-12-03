import palette from "../palette";

export default function TextField() {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "grey",
          },

          "& .MuiOutlinedInput-root": {
            backgroundColor: palette.common.white,

            "& fieldset": {
              color: "#03101B",
              padding: "0px 14px",
            },
            "&:hover fieldset": {
              borderColor: palette.secondary.dark,
            },
            "&.Mui-focused fieldset": {
              borderColor: palette.secondary.dark,
            },
            "@media (max-width: 500px)": {
              "& .MuiOutlinedInput-input": {
                padding: "12.5px 0px 12.5px 18px",
              },
            },
            color: "black",
            fontSize: "14px",
            borderRadius: "10px",
            "& ::placeholder": {
              color: "#03101B",
              fontWeight: 300,
              fontSize: "14px",
              textAlign: "left",
              opacity: 0.8,
              "@media (max-width: 600px)": {
                fontSize: "12px",
              },
            },
          },

          "& .MuiFormHelperText-root": {
            fontWeight: 500,
            fontSize: "12px",
            backgroundColor: "transparent",
          },
          "&  .MuiFormHelperText-root.Mui-error": {
            backgroundColor: "transparent",
            margin: 0,
            paddingLeft: 10,
          },
          
        },
      },
    },
  };
}
