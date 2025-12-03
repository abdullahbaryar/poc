// Loader.js

import { CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
        width: "100%",
      }}
    >
      <CircularProgress size={34} />
    </div>
  );
};

export default Loader;
