import { Router } from 'express';
import progress from './middleware.js';
import checkAuthentication from '../middlewares/auth.middleware.js';
import { uploadModel } from '../middlewares/upload.middlewares.js';
import { uploadModal, getModals, deleteUserModal } from './controller.js';

const router = Router();

router.post('/upload-modal', checkAuthentication, progress, uploadModel.single('file'), uploadModal);
router.get('/get-user-modals', checkAuthentication, getModals);
router.get('/delete-user-modal/:id', checkAuthentication, deleteUserModal);

export default router;
