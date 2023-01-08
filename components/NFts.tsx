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
  useToast,
} from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

import useMoralis from "../hooks/useMoralis";

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";

import settings from "../config/settings";
import abi from "../data/abi";

import { useUserContext } from "../context/UserInfoContext";


export interface INft {
  name: string;
  token_id: string;
}

function NFTs() {
  const { userValues, updateContext } = useUserContext();
  const { getUserNfts } = useMoralis();
  const [userNtfs, setUserNtfs] = useState<INft[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTokenId, setSelectedTokenId] = useState<string>("0");

  const toast = useToast();

  useEffect(() => {
    const initNtfs = async () => {
      setIsLoading(true);
      const nfts = await getUserNfts(userValues.address);
      setUserNtfs(nfts as INft[]);
      setIsLoading(false);
    };
    initNtfs();
  }, []);

  // =======================================================================

  const { data: NftData, error: NftError } = useContractRead({
    address: settings.nftContractAddress as `0x${string}`,
    abi: abi.FariaCollection.abi,
    functionName: "isApprovedForAll",
    args: [userValues.address, settings.nftStakingContractAddress],
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  // ========================================================================

  const { config: ApproveConfig, error: ApproveError } = usePrepareContractWrite({
    address: settings.nftContractAddress as `0x${string}`,
    abi: abi.FariaCollection.abi,
    functionName: "setApprovalForAll",
    args: [settings.nftStakingContractAddress, true],
  });

  const { write: setApprove, data: approveTxData } = useContractWrite(ApproveConfig);

  // ========================================================================

  const { config: stakeConfig, error } = usePrepareContractWrite({
    address: settings.nftStakingContractAddress as `0x${string}`,
    abi: abi.NFTStaking.abi,
    functionName: "stake",
    args: [[selectedTokenId]],
  });

  const { write: stakeNft, data: txData } = useContractWrite(stakeConfig);

  const handleTransactionResult = (result: boolean) => {
    toast({
      title: result ? "Success!" : "Something went wrong :(",
      status: result ? "success" : "error",
      isClosable: true,
    });
  };

  const { data: waitData, error: waitError } = useWaitForTransaction({
    hash: txData?.hash,
    onSuccess(data) {
      console.log("Use Wait on success", { data });
      if (data.status === 0) {
        handleTransactionResult(false);
      } else {
        handleTransactionResult(true);
      }
    },
  });

  const handleStakeNft = (id: string) => {
    if (!NftData) {
      setApprove?.()
    }
    setSelectedTokenId(id);
    stakeNft?.();
  };

  // ===============================================================================

  

  return (
    <>
      {isLoading ? (
        <div className="spinner" style={{ marginTop: "2rem" }}>
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
                      onClick={() => handleStakeNft(nft.token_id)}
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
