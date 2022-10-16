// Modified for the Arbitrum Hackathon

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  // defaultNetwork: "goerli",
  allowUnlimitedContractSize: true,
  solidity: {
    compilers: [
      {
        version: "0.8.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  gasReporter: {
    currency: "USD", // can be set to ETH and other currencies (see coinmarketcap api documentation)
    coinmarketcap: process.env.coinMarketCap_API,
  },
  networks: {
    // goerli: {
    //   // url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    //   url: `https://distinguished-light-breeze.ethereum-goerli.discover.quiknode.pro/39ed6ebac3cfbed9018e3298e383ef03820f023e/`,
    //   accounts: "remote",
    //   // accounts: [`0x${process.env.PRIVATE_KEY}`],
    // },

    arbitrumGoerli: {
      url: `https://necessary-frequent-dust.arbitrum-goerli.discover.quiknode.pro/9f05f61e1a2686ed3412efca21a143dcf9bcaa2f/`,
      // url: `https://goerli-rollup.arbitrum.io/rpc`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      // chainId: "42161",
    },

    // arbitrumNova: {
    //   url: `https://nova.arbitrum.io/`,
    //   accounts: [`0x${process.env.PRIVATE_KEY}`],  
    // }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
