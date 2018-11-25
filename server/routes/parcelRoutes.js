import express from 'express';
import parcelController from '../controllers/ParcelController';

const router = express.Router();

/* Create and fetch parcel delivery order(s) */
router.route('/')
  .post(parcelController.create)
  .get(parcelController.getAll);
router.get('/:id', parcelController.getOne);
router.put('/:id/presentLocation', parcelController.changePresentLocation);
router.put('/:id/destination', parcelController.changeDestination);
router.put('/:id/status', parcelController.changeStatus);
export default router;
