import express from 'express';
import parcelController from '../controllers/ParcelController';
import helper from '../helper/helper';

const router = express.Router();

/* Create and fetch parcel delivery order(s) */
router.route('/')
  .post(helper.verifyToken, parcelController.create)
  .get(helper.verifyToken, parcelController.getAll);
// Get one parcel by id
router.get('/:id', parcelController.getOne);
// Change present location only by Admin
router.put('/:id/presentLocation', helper.verifyToken, parcelController.changePresentLocation);
// change destination by user who created the parcel
router.put('/:id/destination', helper.verifyToken, parcelController.changeDestination);
// change the status only by the admin
router.put('/:id/status', helper.verifyToken, parcelController.changeStatus);

export default router;
