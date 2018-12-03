import express from 'express';
import userController from '../controllers/UserController';
import parcelController from '../controllers/ParcelController';
import helper from '../helper/helper';

const router = express.Router();

router.use(helper.verifyToken);
/* Create a user account  */
router.get('/', userController.getAllUser);
// Get and delete a user
router.route('/:id')
  .get(userController.getOneUser)
  .delete(userController.deleteUser);
// Get all parcels for a specific user
router.get('/:id/parcels', parcelController.getParcelsForUser);

export default router;
