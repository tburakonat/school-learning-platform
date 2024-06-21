import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGO_URI } from "./config.js";

const client = new MongoClient(MONGO_URI, {
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
