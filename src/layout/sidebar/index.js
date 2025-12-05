import { useState } from "react";
import SideDrawer from "layout/common/SideDrawer";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerOpen = () => {
    setAnchorEl(false);
    setOpen(!open);
  };

  return (
    <SideDrawer
      isSmallScreenSideDrawer={false}
      open={open}
      setOpen={setOpen}
      anchorEl={anchorEl}
      setAnchorEl={setAnchorEl}
      handleDrawerOpen={handleDrawerOpen}
    />
  );
}
