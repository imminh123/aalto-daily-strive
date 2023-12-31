import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

export interface ITask {
  name: string;
  description: string;
  topic: Types.ObjectId;
}

const TaskSchema = new Schema<ITask>(
  {
    name: String,
    description: String,
    topic: { type: Schema.Types.ObjectId, ref: "Topic" },
  },
  {
    timestamps: true,
  },
);

export const TaskModel = mongoose.model("Task", TaskSchema);
