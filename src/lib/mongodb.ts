import { MongoClient,ServerApiVersion,Db } from "mongodb";

const uri = "mongodb+srv://admin:nhy654rfv@veterans.wrvmebu.mongodb.net/?serverSelectionTimeoutMS=2000&retryWrites=true&w=majority"

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export let mongoDb:Db;
async function run() {
  try {
    await client.connect();
    mongoDb = await client.db("admin");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    console.log(mongoDb);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);