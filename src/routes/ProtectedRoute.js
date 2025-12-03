import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { getCasbinEnforcer } from "../config/casbinConfig"; // ✅ Path verify kar lein

export default function ProtectedRoute({ resource }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [canAccess, setCanAccess] = useState(null); // null = checking, false = denied, true = allowed

  useEffect(() => {
    const checkPermission = async () => {
      // 1. Agar user login hi nahi hai, ya role nahi hai
      if (!isAuthenticated || !user?.role) {
        setCanAccess(false);
        return;
      }

      try {
        // 2. Casbin Enforcer load karein
        const enforcer = await getCasbinEnforcer();

        // 3. Permission Check: enforce(sub, obj, act)
        // User Role -> Resource (e.g. 'issuance') -> Action ('read')
        const allowed = await enforcer.enforce(user.role, resource, "read");

        setCanAccess(allowed);
      } catch (error) {
        console.error("Casbin Permission Error:", error);
        setCanAccess(false);
      }
    };

    checkPermission();
  }, [isAuthenticated, user, resource]);

  // --- RENDERING LOGIC ---

  // 1. Not Logged In
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Loading State (Jab tak Casbin check kar raha hai)
  if (canAccess === null) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // 3. Access Denied (403)
  if (canAccess === false) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          textAlign: "center",
          p: 3,
        }}
      >
        <Typography variant="h1" fontWeight="bold" color="error.main">
          403
        </Typography>
        <Typography variant="h5" gutterBottom>
          Access Denied
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          You do not have permission to view the <strong>{resource}</strong>{" "}
          module.
        </Typography>
        <Button variant="contained" href="/">
          Go to Dashboard
        </Button>
      </Box>
    );
  }

  // 4. Access Granted
  return <Outlet />;
}