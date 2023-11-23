import React, { useEffect, useState } from "react";
import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { DateTime } from "luxon";

const Transaction = ({ transaction, type }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" backgroundColor="white">
      <HStack spacing={2}>
        <Heading w={200}>${transaction.amount}</Heading>
        <VStack align="start" spacing={0}>
          <Text fontWeight="bold">{transaction.email}</Text>
          <Text fontSize="sm" color="gray.500">
            {DateTime.fromISO(transaction.timecreated).toRelative()}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

const TransactionList = ({ transactions, type }) => {
  return (
    <>
      {transactions.length > 0
        ? transactions.map((transaction, index) => (
            <Transaction key={index} transaction={transaction} type={type} />
          ))
        : `Be the first ${type === "auction" ? "bid" : "donation"}!`}
    </>
  );
};

export default TransactionList;
