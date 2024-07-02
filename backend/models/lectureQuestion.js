import { Schema, model } from "mongoose";

const LectureQuestionSchema = new Schema({
  lectureId: {
    type: ObjectId,
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  possibleAnswers: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

export const Course = model("LectureQuestion", LectureQuestionSchema);
