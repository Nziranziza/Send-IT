import express from 'express';
import parcelController from '../controllers/ParcelController';
import helper from '../helper/helper';

const router = express.Router();

router.use(helper.verifyToken);
/* Create and fetch parcel delivery order(s) */
router.route('/')
  .post(parcelController.create)
  .get(parcelController.getAll);
// Get one parcel by id and delete user by id
router.route('/:id')
  .get(parcelController.getOne)
  .delete(parcelController.deleteParcel);
// Change present location only by Admin
router.put('/:id/presentLocation', parcelController.changePresentLocation);
// change destination by user who created the parcel
router.put('/:id/destination', parcelController.changeDestination);
// change the status only by the admin
router.put('/:id/status', parcelController.changeStatus);

router.put('/:id/cancel', parcelController.cancelParcel);

export default router;
