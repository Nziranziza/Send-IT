import express from 'express';
import parcelController from '../controllers/ParcelController';

const router = express.Router();

/* Create a parcel delivery order */
router.route('/')
  .post(parcelController.create)
  .get(parcelController.getAll);

/* Fetch a specific parcel delivery order */
router.get('/:id', parcelController.getOne);

/* Cancel the specific parcel delivery order */
router.put('/:id/cancel', parcelController.cancel);

/* Update the specific parcel delivery order */
router.put('/:id/update', parcelController.update);
export default router;
