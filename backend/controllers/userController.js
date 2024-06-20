import { client } from "../utils/db.js";

export async function getUsers(req, res) {
	try {
		const database = client.db("myDatabase");
		const usersCollection = database.collection("users");
		const users = await usersCollection.find({}).toArray();
		res.json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function updateUserRole(req, res) {
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
}

export async function getStudents(req, res) {
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
}
