import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  styled,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CssBaseline from "@mui/material/CssBaseline";
import { fetchImage } from "api/Employee";
import HotKeys from "components/hotkeys";
import ListMenue from "components/listmenue";
import { SideIconTool } from "components/tooltip";
import {
  capitalizeFirstLetter,
  capitalizeWords,
  logoutUser,
} from "utils/utils";
import {
  Radius,
  // logoIcon,
  logoutIcon,
} from "assets/images";
import { setLoading } from "store/slices/loaderSlice";

// --------- Component Styles ------------

const openedMixin = (theme) => ({
  overflowX: "hidden",
  width: 229,
  [theme.breakpoints.up("xs")]: {
    zIndex: 1,
  },
  [theme.breakpoints.up("md")]: {
    zIndex: 0,
  },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme) => ({
  overflowX: "hidden",
  [theme.breakpoints.up("xs")]: {
    width: 0,
    zIndex: 1,
  },
  [theme.breakpoints.up("md")]: {
    width: `calc(${theme.spacing(11)} + 1px)`,
    zIndex: 0,
  },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: "0.5s",
  }),
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: 229,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const sectionStyle = (open) => {
  return {
    dispaly: "flex",
    alignItems: "center",
    justifyContent: open ? "initial" : "flex-start",
  };
};

// const logoSection = (theme) => ({
//   display: "flex",
//   alignItems: "center",
//   minHeight: "64px",
//   px: 2.5,
//   borderBottom: `2px solid ${theme.palette.primary.lightGray}`,
// });

// const logoBox = {
//   width: "30px",
//   height: "33px",
//   cursor: "pointer",
// };

// const logoText = (open) => {
//   return {
//     pr: 1,
//     cursor: "pointer",
//     transition: "0.5s all",
//     opacity: open ? 1 : 0,
//     textTransform: "lowercase",
//     color: "#0575e6",
//     fontSize: "22px",
//   };
// };

const infoSectionBox = (theme) => ({
  display: "flex",
  alignItems: "center",
  minHeight: "64px",
  px: 2.5,
  borderBottom: `2px solid ${theme.palette.primary.lightGray}`,
});

const roleText = (open) => {
  return {
    opacity: open ? 0.8 : 0,
    transition: "0.5s all",
    fontSize: "12px",
    width: "135px",
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
};

const nameText = (open) => {
  return {
    transition: "0.5s all",
    opacity: open ? 1 : 0,
    lineHeight: "20px",
    width: "135px",
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
};

const menuListStyle = {
  height: "80vh",
  overflowY: "auto",
  overflowX: "hidden",
  px: 2.5,
  "::-webkit-scrollbar-track": {
    marginTop: "40px",
  },
};

const buttonBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "42px",
  cursor: "pointer",
};

const iconTextBox = {
  display: "flex",
  alignItems: "center",
  transition: "0.5s all",
};

const listMenueStyles = {
  position: "relative",
  ml: 1,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "3px",
    height: "calc(100% - 30px)",
    backgroundColor: "rgba(246, 246, 246, 1)",
  },
};

const iconBox = (open) => {
  return {
    ml: !open && { xs: 0, md: "4px" },
    transition: "0.5s all",
  };
};

const sideIconStyle = (open) => ({
  width: "22px",
  height: "22px",
  border: `2px solid rgba(233, 236, 239, 1)`,
  borderRadius: "4px",
  position: "absolute",
  left: open ? 216 : { xs: -50, md: 77 },
  top: 82,
  opacity: open ? 1 : { xs: 0, md: 1 },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#ffff",
  zIndex: 1,
  transition: "0.4s all",
  cursor: "pointer",
});

const logoutStyle = (theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "45px",

  borderTop: `2px solid ${theme.palette.primary.lightGray}`,
});

const logoutTextStyle = {
  display: "flex",
  alignItems: "center",
  // px: 2.5,
  marginRight: "20px",
  marginLeft: "20px",
  cursor: "pointer",
};

const logoutText = (open) => {
  return {
    transition: "0.5s all",
    opacity: open ? 1 : 0,
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "Roboto-Bold",
  };
};

const buttonTextStyle = (location, item) => {
  const isActive =
    location?.pathname === item?.path ||
    location?.pathname?.startsWith(item?.path + "/");
  return {
    m: "5px 0px 5px 20px",
    p: "8px 12px 12px 12px",
    borderRadius: "18px",
    backgroundColor: isActive ? "rgba(246, 246, 246, 1)" : "transparent",
    "& .employee-text": {
      fontFamily: isActive ? "Roboto-Medium" : "Roboto-Regular",
      fontSize: "13px",
      fontStretch: "normal",
      fontStyle: "normal",
      letterSpacing: "normal",
      textAlign: "center",
      color: isActive ? "black" : "rgba(117, 117, 117, 1)",
    },
  };
};

function getIdFromPath(data, path) {
  for (let i = 0; i < data.length; i++) {
    const section = data[i];
    if (path.includes(section.path)) {
      return section.id;
    }
    if (section.options) {
      for (let j = 0; j < section.options.length; j++) {
        const subSection = section.options[j];
        if (path.includes(subSection.path)) {
          return subSection.id;
        }
      }
    }
  }
  return null;
}

// --------- Component ------------

export default function SideDrawer(props) {
  const {
    isSmallScreenSideDrawer,
    open,
    setOpen,
    anchorEl,
    setAnchorEl,
    handleDrawerOpen,
  } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [active, setActive] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const opens = useSelector((state) => state.auth.auth.userAdmin);
  const userArray = useSelector((state) => state.policy?.userSideMenue);
  const adminArray = useSelector((state) => state.policy?.adminSideMenue);
  const policyArray = useSelector((state) => state.policy?.policyArray);
  const policyNumber = useSelector((state) => state.auth.auth.policyNumber);
  const personalProfile = useSelector(
    (state) => state.employee.personalProfile
  );
  const hasPersonalInfo = useSelector(
    (state) => state.auth.auth.hasPersonalInfo
  );

  const { data: profileImageUrl } = useQuery(
    ["imageprofile", personalProfile?.image_url],
    () => fetchImage(personalProfile?.image_url),
    {
      enabled: Boolean(personalProfile?.image_url),
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleClick = (index, item, event, isSmallScreenSideDrawer) => {
    if (event.ctrlKey) {
      item?.path && window.open(`${item?.path}`, "_blank");
    } else {
      if (isSmallScreenSideDrawer && !item?.options?.length) {
        setOpen(false);
      }
      setActive(index);
      index?.toString() !== active?.toString() && setFlag(item?.hasSubMenu);
      index?.toString() === active?.toString() && setFlag(!flag);
      open ? setAnchorEl(false) : setAnchorEl(true);
      open ? setCollapse(!collapse) : setCollapse(false);
      item?.path && navigate(item?.path);
    }
  };

  const handleSubMenueClick = (item, event) => {
    if (event.ctrlKey) {
      item?.path && window.open(`${item?.path}`, "_blank");
    } else {
      if (isSmallScreenSideDrawer) {
        setOpen(false);
      }
      setActive(item?.id);
      navigate(item?.path);
    }
  };

  useEffect(() => {
    opens === true ? setData(adminArray) : setData(userArray);
  }, [opens, adminArray, userArray]);

  useEffect(() => {
    const pathname = location?.pathname;
    const myId = getIdFromPath(data, pathname);
    setFlag(data[myId]?.hasSubMenu);
    setActive(myId);
  }, [data, location?.pathname]);

  useEffect(() => {
    if (data.length < 1) {
      dispatch(setLoading(true));
    } else if (data.length > 0 && hasPersonalInfo !== null) {
      dispatch(setLoading(false));
    }
  }, [data, dispatch, hasPersonalInfo]);

  return (
    <Box
      sx={{
        display: {
          xs: isSmallScreenSideDrawer ? "flex" : "none",
          md: isSmallScreenSideDrawer ? "none" : "flex",
        },
      }}
      data-cy={`${isSmallScreenSideDrawer ? "app-sidedrawer" : "app-sidebar"}`}
    >
      <CssBaseline />

      {/* Short Keys Functionality */}
      {!isSmallScreenSideDrawer && <HotKeys routesData={data} />}

      {/* Drawer */}
      <Drawer variant="permanent" open={open}>
        {/* drawer header */}
        {/* <Box sx={sectionStyle(open)}>
          <Box sx={logoSection}>
            <Box sx={logoBox} onClick={() => navigate("/dashboard")}>
              <img
                src={logoIcon}
                alt="magnus mage"
                width="40px"
                height="40px"
              />
            </Box>

            <Typography
              variant="h1"
              sx={logoText(open)}
              onClick={() => navigate("/dashboard")}
            >
              une
            </Typography>
          </Box>
        </Box> */}

        {/* drawer info section  */}
        <Box sx={sectionStyle(open)}>
          <Box sx={infoSectionBox}>
            {profileImageUrl ? (
              <Avatar sx={{ width: 36, height: 36 }}>
                <img
                  src={profileImageUrl}
                  alt="profile"
                  width="100%"
                  height="100%"
                />
              </Avatar>
            ) : (
              <Avatar sx={{ width: 36, height: 36, background: "#0575E6" }}>
                {capitalizeFirstLetter(personalProfile?.name?.charAt(0)) || "A"}
              </Avatar>
            )}
            <Box sx={{ ml: 1.5 }}>
              <Typography variant="subtitle" sx={roleText(open)}>
                {opens
                  ? policyNumber === 0
                    ? policyArray &&
                      policyArray[0]?.User?.Role?.code.toUpperCase()
                    : policyArray[policyNumber || 0]?.interim_dept
                    ? `Interim ${policyArray[
                        policyNumber || 0
                      ]?.interim_dept?.Role_Data?.code.toUpperCase()}`
                    : `Interim ${policyArray[
                        policyNumber || 0
                      ]?.User?.Role?.code.toUpperCase()}` || ""
                  : "Personal"}
              </Typography>

              <Typography variant="h2" sx={nameText(open)}>
                {capitalizeWords(personalProfile?.name) || ""}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* drawer side menu list section */}
        <List sx={menuListStyle} data-cy="menu-item">
          <Box sx={sectionStyle(open)}>
            {data?.map((item, index) => {
              return (
                <Box position="relative" key={index}>
                  <Box
                    key={index}
                    sx={buttonBox}
                    data-cy="sidebar-drawer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={(e) =>
                      handleClick(index, item, e, isSmallScreenSideDrawer)
                    }
                  >
                    <Box sx={iconTextBox}>
                      <SideIconTool
                        text={item?.name}
                        placement="right"
                        open={open}
                      >
                        <IconButton sx={iconBox(open)}>
                          <img
                            src={
                              active?.toString() === index?.toString()
                                ? item?.activeImage
                                : hoveredIndex === index
                                ? item?.activeImage
                                : item?.image
                            }
                            alt="magnus mage"
                            width="18px"
                            height="18px"
                          />
                        </IconButton>
                      </SideIconTool>

                      <Typography
                        variant="subtitle"
                        sx={{
                          transition: "0.5s all",
                          fontFamily:
                            active?.toString() === index?.toString()
                              ? "Roboto-Bold"
                              : "Roboto-Regular",
                          opacity: open ? 1 : 0,
                          color:
                            active?.toString() === index?.toString() ||
                            hoveredIndex === index
                              ? "rgba(5, 117, 230, 1)"
                              : "rgba(116, 121, 130, 1)",
                        }}
                      >
                        {item?.name}
                      </Typography>
                    </Box>
                    {!!item?.options?.length && (
                      <Box
                        sx={{
                          opacity: open ? 1 : 0,
                          transition: "0.3s all",
                          display: "flex",
                        }}
                      >
                        {active?.toString() === index?.toString() && flag ? (
                          <KeyboardArrowUpIcon
                            sx={{
                              fill: "rgba(5, 117, 230, 1)",
                            }}
                          />
                        ) : (
                          <KeyboardArrowDownIcon
                            sx={{
                              fill:
                                active?.toString() === index?.toString() ||
                                hoveredIndex === index
                                  ? "rgba(5, 117, 230, 1)"
                                  : "rgba(116, 121, 130, 1)",
                            }}
                          />
                        )}
                      </Box>
                    )}
                  </Box>

                  {!!item?.options?.length && (
                    <Collapse
                      in={active?.toString() === index?.toString() && flag}
                      timeout="auto"
                      unmountOnExit
                      sx={{ display: open ? "block" : "none" }}
                    >
                      <List component="div" disablePadding sx={listMenueStyles}>
                        {item?.options?.map((item, index) => (
                          <Box key={index}>
                            <Box
                              sx={{ position: "absolute", left: 0, pt: 0.25 }}
                            >
                              <img
                                src={Radius}
                                alt="radius icon"
                                width="22px"
                                height="auto"
                              />
                            </Box>
                            <ListItemButton
                              sx={buttonTextStyle(location, item)}
                              onClick={(e) => handleSubMenueClick(item, e)}
                              data-cy="list-drawer"
                            >
                              <Typography
                                variant="subtitle"
                                className="employee-text"
                              >
                                {item?.name}
                              </Typography>
                            </ListItemButton>
                          </Box>
                        ))}
                      </List>
                    </Collapse>
                  )}

                  {/* Menu box */}
                  {!!item?.options?.length && (
                    <ListMenue
                      id={index}
                      active={active}
                      item={item?.options}
                      setActive={setActive}
                      anchorEl={anchorEl}
                      setAnchorEl={setAnchorEl}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </List>

        {/* logout button */}
        <List>
          <Box sx={sectionStyle(open)}>
            <Box sx={logoutStyle} data-cy="logout-drawer">
              <Box
                sx={logoutTextStyle}
                data-cy="logout-btn"
                onClick={(e) => {
                  e.preventDefault();
                  logoutUser(dispatch, navigate, queryClient);
                }}
              >
                <SideIconTool text={"Logout Account"} placement="right">
                  <IconButton sx={iconBox(open)}>
                    <img
                      src={logoutIcon}
                      alt="magnus mage"
                      width="18px"
                      height="18px"
                    />
                  </IconButton>
                </SideIconTool>

                <Typography variant="subtitle" sx={logoutText(open)}>
                  Logout Account
                </Typography>
              </Box>
            </Box>
          </Box>
        </List>
      </Drawer>

      {/* Drawer minimize maximize button */}
      <Box sx={sideIconStyle(open)} onClick={handleDrawerOpen}>
        {open ? (
          <KeyboardArrowLeftIcon
            sx={{
              fill: "rgba(5, 117, 230, 1)",
              width: "0.8em",
              height: "0.7em",
            }}
          />
        ) : (
          <KeyboardArrowRightIcon
            sx={{
              fill: "rgba(5, 117, 230, 1)",
              width: "0.8em",
              height: "0.7em",
            }}
          />
        )}
      </Box>
    </Box>
  );
}
