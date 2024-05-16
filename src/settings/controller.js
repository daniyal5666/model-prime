import ApiResponse from '../utils/ApiResponse.js';
import { updateSettings } from './repo.js';

export const updateUserSettings = async (req, res, next) => {
    try {
        await updateSettings(req.body, req.user.id);
        return ApiResponse(res, 200, req.body, 'settings updated successfully.');
    } catch (error) {
        return next(error);
    }
};
