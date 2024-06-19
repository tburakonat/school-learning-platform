import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
	const [formData, setFormData] = useState({
		identifier: "",
		password: "",
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		console.log(formData);

		try {
			const response = await fetch("http://localhost:3000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
			<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						className="block text-gray-700 mb-2"
						htmlFor="identifier"
					>
						Username or Email
					</label>
					<input
						type="text"
						id="identifier"
						name="identifier"
						value={formData.identifier}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 mb-2"
						htmlFor="password"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
				>
					Login
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
				<p className="mt-4 text-center">
					Forgot your password?{" "}
					<Link
						to="/reset-password"
						className="text-blue-500 hover:underline"
					>
						Reset it here
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
