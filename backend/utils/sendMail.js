import nodemailer from "nodemailer";
import { SENDER_EMAIL_ADDRESS, SENDER_EMAIL_PASSWORD } from "./config.js";

export const sendEmail = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: SENDER_EMAIL_ADDRESS,
				pass: SENDER_EMAIL_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: SENDER_EMAIL_ADDRESS,
			to: email,
			subject: subject,
			text: text,
		});

		console.log("email sent sucessfully");
	} catch (error) {
		console.log(error, "email not sent");
	}
};
