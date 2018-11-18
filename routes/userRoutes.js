import express from 'express';
import parcelController from '../controllers/ParcelController';

const router = express.Router();

/* Fetch all parcel delivery orders by a specific user */
router.get('/:id/parcels', parcelController.getAllForUser);

export default router;
