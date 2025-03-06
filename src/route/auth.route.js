import express from 'express';
import { authController } from '../controller/auth.controller.js';

export const authRouter = express.Router();

authRouter.get('/nonce', authController.getNonce);
authRouter.post('/login', authController.verifySignature);
authRouter.post('/logout', authController.logout);