import { Request, Response } from 'express';
import { BillingService } from '../../services/BillingService';

export class BillingController {
  static async createCheckout(req: Request, res: Response) {
    try {
      const { planName, amount } = req.body;
      const userId = (req as any).user?.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const payment = await BillingService.createPaymentLink(userId, planName, amount);
      res.json(payment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async verify(req: Request, res: Response) {
    try {
      const { transaction_id } = req.query;

      if (!transaction_id) {
        return res.status(400).json({ error: 'Transaction ID is required' });
      }

      const result = await BillingService.verifyTransaction(transaction_id as string);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
