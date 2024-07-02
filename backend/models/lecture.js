import { Schema, model } from "mongoose";

const LectureContentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  accompanyingText: {
    type: String,
  },
});

const LectureSchema = new Schema(
  {
    courseId: {
      type: ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lectureContent: {
      type: LectureContentSchema,
    },
  },
  { timestamps: true }
);

export const Course = model("Lecture", LectureSchema);
