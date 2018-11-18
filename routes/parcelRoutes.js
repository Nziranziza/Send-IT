import express from 'express';
import parcelController from '../controllers/ParcelController';

const router = express.Router();

/* Create a parcel delivery order */
router.route('/')
  .post(parcelController.create)
  .get(parcelController.getAll);

/* Fetch a specific parcel delivery order */
router.get('/:id', parcelController.getOne);
export default router;
