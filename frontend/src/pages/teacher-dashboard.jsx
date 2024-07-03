import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { API_BASE_URL } from "../config";

const TeacherDashboard = () => {
	const { user } = useContext(UserContext);
	const [students, setStudents] = useState([]);
	const [filter, setFilter] = useState("");
	const [error, setError] = useState("");
	let filteredStudents = students.filter(
		u =>
			u.username.toLowerCase().includes(filter.toLowerCase()) ||
			u.email.toLowerCase().includes(filter.toLowerCase())
	);

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await fetch(`${API_BASE_URL}/students`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				});
				const data = await response.json();
				if (!response.ok) {
					throw new Error(data.message || "Failed to fetch students");
				}
				setStudents(data);
			} catch (error) {
				setError(error.message);
				console.error(error);
			}
		};

		fetchStudents();
	}, []);

	return (
		// <div
		// 	className="container mx-auto mb-auto p-4"
		// 	style={{ maxHeight: "100%" }}
		// >
		// 	<header className="sticky top-3 bg-gray-100 z-10">
		// 		<h1 className="text-2xl font-bold mb-6 text-center">
		// 			Teacher Dashboard
		// 		</h1>
		// 		{error && <p className="text-red-500">{error}</p>}
		// 		<div className="mb-4">
		// 			<label
		// 				className="block text-gray-700 mb-2"
		// 				htmlFor="students"
		// 			>
		// 				Filter Students
		// 			</label>
		// 			<input
		// 				type="text"
		// 				id="students"
		// 				name="students"
		// 				value={filter}
		// 				onChange={e => setFilter(e.target.value)}
		// 				className="w-full p-2 border border-gray-300 rounded"
		// 			/>
		// 		</div>
		// 	</header>
		// 	<div className="overflow-x-auto max-h-96">
		// 		<table className="min-w-full bg-white">
		// 			<thead className="bg-gray-200 sticky top-0 z-10">
		// 				<tr>
		// 					<th className="py-2 px-4 border-b text-start">
		// 						Username
		// 					</th>
		// 					<th className="py-2 px-4 border-b text-start">
		// 						Email
		// 					</th>
		// 				</tr>
		// 			</thead>
		// 			<tbody>
		// 				{filteredStudents.map(u => (
		// 					<tr key={u._id}>
		// 						<td className="py-2 px-4 border-b">
		// 							{u.username}
		// 						</td>
		// 						<td className="py-2 px-4 border-b">
		// 							{u.email}
		// 						</td>
		// 					</tr>
		// 				))}
		// 			</tbody>
		// 			<tfoot className="bg-gray-100 sticky bottom-0 z-10">
		// 				<tr>
		// 					<td className="py-2 px-4 border-t" colSpan="4">
		// 						{filteredStudents.length} results found
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
						Welcome back to your teacher dashboard.
					</p>
				</div>

				<h2 className="text-2xl font-semibold text-gray-800 mb-6">
					Quick Links
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="bg-white shadow rounded-lg p-6">
						<h3 className="text-xl font-semibold text-gray-800 mb-2">
							Manage Your Courses
						</h3>
						<p className="text-gray-600 mb-auto">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Temporibus, obcaecati!
						</p>
						<button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
							Manage Courses
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeacherDashboard;
