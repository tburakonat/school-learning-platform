import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.SENDER_EMAIL_ADDRESS,
				pass: process.env.SENDER_EMAIL_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: process.env.SENDER_EMAIL_ADDRESS,
			to: email,
			subject: subject,
			text: text,
		});

		console.log("email sent sucessfully");
	} catch (error) {
		console.log(error, "email not sent");
	}
};
