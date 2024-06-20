import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const Navbar = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<nav className="bg-blue-500 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/">
					<div className="text-white text-lg font-bold">
						School Learning Platform
					</div>
				</Link>
				<div>
					{!user ? (
						<>
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
						</>
					) : (
						<>
							<Link
								to="/me"
								className="text-white mx-2 hover:underline"
							>
								Profile
							</Link>
							{user?.role === "admin" && (
								<Link
									to="/admin-dashboard"
									className="text-white mx-2 hover:underline"
								>
									Admin Dashboard
								</Link>
							)}
							{user?.role === "teacher" && (
								<Link
									to="/teacher-dashboard"
									className="text-white mx-2 hover:underline"
								>
									Teacher Dashboard
								</Link>
							)}
							<button
								onClick={handleLogout}
								className="text-white mx-2 hover:underline"
							>
								Logout
							</button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
