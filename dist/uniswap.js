"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrice = void 0;
var ethers_1 = require("ethers");
var sdk_core_1 = require("@uniswap/sdk-core");
var v3_sdk_1 = require("@uniswap/v3-sdk");
var IUniswapV3PoolABI = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
var WBTC = "0x99ac8cA7087fA4A2A1FB6357269965A2014ABc35";
var getPrice = function () { return __awaiter(void 0, void 0, void 0, function () {
    var provider, tokenPool, poolContract, TOKEN0, _a, _b, TOKEN1, _c, _d, slot, POOL, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                provider = new ethers_1.ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/eb50ae4fbdea45a3a50f785cf6729537");
                tokenPool = WBTC;
                poolContract = new ethers_1.ethers.Contract(tokenPool, IUniswapV3PoolABI.abi, provider);
                _a = sdk_core_1.Token.bind;
                _b = [void 0, 1];
                return [4 /*yield*/, poolContract.token0()];
            case 1:
                TOKEN0 = new (_a.apply(sdk_core_1.Token, _b.concat([_g.sent(), 18,
                    "symbol",
                    "name"])))();
                _c = sdk_core_1.Token.bind;
                _d = [void 0, 1];
                return [4 /*yield*/, poolContract.token1()];
            case 2:
                TOKEN1 = new (_c.apply(sdk_core_1.Token, _d.concat([_g.sent(), 18,
                    "symbol",
                    "name"])))();
                return [4 /*yield*/, poolContract.slot0()];
            case 3:
                slot = _g.sent();
                _e = v3_sdk_1.Pool.bind;
                _f = [void 0, TOKEN0,
                    TOKEN1];
                return [4 /*yield*/, poolContract.fee()];
            case 4:
                _f = _f.concat([_g.sent(), slot.sqrtPriceX96.toString()]);
                return [4 /*yield*/, poolContract.liquidity()];
            case 5:
                POOL = new (_e.apply(v3_sdk_1.Pool, _f.concat([_g.sent(), slot.tick])))();
                return [2 /*return*/, "Bitcoin price today is: ".concat(Number(POOL.token0Price.toFixed()) * 100)];
        }
    });
}); };
exports.getPrice = getPrice;
//# sourceMappingURL=uniswap.js.map