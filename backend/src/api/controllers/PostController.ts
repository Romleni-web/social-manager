import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { postQueue } from '../../infrastructure/QueueService';

const prisma = new PrismaClient();

export class PostController {
  /**
   * Creates posts for all selected accounts and schedules them.
   */
  static async create(req: Request, res: Response) {
    try {
      const { workspaceId, accountIds, content, scheduledAt } = req.body;
      const userId = (req as any).user?.id;

      if (!userId || !accountIds || accountIds.length === 0) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const createdPosts = [];

      for (const accountId of accountIds) {
        const post = await prisma.post.create({
          data: {
            workspaceId,
            accountId,
            content,
            scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
            status: scheduledAt ? 'SCHEDULED' : 'PENDING',
          },
        });

        // BULLMQ: The "Automatic" Part
        // If scheduledAt is in the future, delay the job.
        // If not, it executes immediately.
        const delay = scheduledAt ? new Date(scheduledAt).getTime() - Date.now() : 0;

        await postQueue.add(
          'publish-post',
          { postId: post.id },
          { delay: Math.max(0, delay), removeOnComplete: true }
        );

        createdPosts.push(post);
      }

      res.status(201).json(createdPosts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const { workspaceId } = req.query;
      const userId = (req as any).user?.id;

      const posts = await prisma.post.findMany({
        where: {
          workspaceId: workspaceId as string,
          workspace: {
            members: { some: { userId } }
          }
        },
        include: { account: true },
        orderBy: { createdAt: 'desc' },
      });
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
