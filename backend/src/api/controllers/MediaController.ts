import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MediaController {
  static async list(req: Request, res: Response) {
    try {
      const { workspaceId } = req.query;
      const media = await prisma.media.findMany({
        where: { workspaceId: workspaceId as string },
        orderBy: { createdAt: 'desc' }
      });
      res.json(media);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async upload(req: Request, res: Response) {
    try {
      const { workspaceId, name, url, type, size } = req.body;
      const media = await prisma.media.create({
        data: {
          workspaceId,
          name,
          url,
          type,
          size,
          tags: '',
          key: `key-${Date.now()}`
        }
      });
      res.status(201).json(media);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
