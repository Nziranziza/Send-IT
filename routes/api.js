import express from 'express';
import parcelController from '../controllers/ParcelController';
import userController from '../controllers/UserController';

const router = express.Router();

/* Fetch all parcel delivery orders */
router.get('/parcels', parcelController.getAll);

/* Fetch a specific parcel delivery order */
router.get('/parcels/:id', parcelController.getOne);

/* Cancel the specific parcel delivery order */
router.put('/parcels/:id/cancel', parcelController.update);

/* Fetch all parcel delivery orders by a specific user */
router.get('/users/:userId/parcels', parcelController.getAll);

/* GET All Parcels */
router.post('/parcels', parcelController.create);

/* Fetch all users */
router.get('/users', userController.getAll);

/* Fetch a specific user */
router.get('/users/:id', userController.getOne);

/* Update the profile */
router.put('/users/:id/update-profile', userController.update);

/* Create a user account */
router.post('/users', userController.create);

/* Sign in into user account */
router.put('/users/login', userController.signin);

/* Sign out user account */
router.put('/users/logout', userController.signout);

export default router;
