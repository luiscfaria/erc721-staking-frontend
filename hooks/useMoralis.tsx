import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import settings from "../config/settings";

function useMoralis() {
  const getUserNfts = async () => {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: settings.moralisKey,
      });
    }

    const address = settings.nftContractAddress;

    const chain = EvmChain.GOERLI;

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });

    console.log(response.toJSON());
  };
  return { getUserNfts };
}

export default useMoralis;
