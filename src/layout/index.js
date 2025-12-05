import { Box } from "@mui/material";
import { loginUserPolicy } from "api/Acl";
import {
  activeDoc,
  activeEpaReports,
  activeInterim,
  activePermission,
  activeRefresh,
  active_network,
  active_reportee,
  active_reports,
  attendanceActiveIcon,
  attendanceIcon,
  bellActive,
  bellIcon,
  calenderActive,
  calendersIcon,
  contractActive,
  contractNonActive,
  credentialsActive,
  credentialsIcon,
  dashboardActiveIcon,
  dashboardIcon,
  departementIcon,
  departmentActiveIcon,
  doc,
  employeeActiveIcon,
  employeeIcon,
  epaReportsIcon,
  holidayActive,
  holidayIcon,
  inactive_reportee,
  interimIcon,
  leaveActiveIcon,
  leaveApplicationActive,
  leaveApplicationIcon,
  leaveIcon,
  leaveTypeActive,
  leaveTypeIcon,
  leaveWalletActive,
  leaveWalletIcon,
  non_active_network,
  non_active_reports,
  notActiveRefresh,
  permissionIcon,
  positionActiveIcon,
  positionIcon,
  requestActiveIcon,
  requestIcon,
  rolesActiveIcon,
  rolesIcon,
  shiftActiveImage,
  shiftImage,
} from "assets/images";
import WarningAlert from "components/alerts";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { userCheck } from "store/slices/authSlice";
import { setLoading } from "store/slices/loaderSlice";
import {
  setAdminSideMenue,
  setPolicy,
  setUserSideMenue,
} from "store/slices/policySlice";
import {
  listenEvents,
  socketClient,
  socketConnect,
  socketDisconnect,
} from "store/slices/socketData/socket";
import { getAdminArray, getUserArray, shouldShowAlert } from "utils/utils";
import { alertHeight } from "var/heights";
import SideBar from "./sidebar";
import TopBar from "./topbar";

// --------- Component Styles ------------

const mainBox = {
  display: "flex",
  flexDirection: { xs: "column", sm: "column", md: "row" },
  background: "#EFF1F7",
};
const mainContainer = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  height: "100vh", // fallback for dvh
  // eslint-disable-next-line no-dupe-keys
  height: "100dvh",
  minWidth: { xs: "100%", sm: "100%", md: "500px" },
  width: { xs: "100%", sm: "100%", md: "calc(100% - 60px)" },
};
const wrapper = {
  overflowY: "auto",
  overflowX: "hidden",
  background: "#EFF1F7",
  // pb: { xs: 7, sm: 7, md: 0 },
};

// --------- Component Data ------------

const adminData = (policy, isAdmin) => {
  return [
    {
      id: "0",
      name: "Dashboard",
      path: "/dashboard",
      image: dashboardIcon,
      activeImage: dashboardActiveIcon,
      policy1: policy?.dashboard,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+d",
    },
    {
      id: "1",
      name: "Departments",
      path: "/departments",
      policy1: policy?.department,
      image: departementIcon,
      activeImage: departmentActiveIcon,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+shift+d",
    },
    {
      id: "2",
      name: "Designations",
      image: positionIcon,
      activeImage: positionActiveIcon,
      path: "/designations",
      policy1: policy?.designation,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+z",
    },
    {
      id: "3",
      name: "Roles",
      image: rolesIcon,
      activeImage: rolesActiveIcon,
      path: "/roles",
      policy1: policy?.role,
      hasSubMenu: false,
      options: [],
      hotKey: "alt+r",
    },
    {
      id: "4",
      name: "Employees",
      image: employeeIcon,
      activeImage: employeeActiveIcon,
      path: "/employee",
      policy1: policy?.employee,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+e",
    },
    {
      id: "5",
      name: "Attendance",
      image: attendanceIcon,
      activeImage: attendanceActiveIcon,
      hasSubMenu: true,
      options: [
        {
          id: "5",
          name: "Shift Schedule",
          path: "/working-schedule",
          policy1: policy?.shift_schedule,
          hotKey: "ctrl+s",
        },
        {
          id: "5",
          name: "Employee List",
          path: "/attendance",
          policy1: policy?.attendance,
          hotKey: "ctrl+a",
        },
        {
          id: "5",
          name: "Leave & OT Stats",
          path: "/unpaid-leave-ot-stats",
          policy1: policy?.attendance,
          hotKey: "ctrl+shift+a",
        },
        {
          id: "5",
          name: "Reports",
          path: "/attendance-reports",
          policy1: policy?.attendance,
          hotKey: "ctrl+shift+a",
        },
      ],
    },
    {
      id: "6",
      name: "Leave Tracker",
      image: leaveIcon,
      activeImage: leaveActiveIcon,
      hasSubMenu: true,
      options: [
        {
          id: "6",
          name: "Leave Templates",
          path: "/leave-template",
          policy1: policy?.leave_template,
          hotKey: "ctrl+m",
        },
        {
          id: "6",
          name: "Leave Applications",
          path: "/leave-application",
          policy1: policy?.leave_application,
          hotKey: "ctrl+l",
        },
        {
          id: "6",
          name: "Leave Approval",
          path: "/leave-approval",
          policy1: policy?.leave_approval,
          hotKey: "ctrl+shift+l",
        },
        {
          id: "6",
          name: "Leave Reports",
          path: "/reports",
          policy1: policy?.report,
          hotKey: "ctrl+alt+r",
        },
        {
          id: "6",
          name: "Holidays",
          path: "/holidays",
          policy1: policy?.holiday,
          hotKey: "ctrl+h",
        },
        {
          id: "6",
          name: "Calendar",
          path: "/calendar",
          policy1: policy?.calendar,
          hotKey: "ctrl+q",
        },
      ],
    },
    {
      id: "7",
      name: "Request Tracker",
      image: requestIcon,
      activeImage: requestActiveIcon,
      hasSubMenu: true,
      options: [
        {
          id: "7",
          name: "Request Templates",
          path: "/request-template",
          policy1: policy?.request_template,
          hotKey: "ctrl+shift+m",
        },
        {
          id: "7",
          name: "Request Applications",
          path: "/request-application",
          policy1: policy?.user_request,
          hotKey: "ctrl+shift+q",
        },
      ],
    },
    {
      id: "8",
      name: "Activity Logs",
      path: "/logs",
      policy1: policy?.activity_log,
      image: notActiveRefresh,
      activeImage: activeRefresh,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+g",
    },
    {
      id: "9",
      name: isAdmin ? "Custom Notifications" : "Notifications",
      path: isAdmin ? "/custom-notifications" : "/notifications",
      policy1: policy?.custom_notification,
      image: bellIcon,
      activeImage: bellActive,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+1",
    },
    {
      id: "10",
      name: "Permissions",
      path: "/permissions",
      policy1: policy?.permissions,
      image: permissionIcon,
      activeImage: activePermission,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+p",
    },
    {
      id: "11",
      name: "Interims",
      path: "/interim",
      policy1: policy?.interim_role,
      image: interimIcon,
      activeImage: activeInterim,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+i",
    },
    {
      id: "12",
      name: "EPA Reports",
      path: "/epa-reports",
      policy1: policy?.epa_report,
      image: epaReportsIcon,
      activeImage: activeEpaReports,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+space",
    },
    {
      id: "13",
      name: "Documents",
      path: "/documents",
      policy1: policy?.document,
      image: doc,
      activeImage: activeDoc,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+d+o",
    },
    {
      id: "14",
      name: "Reporters",
      path: "/reporters",
      policy1: policy?.reporter,
      image: active_reportee,
      activeImage: inactive_reportee,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+x",
    },
    {
      id: "15",
      name: "Network Access",
      path: "/network-access",
      policy1: policy?.network_access,
      image: active_network,
      activeImage: non_active_network,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+k",
    },
  ];
};

const userData = (policy, isAdmin) => {
  return [
    {
      id: "0",
      name: "Dashboard",
      path: "/dashboard",
      image: dashboardIcon,
      activeImage: dashboardActiveIcon,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+d",
    },
    {
      id: "1",
      name: "Office Details",
      image: credentialsIcon,
      policy1: policy?.employee,
      activeImage: credentialsActive,
      path: "/office-details",
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+o",
    },
    {
      id: "2",
      name: "Leave Wallet",
      image: leaveWalletIcon,
      activeImage: leaveWalletActive,
      policy1: policy?.wallet,
      path: "/leave-wallet",
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+v",
    },
    {
      id: "3",
      name: "Holidays",
      path: "/holidays",
      policy1: policy?.holiday,
      image: holidayIcon,
      activeImage: holidayActive,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+h",
    },
    {
      id: "4",
      name: "Calendar",
      path: "/calendar",
      policy1: policy?.calendar,
      image: calendersIcon,
      activeImage: calenderActive,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+q",
    },
    {
      id: "5",
      name: "Attendance",
      path: "/attendance",
      policy1: policy?.attendance,
      image: attendanceIcon,
      activeImage: attendanceActiveIcon,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+a",
    },
    {
      id: "6",
      name: "Leave Applications",
      path: "/leave-application",
      policy1: policy?.leave_application,
      image: leaveApplicationIcon,
      activeImage: leaveApplicationActive,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+l",
    },
    {
      id: "7",
      name: "Request Applications",
      path: "/request-application",
      policy1: policy?.user_request,
      image: requestIcon,
      activeImage: requestActiveIcon,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+shift+q",
    },
    {
      id: "8",
      name: "Activity Logs",
      path: "/logs",
      policy1: policy?.activity_log,
      image: notActiveRefresh,
      activeImage: activeRefresh,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+g",
    },
    {
      id: "9",
      name: isAdmin ? "Custom Notifications" : "Notifications",
      path: isAdmin ? "/custom-notifications" : "/notifications",
      policy1: policy?.custom_notification,
      image: bellIcon,
      activeImage: bellActive,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+1",
    },
    {
      id: "10",
      name: "Leave Types",
      policy1: policy?.leave_code,
      image: leaveTypeIcon,
      activeImage: leaveTypeActive,
      path: "/leave-types",
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+y",
    },
    {
      id: "11",
      name: "Shift Schedule",
      path: "/working-schedule",
      policy1: policy?.shift_schedule,
      image: shiftImage,
      activeImage: shiftActiveImage,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+s",
    },
    {
      id: "12",
      name: "EPA Reports",
      path: "/epa-reports",
      policy1: policy?.epa_report,
      image: epaReportsIcon,
      activeImage: activeEpaReports,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+space",
    },
    {
      id: "13",
      name: "Documents",
      path: "/documents",
      policy1: policy?.document,
      image: doc,
      activeImage: activeDoc,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+d+o",
    },
    {
      id: "14",
      name: "Leave Reports",
      path: "/reports",
      policy1: policy?.report,
      image: non_active_reports,
      activeImage: active_reports,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+alt+r",
    },

    {
      id: "15",
      name: "Contract Details",
      path: "/contract-details",
      policy1: policy?.contract,
      image: contractNonActive,
      activeImage: contractActive,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+shift+c",
    },
    {
      id: "15",
      name: "Interims ",
      path: "/interim",
      policy1: policy?.interim_role,
      image: interimIcon,
      activeImage: activeInterim,
      hasSubMenu: false,
      options: [],
      hotKey: "ctrl+i",
    },
  ];
};

// --------- Component ------------

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const policy = useSelector((state) => state.policy?.policy);
  const savedData = useSelector((state) => state.employee.data);
  const policyNumber = useSelector((state) => state.auth.auth.policyNumber);
  const isAdmin = useSelector((state) => state.auth.auth.userAdmin);

  const showAlert = shouldShowAlert(policy, policyNumber, savedData);

  const { data: policyData, isLoading } = useQuery({
    queryKey: "loginUserPolicy",
    // Specifies the function that fetches the data for the query
    queryFn: () => loginUserPolicy(),
    keepPreviousData: false,
    retry: false,
    refetchOnWindowFocus: false,
    notifyOnChangeProps: ["data", "error"],
  });

  useEffect(() => {
    dispatch(setPolicy(policyData && policyData[policyNumber]?.policy));
  }, [dispatch, policyData, policyNumber]);

  // set policy
  useEffect(() => {
    if (savedData) {
      if (savedData?.role_code === "ceo") {
        const userMenu = userData(policy, isAdmin);
        const filteredMenu = userMenu.filter(
          (item) => item.name !== "Interims"
        );
        dispatch(setAdminSideMenue(adminData(policy, isAdmin)));
        dispatch(setUserSideMenue(filteredMenu));
      } else if (policy) {
        policy?.admin === false && dispatch(userCheck(false));
        getAdminArray(adminData(policy, isAdmin)).then((resultArray) => {
          dispatch(setAdminSideMenue(resultArray));
        });
        getUserArray(userData(policy, isAdmin)).then((resultArray) => {
          dispatch(setUserSideMenue(resultArray));
        });
      }
    }
  }, [dispatch, policy, savedData, savedData?.role_code]);

  // Socket socket
  useEffect(() => {
    const token = localStorage.getItem("token");
    async function intializeSocket() {
      if (token) {
        dispatch(socketClient(token));
        dispatch(socketConnect());
        dispatch(listenEvents());
      }
    }
    intializeSocket();
    return () => {
      dispatch(socketDisconnect());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoading(true));
  }, [dispatch, isLoading]);

  return (
    <Box sx={mainBox}>
      <Box>
        <SideBar />
      </Box>
      <Box sx={mainContainer}>
        <Box sx={wrapper}>
          {isLoading ? null : (
            <>
              <Box
                sx={{
                  position: "sticky",
                  top: 0,
                  zIndex: 9,
                }}
              >
                <TopBar />
              </Box>
              {showAlert && (
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: "auto", sm: `${alertHeight}px` },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pt: "8px",
                    pl: "16px",
                    pr: "16px",
                  }}
                >
                  <WarningAlert
                    alertData={"this profile alert message"}
                    item={savedData}
                  />
                </Box>
              )}

              {children}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
