import React from "react";
import { Box, Typography } from "@mui/material";
import { imgBox, mainText, weight, wrapper } from "./style";

import { useNavigate } from "react-router-dom";

const ViewSplashScreen = ({ text, text2 }) => {
  const navigate = useNavigate();
  return (
    <Box sx={wrapper}>
      <Box
        onClick={() => navigate("/")}
        sx={{ position: "absolute", top: 10, left: 10, cursor: "pointer" }}
      >
        {/* <img src={logowhite}  width="100%" height="100%" alt="logo" /> */}img
      </Box>
      <Box>
        <Box sx={imgBox}>
          {/* <img src={bgimg}  width="100%" height="100%" alt="logo" /> */}img
        </Box>
        <Box sx={mainText}>
          <Typography variant="splash">
            {text}
            <span style={weight}>{text2} </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewSplashScreen;
