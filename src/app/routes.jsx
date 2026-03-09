import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import PortfolioList from "../pages/PortfolioList";
import PortfolioDetail from "../pages/PortfolioDetail";
import Pricing from "../pages/Pricing";
import Contact from "../pages/Contact";

import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminCompany from "../pages/admin/AdminCompany";
import AdminInterior from "../pages/admin/AdminInterior";
import AdminPortfolio from "../pages/admin/AdminPortfolio";
import AdminPricing from "../pages/admin/AdminPricing";

import AdminGuard from "../components/admin/AdminGuard";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/portfolio", element: <PortfolioList /> },
  { path: "/portfolio/:slug", element: <PortfolioDetail /> },
  { path: "/pricing", element: <Pricing /> },
  { path: "/contact", element: <Contact /> },

  { path: "/admin/login", element: <AdminLogin /> },
  {
    path: "/admin",
    element: (
      <AdminGuard>
        <AdminDashboard />
      </AdminGuard>
    ),
  },
  {
    path: "/admin/company",
    element: (
      <AdminGuard>
        <AdminCompany />
      </AdminGuard>
    ),
  },
  {
    path: "/admin/interior",
    element: (
      <AdminGuard>
        <AdminInterior />
      </AdminGuard>
    ),
  },
  {
    path: "/admin/portfolio",
    element: (
      <AdminGuard>
        <AdminPortfolio />
      </AdminGuard>
    ),
  },
  {
    path: "/admin/pricing",
    element: (
      <AdminGuard>
        <AdminPricing />
      </AdminGuard>
    ),
  },
]);