import { Outlet, createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import PortfolioList from "../pages/PortfolioList";
import PortfolioDetail from "../pages/PortfolioDetail";
import Pricing from "../pages/Pricing";
import Contact from "../pages/Contact";

import ScrollToTop from "../components/layout/ScrollToTop";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/portfolio", element: <PortfolioDetail /> },
      { path: "/pricing", element: <Pricing /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);