import mongoose, { ObjectId } from "mongoose";
const { Schema } = mongoose;

export interface IUserTask {
  name: string;
  description: string;
  completed?: boolean;
  streak?: number;
  notificationToggle: boolean;
  notificationTime?: Date;
  isNotified?: boolean;
  user: ObjectId;
  topic?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateUserTask {
  name: string;
  description: string;
  notificationToggle: boolean;
  user: string;
  completed?: boolean;
  streak?: number;
  notificationTime?: Date;
  isNotified?: boolean;
}

const UserTaskSchema = new Schema<IUserTask>(
  {
    name: String,
    description: String,
    notificationToggle: Boolean,
    notificationTime: Date,
    streak: Number,
    completed: Boolean,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    topic: { type: Schema.Types.ObjectId, ref: "Topic" },
  },
  {
    timestamps: true,
  },
);

export const UserTaskModel = mongoose.model("UserTask", UserTaskSchema);
