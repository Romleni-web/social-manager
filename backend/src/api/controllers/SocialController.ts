import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SocialController {
  static async connectAccount(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      const { platform, workspaceId } = req.body;

      if (!userId || !workspaceId) {
        return res.status(400).json({ error: 'Missing user or workspace' });
      }

      // In a real app, this would be the OAuth callback logic.
      // We'll simulate a successful connection for now.
      const account = await prisma.socialAccount.create({
        data: {
          workspaceId,
          platform,
          platformId: `sim-${Date.now()}`,
          name: `My ${platform} Account`,
          accessToken: 'simulated-token',
        }
      });

      res.status(201).json(account);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async listAccounts(req: Request, res: Response) {
    try {
      const { workspaceId } = req.query;
      const accounts = await prisma.socialAccount.findMany({
        where: { workspaceId: workspaceId as string }
      });
      res.json(accounts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
