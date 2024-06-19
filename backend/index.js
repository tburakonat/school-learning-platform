import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
	})
);

app.use(express.json());

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

app.post("/login", async (req, res) => {
	const { identifier, password } = req.body;
	try {
		const database = client.db("myDatabase");
		const usersCollection = database.collection("users");

		// Find user by identifier (username or email)
		const user = await usersCollection.findOne({
			$or: [{ username: identifier }, { email: identifier }],
		});

		if (user) {
			console.log("User found:", user);
			// Check if password is correct
			if (user.password !== password) {
				console.log("Incorrect password");
				res.status(401).json({
					message: "Invalid identifier or password",
				});
			} else {
				res.json({ message: "Login successful" });
			}
		} else {
			console.log("User not found");
			res.status(401).json({ message: "Invalid identifier or password" });
		}
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

app.post("/register", async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const database = client.db("myDatabase");
		const usersCollection = database.collection("users");

		// Check if user already exists
		const existingUser = await usersCollection.findOne({
			$or: [{ username }, { email }],
		});

		if (existingUser) {
			console.log("User already exists");
			return res.status(400).json({ message: "User already exists" });
		}

		const result = await usersCollection.insertOne({
			username,
			email,
			password,
		});

		console.log("User registered:", result);

		res.json({ message: "Registration successful" });
	} catch (error) {
		console.error("Error during registration:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
