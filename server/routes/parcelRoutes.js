import express from 'express';
import parcelController from '../controllers/ParcelController';

const router = express.Router();

/* Create a parcel delivery order */
router.route('/')
  .post(parcelController.create)
  .get(parcelController.getAll);
router.get('/:id', parcelController.getOne);
export default router;
