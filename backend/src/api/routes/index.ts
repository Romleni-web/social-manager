import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { PostController } from '../controllers/PostController';
import { AIController } from '../controllers/AIController';
import { BillingController } from '../controllers/BillingController';
import { AdminController } from '../controllers/AdminController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

// Auth
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// Protected Routes
router.use(authMiddleware);

// Posts
router.post('/posts', PostController.create);
router.get('/posts', PostController.list);

// AI
router.post('/ai/generate', AIController.generate);
router.post('/ai/rewrite', AIController.rewrite);

// Billing
router.post('/billing/checkout', BillingController.createCheckout);
router.get('/billing/verify', BillingController.verify);

// Admin Routes
router.get('/admin/stats', adminMiddleware, AdminController.getStats);
router.get('/admin/users', adminMiddleware, AdminController.getUsers);
router.patch('/admin/users/plan', adminMiddleware, AdminController.updatePlan);

export default router;
