import { Avatar, Box, MenuItem, Typography } from "@mui/material";
import { IconTool } from "components/tooltip";
import { capitalizeFirstLetter } from "utils/utils";

const menueItemStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  "&:last-child": {
    "&:before": {
      content: "''",
      display: "block",
      overflow: "hidden",
      position: "absolute",
      left: "19px",
      right: 0,
      bottom: 0,
      opacity: 0.28,
    },
  },
  "&:before": {
    content: "''",
    display: "block",
    overflow: "hidden",
    position: "absolute",
    left: "19px",
    right: "19px",
    bottom: 0,
    opacity: 0.28,
  },
};

const PicBoxStyle = {
  backgroundColor: "#fff",
  p: "1px 1px 1.1px 1px",
  position: "absolute",
  borderRadius: "50%",
  top: 0,
  left: "55%",
  zIndex: 1000,
};
const GreenCircleStyle = {
  backgroundColor: "#10AF33",
  height: "10px",
  width: "10px",
  borderRadius: "50%",
};

const MenuListItem = (props) => {
  const { item, handleOnChange, access, personalProfile } = props;

  return (
    <>
      <MenuItem
        sx={menueItemStyle}
        onClick={() => handleOnChange(item?.value)}
        data-cy="menu-list-role"
      >
        <IconTool text={item?.name}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pb: "6px",
            }}
          >
            {item?.image ? (
              <Box
                sx={{
                  position: "relative",
                  height: 30,
                  width: 30,
                }}
              >
                {access.value === item?.value && (
                  <Box sx={PicBoxStyle}>
                    <Box sx={GreenCircleStyle} />
                  </Box>
                )}
                <Avatar
                  sx={{
                    width: "28px !important",
                    height: "28px !important",
                  }}
                >
                  <img
                    src={item?.image}
                    alt="profile"
                    width="100%"
                    height="100%"
                  />
                </Avatar>
              </Box>
            ) : (
              <Box
                sx={{
                  position: "relative",
                  height: 30,
                  width: 30,
                }}
              >
                {access.value === item?.value && (
                  <Box sx={PicBoxStyle}>
                    <Box sx={GreenCircleStyle} />
                  </Box>
                )}

                <Avatar
                  sx={{
                    width: "28px !important",
                    height: "28px !important",
                    background: "#0575E6",
                  }}
                >
                  {capitalizeFirstLetter(
                    item?.name?.startsWith("Interim of ")
                      ? item?.name?.replace("Interim of ", "").charAt(0)
                      : personalProfile?.name.charAt(0)
                  ) || "A"}
                </Avatar>
              </Box>
            )}
            <Typography
              sx={{
                maxWidth: "250px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                fontWeight: 400,
                fontSize: "14px",
                ml: { xs: "4px", sm: "10px" },
              }}
            >
              {item?.name}
            </Typography>
          </Box>
        </IconTool>
      </MenuItem>
    </>
  );
};

export default MenuListItem;
