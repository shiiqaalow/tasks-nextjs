import { CreateTask, SafeTask, Task, UpdateTask } from "@/app/types/task";
import { getTaskCollection } from "../db";
import { ServerResponseData, ServerResponseStatus } from "../utils";
import { ObjectId } from "mongodb";

// create task
export const createTask = async (
  userId: string,
  input: CreateTask,
): Promise<ServerResponseStatus> => {
  try {
    const title = input.title.trim();
    const collection = await getTaskCollection();
    const existingTask = await collection.findOne({ userId, title });
    if (existingTask) {
      return {
        success: false,
        status: 404,
        message: "Task already exists",
      };
    }

    const newTask = {
      userId,
      title,
      description: input.description.trim() ?? undefined,
      status: input.status ?? "todo",
      createdAt: new Date().toISOString(),
    };

    const result = await collection.insertOne(newTask);

    return {
      success: true,
      status: 201,
      message: "Task successfully created",
      userId: result.insertedId.toString(),
    };
  } catch (error) {
    console.log("Failed to create new task", error);
    return {
      success: false,
      status: 500,
      message: "Something went wrong",
      
    };
  }
};

// get all tasks for each user
export const getAllTasks = async (
  userId: string,
): Promise<ServerResponseData<Task[]>> => {
  try {
    const collection = await getTaskCollection();
    const tasks = await collection
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();
    if (!tasks) {
      return {
        success: false,
        status: 404,
        message: "Task not found",
      };
    }

    const formattedTasks: Task[] = tasks.map((task) => ({
      id: task._id.toString(),
      userId: task.userId,
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));

    return {
      success: true,
      status: 200,
      message: tasks.length ? "tasks successfully fetched" : "No tasks fetched",
      data: formattedTasks,
    };
  } catch (error) {
    console.log("Failed to fetch tasks", error);
    return {
      success: false,
      status: 500,
      message: "Something went wrong",
    };
  }
};

// get task by id
export const getTaskById = async (
  userId: string,
  id: string,
): Promise<ServerResponseData<SafeTask>> => {
  try {
    const collection = await getTaskCollection();
    const task = await collection.findOne({ userId, _id: new ObjectId(id) });
    if (!task) {
      return {
        success: false,
        status: 404,
        message: "Task not found",
      };
    }

    const formattedTask: Task = {
      id: task._id.toString(),
      userId: task.userId,
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };

    return {
      success: true,
      status: 200,
      message: "Task successfully fetched",
      data: formattedTask,
    };
  } catch (error) {
    console.log("Failed to fetch taskById", error);
    return {
      success: false,
      status: 500,
      message: "Something went wrong",
    };
  }
};

// update task
export const updateTask = async (
    userId: string, id: string,
    data: UpdateTask,
): Promise<ServerResponseStatus> => {
  try {
    const collection = await getTaskCollection();
    const task = await collection.updateOne(
      { userId, _id: new ObjectId(id) },
      { $set: {...data, updatedAt: new Date()} },
    );
    if (task.matchedCount === 0) {
      return {
        success: true,
        status: 404,
        message: "Failed to update taskById",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Task successfully updatedById",
    };
} catch (error) {
    console.log('Failed to update task by id', error)
    return {
        success: true,
        status: 500,
        message: "Something went wrong",

    };
  }
};

// delete task 
export const deleteTask = async (userId: string, id: string): Promise<ServerResponseData> => {
    try {
    const collection = await getTaskCollection();
    const task = await collection.deleteOne(
      { userId, _id: new ObjectId(id) }
    );
    if (task.deletedCount === 0) {
      return {
        success: true,
        status: 404,
        message: "Failed to delete taskById",
      };
    }
    return {
      success: true,
      status: 200,
      message: "Task successfully deletedById",
    };
} catch (error) {
    console.log('Failed to delete taskById', error)
    return {
        success: true,
        status: 500,
        message: "Something went wrong",
    };
  }
} 
