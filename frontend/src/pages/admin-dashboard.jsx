import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const AdminDashboard = () => {
	const { user } = useAuth();
	const [users, setUsers] = useState([]);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (!user || user.role !== "admin") {
			navigate("/");
			return;
		}

		const fetchUsers = async () => {
			try {
				const response = await fetch("http://localhost:3000/users", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				});
				const data = await response.json();
				setUsers(data);
			} catch (error) {
				setError("Failed to fetch users");
				console.error(error);
			}
		};

		fetchUsers();
	}, [user, navigate]);

	const handleRoleChange = async (username, newRole) => {
		try {
			const response = await fetch(
				`http://localhost:3000/users/${username}/role`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
					body: JSON.stringify({ role: newRole }),
				}
			);
			const data = await response.json();
			if (response.ok) {
				setUsers(prevUsers =>
					prevUsers.map(user =>
						user.username === username
							? { ...user, role: newRole }
							: user
					)
				);
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			setError("Failed to update user role");
			console.error(error);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6 text-center">
				Admin Dashboard
			</h1>
			{error && <p className="text-red-500">{error}</p>}
			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b">Username</th>
						<th className="py-2 px-4 border-b">Email</th>
						<th className="py-2 px-4 border-b">Role</th>
						<th className="py-2 px-4 border-b">Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map(u => (
						<tr key={u._id}>
							<td className="py-2 px-4 border-b">{u.username}</td>
							<td className="py-2 px-4 border-b">{u.email}</td>
							<td className="py-2 px-4 border-b">{u.role}</td>
							<td className="py-2 px-4 border-b">
								<select
									value={u.role}
									onChange={e =>
										handleRoleChange(
											u.username,
											e.target.value
										)
									}
									className="p-2 border border-gray-300 rounded"
									disabled={u.username === user.username}
								>
									<option value="student">Student</option>
									<option value="teacher">Teacher</option>
									<option value="admin">Admin</option>
								</select>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default AdminDashboard;
