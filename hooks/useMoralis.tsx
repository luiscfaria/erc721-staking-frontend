import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import settings from "../config/settings";
import { useUserContext } from "../context/UserInfoContext";

function useMoralis() {
  const { userValues, updateContext } = useUserContext();
  const getUserNfts = async (address: string): Promise<object[] | undefined> => {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: settings.moralisKey,
      });
    }

    // const address = userValues.address;
    const nftCollectionAddress = settings.nftContractAddress;

    const chain = EvmChain.GOERLI;

    const tokenAddresses = [nftCollectionAddress];

    try {
      const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
        tokenAddresses,
      });

      // console.log(response.toJSON().result);
      const result = response.toJSON().result;
      return result;
    } catch (error) {
      console.log("🚀 ~ getUserNfts ~ error", error);
      return undefined;
    }
  };
  return { getUserNfts };
}

export default useMoralis;
