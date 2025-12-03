import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { IconTool } from "components/tooltip";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { OpenDeleteModal } from "../../redux/slices/adminSlice";

// import { OpenDeleteModal } from "store/slices/modalsSlice";

const DeleteModal = ({ handleDelete }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.admin);
  const fullScreen = useMediaQuery(theme.breakpoints.down("480px"));

  const handleClose = () => {
    dispatch(OpenDeleteModal(false));
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      data-cy={`delete-close`}
      aria-labelledby="responsive-dialog-title"
      BackdropProps={{
        sx: { backdropFilter: "blur(10px)" }, // Increase blur amount
      }}
    >
      <Box sx={{ position: "absolute", right: 9, top: 8, cursor: "pointer" }}>
        <IconButton
          sx={{ width: "35px", height: "35px" }}
          onClick={handleClose}
          data-cy="close-modal"
        >
          <CloseIcon sx={{ fill: "#0575E6", fontSize: "1.5rem" }} />
        </IconButton>
      </Box>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "100px",
          padding: "20px 50px",
          gap: "10px",
          "@media (max-width: 480px)": {
            padding: "20px 10px",
          },
        }}
      >
        <ErrorOutlineIcon sx={{ fill: "#0575E6", fontSize: "3.5rem" }} />
        <Typography
          variant="h1"
          sx={{
            fontSize: "25px",
            "@media (max-width: 480px)": {
              fontSize: "20px",
            },
          }}
        >
          Are you sure?
        </Typography>
        <Typography variant="subtitle1">
          You will not be able to recover this!
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          padding: "8px 90px 24px 90px",
          "@media (max-width: 480px)": {
            fontSize: "12px",
            padding: "8px 10px 24px 10px",
            justifyContent: "center",
          },
        }}
      >
        <Button
          autoFocus
          onClick={handleClose}
          data-cy="cancel-submit"
          variant="outlined"
          sx={{
            maxWidth: "80px",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          data-cy="delete-submit"
          autoFocus
          variant="contained"
          sx={{
            maxWidth: "80px",
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
