import { Box, Button, Typography } from "@mui/material";
import { NotFountPage } from "../../assets/images";
import React from "react";
import { useNavigate } from "react-router";

//============style=============

const textBox = (theme) => ({
  width: "100%",
  maxWidth: "520px",
});
const textTypo = (theme) => ({
  mt: "20px",
  textAlign: "center",
  fontFamily: "Poppins-Regular",
  color: `${theme.palette.primary.gray}`,
});

const wrapper = (theme) => ({
  width: "100%",
  height: "85vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: `${theme.palette.primary.white}`,
});

//============component=============

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box sx={wrapper}>
      <img
        src={NotFountPage}
        style={{ maxWidth: "460px", height: "250px" }}
        height="100%"
        width="100%"
        alt="satus"
      />
      <Typography sx={{ mt: "-30px", fontSize: "25px" }} variant="h1">
        {`Page Not Found!`}
      </Typography>
      <Box sx={textBox}>
        <Typography sx={textTypo} variant="h1">
          {`We're Sorry, The Page You Requested Could Not Be Found Please Go Back To The Homepage`}
        </Typography>
      </Box>
      <Button
        data-cy="not found"
        variant="contained"
        sx={{ maxWidth: "200px", mt: "20px" }}
        onClick={() => navigate("/contact")}
      >
        Chat
      </Button>
    </Box>
  );
};

export default NotFound;
