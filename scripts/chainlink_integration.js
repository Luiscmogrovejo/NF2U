const Web3 = require("web3")

function get_eth_price() {

    const address_dict = {
        'goerli': '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e'
        // 'abritrumGoerli':''
    }

    const web3 = new Web3("https://rpc.ankr.com/eth_goerli")
    // const web3 = new Web3("https://necessary-frequent-dust.arbitrum-goerli.discover.quiknode.pro/9f05f61e1a2686ed3412efca21a143dcf9bcaa2f/")
    const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
    const addr = address_dict['goerli']
    const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr)

    priceFeed.methods.latestRoundData().call()
        .then((roundData) => {
            // Do something with roundData
            let price = parseInt(roundData['answer'] / 100000000);
            console.log("Latest price: ", price)
            return price;
        })
}

function get_matic_price() {

    const address_dict = {
        'mumbai': '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0'
        // '':''
    }

    const web3 = new Web3("https://rpc.ankr.com/eth_goerli")
    const aggregatorV3InterfaceABI = [	{		"inputs": [],		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"inputs": [],		"name": "getLatestPrice",		"outputs": [			{				"internalType": "int256",				"name": "",				"type": "int256"			}		],		"stateMutability": "view",		"type": "function"	}]
    const addr = address_dict['mumbai']
    const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr)

    priceFeed.methods.getLatestPrice().call()
        .then((roundData) => {
            // Do something with roundData
            let price = parseInt(roundData['answer'] / 100000000);
            console.log("Latest price: ", price)
            return price;
        })
}

get_eth_price();

