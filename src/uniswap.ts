import { ContractInterface, ethers } from "ethers";
import { getRPCProviderURL } from "./shh";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
const IUniswapV3PoolABI = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const WBTC: Readonly<string> = "0x99ac8cA7087fA4A2A1FB6357269965A2014ABc35";
export const listenToSwap = async (tokenPool: string = WBTC) => {
  const provider = new ethers.providers.JsonRpcProvider(getRPCProviderURL());
  const poolContract = new ethers.Contract(
    tokenPool,
    IUniswapV3PoolABI.abi,
    provider
  );
  const DAI = new Token(1, await poolContract.token0(), 18, "DAI", "WBTC");
  const USDC = new Token(1, await poolContract.token1(), 18, "symbol", "name");
  const slot = await poolContract.slot0();
  console.log(slot[0]);
  console.log(slot);
  console.log({
    DAI,
    USDC,
    a: await poolContract.fee(),
    b: slot.sqrtPriceX96.toString(),
    c: await poolContract.liquidity(),
    d: poolContract.tick,
  });
  const DAI_USDC_POOL = new Pool(
    DAI,
    USDC,
    await poolContract.fee(),
    slot.sqrtPriceX96.toString(),
    await poolContract.liquidity(),
    slot.tick
  );
  console.log(Number(DAI_USDC_POOL.token0Price.toFixed(5)) * 100);
};
