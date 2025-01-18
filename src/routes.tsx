import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

import HomepageLayout from "./Layout/HomeLayout";
import BaseLayout from "./Layout/BaseLayout";
import SingleShowLayout from "./Layout/ShowLayout";
import { Loader } from "./ui-components/Loader";

// Pages
const HomePage = Loader(lazy(() => import("./screens/Homepage.screen")));
const ShowPage = Loader(lazy(() => import("./screens/Show.screen")));

// Routes configuration

const routes: RouteObject[] = [
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/homepage" replace />,
      },
      {
        path: "/homepage",
        element: <HomepageLayout />,
        children: [{ element: <HomePage />, path: "" }],
      },
      {
        path: "/show/:showId",
        element: <SingleShowLayout />,
        children: [{ path: "", element: <ShowPage /> }],
      },
    ],
  },
];

export default routes;
