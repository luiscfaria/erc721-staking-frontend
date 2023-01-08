import React from "react";
import UserTokens from "../components/UserTokens";
import NFTs from "../components/NFts";
import art from "../public/art.jpg";
import Menu from "../components/Menu";
import StakedNfts from "../components/StakedNfts";

function stake() {
  return (
    <>
      <div className="art" style={{ backgroundImage: `url(${art.src})` }}></div>
      <Menu />

      <div className="main">
        <UserTokens />
        <h1>Staked NFTs</h1>
        <StakedNfts />
        <h1 style={{ marginTop: '2rem' }}>Your NFTs</h1>
        <NFTs />
      </div>
    </>
  );
}

export default stake;
