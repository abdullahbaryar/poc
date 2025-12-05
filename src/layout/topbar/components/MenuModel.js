import CloseIcon from "@mui/icons-material/Close";
import React from "react";

import { Alert, Box, Button, IconButton, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IconTool } from "components/tooltip";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setPolicy } from "store/slices/policySlice";
import { setLoadingCheck } from "store/slices/loaderSlice";
import { setInterimId, setPolicyNumber, userCheck } from "store/slices/authSlice";

// ---------Component style------------

const buttonStyle = {
  maxWidth: { xs: "100%", sm: "100px", md: "100px" },
  mr: 2,
  mb: { xs: 1, sm: 0, md: 0 },
};

const formBox = { width: "100%", maxWidth: "430px", margin: "auto" };

const mainBox = { p: 2, width: "100%" };

const buttonNext = { maxWidth: { xs: "100%", sm: "130px", md: "130px" } };

const buttonContainer = { textAlign: "right", mt: 3 };

const MenuModel = (props) => {
  const {
    open,
    setOpenModel,
    modelData,
    access,
    setAccess,
    policyData,
    fetchData,
  } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = (e) => {
    setOpenModel(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modelData?.value !== access?.value) {
      if (modelData?.value === "user" || modelData?.value === "admin") {
        dispatch(setPolicy(policyData && policyData[0]?.policy));
        dispatch(setPolicyNumber(0));
        dispatch(setLoadingCheck(true));
        fetchData({ id: null });
        setAccess({ name: modelData?.name, value: modelData?.value });
        dispatch(userCheck(modelData.value === "user" ? false : true));
        dispatch(setInterimId(0));
        localStorage.removeItem("interim");
        navigate("/dashboard");
      } else {
        dispatch(setPolicy(policyData && policyData[modelData.id]?.policy));
        dispatch(setLoadingCheck(true));
        fetchData({ id: policyData[modelData.id]?.User?.id });
        dispatch(setPolicyNumber(modelData?.id || 0));
        setAccess({ name: modelData?.name, value: modelData?.value });
        dispatch(userCheck(true));
        dispatch(setInterimId(modelData?.checkID));
        localStorage.setItem(
          "interim",
          policyData[modelData?.id]?.interim_role
        );
        navigate("/dashboard");
      }
    }
    setOpenModel(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      aria-labelledby="responsive-dialog-title"
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          width: { xs: "270px", sm: "400px", md: "781px" },
          maxHeight: { xs: "330px", sm: "230px", md: "465px" },
          minHeight: "150px",
          background: "#fff",
          boxShadow: "none",
          boxRadius: "none",
          borderTop: "5px solid #0575E6",
        },
        "& .MuiDialog-container": {
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(10px)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: 9,
          top: 8,
          cursor: "pointer",
          zIndex: 1,
        }}
        data-cy={`wallet-close`}
        onClick={handleClose}
      >
        <IconTool text={"Close"}>
          <IconButton sx={{ width: "35px", height: "35px" }}>
            <CloseIcon sx={{ fill: "#0575E6", width: "20px" }} />
          </IconButton>
        </IconTool>
      </Box>
      <Box sx={mainBox}>
        <Box sx={mainBox}>
          <form>
            <Box sx={formBox}>
              <Typography variant="h3" sx={{ mb: 2 }}>
                {`Switching To ${modelData?.name}`}
              </Typography>

              <Alert
                severity="info"
                sx={{
                  mb: 2,
                  "& .MuiSvgIcon-root": {
                    width: "17px",
                    height: "26px",
                  },
                  "& .MuiAlert-icon": {
                    marginRight: "10px",
                    padding: "4px 0",
                  },
                }}
              >
                <Typography variant="subtitle1">
                  {` Do you really want to switch to the  ${modelData?.name} side?`}
                </Typography>
              </Alert>

              <Box sx={buttonContainer}>
                <Button
                  variant="outlined"
                  sx={buttonStyle}
                  onClick={handleClose}
                  data-cy={`back-walletmodal`}
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  data-cy={`edit-walletmodal`}
                  onClick={handleSubmit}
                  sx={buttonNext}
                >
                  Yes
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Dialog>
  );
};

export default MenuModel;
