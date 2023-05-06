import { Router } from 'express';
import { router as authRouter } from './auth/infrastructure/router';

export const router = Router();

router.use('/auth', authRouter);