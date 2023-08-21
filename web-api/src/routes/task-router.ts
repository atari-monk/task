import express from 'express';
import * as taskController from '../controllers/task-controller';

const router = express.Router();

router.get('/user/:userId/:projectId?', taskController.getTasks);
router.route('/').post(taskController.createTask);

router
  .route('/:id')
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

router.route('/all').get(taskController.getAllTasks);

router.patch('/finish/:id/', taskController.finishTask);

export default router;
