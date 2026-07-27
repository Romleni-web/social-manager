import { Request, Response } from 'express';
import { AIService } from '../../services/AIService';
import { BillingService } from '../../services/BillingService';

export class AIController {
  static async generate(req: Request, res: Response) {
    try {
      // Logic: Get id from the user object set by auth middleware
      const userId = (req as any).user?.id;

      // Enforce credit usage
      if (userId) {
        await BillingService.consumeCredits(userId, 1);
      }

      const { prompt, platform, tone } = req.body;
      const result = await AIService.generateContent(prompt, platform, tone);
      res.json(result);
    } catch (error: any) {
      res.status(402).json({ error: error.message });
    }
  }

  static async rewrite(req: Request, res: Response) {
    try {
      const { content, instruction } = req.body;
      const result = await AIService.rewriteContent(content, instruction);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
