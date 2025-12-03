// NoData.js

import React from "react";
import { noData } from "../../assets/images";
import { Box, Typography } from "@mui/material";

const NoData = (props) => {
  return (
      <Box
        sx={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <img
          src={noData}
          style={{ maxWidth: "50px", height: "75px" }}
          height="100%"
          width="100%"
          alt="satus"
        />
        <Typography variant="subtitle1">
          {props.title ? props.title : "No record found!"}
        </Typography>
      </Box>
  );
};

export default NoData;
