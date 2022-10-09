require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
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
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    goerliop: {
      url: `https://goerli.optimism.io/`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    bsctest: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    fantom: {
      url: "https://rpc.ftm.tools/",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    fantom_test: {
      url: "https://rpc.testnet.fantom.network/",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    scrollTestnet: {
      url: "https://prealpha.scroll.io/l2",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
