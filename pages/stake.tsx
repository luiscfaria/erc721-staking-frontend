import React from "react";
import UserTokens from "../components/UserTokens";
import NFTs from "../components/NFts";
import art from "../public/art.jpg";
import Menu from "../components/Menu";

function stake() {
  return (
    <>
      <div className="art" style={{ backgroundImage: `url(${art.src})` }}></div>
      <Menu />

      <div className="main">
        <UserTokens />
        <h1>Your NFTs</h1>
        <NFTs />
      </div>
    </>
  );
}

export default stake;
