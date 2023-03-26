import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import DashboardInvestor from "../pages/DashboardInvestor";
import Register from "../pages/Register";
import DashboardCompany from "../pages/DashboardCompany";
import Marketplace from "../pages/Marketplace";
import Forbidden from "../pages/Forbidden";

const routes = [
  { path: "/", element: <Login />, id: 1 },
  { path: "/register", element: <Register />, id: 2 },
  { path: "/dashboardinvestor", element: <DashboardInvestor />, id: 3 },
  { path: "/marketplace", element: <Marketplace />, id: 4 },
  { path: "/dashboardcompany", element: <DashboardCompany />, id: 5 },
  { path: "/*", element: <NotFound />, id: 6 },
  { path: "/forbidden", element: <Forbidden />, id: 7 },
];

export default routes;