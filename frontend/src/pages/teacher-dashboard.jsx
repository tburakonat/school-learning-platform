import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const TeacherDashboard = () => {
	const { user } = useContext(UserContext);
	const [students, setStudents] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await fetch(
					"https://school-learning-platform-mue3.vercel.app/students",
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					}
				);
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
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6 text-center">
				Teacher Dashboard
			</h1>
			{error && <p className="text-red-500">{error}</p>}
			<div className="bg-white p-8 rounded shadow-md">
				<h2 className="text-xl font-bold mb-4">
					Hello, {user.username}
				</h2>
				<h3 className="text-lg font-bold mb-2">Students List</h3>
				<ul className="list-disc pl-5">
					{students.map(student => (
						<li key={student._id} className="mb-2">
							{student.username} ({student.email})
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default TeacherDashboard;
