import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBlocks } from "./store/slices/ledgerSlice";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import UserLayout from "./layouts/UserLayout"; // <--- IMPORT NEW LAYOUT

// Pages
import LandingPage from "./pages/auth/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import OnboardingPage from "./pages/auth/OnboardingPage";
import KYCPage from "./pages/auth/KYCPage";

import Dashboard from "./pages/Dashboard";
import WalletPage from "./pages/user/WalletPage";
import IssuancePage from "./pages/admin/IssuancePage";
import SettlementPage from "./pages/merchant/SettlementPage";
import PoRPage from "./pages/compliance/PoRPage";

// Route Guard
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateBlocks());
    }, 3000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Routes>
      {/* --- PUBLIC ROUTES --- */}
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/kyc" element={<KYCPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* --- PROTECTED ROUTES --- */}

      {/* GROUP 1: User Layout (Navbar wala Style) */}
      {/* Sirf WalletPage is layout ko use karega */}
      <Route element={<UserLayout />}>
        <Route element={<ProtectedRoute resource="wallet" />}>
          <Route path="/user" element={<WalletPage />} />
        </Route>
      </Route>

      {/* GROUP 2: Standard Dashboard Layout (Sidebar wala Style) */}
      {/* Baaki sab roles is purane layout ko use karenge */}
      <Route element={<DashboardLayout />}>
        {/* Common Dashboard */}
        <Route element={<ProtectedRoute resource="dashboard" />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        {/* Admin Only */}
        <Route element={<ProtectedRoute resource="issuance" />}>
          <Route path="/admin/issuance" element={<IssuancePage />} />
        </Route>

        {/* Merchant Only */}
        <Route element={<ProtectedRoute resource="settlement" />}>
          <Route path="/merchant/settlement" element={<SettlementPage />} />
        </Route>

        {/* Regulator Only */}
        <Route element={<ProtectedRoute resource="por" />}>
          <Route path="/compliance/por" element={<PoRPage />} />
        </Route>
      </Route>

      {/* --- FALLBACK --- */}
      <Route path="*" element={<Navigate to="/landing" />} />
    </Routes>
  );
}
