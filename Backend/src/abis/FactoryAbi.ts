export const FactoryAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "contract MyToken",
        "name": "contractAddress",
        "type": "address"
      }
    ],
    "name": "RoundCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_cost",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_vault",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_admin",
        "type": "address"
      }
    ],
    "name": "_mintNewNFT",
    "outputs": [
      {
        "internalType": "contract MyToken",
        "name": "_contract",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
