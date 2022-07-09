import { Router } from 'express';
import { signup, signin, signout } from '../../controller/admin/auth.js';
import { validateSignupRequest, isRequestValidated, validateSigninRequest } from '../../validators/auth.js';

const router = Router();

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup)
router.post('/admin/signin' ,validateSigninRequest, isRequestValidated, signin)
router.post('/admin/signout', signout)



// router.post('/profile', reqiredSignin, (req, res) =>{
//     res.status(200).json({message:"proflie"})
// })

export default router;