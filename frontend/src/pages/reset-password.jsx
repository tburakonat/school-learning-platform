import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";
import toast from "react-hot-toast";

const ResetPassword = () => {
	const [email, setEmail] = useState("");

	const handleChange = e => {
		setEmail(e.target.value);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			toast.loading("Loading");
			const response = await fetch(`${API_BASE_URL}/reset-password`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			const data = await response.json();

			if (!response.ok) {
				toast.dismiss();
				toast.error("Email not sent. Please try again later.");
				throw new Error(data.message || "Password reset failed");
			}

			toast.dismiss();
			toast.success("Email sent successfully");
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
			<h2 className="text-2xl font-bold mb-6 text-center">
				Reset Password
			</h2>
			<p className="mb-6 text-gray-700">
				Enter the email address associated with your account and we will
				send you a link to reset your password if an account exists.
			</p>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="email">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
				>
					Send Email
				</button>
				<p className="mt-4 text-center">
					Don't have an account?{" "}
					<Link
						to="/register"
						className="text-blue-500 hover:underline"
					>
						Register here
					</Link>
				</p>
			</form>
		</div>
	);
};

export default ResetPassword;
