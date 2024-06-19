import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="text-center p-8 max-w-lg bg-white shadow-md rounded">
			<h1 className="text-3xl font-bold mb-4">
				Welcome to the School Learning Platform
			</h1>
			<p className="mb-6 text-gray-700">
				Our platform is designed to help school students learn various
				topics effectively. Whether you need help with your homework or
				want to deepen your understanding of a subject, we are here to
				assist you.
			</p>
			<div>
				<Link
					to="/register"
					className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600"
				>
					Get Started
				</Link>
				<Link
					to="/login"
					className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
				>
					Log In
				</Link>
			</div>
		</div>
	);
};

export default Home;
