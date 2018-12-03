import express from 'express';
import userController from '../controllers/UserController';
import parcelController from '../controllers/ParcelController';
import helper from '../helper/helper';

const router = express.Router();

/* Create a user account  */
router.get('/', helper.verifyToken, userController.getAllUser);
// login a user account
router.get('/:id', helper.verifyToken, userController.getOneUser);
// Get all parcels for a specific user
router.get('/:id/parcels', helper.verifyToken, parcelController.getParcelsForUser);

export default router;
