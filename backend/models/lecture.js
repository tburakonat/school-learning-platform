import { model, Schema, Types } from "mongoose";

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
      type: Types.ObjectId,
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

export const Lecture = model("Lecture", LectureSchema);
