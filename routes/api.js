import express from 'express';
import parcelController from '../controllers/ParcelController';
import userController from '../controllers/UserController';

const router = express.Router();

/* Fetch all parcel delivery orders */
router.get('/v1/parcels', parcelController.getAll);

/* Fetch a specific parcel delivery order */
router.get('/v1/parcels/:id', parcelController.getOne);

/* Cancel the specific parcel delivery order */
router.put('/v1/parcels/:id/cancel', parcelController.update);

/* Fetch all parcel delivery orders by a specific user */
router.get('/v1/users/:id/parcels', parcelController.getAll);

/* Create a parcel delivery order */
router.post('/v1/parcels', parcelController.create);

/* Fetch all users */
router.get('/users', userController.getAll);

/* Fetch a specific user */
router.get('/users/:id', userController.getOne);

/* Update the profile */
router.put('/users/:id/update-profile', userController.update);

/* Create a user account */
router.post('/users', userController.create);

/* Sign in into user account */
router.put('/users/login', userController.login);

/* Sign out user account */
router.put('/users/logout', userController.signout);

export default router;
