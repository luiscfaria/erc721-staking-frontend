const settings = {
    alchemy: {
        id: process.env.NEXT_PUBLIC_ALCHEMY_ID || "error"
    },
    moralisKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY || "error",
    nftContractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || "error"
}

export default settings;