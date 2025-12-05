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
  h1: {
    fontFamily: "Roboto-Bold",
    fontSize: "16px",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: palette.primary.dark,
    textTransform: "capitalize",
  },
  h2: {
    fontFamily: "Roboto-Bold",
    fontSize: "14px",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: palette.primary.dark,
  },

  h3: {
    fontFamily: "Roboto-Bold",
    fontSize: "13px",
    fontStretch: "normal",
    fontStyle: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: palette.primary.dark,
  },
  h4: {
    fontFamily: "Roboto-Medium",
    fontSize: "14px",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: palette.primary.dark,
  },

  subtitle1: {
    fontFamily: "Roboto-Regular",
    fontSize: "13px",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: palette.primary.black,
  },

  subtitle: {
    fontFamily: "Roboto-Regular",
    fontSize: "13px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    textAlign: "left",
    color: palette.primary.gray,
  },
};

export default typography;
