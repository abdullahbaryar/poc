import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // ✅ Redux se User lene ke liye
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
  alpha,
  Skeleton, // ✅ Loading state ke liye
} from "@mui/material";
import {
  Dashboard,
  AccountBalance,
  Store,
  VerifiedUser,
  AccountBalanceWallet,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

// ✅ Import Casbin Helper (Path check kar lena)
import { getCasbinEnforcer } from "../../config/casbinConfig";

// --- CONFIG ---
const NAV_WIDTH = 280;
const NAV_COLLAPSED_WIDTH = 88;

// ✅ STEP 1: Flattened Menu List (Added 'resource' key for Casbin)
const allMenuItems = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/",
    resource: "dashboard", // Matches Casbin Policy: p, role, dashboard, read
  },
  {
    text: "Issuance",
    icon: <AccountBalance />,
    path: "/admin/issuance",
    resource: "issuance",
  },
  {
    text: "Wallet",
    icon: <AccountBalanceWallet />,
    path: "/user/wallet",
    resource: "wallet",
  },
  {
    text: "Settlement",
    icon: <Store />,
    path: "/merchant/settlement",
    resource: "settlement",
  },
  {
    text: "Proof of Reserves",
    icon: <VerifiedUser />,
    path: "/compliance/por",
    resource: "por",
  },
];

export default function Sidebar({
  isOpenSidebar,
  onCloseSidebar,
  isDesktop,
  onToggleCollapse,
  isCollapsed,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get User from Redux
  const { user } = useSelector((state) => state.auth);

  // ✅ State for filtered menu items
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Close sidebar on route change (Mobile only)
  useEffect(() => {
    if (isOpenSidebar && !isDesktop) {
      onCloseSidebar();
    }
  }, [location.pathname]);

  // ✅ STEP 2: Filter Menu Items based on Casbin Permissions
  useEffect(() => {
    const filterMenu = async () => {
      if (!user?.role) return;
      setLoading(true);

      try {
        const enforcer = await getCasbinEnforcer();
        const allowedItems = [];

        for (const item of allMenuItems) {
          // Check: Can [role] read [resource]?
          const hasPermission = await enforcer.enforce(
            user.role,
            item.resource,
            "read"
          );

          if (hasPermission) {
            allowedItems.push(item);
          }
        }
        setFilteredItems(allowedItems);
      } catch (error) {
        console.error("Casbin Error:", error);
      } finally {
        setLoading(false);
      }
    };

    filterMenu();
  }, [user]);

  const renderContent = (
    <Box sx={{ height: 1, display: "flex", flexDirection: "column" }}>
      {/* 1. LOGO AREA */}
      <Box
        sx={{
          px: 2.5,
          py: 3,
          display: "inline-flex",
          justifyContent: isCollapsed ? "center" : "flex-start",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main", fontWeight: "bold" }}>M</Avatar>
      </Box>

      {/* 2. USER CARD (Hide in Mini Mode) */}
      {!isCollapsed && (
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              borderRadius: 1.5,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
            }}
          >
            <Avatar alt="User" sx={{ width: 40, height: 40 }} />
            <Box sx={{ ml: 2, minWidth: 0 }}>
              <Typography
                variant="subtitle2"
                noWrap
                sx={{ color: "text.primary", textTransform: "capitalize" }}
              >
                {user?.role || "User"}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* 3. MENU LIST */}
      <List disablePadding sx={{ px: 1 }}>
        {loading
          ? // Skeleton Loading while Casbin loads
            [1, 2, 3].map((i) => (
              <Box key={i} sx={{ px: 2.5, py: 1 }}>
                <Skeleton variant="rectangular" height={40} rx={5} />
              </Box>
            ))
          : // ✅ STEP 3: Render Filtered Items
            filteredItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <ListItem
                  key={item.text}
                  disablePadding
                  sx={{ mb: 0.5, display: "block" }}
                >
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      minHeight: 48,
                      justifyContent: isCollapsed ? "center" : "initial",
                      borderRadius: 1.5,
                      px: 2.5,
                      color: "text.secondary",
                      ...(active && {
                        color: "primary.main",
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.12),
                        fontWeight: "fontWeightBold",
                      }),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: isCollapsed ? 0 : 2,
                        justifyContent: "center",
                        color: active ? "primary.main" : "inherit",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    {!isCollapsed && (
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: active ? 600 : 400,
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: isCollapsed ? NAV_COLLAPSED_WIDTH : NAV_WIDTH },
        transition: "width 0.3s",
      }}
    >
      {/* MOBILE DRAWER */}
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: NAV_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}

      {/* DESKTOP DRAWER (Permanent) */}
      {isDesktop && (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: isCollapsed ? NAV_COLLAPSED_WIDTH : NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
              borderColor: "divider",
              transition: "width 0.3s",
              overflow: "visible",
            },
          }}
        >
          {/* THE COLLAPSE BUTTON */}
          <IconButton
            onClick={onToggleCollapse}
            sx={{
              position: "absolute",
              right: 0,
              top: 32,
              zIndex: 99,
              width: 28,
              height: 28,
              transform: "translateX(50%)",
              border: "1px dashed",
              borderColor: "divider",
              bgcolor: "background.default",
              padding: 0.5,
              boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.1)",
              "&:hover": { bgcolor: "grey.100" },
            }}
            size="small"
          >
            {isCollapsed ? (
              <ChevronRight fontSize="small" sx={{ color: "text.secondary" }} />
            ) : (
              <ChevronLeft fontSize="small" sx={{ color: "text.secondary" }} />
            )}
          </IconButton>

          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
