import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";
import { API_BASE_URL } from "../config";

const Register = () => {
	const recaptcha = useRef();
	const { login } = useAuth();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const captchaValue = recaptcha.current.getValue();

		if (!captchaValue) {
			setError("Please complete the reCAPTCHA");
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		try {
			const response = await fetch(`${API_BASE_URL}/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...formData, captchaValue }),
			});

			const data = await response.json();
			if (!response.ok) {
				recaptcha.current.reset();
				throw new Error(data.message || "Registration failed");
			}
			login(data.token);
			navigate("/dashboard");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
			<h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
			{error && <p className="text-red-500">{error}</p>}
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						className="block text-gray-700 mb-2"
						htmlFor="username"
					>
						Username
					</label>
					<input
						type="text"
						id="username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="email">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
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
				<div className="mb-4">
					<label
						className="block text-gray-700 mb-2"
						htmlFor="confirmPassword"
					>
						Confirm Password
					</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded"
						required
					/>
				</div>
				<div className="mb-4">
					<ReCAPTCHA
						sitekey="6Leb0f0pAAAAAEIHe2ZYSnst33YlW16v1F_TWUb2"
						ref={recaptcha}
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
				>
					Register
				</button>
				<p className="mt-4 text-center">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-500 hover:underline">
						Log in
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
