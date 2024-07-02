import { Schema, model } from "mongoose";

const Answer = new Schema(
  {
    lectureQuestionId: {
      type: ObjectId,
      required: true,
    },
    studentId: {
      type: ObjectId,
      required: true,
    },
    answeredCorrectly: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Course = model("StudentAnswer", StudentAnswerSchema);
