import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { API_BASE_URL } from "../config";

const AdminDashboard = () => {
	const { user } = useAuth();
	const [users, setUsers] = useState([]);
	const [filter, setFilter] = useState("");
	const [roleFilter, setRoleFilter] = useState("all");

	let filteredUsers = users
		.filter(
			u =>
				u.username.toLowerCase().includes(filter.toLowerCase()) ||
				u.email.toLowerCase().includes(filter.toLowerCase())
		)
		.filter(u => roleFilter === "all" || u.role === roleFilter);

	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (!user || user.role !== "admin") {
			navigate("/");
			return;
		}

		const fetchUsers = async () => {
			try {
				const response = await fetch(`${API_BASE_URL}/users`, {
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
				`${API_BASE_URL}/users/${username}/role`,
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
		// <div
		// 	className="container mx-auto mb-auto p-4"
		// 	style={{ maxHeight: "100%" }}
		// >
		// 	<header className="sticky top-3 bg-gray-100 z-10">
		// 		<h1 className="text-2xl font-bold mb-6 text-center">
		// 			Admin Dashboard
		// 		</h1>
		// 		{error && <p className="text-red-500">{error}</p>}
		// 		<div className="mb-4">
		// 			<label className="block text-gray-700 mb-2" htmlFor="users">
		// 				Filter Users
		// 			</label>
		// 			<input
		// 				type="text"
		// 				id="users"
		// 				name="users"
		// 				value={filter}
		// 				onChange={e => setFilter(e.target.value)}
		// 				className="w-full p-2 border border-gray-300 rounded"
		// 			/>
		// 		</div>
		// 		<div className="mb-4">
		// 			<label htmlFor="roleFilter" className="mr-2">
		// 				Filter by role
		// 			</label>
		// 			<select
		// 				id="roleFilter"
		// 				value={roleFilter}
		// 				onChange={e => setRoleFilter(e.target.value)}
		// 				className="p-2 border border-gray-300 rounded"
		// 			>
		// 				<option value="all">All</option>
		// 				<option value="admin">Admin</option>
		// 				<option value="teacher">Teacher</option>
		// 				<option value="student">Student</option>
		// 			</select>
		// 		</div>
		// 	</header>
		// 	<div className="overflow-x-auto max-h-96">
		// 		<table className="min-w-full bg-white">
		// 			<thead className="bg-gray-200 sticky top-0 z-10">
		// 				<tr>
		// 					<th className="py-2 px-4 border-b">Username</th>
		// 					<th className="py-2 px-4 border-b">Email</th>
		// 					<th className="py-2 px-4 border-b">Role</th>
		// 					<th className="py-2 px-4 border-b">Actions</th>
		// 				</tr>
		// 			</thead>
		// 			<tbody>
		// 				{filteredUsers.map(u => (
		// 					<tr key={u._id}>
		// 						<td className="py-2 px-4 border-b">
		// 							{u.username}
		// 						</td>
		// 						<td className="py-2 px-4 border-b">
		// 							{u.email}
		// 						</td>
		// 						<td className="py-2 px-4 border-b">{u.role}</td>
		// 						<td className="py-2 px-4 border-b">
		// 							<select
		// 								value={u.role}
		// 								onChange={e =>
		// 									handleRoleChange(
		// 										u.username,
		// 										e.target.value
		// 									)
		// 								}
		// 								className="p-2 border border-gray-300 rounded"
		// 								disabled={u.username === user.username}
		// 							>
		// 								<option value="student">Student</option>
		// 								<option value="teacher">Teacher</option>
		// 								<option value="admin">Admin</option>
		// 							</select>
		// 						</td>
		// 					</tr>
		// 				))}
		// 			</tbody>
		// 			<tfoot className="bg-gray-100 sticky bottom-0 z-10">
		// 				<tr>
		// 					<td className="py-2 px-4 border-t" colSpan="4">
		// 						{filteredUsers.length} results found
		// 					</td>
		// 				</tr>
		// 			</tfoot>
		// 		</table>
		// 	</div>
		// </div>

		<div className="mx-8 max-w-7xl p-2 lg:px-8">
			<div className="pt-10">
				<div className="mb-6">
					<h1 className="text-4xl font-bold font-display">
						Hello, {user.username}!
					</h1>
					<p className="text-lg text-gray-600 ">
						Welcome back to your admin dashboard.
					</p>
				</div>

				<h2 className="text-2xl font-semibold text-gray-800 mb-6">
					Quick Links
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="bg-white shadow rounded-lg p-6">
						<h3 className="text-xl font-semibold text-gray-800 mb-2">
							Manage Users
						</h3>
						<p className="text-gray-600 mb-auto">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Temporibus, obcaecati!
						</p>
						<button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
							Manage Users
						</button>
					</div>

					<div className="bg-white shadow rounded-lg p-6">
						<h3 className="text-xl font-semibold text-gray-800 mb-2">
							Manage Courses
						</h3>
						<p className="text-gray-600">
							Create new courses, manage existing ones, and assign
							them to teachers.
						</p>
						<button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
							Manage Courses
						</button>
					</div>
				</div>
			</div>
		</div>

		// <div
		// 	className="container mx-auto mb-auto p-4"
		// 	style={{ maxHeight: "100%" }}
		// >
		// 	<header className="sticky top-3 bg-gray-100 z-10">
		// 		<h1 className="text-2xl font-bold mb-6 text-center">
		// 			Admin Dashboard
		// 		</h1>
		// 		{error && <p className="text-red-500">{error}</p>}
		// 		<div className="mb-4">
		// 			<label className="block text-gray-700 mb-2" htmlFor="users">
		// 				Filter Courses
		// 			</label>
		// 			<input
		// 				type="text"
		// 				id="users"
		// 				name="users"
		// 				value={filter}
		// 				onChange={e => setFilter(e.target.value)}
		// 				className="w-full p-2 border border-gray-300 rounded"
		// 			/>
		// 		</div>
		// 		{/* add new course */}
		// 		<div className="mb-4">
		// 			<button className="bg-blue-600 text-white px-4 py-2 rounded">
		// 				Add Course
		// 			</button>
		// 		</div>
		// 	</header>
		// 	<div className="overflow-x-auto max-h-96">
		// 		<table className="min-w-full bg-white">
		// 			<thead className="bg-gray-200 sticky top-0 z-10">
		// 				<tr>
		// 					<th className="py-2 px-4 border-b">Course Name</th>
		// 					<th className="py-2 px-4 border-b">Teacher</th>
		// 					<th className="py-2 px-4 border-b">Actions</th>
		// 				</tr>
		// 			</thead>
		// 			<tbody>
		// 				{[
		// 					{
		// 						id: 1,
		// 						title: "Algorithm and Data Structures",
		// 						teacher: "Dr. John Doe",
		// 					},
		// 					{
		// 						id: 2,
		// 						title: "Web Development",
		// 						teacher: "Jane Doe",
		// 					},
		// 				].map(course => (
		// 					<tr key={course.id}>
		// 						<td className="py-2 px-4 border-b">
		// 							{course.title}
		// 						</td>
		// 						<td className="py-2 px-4 border-b">
		// 							{course.teacher}
		// 						</td>
		// 						<td className="py-2 px-4 border-b">
		// 							{/* delete and edit icons */}
		// 							<button className="mr-2 bg-blue-400 p-2 ">
		// 								Edit
		// 							</button>
		// 							<button className="bg-red-400 p-2">
		// 								Delete
		// 							</button>
		// 						</td>
		// 					</tr>
		// 				))}
		// 			</tbody>
		// 			<tfoot className="bg-gray-100 sticky bottom-0 z-10">
		// 				<tr>
		// 					<td className="py-2 px-4 border-t" colSpan="4">
		// 						{filteredUsers.length} results found
		// 					</td>
		// 				</tr>
		// 			</tfoot>
		// 		</table>
		// 	</div>
		// </div>
	);
};

export default AdminDashboard;
