import { Router } from 'express';
import { reqiredSignin, adminMiddleware } from '../common-middleware/index.js';
import { createProduct, getProductsBySlug } from '../controller/product.js';
import multer, { diskStorage } from 'multer';
import { join, dirname } from 'path';
const router = Router();
import { generate } from 'shortid';

const storage = diskStorage({
    destination: function (req, file, cb) {
      cb(null, join(dirname(__dirname), 'uploads' ))
    },
    filename: function (req, file, cb) {
      cb(null, generate() + '-' +file.originalname)
    }
  })

  const upload = multer({ storage })
   

router.post('/product/create',reqiredSignin, adminMiddleware, upload.array('productPicture') ,createProduct);
router.get('/products/:slug', getProductsBySlug)
// router.get('/category/getcategory', getCategory)

export default router