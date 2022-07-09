import { Router } from 'express';
import { addCategory, getCategory } from '../controller/category.js';
import { reqiredSignin, adminMiddleware } from '../common-middleware/index.js';
const router = Router();
import multer, { diskStorage } from 'multer';
import { join, dirname } from 'path';
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
   

router.post('/category/create',reqiredSignin, adminMiddleware, upload.single('categoryImage') , addCategory);
router.get('/category/getcategory', getCategory)

export default router