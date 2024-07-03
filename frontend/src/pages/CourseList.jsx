import { useState } from "react";
import { Link } from "react-router-dom";

const sampleCourses = [
	{
		_id: "1",
		name: "Algorithemen und Datenstrukturen",
		semester: "Fall 2024",
		lastUpdate: "2024-04-23",
		isOpenToEnroll: true,
		image: "https://cdn-icons-png.flaticon.com/512/4762/4762232.png",
	},
	{
		_id: "2",
		name: "Einführung in die Informatik",
		semester: "Spring 2024",
		lastUpdate: "2024-01-15",
		isOpenToEnroll: false,
		image: "https://cdn-icons-png.flaticon.com/512/4762/4762232.png",
	},
	{
		_id: "3",
		name: "Maschinelles Lernen",
		semester: "Fall 2024",
		lastUpdate: "2024-05-30",
		isOpenToEnroll: false,
		image: "https://cdn-icons-png.flaticon.com/512/4762/4762232.png",
	},
	{
		_id: "4",
		name: "Datenbanken",
		semester: "Summer 2024",
		lastUpdate: "2024-07-12",
		isOpenToEnroll: false,
		image: "https://cdn-icons-png.flaticon.com/512/4762/4762232.png",
	},
];

const CourseList = () => {
	const [courses, setCourses] = useState(sampleCourses);

	return (
		<div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-semibold mb-6 text-center">
				Courses List
			</h2>
			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{courses.map(course => (
					<li
						key={course._id}
						className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow"
					>
						<img
							src={course.image}
							alt={course.name}
							className="w-full h-32 object-cover rounded-lg mb-4"
						/>
						<h3 className="text-xl font-medium mb-2">
							{course.name}
						</h3>
						<p className="text-sm text-gray-700 mb-2">
							Semester: {course.semester}
						</p>
						<p className="text-sm text-gray-700 mb-2">
							Last Update: {course.lastUpdate}
						</p>
						<p className="text-sm text-gray-700 mb-2">
							Enrollment:{" "}
							{course.isOpenToEnroll ? "Open" : "Closed"}
						</p>
						<Link to={`/courses/${course._id}/lectures`}>
							<button
								type="button"
								className={`w-full py-2 px-4 rounded-lg ${
									course.isOpenToEnroll
										? "bg-green-500 text-white hover:bg-green-600"
										: "bg-gray-500 text-white cursor-not-allowed"
								}`}
								disabled={!course.isOpenToEnroll}
							>
								Go to Course
							</button>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CourseList;
