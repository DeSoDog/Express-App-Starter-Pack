import * as cors from "cors";
import { Deso } from "deso-protocol";
import * as express from "express";
import { getPrice } from "./uniswap";
import { signTransaction } from "./utils";
const deso = new Deso({ identityConfig: { host: "server" } });
const getSinglePost = async () => {
  const postData = await deso.posts.getSinglePost({
    PostHashHex:
      "d30d715dfdc59955ae239635833367dd6c367bb52771bc47f507ccfb4060d53a",
  });
  return postData;
};
const app = express();
app.use(express.json());
app.use(cors());

const PORT: Readonly<number> = 3000;

app.get("/", async (req, res) => {
  const response = getSinglePost();
  const body = (await response).PostFound?.Body;
  res.send(body);
});

app.get("/get-btc", async (req, res) => {
  const Body = await getPrice();
  const constructedTransaction = await deso.posts.submitPost({
    UpdaterPublicKeyBase58Check:
      "BC1YLi7moxmi9TKhKf5CQ1JtuHF9sGZYymhXJY5xkjkuwhjYHsvLbcE",
    BodyObj: {
      Body,
      VideoURLs: [],
      ImageURLs: [],
    },
  });
  const TransactionHex =
    constructedTransaction.constructedTransactionResponse.TransactionHex;
  const signedTransaction = await signTransaction(TransactionHex);
  console.log(signedTransaction);
  const response = await deso.transaction.submitTransaction(signedTransaction);
  console.log(response);
  res.send("success");
});

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
