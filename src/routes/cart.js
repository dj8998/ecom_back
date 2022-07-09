import express from 'express'
import { addItemToCart } from '../controller/cart.js';
import { reqiredSignin, userMiddleware } from '../common-middleware/index.js';

const router = express.Router()
router.post('/user/cart/addtocart', reqiredSignin, userMiddleware, addItemToCart);

export default router