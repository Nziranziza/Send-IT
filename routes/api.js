import express from 'express';
import parcelController from '../controllers/ParcelController';

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

export default router;
