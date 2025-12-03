import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  Box,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { IconTool } from "components/tooltip";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { OpenDeleteModal } from "../../redux/slices/chatSlice";

// import { OpenDeleteModal } from "store/slices/modalsSlice";
const datailBox = {
  minWidth: "100%",
  //   mt: 2,
};
const detail = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: "space-between",
  alignItems: { xs: "flex-start", sm: "center" },
  minHeight: "40px",
};

const detailtext = { wordBreak: "break-all" };

const ViewModal = () => {
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.chat);
  // const { selectedItem } = useSelector((state) => state.team);
  const selectedItem = {};

  const handleClose = () => {
    dispatch(OpenDeleteModal(false));
    // dispatch(setSelectItem(""));
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      BackdropProps={{
        sx: { backdropFilter: "blur(10px)" }, // Increase blur amount
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "25px",
          minHeight: "60px",
          alignItems: "center",
          p: { xs: "0px 10px", md: "0px 24px" },
        }}
      >
        <Typography variant="h1">Details</Typography>
        <Box
          onClick={handleClose}
          sx={{ cursor: "pointer" }}
          data-cy="Add-Platform-close"
        >
          <CloseIcon />
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "100px",
          gap: "10px",
        }}
      >
        <Box sx={datailBox}>
          {selectedItem?.name && (
            <>
              <Box sx={detail}>
                <Typography>Name</Typography>
                <Typography variant="h6" sx={detailtext}>
                  {selectedItem?.name}
                </Typography>
              </Box>
              <Divider />
            </>
          )}
          {selectedItem?.companyName && (
            <>
              <Box sx={detail}>
                <Typography>company Name</Typography>
                <Typography variant="h6" sx={detailtext}>
                  {selectedItem?.companyName}
                </Typography>
              </Box>
              <Divider />
            </>
          )}
          {selectedItem?.platform && (
            <>
              <Box sx={detail}>
                <Typography>Platform</Typography>
                <Typography variant="h6" sx={detailtext}>
                  {selectedItem.platform}
                </Typography>
              </Box>
              <Divider />
            </>
          )}
          {selectedItem?.meetingDate && (
            <>
              <Box sx={detail}>
                <Typography>Meeting Date</Typography>
                <Typography variant="h6" sx={detailtext}>
                  {dayjs(new Date(selectedItem.meetingDate)).format(
                    "DD MMM YYYY"
                  )}
                </Typography>
              </Box>
              <Divider />
            </>
          )}

          {selectedItem?.meetingTime && (
            <>
              <Box sx={detail}>
                <Typography>Meeting Time (24 Hours)</Typography>
                <Typography variant="h6" sx={detailtext}>
                  {selectedItem?.meetingTime}
                </Typography>
              </Box>
              <Divider />
            </>
          )}
          {selectedItem?.filePath && (
            <>
              <Box sx={detail}>
                <Typography>FilePath</Typography>
                <Box>
                  <a
                    href={selectedItem?.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography variant="h6" sx={{ color: "#0575e6" }}>
                      File Path
                    </Typography>
                  </a>
                </Box>
              </Box>
              <Divider />
            </>
          )}
          {selectedItem?.resource && (
            <>
              <Box sx={detail}>
                <Typography>Resource</Typography>
                <Typography variant="h6" sx={detailtext}>
                  {selectedItem?.resource}
                </Typography>
              </Box>
              <Divider />{" "}
            </>
          )}
          {selectedItem?.email && (
            <>
              <Box sx={detail}>
                <Typography>Email</Typography>
                <Typography variant="h6" sx={detailtext}>
                  {selectedItem?.email}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewModal;
