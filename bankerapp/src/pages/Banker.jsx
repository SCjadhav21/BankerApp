import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AddContext } from "../context/AppContext";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

let userData = (token) => {
  return axios({
    method: "GET",
    url: "http://localhost:4500/user/alluser",
    headers: {
      Authorization: token,
    },
  });
};

let TransactionDetails = (token, id) => {
  return axios({
    method: "GET",
    url: `http://localhost:4500/trans/transaction/${id}`,
    headers: {
      Authorization: token,
    },
  });
};

const Banker = () => {
  const { state, setState } = useContext(AddContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const [trans, setTrans] = useState("");

  let [data, setData] = useState("");
  useEffect(() => {
    setState({ ...state, loading: true });
    userData(state.token)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setState({ ...state, loading: false }));
  }, []);

  const getData = (id) => {
    setState({ ...state, loading: true });
    TransactionDetails(state.token, id)
      .then((res) => {
        setTrans(res.data.transactionRecords);
        onOpen();
      })
      .catch((err) => console.log(err))
      .finally(() => setState({ ...state, loading: false }));
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

  if (data === "Not Authorised") {
    alert("use admin credentials");
  }

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
      {data && (
        <SimpleGrid columns={[1, 2, 2, 2]}>
          {data?.map((el) => {
            return (
              <Box
                boxShadow={"rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"}
                key={el._id}
                m="10px"
                p="20px"
              >
                <Text>Locker Id: {el._id}</Text>
                <Text>Customer Name: {el.name}</Text>
                <Text>Customer Email: {el.email}</Text>
                <Button onClick={() => getData(el._id)}>
                  See Transactions
                </Button>
              </Box>
            );
          })}
        </SimpleGrid>
      )}

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Transactions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                {trans && (
                  <Tbody>
                    {trans?.map((el, index) => {
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
                )}
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Banker;
