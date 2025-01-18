import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

// const envPath = path.resolve(, '../.env'); // Adjust the path as needed

dotenv.config({ path: "config.env" });

const DbUrl =
	"mongodb+srv://sanskarsoni:haat@cluster0.pqibz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const url = process.env.DatabaseUrl || DbUrl;

mongoose.connect(url);

const db = mongoose.connection;

//  const client = new MongoClient(url);

//  async function connect() {
//     try {
//         await client.connect();
//         console.log("connected to mongodb");
//     } catch (err) {
//         console.error('error connecting to mongoDB' , err);

//     }
//  }

//  function getDB(){
//     return client.db(name);
//  }

export default mongoose;
export { db };
