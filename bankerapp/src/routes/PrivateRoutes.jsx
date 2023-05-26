import React, { useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { AddContext } from "../context/AppContext";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const toast = useToast();
  const { state } = React.useContext(AddContext);

  if (!state.token) {
    toast({
      status: "warning",
      isClosable: true,
      duration: 5000,
      title: "Login First!",
    });
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>;
  }
};

export default PrivateRoute;

let checkAuth = (token) => {
  return axios({
    method: "GET",
    url: "https://good-pear-vulture-toga.cyclic.app/user/checkAuth",
    headers: {
      Authorization: token,
    },
  });
};

export const PrivateRouteAdmin = ({ children }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { state } = React.useContext(AddContext);
  const [auth, setAuth] = useState(false);
  if (!state.token) {
    toast({
      status: "warning",
      isClosable: true,
      duration: 5000,
      title: "Login First!",
    });
    return <Navigate to="/login" />;
  }
  checkAuth(state.token)
    .then((res) => {
      if (res.data == "Authorised") {
        setAuth(true);
      } else {
        toast({
          status: "warning",
          isClosable: true,
          duration: 5000,
          title: "Not Authorised!",
          description: "Please login as Administrator",
        });
        return navigate("/login");
      }
    })
    .catch((err) => console.log(err));

  if (auth) {
    return <>{children}</>;
  }
};
