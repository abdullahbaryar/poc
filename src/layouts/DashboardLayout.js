import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

const NAV_WIDTH = 280;
const NAV_COLLAPSED_WIDTH = 88;

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Responsive Hooks
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  // States
  const [openMobile, setOpenMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // For Desktop Mini View

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100%", overflow: "hidden" }}>
      {/* 1. HEADER (Pass Props) */}
      <Header
        user={user}
        onLogout={handleLogout}
        onOpenNav={() => setOpenMobile(true)} // Open Mobile Menu
        isDesktop={isDesktop}
        isCollapsed={isCollapsed}
      />

      {/* 2. SIDEBAR (Pass Props) */}
      <Sidebar
        role={user?.role}
        isDesktop={isDesktop}
        isOpenSidebar={openMobile}
        onCloseSidebar={() => setOpenMobile(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* 3. MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          pt: { xs: 8, lg: 12 },
          pb: 10,
          px: { xs: 2, sm: 5 },
          bgcolor: "#F9FAFB",
          width: "100%",
          minWidth: 0,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
