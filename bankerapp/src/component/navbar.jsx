import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import {
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useToast,
  Center,
} from "@chakra-ui/react";
import { AddContext } from "../context/AppContext";

const Navbar = () => {
  const { state, setState } = React.useContext(AddContext);

  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    setState({ ...state, token: "", userName: "" });
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box className="nav">
      <Heading>
        <span className="white">SJ</span>
        <span className="black">_Digital</span>
      </Heading>
      {state.token && (
        <Box className="right-end">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FaRegUserCircle className="icon" />}
              variant="solid"
            />

            <MenuList background="red" color="white">
              {/* <MenuItem > */}
              <Center background="red" color="white">
                Welcome
              </Center>

              <MenuItem
                background="red"
                color="white"
                icon={<FaRegUserCircle className="icon" />}
              >
                {state.userName}
              </MenuItem>
              <MenuItem
                background="red"
                color="white"
                icon={<FiLogOut className="icon" />}
                onClick={handleLogout}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
