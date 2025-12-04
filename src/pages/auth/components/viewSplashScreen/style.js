import palette from "../../../../theme/palette";


export const mainText = {
  width: { xs: "80%", sm: "70%" },
  m: "0 auto",
  zIndex: 999,
  position: "relative",
};

export const wrapper = {
  background: palette.common.black,
  minHeight: { xs: "35vh", md: "100vh" },
  height:"100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
};

export const imgBox = {
  position: "absolute",
  top: 30,
  display: { xs: "none", md: "block" },
};

export const weight = { fontWeight: 700 };
