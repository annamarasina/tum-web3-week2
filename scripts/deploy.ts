import { network } from "hardhat";

async function main() {
  // Connect to the network specified in the CLI
  const { viem } = await network.connect();
  
  // 1. Get the deployer signer and log details
  const [deployer] = await viem.getWalletClients();
  const publicClient = await viem.getPublicClient();
  const balance = await publicClient.getBalance({ address: deployer.account.address });
  
  console.log(`Deploying with: ${deployer.account.address}`);
  console.log(`Account balance: ${balance.toString()} wei`);

  // 2. Deploy the Counter contract
  console.log("Deploying Counter...");
  const counter = await viem.deployContract("Counter");
  
  // 3. Wait for deployment and print results
  console.log(`Counter deployed to: ${counter.address}`);
  
  // 4. Read initial value of x
  const x = await counter.read.x();
  console.log(`Initial x value: ${x}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});