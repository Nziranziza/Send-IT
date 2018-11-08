import express from 'express';
import parcelController from '../controllers/ParcelController';

const router = express.Router();

/* Fetch all parcel delivery orders */
router.get('/v1/parcels', parcelController.getAll);

/* Fetch a specific parcel delivery order */
router.get('/v1/parcels/:id', parcelController.getOne);

/* Cancel the specific parcel delivery order */
router.put('/v1/parcels/:id/cancel', parcelController.update);

/* Fetch all parcel delivery orders by a specific user */
router.get('/v1/users/:userId/parcels', parcelController.getAll);

/* GET All Parcels */
router.post('/v1/parcels', parcelController.create);

export default router;
