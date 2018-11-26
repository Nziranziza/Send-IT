import express from 'express';
import userController from '../controllers/UserController';

const router = express.Router();

/* Create a user account and fetch all users */
router.post('/signup', userController.create);

export default router;
