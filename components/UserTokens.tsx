import React, { useState } from "react";

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
  useToast,
} from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead,
} from "wagmi";

import settings from "../config/settings";
import abi from "../data/abi";

import { useUserContext } from "../context/UserInfoContext";
import { BigNumber, ethers } from "ethers";

function UserTokens() {
  const { userValues, updateContext } = useUserContext();
  const [claimableRewards, setClaimableRewards] = useState<string>();
  const [currentBalance, setCurrentBalance] = useState<string>();
  const toast = useToast();

  const { data: claimableData, error: claimableError } = useContractRead({
    address: settings.nftStakingContractAddress as `0x${string}`,
    abi: abi.NFTStaking.abi,
    functionName: "userStakeInfo",
    args: [userValues.address],
    onSuccess(data) {
      setClaimableRewards(ethers.utils.formatEther(data._availableRewards));
    },
  });

  // =================================================================================

  const { data: balanceData, error: balanceError } = useContractRead({
    address: settings.nftTokenContractAddress as `0x${string}`,
    abi: abi.FariaToken.abi,
    functionName: "balanceOf",
    args: [userValues.address],
    onSuccess(data) {
      setCurrentBalance(ethers.utils.formatUnits(data, 18));
    },
  });

  // ========================================================================

  const { config: claimConfig, error } = usePrepareContractWrite({
    address: settings.nftStakingContractAddress as `0x${string}`,
    abi: abi.NFTStaking.abi,
    functionName: "claimRewards",
    args: []
  });

  const { write: claim, data: txData } = useContractWrite(claimConfig);

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

  const handleClaim = () => {
    console.log('a')
    claim?.();
  };

  // ===============================================================================

  return (
    <TableContainer width={800} marginTop="1rem">
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
            <Td>{claimableRewards ? claimableRewards : "Loading..."}</Td>
            <Td>
              <Button
                className="claim-button"
                size="xs"
                variant="outline"
                onClick={() => handleClaim()}
              >
                CLAIM
              </Button>
            </Td>
          </Tr>
          <Tr>
            <Td>Current Balance</Td>
            <Td>{currentBalance ? currentBalance : "Loading..."}</Td>
            <Td> </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default UserTokens;
