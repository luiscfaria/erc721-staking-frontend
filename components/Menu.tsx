import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function Menu() {
  const router = useRouter();
  const backToIndex = () => {
    router.push("/");
  };
  return (
    <div className="menu">
      <div className="menu-btns">
        <Button
          size="md"
          mt={6}
          onClick={() => backToIndex()}
          className='menu-btn'
        >
          Back
        </Button>
        <Button
          className='menu-btn'
          size="md"
          mt={6}
          onClick={() => backToIndex()}
        >
          Mint New NFT
        </Button>
      </div>
    </div>
  );
}

export default Menu;
