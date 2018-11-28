import express from 'express';
import userController from '../controllers/UserController';
import helper from '../helper/helper';

const router = express.Router();

/* Create a user account  */
router.get('/', helper.verifyToken, userController.getAllUser);
// login a user account
router.post('/:id', helper.verifyToken, userController.getOneUser);

export default router;
