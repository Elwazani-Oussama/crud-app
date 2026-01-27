import express from 'express';
const router = express.Router();
import { signup, login, logout, forgotPassword, resetPassword } 
from '../controllers/userController.js';
import { errorHandler, Validations } from '../Middlewares/validations.js';

router.post('/signup', Validations.signup, errorHandler,signup)  
router.post('/login', Validations.login, errorHandler,login)
router.post('/logout', logout)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

export default router;