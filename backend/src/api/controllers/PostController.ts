import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

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
        status: scheduledAt ? 'SCHEDULED' : 'DRAFT',
      },
    });

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
