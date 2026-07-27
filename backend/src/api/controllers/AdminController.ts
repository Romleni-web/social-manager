import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AdminController {
  static async getStats(req: Request, res: Response) {
    try {
      const userCount = await prisma.user.count();
      const postCount = await prisma.post.count();
      const workspaceCount = await prisma.workspace.count();

      // Basic revenue aggregation (simplified)
      const revenue = await prisma.user.count({ where: { NOT: { plan: 'FREE' } } });

      res.json({
        users: userCount,
        posts: postCount,
        workspaces: workspaceCount,
        activeSubscriptions: revenue,
        systemStatus: 'healthy',
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          plan: true,
          role: true,
          creditsRemaining: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updatePlan(req: Request, res: Response) {
    try {
      const { userId, plan, credits } = req.body;
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          plan,
          creditsRemaining: credits
        },
      });
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
