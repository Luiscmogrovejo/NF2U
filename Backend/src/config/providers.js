// Updated for the Arbitrum Hackathon

const provider_list = {
  5: "https://distinguished-light-breeze.ethereum-goerli.discover.quiknode.pro/39ed6ebac3cfbed9018e3298e383ef03820f023e/", // Goerli
  42170: "", // Arbitrum Nova
  42161: "https://necessary-frequent-dust.arbitrum-goerli.discover.quiknode.pro/9f05f61e1a2686ed3412efca21a143dcf9bcaa2f/" // Arbitrum Goerli
};

const contracts_addresses = {
  5: "0xbad92a3E93b6c09ed77ae67AB93Dd785dF83d157",
  42161 : "0x675749A4848Bc85757E2B8dc0A4c754885C19Bd9",  //arbitrumGoerli
};

module.exports = {
  provider_list,
  contracts_addresses,
};
