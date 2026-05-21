import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import {
  fallbackRoute,
  renderRouteGroups,
  routeGroups,
} from "./routes/app-route-tree";
import RouteLogger from "./components/RouteLogger";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <RouteLogger />
      <Routes>
        {renderRouteGroups(routeGroups)}
        {fallbackRoute}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
