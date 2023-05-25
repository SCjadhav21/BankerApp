import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AddContext } from "../context/AppContext";
import {
  Alert,
  Box,
  Button,
  Heading,
  Image,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Show,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

let userData = (token) => {
  return axios({
    method: "GET",
    url: "http://localhost:4500/trans/",
    headers: {
      Authorization: token,
    },
  });
};

let MakeTransaction = (token, amount, type) => {
  return axios({
    method: "POST",
    url: `http://localhost:4500/trans/${type}`,
    data: { amount: amount },
    headers: {
      Authorization: token,
    },
  });
};

const Transactions = () => {
  const { state, setState } = useContext(AddContext);
  const [data, setData] = useState("");
  const [value, setValue] = useState("");
  const [getData, setGetData] = useState(false);
  const [show, setShow] = useState("");
  useEffect(() => {
    userData(state.token)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
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
        })
        .catch((err) => console.log(err));
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

  let amt;
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
        <Img src="https://cdn.dribbble.com/users/736391/screenshots/4538317/emptystate.jpg" />
      ) : (
        ""
      )}
    </div>
  );
};

export default Transactions;
