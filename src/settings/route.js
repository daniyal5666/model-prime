import { Router } from 'express';
import { updateUserSettings } from './controller.js';

const router = Router();

router.put('/update-user-settings', updateUserSettings);

export default router;
