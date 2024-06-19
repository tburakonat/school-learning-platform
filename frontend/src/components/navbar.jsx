import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="bg-blue-500 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/">
					<div className="text-white text-lg font-bold">
						Student Web Application
					</div>
				</Link>
				<div>
					<Link
						to="/login"
						className="text-white mx-2 hover:underline"
					>
						Login
					</Link>
					<Link
						to="/register"
						className="text-white mx-2 hover:underline"
					>
						Register
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
