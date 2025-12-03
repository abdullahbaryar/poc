import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBlocks } from "./store/slices/ledgerSlice";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import LandingPage from "./pages/auth/LandingPage"; 
import LoginPage from "./pages/auth/LoginPage"; 
import RegisterPage from "./pages/auth/RegisterPage"; 
import OnboardingPage from "./pages/auth/OnboardingPage"; 

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

      {/* 1. Entry Point: Role Selection Screen */}
      <Route path="/landing" element={<LandingPage />} />

      {/* 2. Login Screen (Email/Password) */}
      <Route path="/login" element={<LoginPage />} />

      {/* 3. Register Screen (Formik Form) */}
      <Route path="/register" element={<RegisterPage />} />

      {/* 4. Onboarding (Agar purana wala flow abhi bhi use ho raha hai) */}
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* --- PROTECTED ROUTES (Casbin Secured) --- */}
      <Route element={<DashboardLayout />}>
        {/* Dashboard accessible by everyone */}
        <Route element={<ProtectedRoute resource="dashboard" />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        {/* Admin Only */}
        <Route element={<ProtectedRoute resource="issuance" />}>
          <Route path="/admin/issuance" element={<IssuancePage />} />
        </Route>

        {/* User Only */}
        <Route element={<ProtectedRoute resource="wallet" />}>
          <Route path="/user/wallet" element={<WalletPage />} />
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
      {/* Koi galat link dale to Landing Page par bhej do */}
      <Route path="*" element={<Navigate to="/landing" />} />
    </Routes>
  );
}
