import { Request, Response } from 'express';
import moment from 'moment-timezone';
import { Task } from '../models/Task';
import User from '../models/User';
import { Project } from '../models/Project';
import { ITask } from '../models/ITask';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { description, userId, projectId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const task = new Task({
      description,
      userId,
      projectId,
    });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const allTasks = await Task.find();
    res.json(allTasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { userId, projectId } = req.params;
    console.log('getTasks', userId, projectId);

    if (!userId) {
      return res.status(400).json({ error: 'userId parameter is missing' });
    }

    let query: any = { userId };

    if (projectId) {
      query = { ...query, projectId };
    }

    const tasks = await Task.find(query);

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (description) {
      task.description = description;
    }
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const finishTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { finishedAt, summary } = req.body;
    console.log('finishTask', id, finishedAt, summary);
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await setFinishedTaskFields(task, finishedAt, summary);
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to finish task' });
  }
};

const setFinishedTaskFields = async (
  task: ITask,
  finishedAt: Date,
  summary: string
) => {
  if (finishedAt) {
    task.finishedAt = finishedAt;
    task.finishLocalTimestamp = moment(finishedAt)
      .tz('Europe/Warsaw')
      .format('DD-MM-YYYY HH:mm');
  }
  if (summary) {
    task.summary = summary;
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
