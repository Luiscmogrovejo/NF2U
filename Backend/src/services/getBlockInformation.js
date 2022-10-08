const Web3 = require('web3')


/**
 * GET trasactions.
 */
async function geBlockInfo() {
    try {
        const web3 = new Web3('https://attentive-ancient-spring.matic-testnet.discover.quiknode.pro/ffd31463498f334a11f8583f94c9e030e0b82c90/')
        const answerd = await web3.eth.getBlock('latest')
        const blockNum = await web3.eth.getBlockNumber()

        return {
            code: 200,
            status: "success",
            message: "already obtained",
            data: {
                answerd,
                blockNum
            }
        }
    } catch (error) {
        console.log(error);
        return {
            code: 400,
            status: "failure",
            message: "wrong entity type",
            data: null,
            errors: [
                error
            ],
        }
    }
}
// Export default
module.exports = geBlockInfo;