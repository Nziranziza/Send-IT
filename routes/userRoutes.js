import express from 'express';
import parcelController from '../controllers/ParcelController';
import userController from '../controllers/UserController';

const router = express.Router();

/* Fetch all parcel delivery orders by a specific user */
router.get('/:id/parcels', parcelController.getAllForUser);

/* Create a user account and fetch all users */
router.route('/')
  .post(userController.create)
  .get(userController.getAll);

/* Fetch a specific user */
router.get('/:id', userController.getOne);

/* Sign in into user account */
router.put('/login', userController.signin);

/* Sign out user account */
router.put('/logout', userController.signout);

export default router;
