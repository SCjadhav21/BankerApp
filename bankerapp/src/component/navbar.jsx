import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineTransaction } from "react-icons/ai";
import { GrMenu, GrUserAdmin } from "react-icons/gr";

import {
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { AddContext } from "../context/AppContext";

const Navbar = () => {
  const { state, setState } = React.useContext(AddContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setState({ ...state, token: "", userName: "", userType: "" });
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box className="nav">
      <Heading>
        <span className="white">SJ</span>
        <span className="black">_Banker</span>
      </Heading>
      {state.token && (
        <Box margin="0px 20px 0px auto">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<GrMenu className="icon" />}
              variant="solid"
            />
            <MenuList>
              <Link to="/banker">
                <MenuItem icon={<GrUserAdmin className="icon" />}>
                  Banker Page
                </MenuItem>
              </Link>
              <Link to="/">
                <MenuItem icon={<AiOutlineTransaction className="icon" />}>
                  Transaction Page
                </MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
      )}
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
