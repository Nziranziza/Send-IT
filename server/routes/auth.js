import express from 'express';
import userController from '../controllers/UserController';

const router = express.Router();

/* Create a user account  */
router.post('/signup', userController.create);
// login a user account
router.post('/login', userController.login);

export default router;
