import ApiResponse from '../utils/ApiResponse.js';
import AppError from '../utils/appError.js';
import { getVerifiedUsers, saveProduct, getProducts, deleteSingleProduct, deletedMultipleProducts } from './repo.js';

export const getAllClients = async (req, res, next) => {
    try {
        const result = await getVerifiedUsers();
        return ApiResponse(res, 200, result, 'all registered clients.');
    } catch (error) {
        return next(error);
    }
};

export const getAllProducts = async (req, res, next) => {
    try {
        const result = await getProducts();
        return ApiResponse(res, 200, result, 'all products.');
    } catch (error) {
        return next(error);
    }
};

export const addNewProduct = async (req, res, next) => {
    try {
        const result = await saveProduct(req.body);

        if (!result.status) throw new AppError(500, 'failed to create new product');

        return ApiResponse(res, 201, { id: result.id, ...req.body }, 'product added successfully.');
    } catch (error) {
        return next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const id = req.body.id;

        if (!id || typeof id != 'number' || (typeof id != 'object' && !id.length)) throw new AppError(400, 'invalid product id.');

        if (typeof id == 'number') await deleteSingleProduct(id);
        if (typeof id == 'object' && id.length) await deletedMultipleProducts(id);

        return ApiResponse(res, 200, null, 'product deleted successfully.');
    } catch (error) {
        return next(error);
    }
};
