import { Router } from 'express';
const router = Router();
import { signup, signin } from '../controller/auth.js';
import { validateSignupRequest, isRequestValidated, validateSigninRequest } from '../validators/auth.js';

router.post('/signin', validateSigninRequest, isRequestValidated, signin)

router.post('/signup', validateSignupRequest, isRequestValidated , signup)

// router.post('/profile', reqiredSignin, (req, res) =>{
//     res.status(200).json({message:"proflie"})
// })

export default router;