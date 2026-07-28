import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class DashboardController {
  static async getOverview(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      const { workspaceId } = req.query;

      if (!userId || !workspaceId) {
        return res.status(400).json({ error: 'Missing user or workspace' });
      }

      const [postCounts, accountCount, mediaCount] = await Promise.all([
        prisma.post.groupBy({
          by: ['status'],
          where: { workspaceId: workspaceId as string },
          _count: true
        }),
        prisma.socialAccount.count({ where: { workspaceId: workspaceId as string } }),
        prisma.media.count({ where: { workspaceId: workspaceId as string } }),
      ]);

      const stats = {
        scheduled: postCounts.find(p => p.status === 'SCHEDULED')?._count || 0,
        published: postCounts.find(p => p.status === 'PUBLISHED')?._count || 0,
        drafts: postCounts.find(p => p.status === 'DRAFT')?._count || 0,
        failed: postCounts.find(p => p.status === 'FAILED')?._count || 0,
        accounts: accountCount,
        media: mediaCount
      };

      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
