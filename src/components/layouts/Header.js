import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const NAV_WIDTH = 280;
const NAV_COLLAPSED_WIDTH = 88;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

export default function Header({
  onOpenNav,
  user,
  onLogout,
  isDesktop,
  isCollapsed,
}) {
  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER_MOBILE,
        zIndex: (theme) => theme.zIndex.appBar + 1,
        bgcolor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(6px)",
        transition: (theme) =>
          theme.transitions.create(["width", "height"], {
            duration: theme.transitions.duration.shorter,
          }),
        // ✅ Dynamic Width for Desktop
        width: {
          lg: `calc(100% - ${isCollapsed ? NAV_COLLAPSED_WIDTH : NAV_WIDTH}px)`,
        },
      }}
    >
      <Toolbar sx={{ height: 1, px: { lg: 5 } }}>
        {/* Mobile Toggle Button */}
        {!isDesktop && (
          <IconButton onClick={onOpenNav} sx={{ mr: 1, color: "text.primary" }}>
            <MenuIcon />
          </IconButton>
        )}

        <IconButton sx={{ color: "text.secondary" }}>
          <SearchIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            src="https://flagcdn.com/w40/gb.png"
            sx={{ width: 24, height: 16, borderRadius: 0.5 }}
          />
          <IconButton sx={{ color: "text.secondary" }}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton sx={{ color: "text.secondary" }}>
            <SettingsIcon />
          </IconButton>
          <Avatar
            src="/static/images/avatar/1.jpg"
            alt={user?.name}
            onClick={onLogout}
            sx={{
              width: 40,
              height: 40,
              cursor: "pointer",
              border: "solid 2px #fff",
            }}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
