import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import ApiResponse from '../utils/ApiResponse.js';
import sendEmail from '../utils/mailSender.js';
import { verifyToken } from '../utils/common.js';
import {
    getUserByEmail,
    signup,
    saveNewPasswordAndInitialSetting,
    saveOtp,
    resetPassword,
    updateProfile,
    updateProfileImage,
} from './repo.js';

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) throw new AppError(400, 'please provide email and password');

        const user = await getUserByEmail(email);

        if (!user) throw new AppError(401, 'please provide valid credentials');
        if (!user.password) throw new AppError(401, 'please complete the registration process and create A new password.');

        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) throw new AppError(401, 'please provide valid credentials');

        const token = JWT.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);

        user.token = token;
        delete user.password;
        delete user.is_verified;
        delete user.otp_code;
        delete user.created_at;

        return ApiResponse(res, 200, user, 'user logged in successfully');
    } catch (error) {
        return next(error);
    }
};

export const registerUser = async (req, res, next) => {
    try {
        const email = req.body.email;

        const result = await signup(req.body);
        if (!result.insertId) throw new AppError(500, 'user registration failed');

        // expires in 30 minutes
        const token = JWT.sign({ email }, process.env.JWT_SECRET, { expiresIn: 30 * 60 });

        const passwordLink = `${process.env.APP_URL}/new-password?email=${email}&token=${token}`;

        sendEmail(email, 'Create New Password', passwordLink);

        return ApiResponse(res, 200, null, 'user registered successfully');
    } catch (error) {
        if (error.code == 'ER_DUP_ENTRY') return next(new AppError(400, 'user already registered'));
        return next(error);
    }
};

export const createPassword = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email) throw new AppError(400, 'please provide email address.');
        if (!password) throw new AppError(400, 'please provide valid password.');

        const authorization = req.headers.authorization;
        if (!authorization) throw new AppError(401, 'authentication failed.');

        const token = authorization.replace('Bearer ', '');
        if (!token) throw new AppError(401, 'authentication failed.');

        const data = verifyToken(token);

        if (data == 'token expired') {
            const token = JWT.sign({ email }, process.env.JWT_SECRET, { expiresIn: 30 * 60 });
            const passwordLink = `${process.env.APP_URL}/new-password?email=${email}&token=${token}`;
            sendEmail(email, 'Create New Password', passwordLink);
            throw new AppError(400, 'token expired. A new email has been sent successfully check your mail inbox.');
        }

        const user = await getUserByEmail(data.email);

        if (!user) throw new AppError(400, 'invalid user email. Please register first.');
        if (user.is_verified) throw new AppError(401, 'user has already set the app password.');

        const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUND));

        const result = await saveNewPasswordAndInitialSetting(user.id, data.email, hash);

        if (!result.status) {
            const token = JWT.sign({ email }, process.env.JWT_SECRET, { expiresIn: 30 * 60 });
            const passwordLink = `${process.env.APP_URL}/new-password?email=${email}&token=${token}`;
            sendEmail(email, 'Create Password', passwordLink);
            throw new AppError(400, 'password creation failed. A new email has been sent successfully check your mail inbox.');
        }

        return ApiResponse(res, 200, null, 'new password created successfully');
    } catch (error) {
        return next(error);
    }
};

export const ForgetPassword = async (req, res, next) => {
    try {
        const email = req.body.email;

        if (!email) throw new AppError(400, 'please provide email address');

        const user = await getUserByEmail(email);

        if (!user) throw new AppError(400, 'invalid email address');
        if (!user.is_verified) throw new AppError(400, 'please complete the registration process.');

        const otp = Math.floor(10000 + Math.random() * 90000).toString();
        await saveOtp([otp, email]);

        sendEmail(email, 'Forget Password OTP', otp);

        return ApiResponse(res, 200, null, 'OTP has been sent successfully.');
    } catch (error) {
        return next(error);
    }
};

export const forgetPasswordVerificationCode = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!email) throw new AppError(400, 'please provide email address');
        if (!otp || otp.length != 5) throw new AppError(400, 'please provide valid otp code');

        const user = await getUserByEmail(email);

        if (!user) throw new AppError(400, 'invalid email address');
        if (otp != user.otp_code) throw new AppError(400, 'Invalid otp. please try again.');

        const token = JWT.sign({ email, reset: true }, process.env.JWT_SECRET, { expiresIn: 30 * 60 });

        const passwordLink = `${process.env.APP_URL}/reset-password?email=${email}&token=${token}`;
        sendEmail(email, 'Reset Password Link', passwordLink);

        return ApiResponse(res, 200, null, 'otp verified. Check your email a new reset password link is sent.');
    } catch (error) {
        return next(error);
    }
};

export const resetOldPassword = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email) throw new AppError(400, 'please provide email address');
        if (!password) throw new AppError(400, 'please provide new password');

        const authorization = req.headers.authorization;
        if (!authorization) throw new AppError(401, 'authentication failed.');

        const token = authorization.replace('Bearer ', '');
        if (!token) throw new AppError(401, 'authentication failed.');

        const data = verifyToken(token);

        if (data == 'token expired') {
            const token = JWT.sign({ email, reset: true }, process.env.JWT_SECRET, { expiresIn: 30 * 60 });
            const passwordLink = `${process.env.APP_URL}/reset-password?email=${email}&token=${token}`;
            sendEmail(email, 'Reset Password Link', passwordLink);
            throw new AppError(400, 'token expired. A new email has been sent successfully check your mail inbox.');
        }

        const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUND));
        await resetPassword([hash, data.email]);

        return ApiResponse(res, 200, null, 'password reset successfully.');
    } catch (error) {
        return next(error);
    }
};

export const updateUserProfile = async (req, res, next) => {
    try {
        const data = req.user;

        await updateProfile(req.body, data.id);
        // const user = await getUserByEmail(data.email);

        // user.token = data.token;
        // delete user.password;
        // delete user.is_verified;
        // delete user.otp_code;
        // delete user.created_at;

        return ApiResponse(res, 200, { ...data, ...req.body }, 'profile updated successfully.');
    } catch (error) {
        return next(error);
    }
};

export const editProfileImage = async (req, res, next) => {
    try {
        const profile_image = req.file?.path;
        if (!profile_image) throw new AppError(400, 'file must be provided.');

        const { id, email } = req.user;

        await updateProfileImage([profile_image, id, email]);

        return ApiResponse(res, 200, { profile_image }, 'profile image updated successfully.');
    } catch (error) {
        return next(error);
    }
};

export const getUserData = async (req, res, next) => {
    try {
        const data = req.user;

        const user = await getUserByEmail(data.email);

        user.token = data.token;
        delete user.password;
        delete user.is_verified;
        delete user.otp_code;
        delete user.created_at;

        return ApiResponse(res, 200, user, 'user profile data.');
    } catch (error) {
        return next(error);
    }
};
