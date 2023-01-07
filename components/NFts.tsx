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

import { Button } from "@chakra-ui/react";

function NFTs() {
  return (
    <TableContainer width={800} marginTop="1rem">
      <Table variant="simple">
        <TableCaption color="white">User NFTs</TableCaption>
        <Thead>
          <Tr color="#A9149C">
            <Th color="#A9149C">NFT</Th>
            <Th color="#A9149C"> </Th>
            <Th color="#A9149C">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Claimable Rewards</Td>
            <Td> </Td>
            <Td>
              <Button className="claim-button" size="xs" variant="outline">
                STAKE
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Td>Current Balance</Td>
            <Td> </Td>
            <Td> </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default NFTs;
