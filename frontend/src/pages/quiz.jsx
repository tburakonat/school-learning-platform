import React, { useState, useEffect } from "react";

const questions = [
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
		correctAnswer: "Eine formale Sprache zur Beschreibung von Algorithmen",
	},
];

const Quiz = () => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [feedback, setFeedback] = useState("");
	const [correctAnswers, setCorrectAnswers] = useState(0);

	const currentQuestion = questions[currentQuestionIndex];

	const handleAnswerSelection = answer => {
		setSelectedAnswer(answer);
		if (answer === currentQuestion.correctAnswer) {
			setFeedback("Correct!");
			setCorrectAnswers(correctAnswers + 1);
		} else {
			setFeedback(
				`Incorrect! The correct answer is ${currentQuestion.correctAnswer}.`
			);
		}
	};

	const handleNextQuestion = () => {
		setSelectedAnswer(null);
		setFeedback("");
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			console.log("Quiz complete!");
		}
	};

	useEffect(() => {
		if (currentQuestionIndex === questions.length) {
			console.log("Quiz complete!");
		}
	}, [currentQuestionIndex, correctAnswers, questions.length]);

	return (
		<div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md">
			<h2 className="text-2xl font-semibold mb-4 text-center">
				Quiz zum Thema: Einführung: Pseudocode, Hügelalgorithmen
			</h2>
			{currentQuestionIndex < questions.length ? (
				<div>
					<p className="text-lg mb-4">{currentQuestion.question}</p>
					<ul>
						{currentQuestion.options.map((option, index) => (
							<li
								key={index}
								onClick={() => handleAnswerSelection(option)}
								className={`mb-2 p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 ${
									selectedAnswer === option
										? "bg-blue-200"
										: ""
								}`}
							>
								{option}
							</li>
						))}
					</ul>
					{feedback && (
						<p className="mt-4 text-lg font-medium">{feedback}</p>
					)}
					<button
						onClick={handleNextQuestion}
						disabled={!selectedAnswer}
						className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
					>
						Next
					</button>
				</div>
			) : (
				<p className="text-center">Loading next question...</p>
			)}
		</div>
	);
};

export default Quiz;
