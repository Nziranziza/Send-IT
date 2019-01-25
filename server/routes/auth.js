import express from 'express';
import userController from '../controllers/UserController';

const router = express.Router();

/* Create a user account  */
router.post('/signup', userController.create);
// login a user account
router.post('/login', userController.login);

// reset the password
router.route('/reset-password')
  .post(userController.reqReset);
//   .post(userController.reset);

export default router;
