import React, { useEffect, useState } from "react";

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
  Divider,
} from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

import useMoralis from "../hooks/useMoralis";

function NFTs() {
  const { getUserNfts } = useMoralis();
  const [userNtfs, setUserNtfs] = useState<object[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initNtfs = async () => {
      setIsLoading(true);
      const nfts = await getUserNfts();
      setUserNtfs(nfts);
      setIsLoading(false);
    };
    initNtfs();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="spinner" style={{marginTop: '2rem'}}>
          <Spinner />
        </div>
      ) : (
        <TableContainer width={800} marginTop="1rem">
          <Table variant="simple">
            <TableCaption color="white">User NFTs</TableCaption>
            <Thead>
              <Tr color="#A9149C">
                <Th color="#A9149C">Name</Th>
                <Th color="#A9149C">Token ID</Th>
                <Th color="#A9149C" className="d-flex justify-center">
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {userNtfs?.map((nft, index) => (
                <Tr key={index}>
                  <Td>{nft.name}</Td>
                  <Td>{nft.token_id}</Td>
                  <Td className="d-flex justify-center">
                    <Button
                      className="claim-button"
                      size="xs"
                      variant="outline"
                    >
                      STAKE
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default NFTs;
