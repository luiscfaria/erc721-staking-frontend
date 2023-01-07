import React from "react";
import UserTokens from "../components/UserTokens";
import NFTs from "../components/NFts";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import art from '../public/art.jpg'

import { useAccount, useDisconnect } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <>
      <div
        className="art"
        style={{ backgroundImage: `url(${art.src})`}}
      ></div>
      <div className="main">
        <h1>Stake your NFTs and claim rewards!</h1>
        <div>{address}</div>
        {isConnected ? (
          <>
            <UserTokens />
            <NFTs />
          </>
        ) : (
          <ConnectButton />
        )}
      </div>
    </>
  );
}
