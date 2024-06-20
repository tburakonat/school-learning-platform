import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
	})
);

app.use(express.json());

const uri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

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

		const user = await usersCollection.findOne({
			$or: [{ username: identifier }, { email: identifier }],
		});

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{
					userId: user._id,
					username: user.username,
					email: user.email,
					role: user.role,
				},
				jwtSecret,
				{ expiresIn: "1h" }
			);
			res.json({ message: "Login successful", token });
		} else {
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

		const hashedPassword = await bcrypt.hash(password, 10);

		const result = await usersCollection.insertOne({
			username,
			email,
			password: hashedPassword,
			role: "student",
		});

		console.log("User registered:", result);
		// Generate a JWT token
		const token = jwt.sign(
			{ userId: result.insertedId, username, role: "student" },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.json({ message: "Registration successful", token });
	} catch (error) {
		console.error("Error during registration:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Middleware to verify the admin role
const verifyAdmin = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		if (decodedToken.role !== "admin") {
			return res
				.status(403)
				.json({ message: "Access forbidden: Admins only" });
		}
		req.user = decodedToken;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Unauthorized" });
	}
};

const verifyTeacher = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(401).json({ message: "Unauthorized" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const database = client.db("myDatabase");
		const usersCollection = database.collection("users");
		const user = await usersCollection.findOne({
			_id: new ObjectId(decoded.userId),
		});

		if (user.role !== "teacher") {
			return res.status(403).json({ message: "Forbidden" });
		}

		req.user = user;
		next();
	} catch (error) {
		console.error("Authentication error:", error);
		res.status(401).json({ message: "Unauthorized" });
	}
};

app.get("/users", verifyAdmin, async (req, res) => {
	try {
		const database = client.db("myDatabase");
		const usersCollection = database.collection("users");
		const users = await usersCollection.find({}).toArray();
		res.json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Route to update user role
app.patch("/users/:username/role", verifyAdmin, async (req, res) => {
	const { username } = req.params;
	const { role } = req.body;

	try {
		const database = client.db("myDatabase");
		const usersCollection = database.collection("users");
		const result = await usersCollection.findOneAndUpdate(
			{ username },
			{ $set: { role } }
		);

		res.json({ message: "User role updated successfully" });
	} catch (error) {
		console.error("Error updating user role:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

app.get("/students", verifyTeacher, async (req, res) => {
	try {
		const database = client.db("myDatabase");
		const usersCollection = database.collection("users");
		const students = await usersCollection
			.find({ role: "student" })
			.toArray();
		res.json(students);
	} catch (error) {
		console.error("Error fetching students:", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
