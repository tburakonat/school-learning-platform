import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { connectToDatabase } from "./utils/db.js";

const app = express();

connectToDatabase();

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(userRoutes);

// i have to return the react app when someone clicks to the change password link

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
