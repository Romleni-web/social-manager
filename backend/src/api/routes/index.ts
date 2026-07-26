import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { PostController } from '../controllers/PostController';
import { AIController } from '../controllers/AIController';
import { BillingController } from '../controllers/BillingController';

const router = Router();

// Auth
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// Posts
router.post('/posts', PostController.create);
router.get('/posts', PostController.list);

// AI
router.post('/ai/generate', AIController.generate);
router.post('/ai/rewrite', AIController.rewrite);

// Billing
router.post('/billing/checkout', BillingController.createCheckout);
router.get('/billing/verify', BillingController.verify);

export default router;
