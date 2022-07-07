import * as cors from "cors";
import { Deso } from "deso-protocol";
import * as express from "express";
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

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
