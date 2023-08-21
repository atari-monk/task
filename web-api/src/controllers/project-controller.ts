import { Request, Response } from 'express';
import { Project } from '../models/Project';
import User from '../models/User';

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const project = new Project({
      name,
      description,
      userId,
    });
    await project.save();

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

export const getAllProjects = async (_req: Request, res: Response) => {
  try {
    const allProjects = await Project.find({}, '-__v');
    res.json(allProjects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: 'userId parameter is missing' });
    }
    let query: any = { userId };
    const projects = await Project.find(query, { __v: 0 });
    const filteredProjects = projects.filter((project) => project.isVisible);
    res.json(filteredProjects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Projects' });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: 'userId parameter is missing' });
    }
    const project = await Project.findOne({ _id: id, userId }, { __v: 0 });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (name) {
      project.name = name;
    }
    if (description) {
      project.description = description;
    }

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
