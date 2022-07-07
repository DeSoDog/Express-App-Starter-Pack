import * as cors from "cors";
import { Deso } from "deso-protocol";
import * as express from "express";
import { getKey, signTransaction } from "./utils";
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

app.get("/test", async (req, res) => {
  const key = await getKey();
  const publicKey = key.getPublic();
  const transaction = await deso.posts.submitPost({
    UpdaterPublicKeyBase58Check:
      "BC1YLi7moxmi9TKhKf5CQ1JtuHF9sGZYymhXJY5xkjkuwhjYHsvLbcE",
    BodyObj: {
      Body: "Uniswap Bot test",
      VideoURLs: [],
      ImageURLs: [],
    },
  });
  const signedTransaction = await signTransaction(
    transaction.constructedTransactionResponse.TransactionHex
  );
  console.log(signedTransaction);
  res.send(signedTransaction);
  deso.transaction.submitTransaction(signedTransaction);
});
app.listen(PORT, () => {
  console.log("listening on port 3000");
});
