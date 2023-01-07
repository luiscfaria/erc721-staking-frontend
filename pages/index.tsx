import React from "react";
import UserTokens from "../components/UserTokens";
import NFTs from "../components/NFts";

export default function Home() {
  return (
    <>
      <div className="main">
        <h1>Stake your NFTs and claim rewards!</h1>
        <UserTokens/>
        <NFTs />
      </div>
    </>
  );
}
