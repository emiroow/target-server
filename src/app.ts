import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
const uri =
  "mongodb://root:vyF5ciYhcyGwT7sWs6tcnc1f@emiroowdb:27017/my-app?authSource=admin&replicaSet=rs0&directConnection=true";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.route("/test").get((req: any, res: any) => {
  res.json({ test: "test" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
