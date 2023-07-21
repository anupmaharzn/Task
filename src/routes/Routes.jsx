import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as RouteList from "./constants";
import LandingScreen from "../Pages/Home/LandingScreen";
import Profile from "../Pages/Profile";
const Routess = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteList.Home} element={<LandingScreen />} />
        <Route path={RouteList.Profile} element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routess;
