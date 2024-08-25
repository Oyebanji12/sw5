const hre = require("hardhat");
const { ethers } = require("hardhat");
const { sendSignedShieldedQuery } = require("./utils");
const { SwisstronikProvider } = require("@swisstronik/swisstronik.js");
  
  const PK = "c8e65976f4aef5b770368d21e275378646055512f9bd068a1f85aab51fb87c89";
  const deployedContractAddress = "0xd5bda999eCC6fd3063D2C1e0C6B4adC11D055C91";
  
  async function main() {
    const PERC20 = await hre.ethers.getContractFactory("PERC721Sample");
    const perc20 = PERC20.attach(deployedContractAddress);
  
    const provider = new hre.ethers.providers.JsonRpcProvider(hre.network.config.url);
    const wallet = new hre.ethers.Wallet(PK, provider);
    // let addy2 = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";
    // addy2 = ethers.utils.getAddress(addy2);
  
    let encodedFunctionData = perc20.interface.encodeFunctionData("balanceOf", [wallet.address]);
    let req = await sendSignedShieldedQuery( wallet, perc20.address, encodedFunctionData);
  
    let balance = perc20.interface.decodeFunctionResult("balanceOf", req)[0];
    console.log('Balance: ', balance.toString());
  
  }
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });