import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { postQueue } from '../../infrastructure/QueueService';

const prisma = new PrismaClient();

export class PostController {
  static async create(req: Request, res: Response) {
    const { workspaceId, accountId, content, scheduledAt } = req.body;

    const post = await prisma.post.create({
      data: {
        workspaceId,
        accountId,
        content,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        status: scheduledAt ? 'SCHEDULED' : 'PENDING',
      },
    });

    // Add to background queue for immediate or scheduled processing
    const delay = scheduledAt ? new Date(scheduledAt).getTime() - Date.now() : 0;
    await postQueue.add('publish-post', { postId: post.id }, { delay: Math.max(0, delay) });

    res.status(201).json(post);
  }

  static async list(req: Request, res: Response) {
    const { workspaceId } = req.query;
    const posts = await prisma.post.findMany({
      where: { workspaceId: workspaceId as string },
      include: { account: true, media: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(posts);
  }
}
