import { model, Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isOpenToEnroll: {
      type: Boolean,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    semester: {
      type: String,
      enum: ["I", "don't", "know", "what", "semesters", "y'all", "have"],
    },
    studyProgram: {
      type: String,
      enum: ["Is", "this", "even", "necessary?"],
    },
  },
  { timestamps: true }
);

export const Course = model("Course", CourseSchema);
