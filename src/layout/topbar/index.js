import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { fetchImage } from "api/Employee";
import BackButton from "components/backicon";
import NotificationList from "pages/dashboard/components/NotificationList";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { setLoadingCheck } from "store/slices/loaderSlice";
import { capitalizeFirstLetter, capitalizeWord, logoutUser } from "utils/utils";
import { v4 as uuidv4 } from "uuid";
import { loginUserPolicy } from "api/Acl";
import { setPolicy, setPolicyArray } from "store/slices/policySlice";
import { IconTool } from "components/tooltip";
import {
  updatePersonalProfile,
  userDataUpdate,
  userInterimId,
} from "store/slices/employeeSlice";
import { getMyDetails } from "api/Dashboard";
import {
  setInterimId,
  setPolicyNumber,
  userCheck,
} from "store/slices/authSlice";
import MenuListItem from "./components/MenuListItem";
import MenuModel from "./components/MenuModel";
import SideDrawer from "layout/common/SideDrawer";

// ---------Component style------------

const menuePropsStyle = {
  elevation: 0,
  sx: {
    overflow: "visible",
    borderRadius: "8px",
    maxWidth: { xs: "100%", sm: "340px", md: "380px" },
    minWidth: { xs: "80%", sm: "300px", md: "320px" },
    mt: 1.5,
    maxHeight: "480px",
    pading: "0px",
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "& .MuiMenu-list": {
      padding: "0px",
    },
    "& .MuiMenuItem-root": {
      margin: "0px",
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

const navContainer = {
  display: "flex",
  alignItems: "center",
  pr: 2,
  width: { xs: "auto", sm: "50%", md: "50%" },
  justifyContent: "space-between",
};

const iconContainer = {
  display: "flex",
  alignItems: "center",
  width: { xs: "auto", sm: "50%", md: "50%" },
  justifyContent: "flex-end",
};

const mainContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
};

const topDiv = (theme) => ({
  width: "100%",
  display: "flex",
  // flexWrap: "wrap",
  justifyContent: "space-between",
  borderBottom: `2px solid ${theme.palette.primary.lightGray}`,
  paddingRight: "16px",
  paddingLeft: "16px",
});

// ---------Component ------------

const TopBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const policy = useSelector((state) => state.policy?.policy);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [heading, setHeading] = useState();
  const [open, setOpen] = React.useState(false);
  const [menuLoading, setMenuLoading] = React.useState(false);
  const [openModel, setOpenModel] = React.useState(false);
  const [modelData, setModelData] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = useSelector((state) => state.auth.auth.userAdmin);
  const savedData = useSelector((state) => state.employee.data);
  const policyNumber = useSelector((state) => state.auth.auth.policyNumber);
  const interimIdPersist = useSelector((state) => state.auth.auth.interimId);
  const personalProfile = useSelector(
    (state) => state.employee.personalProfile
  );

  const userNotificationCheck = useSelector(
    (state) => state.employee.userNotificationCheck
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

  const { data: personalData } = useQuery({
    queryKey: ["getMyDetails", dispatch],
    queryFn: () => getMyDetails(),
    keepPreviousData: false,
    retry: false,
    refetchOnWindowFocus: false,
    notifyOnChangeProps: ["data", "error"],
  });
  const [activeMail, setActiveMail] = useState([
    {
      name: "Personal",
      value: "user",
      image: profileImageUrl,
    },
    {
      name: personalData?.Role?.code?.toUpperCase() || "Admin",
      value: "admin",
      image: profileImageUrl,
    },
  ]);
  useEffect(() => {
    if (personalData) {
      setActiveMail((prev) => {
        // Copy the current state
        const updatedActiveMail = [...prev];
        // Update the second object
        if (updatedActiveMail[1]) {
          updatedActiveMail[1] = {
            ...updatedActiveMail[1],
            name: personalData.Role.code.toUpperCase(),
          };
        }

        // Return the updated array
        return updatedActiveMail;
      });
    }
  }, [personalData]);
  const [access, setAccess] = useState(
    opens === true && policyNumber === 0
      ? {
          name: personalProfile?.role_code?.toUpperCase(),
          value: "admin",
          image: personalProfile?.image_url,
        }
      : { name: "Personal", value: "user", image: personalProfile?.image_url }
  );

  const fetchData = async ({ id }) => {
    dispatch(userInterimId(id));
    // dispatch(setLoadingCheck(true));
    const meData = await getMyDetails(id);
    if (meData?.name) {
      const filteredProperties = {
        image_url: meData?.personal_info?.image_url || null,
        name: meData?.name || null,
        pri_email: meData?.pri_email || null,
        role_name: meData?.Role?.name || null,
        role_code: id
          ? `Interim ${meData?.Role?.code}`
          : meData?.Role?.code || null,
        reportee: meData?.reportees || [],
        id: meData?.id || null,
        completionPercentage: meData?.personal_info?.completionPercentage,
      };
      // Set personalData in local storage
      dispatch(userDataUpdate(filteredProperties));
      if (!id) {
        dispatch(updatePersonalProfile(filteredProperties));
      }
      dispatch(setLoadingCheck(false));
    }
  };

  const { data: policyData } = useQuery({
    queryKey: "loginUserPolicy",
    // Specifies the function that fetches the data for the query
    queryFn: () => loginUserPolicy(),
    keepPreviousData: false,
    retry: false,
    refetchOnWindowFocus: false,
    notifyOnChangeProps: ["data", "error"],
  });
  //here set the name of Module for top bar title
  useEffect(() => {
    if (location.pathname.includes("/dashboard")) {
      setHeading("Dashboard");
    } else if (location.pathname.includes("/employee")) {
      setHeading("Employees");
    } else if (location.pathname.includes("/departments")) {
      setHeading("Departments");
    } else if (location.pathname.includes("/roles")) {
      setHeading("Roles");
    } else if (location.pathname.includes("/designations")) {
      setHeading("Designations");
    } else if (location.pathname.includes("/calendar")) {
      setHeading("Calendar");
    } else if (location.pathname.includes("/leave-template")) {
      setHeading("Leave Templates");
    } else if (location.pathname.includes("/leave-approval")) {
      setHeading("Leave Approval");
    } else if (location.pathname.includes("/working-schedule")) {
      setHeading("Shift Schedule");
    } else if (location.pathname.includes("/leave-application")) {
      setHeading("Leave Applications");
    } else if (location.pathname.includes("/unpaid-leave-ot-stats")) {
      setHeading("Leave & OT Stats");
    } else if (location.pathname.includes("/attendance-reports")) {
      setHeading("Reports");
    } else if (location.pathname.includes("/attendance")) {
      setHeading("Attendance");
    } else if (location.pathname.includes("/holidays")) {
      setHeading("Holidays");
    } else if (location.pathname.includes("/setting")) {
      setHeading("Settings");
    } else if (location.pathname.includes("/notifications")) {
      setHeading("Notifications");
    } else if (location.pathname.includes("custom-notifications")) {
      setHeading("Custom Notifications");
    } else if (location.pathname.includes("/logs")) {
      setHeading("Activity Logs");
    } else if (location.pathname.includes("/leave-types")) {
      setHeading("Leave Types");
    } else if (location.pathname.includes("/permissions")) {
      setHeading("Permissions");
    } else if (location.pathname.includes("/office-details")) {
      setHeading("Office Details");
    } else if (location.pathname.includes("/leave-wallet")) {
      setHeading("Leave Wallet");
    } else if (location.pathname.includes("/contract-details")) {
      setHeading("Contract Details");
    } else if (location.pathname.includes("/reports")) {
      setHeading("Leave Reports");
    } else if (location.pathname.includes("/network-access")) {
      setHeading("Network Access");
    } else if (location.pathname.includes("/interim")) {
      setHeading("Interims");
    } else if (location.pathname.includes("/epa-reports")) {
      setHeading("EPA Reports");
    } else if (location.pathname.includes("/reporters")) {
      setHeading("Reporters");
    } else if (location.pathname.includes("/request-template")) {
      setHeading("Request Templates");
    } else if (location.pathname.includes("/request-application")) {
      setHeading("Request Applications");
    } else if (location.pathname.includes("/documents")) {
      setHeading("Documents");
    } else {
      setHeading("Dashboard");
    }
  }, [location.pathname]);
  useEffect(() => {
    if (opens === true && policyNumber > 0) {
      !userNotificationCheck &&
        dispatch(setPolicy(policyData && policyData[policyNumber]?.policy));

      setAccess({
        name: activeMail[policyNumber + 1]?.name,
        value: activeMail[policyNumber + 1]?.value,
      });

      !userNotificationCheck &&
        fetchData({ id: policyData[policyNumber]?.User?.id });

      dispatch(userCheck(true));
    } else if (
      opens === true &&
      (access?.value === "user" || access?.value === "admin")
    ) {
      setAccess({
        name: personalProfile?.role_code?.toUpperCase(),
        value: "admin",
        image: personalProfile?.image_url,
      });
      dispatch(setPolicy(policyData && policyData[0]?.policy));
      localStorage.removeItem("interim");
    } else if (opens === true && policyNumber === 0) {
      setAccess({
        name: personalProfile?.role_code?.toUpperCase(),
        value: "admin",
        image: personalProfile?.image_url,
      });
      dispatch(setPolicy(policyData && policyData[0]?.policy));
      localStorage.removeItem("interim");
    } else if (opens === false || access?.value === "user") {
      dispatch(setPolicy(policyData && policyData[0]?.policy));
      setAccess({
        name: "Personal",
        value: "user",
        image: personalProfile?.image_url,
      });

      dispatch(setPolicyNumber(0));
      dispatch(userCheck(false));
      localStorage.removeItem("interim");
    }
    dispatch(setPolicyArray(policyData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, opens, policyNumber, location?.pathname, activeMail]);

  // This function is called when the user clicks on the user profile icon,
  // and it sets the anchorEl variable to the current target of the click event.
  const handleMenu = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  //This function is called when the user closes the menu, and it sets the anchorEl variable to null.
  const handleClose = () => {
    setAnchorEl2(null);
  };

  const handleDrawerOpen = () => {
    setAnchorEl(false);
    setOpen(!open);
  };
  // const interim = localStorage.getItem("interim");
  const handleOnChange = (value) => {
    const selectedObj = activeMail.find((item) => item.value === value);

    if (selectedObj?.value !== access?.value) {
      setOpenModel(true);
      setModelData(selectedObj);
    }
  };
  const AddImageFun = async (url) => {
    try {
      const imageBlob = await fetchImage(url);
      return imageBlob;
    } catch (error) {
      // console.error(`Error fetching image from ${url}:`, error);
      return null;
    }
  };

  const populateActiveMail = async () => {
    setMenuLoading(true);
    const newActiveMail = [...activeMail]; // Create a copy of activeMail

    for (let i = 1; i < policyData?.length; i++) {
      const interimData = policyData[i]?.User;
      const imageURL = policyData[i]?.interim_dept
        ? profileImageUrl
        : await AddImageFun(interimData?.personal_info?.image_url);

      const newObject = {
        checkID: policyData[i]?.interim_role,
        userInterim: policyData[i]?.interim_dept ? false : true,
        name: policyData[i]?.interim_dept
          ? `Interim ${capitalizeFirstLetter(
              policyData[i]?.interim_dept.Role_Data?.code?.toUpperCase()
            )} of ${capitalizeFirstLetter(
              policyData[i]?.interim_dept.Department?.code?.toUpperCase()
            )}`
          : `Interim of ${capitalizeWord(interimData?.name)}`,
        value: `${interimData?.Position?.description}${i}`,
        id: i,

        image: imageURL,
      };

      const objectExists = newActiveMail.some(
        (existingObject) => existingObject.checkID === newObject.checkID
      );

      if (!objectExists) {
        newActiveMail.push(newObject);
      }
    }

    setActiveMail(newActiveMail);
    setMenuLoading(false);
  };

  const noAdminData = activeMail?.filter((item) => item.value !== "admin");
  // when the policy data is loaded, check if the interimId is still valid
  const interimIdCheck =
    policyNumber > 0 &&
    policyData[policyNumber]?.interim_role === interimIdPersist;

  // if interim is not valid then switch to the personal profile to the user
  useEffect(() => {
    if (menuLoading === false) {
      if (interimIdCheck === false && policyNumber !== 0) {
        dispatch(setPolicy(policyData && policyData[0]?.policy));
        setAccess({
          name: "Personal",
          value: "user",
          image: personalProfile?.image_url,
        });
        dispatch(setPolicyNumber(0));
        dispatch(userCheck(false));
        localStorage.removeItem("interim");
        dispatch(setInterimId(0));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interimIdCheck]);

  // adding image to the array while getting from backend
  useEffect(() => {
    if (profileImageUrl) {
      const newActiveMail = activeMail?.map((item) =>
        item.value === "user" ||
        item.value === "admin" ||
        item?.userInterim === false
          ? { ...item, image: profileImageUrl }
          : item
      );
      setActiveMail(newActiveMail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileImageUrl, setActiveMail, menuLoading]);

  useEffect(() => {
    populateActiveMail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policyData]);

  const emailKey = (personalData && personalData?.active_email) || "pri_email";
  const email = personalData?.[emailKey];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxHeight: "400px",
          minHeight: "64px",
          background: "rgba(255, 255, 255, 0.27)",
          display: { xs: "flex", md: heading === "Calendar" ? "none" : "flex" },
          flexWrap: "wrap",
          justifyContent: "space-between",
          backdropFilter: "blur(8px)",
        }}
      >
        <Box sx={topDiv}>
          <Box sx={navContainer}>
            <Box sx={mainContainer}>
              <BackButton />
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                data-cy="menu-openDrawer"
                sx={{
                  mr: 0,
                  display: { xs: "flex", sm: "flex", md: "none" },
                }}
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h1"
                sx={{
                  marginRight: "12px",
                  "@media (max-width: 420px)": {
                    display: "none",
                  },
                }}
              >
                {heading}
              </Typography>
            </Box>
          </Box>

          <Box sx={iconContainer}>
            {/* notification list */}
            <Typography
              variant="subtitle1"
              sx={{
                color: "#747982",
                fontSize: "14px",
                padding: "3.6px 16px",
                backgroundColor: "#E2E5EF",
                borderRadius: "12px",
                fontWeight: 400,
              }}
            >
              Beta
            </Typography>
            <NotificationList />

            <IconButton
              data-cy="menu-drawer-profile"
              onClick={handleMenu}
              size="small"
              sx={{ ml: "4px", mb: "4px" }}
              aria-controls={anchorEl2 ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={anchorEl2 ? "true" : undefined}
            >
              {profileImageUrl ? (
                <Avatar sx={{ width: 32, height: 32 }}>
                  <img
                    src={profileImageUrl}
                    alt="profile"
                    width="100%"
                    height="100%"
                  />
                </Avatar>
              ) : (
                <Avatar sx={{ width: 28, height: 28, background: "#0575E6" }}>
                  {capitalizeFirstLetter(personalProfile?.name?.charAt(0)) ||
                    "A"}
                </Avatar>
              )}
            </IconButton>
          </Box>
        </Box>
        <Menu
          anchorEl={anchorEl2}
          id="account-menu"
          open={Boolean(anchorEl2)}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={menuePropsStyle}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {[
            <Box
              key={uuidv4()}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                cursor: "pointer",
                textOverflow: "ellipsis",
              }}
            >
              <Box
                sx={{
                  background: "#EEF0F6",
                  py: 1.5,
                  px: 2.5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {profileImageUrl ? (
                  <Avatar
                    sx={{ width: "34px !important", height: "34px !important" }}
                  >
                    <img
                      src={profileImageUrl}
                      alt="profile"
                      width="100%"
                      height="100%"
                    />
                  </Avatar>
                ) : (
                  <Avatar
                    sx={{
                      width: "34px !important",
                      height: "34px !important",
                      background: "#0575E6",
                    }}
                  >
                    {capitalizeFirstLetter(personalProfile?.name?.charAt(0)) ||
                      "A"}
                  </Avatar>
                )}
                <IconTool text={capitalizeWord(personalProfile?.name) || ""}>
                  <Typography sx={{ mt: "12px" }} variant="h3" noWrap>
                    {capitalizeWord(personalProfile?.name) || ""}
                  </Typography>
                </IconTool>
                <IconTool text={email}>
                  <Typography
                    variant="subtitle3"
                    sx={{
                      fontSize: "14px",
                      fontFamily: "Roboto-Regular",
                      color: "#747982",
                    }}
                  >
                    {email}
                  </Typography>
                </IconTool>
              </Box>
              {(policy?.admin === true ||
                policy?.admin === false ||
                savedData?.role_code === "ceo") && (
                <Box>
                  <Typography sx={{ py: 1.5, px: 2 }}>Profiles</Typography>
                  {menuLoading ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "90px",
                      }}
                    >
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    <Box sx={{ maxHeight: "250px", overflow: "auto" }}>
                      {policyData[0]?.policy?.admin === false
                        ? noAdminData?.map((item, i) => (
                            <MenuListItem
                              key={`noAdminData-${i}`}
                              item={item}
                              i={i}
                              handleOnChange={handleOnChange}
                              access={access}
                              personalProfile={personalProfile}
                            />
                          ))
                        : activeMail?.map((item, i) => (
                            <MenuListItem
                              key={`activeMail-${i}`}
                              item={item}
                              i={i}
                              handleOnChange={handleOnChange}
                              access={access}
                              personalProfile={personalProfile}
                            />
                          ))}
                    </Box>
                  )}
                </Box>
              )}
            </Box>,
            <Divider key="divider" sx={{ mx: "1rem" }} />,
            <MenuItem
              key={uuidv4()}
              sx={{ m: 1 }}
              onClick={() => navigate("/settings")}
            >
              Settings
            </MenuItem>,
            <MenuItem
              key={uuidv4()}
              sx={{ m: 1 }}
              data-cy="menu-logout"
              onClick={(e) => {
                e.preventDefault();
                logoutUser(dispatch, navigate, queryClient);
                localStorage.removeItem("interim");
              }}
            >
              Logout
            </MenuItem>,
          ]}
        </Menu>
      </Box>
      <SideDrawer
        isSmallScreenSideDrawer={true}
        open={open}
        setOpen={setOpen}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        handleDrawerOpen={handleDrawerOpen}
      />
      <MenuModel
        open={openModel}
        setOpenModel={setOpenModel}
        modelData={modelData}
        access={access}
        policyData={policyData}
        setAccess={setAccess}
        fetchData={fetchData}
      />
    </>
  );
};

export default TopBar;
