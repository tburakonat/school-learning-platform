import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { client } from "../utils/db.js";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

export async function login(req, res) {
	const { identifier, password, captchaValue } = req.body;

	try {
		const verifyResponse = await fetch(
			`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captchaValue}`,
			{
				method: "POST",
			}
		);

		const data = await verifyResponse.json();

		if (!data.success) {
			console.error("Invalid reCAPTCHA token", data);
			return res.status(400).json({ message: "Invalid reCAPTCHA token" });
		}
	} catch (error) {
		console.error("Error verifying reCAPTCHA token:", error);
		return res.status(500).json({ message: "Internal server error" });
	}

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
}

export async function register(req, res) {
	const { username, email, password, captchaValue } = req.body;

	try {
		const verifyResponse = await fetch(
			`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captchaValue}`,
			{
				method: "POST",
			}
		);

		const data = await verifyResponse.json();

		if (!data.success) {
			console.error("Invalid reCAPTCHA token", data);
			return res.status(400).json({ message: "Invalid reCAPTCHA token" });
		}
	} catch (error) {
		console.error("Error verifying reCAPTCHA token:", error);
		return res.status(500).json({ message: "Internal server error" });
	}

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
}

export async function resetPassword(req, res) {
	const { email } = req.body;

	try {
		const database = client.db("myDatabase");
		const usersCollection = database.collection("users");

		const user = await usersCollection.findOne({ email });

		if (!user) {
			console.log("User not found");
			return res.status(404).json({ message: "User not found" });
		}

		// Creaet a password reset token
		const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1h" });

		// Save the hashed token in the database
		await usersCollection.updateOne(
			{
				email,
			},
			{
				$set: {
					resetToken: await bcrypt.hash(token, 10),
				},
			}
		);

		// Send the password reset email
		await sendEmail(
			email,
			"Password Reset",
			`Click here to reset your password: https://school-learning-platform-mue3.vercel.app/reset-password/${token}`
		);

		res.json({ message: "Password reset email sent" });
	} catch (error) {
		console.error("Error during password reset:", error);
		res.status(500).json({ message: "Internal server error" });
	}
}
