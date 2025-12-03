import palette from "./palette";

export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ xs, sm, md, lg }) {
  return {
    "@media (min-width:0px)": {
      fontSize: pxToRem(xs),
    },
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}
export function responsiveLineHeights({ xs, sm, md, lg }) {
  return {
    "@media (min-width:0px)": {
      lineHeight: pxToRem(xs),
    },
    "@media (min-width:600px)": {
      lineHeight: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      lineHeight: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      lineHeight: pxToRem(lg),
    },
  };
}

export const Poppins = "PoppinsRegular";

const typography = {
  fontFamily: Poppins,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,

  h1: {
    fontFamily: "PoppinsBold",
    fontWeight: 700,
    lineHeight: "45px",
    color: palette.common.black,
    textAlign: "center",
    fontSize: pxToRem(30),
    ...responsiveFontSizes({ xs: 22, sm: 30, md: 30, lg: 30 }),
    "@media (max-width: 600px)": {
      lineHeight: "30px",
    },
  },
  h2: {
    fontFamily: Poppins,
    fontWeight: 600,
    lineHeight: "30px",
    textAlign: "center",
    color: palette.primary.dark,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ xs: 22, sm: 40, md: 40, lg: 40 }),
    "@media (max-width:600px)": {
      lineHeight: "32px",
    },
  },
  h3: {
    fontFamily: Poppins,
    fontWeight: 500,
    lineHeight: 1.5,
    color: palette.common.white,
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ sm: 15, md: 15, lg: 15 }),
  },
  h4: {
    fontFamily: "Poppins-ExtraBold",
    fontWeight: 700,
    lineHeight: 1.5,
    textAlign: "left",
    color: palette.primary.dark,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 20, md: 20, lg: 22, xs: 16 }),
  },
  h5: {
    fontFamily: Poppins,
    color: palette.primary.light,
    fontWeight: 700,
    lineHeight: "35px",
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ xs: 12, sm: 16, md: 18, lg: 18 }),
  },
  h6: {
    fontFamily: Poppins,
    fontWeight: 300,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontFamily: Poppins,
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontFamily: Poppins,
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontWeight: 400,
    color: palette.secondary.main,
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ xs: 12, sm: 14, md: 16, lg: 16 }),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  title: {
    fontFamily: "Poppins-ExtraBold",
    fontWeight: 700,
    lineHeight: 1.5,
    textAlign: "left",
    color: palette.primary.dark,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 20, md: 20, lg: 22, xs: 16 }),
  },
  caption: {
    fontFamily: Poppins,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontFamily: Poppins,
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: "uppercase",
  },
  button: {
    fontFamily: Poppins,
    fontWeight: 800,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: "capitalize",
  },
  splash: {
    fontFamily: Poppins,
    color: palette.common.white,
    fontWeight: 400,
    lineHeight: "80px",
    fontSize: pxToRem(55),
    ...responsiveFontSizes({ xs: 20, sm: 40, md: 55, lg: 55 }),
    "@media (max-width: 1200px)": {
      lineHeight: "55px",
    },
    "@media (max-width: 900px)": {
      lineHeight: "50px",
    },
    "@media (max-width: 600px)": {
      lineHeight: "33px",
    },
  },
  labelText: {
    fontFamily: Poppins,
    color: palette.common.black,
    fontWeight: 500,
    lineHeight: "20px",
    fontSize: pxToRem(15),
  },
  link: {
    fontFamily: "PoppinsBold",
    color: palette.common.black,
    fontWeight: 700,
    fontSize: pxToRem(15),
    ...responsiveFontSizes({ xs: 12, sm: 15, md: 15, lg: 15 }),
  },
  mainHeader: {
    fontFamily: Poppins,
    color: palette.common.white,
    fontWeight: 600,
    fontSize: pxToRem(16),
  },
  text: {
    fontFamily: Poppins,
    color: palette.common.white,
    fontWeight: 600,
    fontSize: pxToRem(12),
    lineHeight: "40px",
  },

  
};

export default typography;
