import {
  deleteUser,
  getUserDetailsById,
  userList,
  editUser,
  addUser,
} from '../../controllers/adminController/user.controller.js';
import adminAuth from '../../middlewares/adminAUth.js';
import { Router } from 'express';
import { authValidation, commonValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';

const router = Router();
router.use(adminAuth);

router.route('/').get(validate(commonValidation.listWithPagination), userList).post(addUser);

router
  .route('/:id')
  .get(validate(commonValidation.paramIdValidation), getUserDetailsById)
  .delete(validate(commonValidation.paramIdValidation), deleteUser)
  .put(validate(authValidation.updateUser), editUser);

export default router;
