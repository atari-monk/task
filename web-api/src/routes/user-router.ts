import express from 'express';
import * as userController from '../controllers/user-controller';

const router = express.Router();

router.route('/').get(userController.getUsers).post(userController.createUser);

router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/email/:email').get(userController.getUserIdByEmail);

export default router;
