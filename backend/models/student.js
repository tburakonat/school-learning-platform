import { Schema, model } from "mongoose";

const StudentSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  lecturesViewed: {
    type: Array[ObjectId],
    default: [],
  },
});

export const User = model("Student", StudentSchema);
