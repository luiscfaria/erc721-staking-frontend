import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import settings from "../config/settings";
import abi from "../data/abi";

function Menu() {
  const router = useRouter();
  const backToIndex = () => {
    router.push("/");
  };
  const toast = useToast();

  const price = 1000000000000000
  const buyAmount = 1;

  const { config, error } = usePrepareContractWrite({
    address: settings.nftContractAddress as `0x${string}`,
    abi: abi.FariaCollection.abi,
    functionName: "publicMint",
    args: [buyAmount],
    overrides: {
        value: price
    }
  });

  const { write, data: txData } = useContractWrite(config);

  const handleTransactionResult = (result: boolean) => {
    toast({
      title: result ? "Minted!" : "Something went wrong :(",
      status: result ? "success" : "error",
      isClosable: true,
    });
  };

  const {
    data: waitData,
    error: waitError,
    isLoading,
  } = useWaitForTransaction({
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

  const handleMint = () => {
    write?.()
  }

  return (
    <div className="menu">
      <div className="menu-btns">
        <Button
          size="md"
          mt={6}
          onClick={() => backToIndex()}
          className="menu-btn"
        >
          Back
        </Button>
        <Button
          className="menu-btn"
          size="md"
          mt={6}
          onClick={() =>handleMint()}
        >
          Mint New NFT
        </Button>
      </div>
    </div>
  );
}

export default Menu;
