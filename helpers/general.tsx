
  export const formatEthAddress = (address: string) =>
  address && address.slice(0, 5) + '...' + address.slice(38, 42) + ' ';