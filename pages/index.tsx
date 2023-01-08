import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import art from "../public/art.jpg";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { formatEthAddress } from "../helpers/general";
import { useUserContext } from "../context/UserInfoContext";

export default function Home() {
  const router = useRouter();
  const { userValues, updateContext } = useUserContext();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isUserConnected, setIsUserConnected] = useState<boolean>(false);

  useEffect(() => {
    if (isConnected && address) {
      setIsUserConnected(true);
      updateContext({...userValues, address: address})
    }
  }, [address, isConnected]);

  const continueToApp = () => {
    router.push("/stake");
  };

  const handleDisconnect = () => {
    disconnect();
    setIsUserConnected(false);    
    updateContext({...userValues, address: ''})
  };

  const formatedAddress = address ? formatEthAddress(address) : "";

  return (
    <>
      <div className="art" style={{ backgroundImage: `url(${art.src})` }}></div>
      <div className="main">
        <h1 style={{ marginBottom: "1rem" }}>
          Stake your NFTs and claim rewards!
        </h1>
        {isUserConnected ? (
          <>
            <Button colorScheme="messenger" onClick={continueToApp}>
              {`Continue with ${formatEthAddress(formatedAddress)}`}
            </Button>
            <Button
              colorScheme="white"
              variant="outline"
              size="sm"
              onClick={() => handleDisconnect()}
              mt={6}
            >
              Sign out
            </Button>
          </>
        ) : (
          <ConnectButton />
        )}
      </div>
    </>
  );
}
