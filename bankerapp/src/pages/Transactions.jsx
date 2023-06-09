import React, { useContext, useEffect, useState } from "react";
import { AddContext } from "../context/AppContext";
import axios from "axios";

import {
  Box,
  Button,
  Center,
  Heading,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Show,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

let userData = (token) => {
  return axios({
    method: "GET",
    url: "https://good-pear-vulture-toga.cyclic.app/trans/",
    headers: {
      Authorization: token,
    },
  });
};

let MakeTransaction = (token, amount, type) => {
  return axios({
    method: "POST",
    url: `https://good-pear-vulture-toga.cyclic.app/trans/${type}`,
    data: { amount: amount },
    headers: {
      Authorization: token,
    },
  });
};

const Transactions = () => {
  const { state, setState } = useContext(AddContext);
  const toast = useToast();
  const [getData, setGetData] = useState(false);
  const [data, setData] = useState("");
  const [value, setValue] = useState("");
  const [show, setShow] = useState("");

  useEffect(() => {
    setState({ ...state, loading: true });
    userData(state.token)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setState({ ...state, loading: false }));
  }, [getData]);

  const HandelTransaction = (type) => {
    if (value == "") {
      alert("add amount first");
    } else if (
      (type == "withdraw" && data?.balance < value) ||
      (data == "" && type == "withdraw")
    ) {
      alert("Insufficient funds");
    } else {
      MakeTransaction(state.token, value, type)
        .then((res) => {
          setValue("");
          setGetData(!getData);

          if (type == "withdraw") {
            toast({
              title: `Transactions successfull`,
              description: `Rs ${value} debited from your account`,
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          } else {
            toast({
              title: `Transactions successfull`,
              description: `Rs ${value} credited to your account`,
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          }
        })
        .catch((err) =>
          toast({
            title: "Transition failed",
            description: "Error occurred while transitioning",
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        );
    }
  };

  const handelShow = () => {
    if (data == "") {
      setShow("Img");
    } else {
      setShow("data");
    }
  };

  const hideShow = () => {
    setShow("");
  };

  let amt = 0;
  const TotalAmount = (amount, type) => {
    if (amount == "" || amount == undefined) {
      amt = 0;
      return 0;
    }
    if (type == "withdraw") {
      amt = amt - amount;
    } else {
      amt = amt + amount;
    }
    return amt;
  };

  const getDate = (timestamp) => {
    const datetime = new Date(timestamp);

    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1;
    const day = datetime.getDate();

    return `${year}-${month}-${day}`;
  };

  const getTime = (timestamp) => {
    const datetime = new Date(timestamp);

    const hour = datetime.getHours();
    const minute = datetime.getMinutes();
    const second = datetime.getSeconds();

    return `${hour}:${minute}:${second}`;
  };

  useEffect(() => {
    if (show == "Img") {
      handelShow();
    }
  }, [data]);

  if (state.loading) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }

  return (
    <div>
      <Box p={5}>
        {data?.balance ? (
          <Heading>Available Balance: ₹{data.balance}</Heading>
        ) : (
          <Heading>Available Balence: ₹0</Heading>
        )}
        <InputGroup m="8px">
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children="$"
          />
          <Input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            type="number"
            placeholder="Enter amount"
          />
          <InputRightElement>
            <CheckIcon color="green.500" />
          </InputRightElement>
        </InputGroup>

        <Box p="10px" display={"flex"} gap={8}>
          <Button
            colorScheme="green"
            variant={"outline"}
            onClick={() => HandelTransaction("deposite")}
          >
            Deposite
          </Button>
          <Button
            colorScheme="red"
            variant={"outline"}
            onClick={() => HandelTransaction("withdraw")}
          >
            Withdraw
          </Button>
        </Box>
      </Box>

      <Button
        colorScheme="blue"
        variant={"outline"}
        onClick={show !== "" ? hideShow : handelShow}
      >
        {show !== "" ? "Hide Transactions " : "Show Transactions"}
      </Button>

      {show == "data" ? (
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Sr No.</Th>
                <Th>Date of Transaction</Th>
                <Th>Time of Transaction</Th>
                <Th>Type of Transaction</Th>
                <Th isNumeric>Amount</Th>
                <Th>Balance</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.transactionRecords?.map((el, index) => {
                return (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{getDate(el.date)}</Td>
                    <Td>{getTime(el.date)}</Td>
                    <Td>{el?.type?.toUpperCase() || "NO TRANSACTION"}</Td>
                    <Td>{el.amount || 0}</Td>
                    <Td>{TotalAmount(el.amount, el.type)}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}

      {show == "Img" ? (
        <Center>
          {" "}
          <Img src="https://cdn.dribbble.com/users/736391/screenshots/4538317/emptystate.jpg" />
        </Center>
      ) : (
        ""
      )}
    </div>
  );
};

export default Transactions;
