import { ContractInterface, ethers } from "ethers";
import { getRPCProviderURL } from "./shh";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
const IUniswapV3PoolABI = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const WBTC: Readonly<string> = "0x99ac8cA7087fA4A2A1FB6357269965A2014ABc35";
const ETH: Readonly<string> = "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8";
export const getPrice = async (tokenPool: string = WBTC): Promise<string> => {
  const provider = new ethers.providers.JsonRpcProvider(getRPCProviderURL());
  const poolContract = new ethers.Contract(
    tokenPool,
    IUniswapV3PoolABI.abi,
    provider
  );
  const TOKEN0 = new Token(
    1,
    await poolContract.token0(),
    18,
    "symbol",
    "name"
  );
  const TOKEN1 = new Token(
    1,
    await poolContract.token1(),
    18,
    "symbol",
    "name"
  );
  const slot = await poolContract.slot0();
  const POOL = new Pool(
    TOKEN0,
    TOKEN1,
    await poolContract.fee(),
    slot.sqrtPriceX96.toString(),
    await poolContract.liquidity(),
    slot.tick
  );
  return `${Number(POOL.token0Price.toFixed()) * 100}`;
};
