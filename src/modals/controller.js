import AppError from '../utils/appError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { saveModel, getUserModels, deleteModal } from './repo.js';

export const uploadModal = async (req, res, next) => {
    try {
        if (!req?.file?.path) throw new AppError(400, 'file must be provided.');

        await saveModel([req.file.filename, req.file.path, req.file.size, req.user.id]);

        return ApiResponse(res, 201, { file: req.file.path }, 'modal uploaded successfully.');
    } catch (error) {
        return next(error);
    }
};

export const getModals = async (req, res, next) => {
    try {
        const result = await getUserModels(req.user.id);
        return ApiResponse(res, 200, result, 'user uploaded modals.');
    } catch (error) {
        return next(error);
    }
};

export const deleteUserModal = async (req, res, next) => {
    try {
        await deleteModal([req.params.id, req.user.id]);
        return ApiResponse(res, 200, null, 'modal deleted successfully.');
    } catch (error) {
        return next(error);
    }
};
