import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Signup from "../pages/signup";
import Login from "../pages/login";
import PrivateRoute, { PrivateRouteAdmin } from "./PrivateRoutes";
import Transactions from "../pages/Transactions";
import Banker from "../pages/Banker";

const AllRoutes = () => {
  return (
    <Box>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/banker"
          element={
            <PrivateRouteAdmin>
              <Banker />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />
      </Routes>
    </Box>
  );
};

export default AllRoutes;
