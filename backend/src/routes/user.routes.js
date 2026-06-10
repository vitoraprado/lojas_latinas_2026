import { Router } from 'express';
import * as controller from '../controllers/user.controller.js';
import {wrap} from '../middleware/errorHandler.js';

const router = Router();

router.post('/login', wrap(controller.login));

export default router;