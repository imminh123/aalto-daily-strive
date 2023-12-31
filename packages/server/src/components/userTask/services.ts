import { UserTaskRepository } from "@/db/repositories/userTask.repository";
import {
  ICreateUserTask,
  IUserTask,
  UserTaskModel,
} from "@/db/models/userTask.model";
import { FilterQuery, QueryOptions } from "mongoose";
export class UserTaskServices {
  userTaskRepository!: UserTaskRepository;

  constructor() {
    this.userTaskRepository = new UserTaskRepository(UserTaskModel);
  }

  /**
   * @description Get application information.
   * @returns AppInformation
   */

  getUserTasks = (userId: string): Promise<IUserTask[] | null> => {
    return this.userTaskRepository.find(
      { user: userId },
      { sort: { createdAt: -1 } },
    );
  };

  getUserTask = (id: string): Promise<IUserTask | null> => {
    return this.userTaskRepository.findById(id);
  };

  getUserTasksByUserId = (userId: String): Promise<IUserTask[] | null> => {
    return this.userTaskRepository.find({ user: userId });
  };

  getUserTasksByTopicId = (topicId: String): Promise<IUserTask[] | null> => {
    return this.userTaskRepository.find({ topic: topicId });
  };

  createUserTask = (
    data: ICreateUserTask | ICreateUserTask[],
  ): Promise<IUserTask | null> => {
    return this.userTaskRepository.create(data);
  };

  deleteUserTask = (_id: String) => {
    return this.userTaskRepository.delete(_id);
  };
  updateUserTask = (
    _id: string,
    data: IUserTask,
  ): Promise<IUserTask | null> => {
    return this.userTaskRepository.update(_id, data);
  };

  findUserTasks = (
    filters: FilterQuery<IUserTask>,
    options?: QueryOptions,
  ): Promise<IUserTask[] | null> => {
    return this.userTaskRepository.find(filters, options);
  };

  //update multiple UserTasks
  updateUserTasks = (
    filters: FilterQuery<IUserTask>,
    data: any,
  ): Promise<any | null> => {
    return this.userTaskRepository.updateTasks(filters, data);
  };
}
