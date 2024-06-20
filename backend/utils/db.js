import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function connectToDatabase() {
	try {
		await client.connect();
		console.log("Connected to MongoDB");
	} catch (err) {
		console.error("Error connecting to MongoDB:", err);
	}
}

connectToDatabase();

export { client };
