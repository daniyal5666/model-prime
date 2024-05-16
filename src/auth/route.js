import { Router } from 'express';
import checkAuthentication from '../middlewares/auth.middleware.js';
import { signupValidationMiddleware, updateValidationMiddleware } from './dto.middleware.js';
import { uploadProfileImage } from '../middlewares/upload.middlewares.js';
import {
    login,
    registerUser,
    ForgetPassword,
    createPassword,
    forgetPasswordVerificationCode,
    resetOldPassword,
    updateUserProfile,
    editProfileImage,
    getUserData,
} from './controller.js';

const router = Router();

router.post('/login', login);
router.post('/register', signupValidationMiddleware, registerUser);
router.post('/create-password', createPassword);
router.post('/forget-password', ForgetPassword);
router.post('/verify-otp', forgetPasswordVerificationCode);
router.post('/reset-password', resetOldPassword);
router.post('/edit-profile-image', checkAuthentication, uploadProfileImage.single('file'), editProfileImage);
router.post('/edit-profile', checkAuthentication, updateValidationMiddleware, updateUserProfile);
router.get('/user', checkAuthentication, getUserData);

export default router;

// register --> create password
// forget password --> verify otp --> reset password
