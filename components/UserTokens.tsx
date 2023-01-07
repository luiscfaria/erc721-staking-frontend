import React from "react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import { Button, ButtonGroup } from "@chakra-ui/react";

function UserTokens() {
  return (
    <TableContainer width={800}>
      <Table variant="simple">
        <TableCaption color="white">User Tokens</TableCaption>
        <Thead>
          <Tr color="#A9149C">
            <Th color="#A9149C">Rewards</Th>
            <Th color="#A9149C">Value</Th>
            <Th color="#A9149C">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Claimable Rewards</Td>
            <Td>0000000000000000</Td>
            <Td>
              <Button className="claim-button" size="xs" variant='outline'>
                CLAIM
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Td>Current Balance</Td>
            <Td>0000000000000000</Td>
            <Td> </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default UserTokens;
