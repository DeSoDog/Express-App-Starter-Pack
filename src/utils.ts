import { ec as EC } from "elliptic";
import * as sha256 from "sha256";
import * as bip39 from "bip39";
import * as HDKey from "hdkey";
import { getMnemonic } from "./shh";
export const signTransaction = async (
  transactionHex: string
): Promise<string> => {
  const privateKey = await getKey();
  const transactionBytes = Buffer.from(transactionHex, "hex");
  const transactionHash = Buffer.from(
    sha256.x2(transactionBytes) as string,
    "hex"
  );
  const signature = privateKey.sign(transactionHash, { canonical: true });
  const signatureBytes = Buffer.from(signature.toDER());
  const signatureLength = uvarint64ToBuf(signatureBytes.length);

  // If transaction is signed with a derived key, use DeSo-DER recoverable signature encoding.

  const signedTransactionBytes = Buffer.concat([
    transactionBytes.slice(0, -1),
    signatureLength,
    signatureBytes,
  ]);

  return signedTransactionBytes.toString("hex");
};

export const getKey = async (): Promise<EC.KeyPair> => {
  const ec = new EC("secp256k1");
  const seed = bip39.mnemonicToSeedSync(getMnemonic());
  console.log("seed", seed);
  const hdKey = HDKey.fromMasterSeed(seed).derive("m/44'/0'/0'/0/0", false);
  const seedHex = hdKey.privateKey.toString("hex");
  return ec.keyFromPrivate(seedHex);
};

export const uvarint64ToBuf = (uint: number): Buffer => {
  const result: number[] = [];

  while (uint >= 0x80) {
    result.push(Number((BigInt(uint) & BigInt(0xff)) | BigInt(0x80)));
    uint = Number(BigInt(uint) >> BigInt(7));
  }
  result.push(uint | 0);

  return Buffer.from(result);
};
