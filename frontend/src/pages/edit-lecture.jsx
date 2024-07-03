import React, { useState } from "react";

const TeacherLectureManager = () => {
	const [video, setVideo] = useState(null);
	const [questions, setQuestions] = useState([
		{
			question: "Was verstehen Sie unter dem Begriff 'Algorithmus'?",
			options: [
				"Eine Folge von Anweisungen, die ein Problem lösen",
				"Ein mathematischer Ausdruck",
				"Ein Computerprogramm",
				"Ein Diagramm",
			],
			correctAnswer: "Eine Folge von Anweisungen, die ein Problem lösen",
		},
		{
			question: "Was ist ein Pseudocode?",
			options: [
				"Ein Algorithmus",
				"Ein Programmiersprache",
				"Ein Diagramm",
				"Eine formale Sprache zur Beschreibung von Algorithmen",
			],
			correctAnswer:
				"Eine formale Sprache zur Beschreibung von Algorithmen",
		},
	]);

	const handleVideoUpload = event => {
		const file = event.target.files[0];
		setVideo(URL.createObjectURL(file));
	};

	const handleQuestionChange = (index, field, value) => {
		const newQuestions = [...questions];
		newQuestions[index][field] = value;
		setQuestions(newQuestions);
	};

	const handleOptionChange = (qIndex, oIndex, value) => {
		const newQuestions = [...questions];
		newQuestions[qIndex].options[oIndex] = value;
		setQuestions(newQuestions);
	};

	const handleAddQuestion = () => {
		setQuestions([
			...questions,
			{ question: "", options: ["", "", "", ""], correctAnswer: "" },
		]);
	};

	const handleRemoveQuestion = index => {
		setQuestions(questions.filter((_, i) => i !== index));
	};

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-semibold mb-4 text-center">
				Lecture Manager
			</h2>
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-700">
					Upload Video
				</label>
				<input
					type="file"
					accept="video/*"
					onChange={handleVideoUpload}
					className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
				/>
				{video && (
					<video
						src={video}
						controls
						className="mt-4 w-full rounded-lg"
					/>
				)}
			</div>
			<h3 className="text-xl font-medium mb-4">Quiz Questions</h3>
			{questions.map((question, qIndex) => (
				<div
					key={qIndex}
					className="mb-6 border border-gray-300 rounded-lg p-4"
				>
					<div className="flex justify-between items-center mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Question {qIndex + 1}
						</label>
						<button
							type="button"
							onClick={() => handleRemoveQuestion(qIndex)}
							className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
						>
							Remove
						</button>
					</div>
					<input
						type="text"
						value={question.question}
						onChange={e =>
							handleQuestionChange(
								qIndex,
								"question",
								e.target.value
							)
						}
						className="mt-1 p-2 w-full border border-gray-300 rounded-lg mb-4"
						placeholder="Enter question"
					/>
					{question.options.map((option, oIndex) => (
						<input
							key={oIndex}
							type="text"
							value={option}
							onChange={e =>
								handleOptionChange(
									qIndex,
									oIndex,
									e.target.value
								)
							}
							className="mt-1 p-2 w-full border border-gray-300 rounded-lg mb-2"
							placeholder={`Option ${oIndex + 1}`}
						/>
					))}
					<input
						type="text"
						value={question.correctAnswer}
						onChange={e =>
							handleQuestionChange(
								qIndex,
								"correctAnswer",
								e.target.value
							)
						}
						className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
						placeholder="Correct answer"
					/>
				</div>
			))}
			<button
				type="button"
				onClick={handleAddQuestion}
				className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
			>
				Add Question
			</button>
		</div>
	);
};

export default TeacherLectureManager;
