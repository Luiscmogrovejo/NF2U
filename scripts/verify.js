const hre = require('hardhat');
const config = require('./config');

async function main() {
  await hre.run('verify:verify', {
    address: config.StrainFactory,
    constructorArguments: [
      config.STRNToken,
      config.treasuryAddress
    ],
    contract: 'contracts/certificados/StrainFactory.sol:StrainFactory',
  });
  await hre.run('verify:verify', {
    address: config.StrainStaking,
    constructorArguments: [
      config.StrainFactory,
      config.STRNToken,
      config.WTRToken,
      config.FERTToken,
      config.treasuryAddress
    ],
    contract: 'contracts/certificados/StrainNFTStakingContract.sol:StrainNFTStakingContract',
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
