import { Router } from 'express';
import checkAuthentication from '../middlewares/auth.middleware.js';
import { productValidationMiddleware } from './dto.middleware.js';
import { getAllClients, addNewProduct, getAllProducts, deleteProduct } from './controller.js';

const router = Router();

router.get('/get-all-clients', checkAuthentication, getAllClients);
router.get('/get-all-products', checkAuthentication, getAllProducts);
router.post('/add-new-product', checkAuthentication, productValidationMiddleware, addNewProduct);
router.post('/delete-product', checkAuthentication, deleteProduct);

export default router;
