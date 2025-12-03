import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutes from "../helper/PrivateRoutes";
import PublicRoute from "../helper/PublicRoute";
import Loader from "../components/loader/Loader";
import DashboardLayout from "../layouts/DashboardLayout";

const Contact = lazy(() => import("../pages/contact/Contact"));
const MessageList = lazy(() =>
  import("../pages/contact/component/MessageList")
);
const LogIN = lazy(() => import("../pages/signIn/LogIN"));
const DashboardApp = lazy(() => import("../pages/DashboardApp"));
const NotFound = lazy(() => import("../pages/notFound/NotFound"));

// Zenith PoC Pages
const ZenithLanding = lazy(() => import("../pages/zenith/ZenithLanding"));
const ZenithDashboard = lazy(() => import("../pages/zenith/ZenithDashboard"));
const OnboardingUser = lazy(() => import("../pages/zenith/OnboardingUser"));
const OnboardingMerchant = lazy(() =>
  import("../pages/zenith/OnboardingMerchant")
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/sign-in" element={<LogIN />} />

          {/* Zenith Public Landing */}
          <Route path="/zenith" element={<ZenithLanding />} />
          <Route path="/zenith/onboard-user" element={<OnboardingUser />} />
          <Route
            path="/zenith/onboard-merchant"
            element={<OnboardingMerchant />}
          />
        </Route>

        {/* --- PRIVATE ROUTES (Wrapped with DashboardLayout) --- */}
        <Route element={<PrivateRoutes />}>
          <Route element={<DashboardLayout />}>
            {/* Default Route */}
            <Route path="/" element={<DashboardApp />} />

            {/* Existing Pages */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/:id" element={<MessageList />} />

            {/* Zenith Dashboard (Protected) */}
            <Route path="/zenith/dashboard" element={<ZenithDashboard />} />

            {/* Sidebar wale naye routes */}
            <Route path="/user" element={<div>User Page</div>} />
            <Route path="/files" element={<div>File Manager</div>} />

            {/* Invoice Routes */}
            <Route path="/invoice/list" element={<div>Invoice List</div>} />
            <Route
              path="/invoice/details"
              element={<div>Invoice Details</div>}
            />
          </Route>
        </Route>

        {/* --- 404 HANDLING --- */}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
