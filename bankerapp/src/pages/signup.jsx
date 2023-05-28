import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  useDisclosure,
  Box,
  Text,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useEffect } from "react";

import { CloseIcon } from "@chakra-ui/icons";
const Signup = () => {
  const toast = useToast();
  const [data, setData] = useState({
    name: "",
    email: "",
    userType: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = React.useState(false);
  const [home, setHome] = React.useState(false);
  const [navigate, setNavigate] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => setShow(!show);

  const handleChange = (e) => {
    let { value, name } = e.target;

    setData({ ...data, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (data.name && data.password && data.email && data.userType) {
      if (data.password.length < 6) {
        alert("password is too stort");
        setLoading(false);
      } else {
        axios("https://good-pear-vulture-toga.cyclic.app/user/register", {
          method: "POST",
          data: data,
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => {
            if (res.status === 201) {
              toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 4000,
                isClosable: true,
              });
              setNavigate(true);
              setLoading(false);
            } else {
              toast({
                title: "Acount has been Already Regestered.",
                description: "Please Login to account or Create with new Email",
                status: "warning",
                duration: 3000,

                isClosable: true,
              });
              setLoading(false);
            }
          })
          .catch((err) => {
            let message = err.message;
            toast({
              title: { message },
              description: err.description,
              status: "error",
              duration: 3000,

              isClosable: true,
            });
            setLoading(false);
          });
      }
    } else {
      toast({
        title: "Some filed are Empty",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    onOpen();
  }, []);
  if (home) {
    return <Navigate to="/" />;
  }
  if (navigate) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Modal
        mt="50px"
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <Box w={["", "", "100vh"]} bgColor="#fff" p="10px" display="flex">
            <Box w={["100%", "100%", "70%"]}>
              <ModalHeader
                p="0px 20px 0px 20px"
                display="flex"
                gap="10%"
                justifyContent="space-between"
              >
                <Box display="flex" gap="10%" w="80%">
                  {" "}
                  <Text color="#24a3b5" padding="0 8px ">
                    <Link to="/login">LOGIN</Link>
                  </Text>
                  <Text
                    borderBottom="2px solid #24a3b5"
                    color="#24a3b5"
                    padding="0 8px 8px"
                  >
                    <Link to="signup">REGISTER</Link>
                  </Text>
                </Box>
                <Box fontSize={15} fontWeight="bold">
                  <Button
                    bgColor="#fff"
                    border="1px solid #E8F0FE"
                    onClick={() => setHome(true)}
                  >
                    {" "}
                    <CloseIcon />
                  </Button>
                </Box>
              </ModalHeader>

              <Box p="20px 20px 0px 20px">
                <form onSubmit={handelSubmit} isRequired>
                  <FormLabel
                    borderBottom="1px solid #ddd"
                    width="100%"
                    fontSize="14px"
                    padding="6px 0px"
                    color="#212121"
                  >
                    Full name
                  </FormLabel>
                  <Input
                    name="name"
                    onChange={handleChange}
                    value={data.name}
                    isRequired
                    type="text"
                    placeholder="Enter Name"
                  />
                  <FormLabel
                    borderBottom="1px solid #ddd"
                    width="100%"
                    fontSize="14px"
                    padding="6px 0px"
                    color="#212121"
                  >
                    User Type
                  </FormLabel>
                  <Select
                    name="userType"
                    onChange={handleChange}
                    value={data.userType}
                    isRequired
                    type="text"
                    placeholder="Select Type"
                  >
                    <option value="customer">Customer</option>
                    <option value="banker">Banker</option>
                  </Select>

                  <FormLabel
                    borderBottom="1px solid #ddd"
                    width="100%"
                    fontSize="14px"
                    padding="6px 0px"
                    color="#212121"
                  >
                    Email
                  </FormLabel>

                  <Input
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    isRequired
                    type="email"
                    placeholder="Enter Email"
                  />

                  <FormLabel
                    borderBottom="1px solid #ddd"
                    width="100%"
                    fontSize="14px"
                    padding="6px 0px"
                    color="#212121"
                  >
                    Password
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      name="password"
                      onChange={handleChange}
                      value={data.password}
                      isRequired
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <FormLabel></FormLabel>
                  <Button
                    textAlign="center "
                    fontSize="16px"
                    fontWeight="500"
                    borderRadius="3px"
                    backgroundClip="padding-box"
                    border="2px solid #FF7558"
                    outline="none"
                    padding="auto 20px"
                    whiteSpace="nowrap"
                    bgGradient="linear(0deg,#ff934b 0%,#ff5e62 100%)"
                    type="submit"
                    color="#fff"
                    isLoading={loading}
                    loadingText="Loading"
                    colorScheme="#FF7558"
                    spinnerPlacement="end"
                  >
                    Register
                  </Button>
                </form>
              </Box>
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Signup;
