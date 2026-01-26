import express from 'express';
import { login, register } from '../../controllers/authController/index.js';
import { authValidation } from '../../validations/index.js';
import validate from '../../middlewares/validate.js';

const router = express.Router();

router.post('/register', validate(authValidation.register), register);
router.post('/login', validate(authValidation.login), login);

export default router;
