import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { client } from "../utils/db.js";
import { JWT_SECRET } from "../utils/config.js";

export const verifyAdmin = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, JWT_SECRET);
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

export const verifyTeacher = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(401).json({ message: "Unauthorized" });

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
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
