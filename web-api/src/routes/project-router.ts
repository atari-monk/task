import express from 'express';
import * as projectController from '../controllers/project-controller';

const router = express.Router();

router.get('/all', projectController.getAllProjects);
router.post('/create', projectController.createProject);
router.get('/user', projectController.getProjects);
router
  .route('/:id')
  .get(projectController.getProjectById)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

export default router;
