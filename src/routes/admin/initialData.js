import { Router } from 'express';
import { initailData } from '../../controller/admin/initailData.js';
const router = Router();

router.post('/initialdata', initailData)


// router.post('/profile', reqiredSignin, (req, res) =>{
//     res.status(200).json({message:"proflie"})
// })

export default router;