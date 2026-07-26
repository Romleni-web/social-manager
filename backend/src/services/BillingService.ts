const Flutterwave = require('flutterwave-node-v3');
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
const prisma = new PrismaClient();

export class BillingService {
  /**
   * Deducts credits from a user after AI usage.
   */
  static async consumeCredits(userId: string, amount: number = 1) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.creditsRemaining < amount) {
      throw new Error('Insufficient AI credits. Please upgrade your plan.');
    }

    return prisma.user.update({
      where: { id: userId },
      data: { creditsRemaining: { decrement: amount } },
    });
  }

  /**
   * Generates a Flutterwave payment link for the user.
   * Supports M-Pesa, Cards, and other African payment methods.
   */
  static async createPaymentLink(userId: string, planName: string, amount: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const tx_ref = `tx-${userId}-${Date.now()}`;

    try {
      const response = await axios.post(
        'https://api.flutterwave.com/v3/payments',
        {
          tx_ref: tx_ref,
          amount: amount.toString(),
          currency: 'KES', // Kenyan Shillings
          redirect_url: `${process.env.FRONTEND_URL}/dashboard/billing/verify`,
          meta: {
            consumer_id: userId,
            plan_name: planName,
          },
          customer: {
            email: user.email,
            name: user.name || 'Valued Customer',
          },
          customizations: {
            title: 'SocialAI Subscription',
            description: `Payment for ${planName} Plan`,
            logo: 'https://your-logo-url.com/logo.png',
          },
          payment_options: 'card,mpesa,ussd',
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('Flutterwave Error:', error.response?.data || error.message);
      throw new Error('Failed to create payment link');
    }
  }

  /**
   * Verifies a transaction after the user is redirected back.
   */
  static async verifyTransaction(transactionId: string) {
    try {
      const response = await flw.Transaction.verify({ id: transactionId });

      if (response.data.status === 'successful') {
        const userId = response.data.meta.consumer_id;
        const planName = response.data.meta.plan_name;

        // Define credit amounts per plan
        let creditsToAdd = 0;
        if (planName === 'STARTER') creditsToAdd = 100;
        if (planName === 'PRO') creditsToAdd = 500;
        if (planName === 'BUSINESS') creditsToAdd = 2000;

        await prisma.user.update({
          where: { id: userId },
          data: {
            plan: planName,
            creditsRemaining: { increment: creditsToAdd }
          },
        });

        return { success: true, plan: planName };
      }
      return { success: false };
    } catch (error) {
      throw new Error('Transaction verification failed');
    }
  }
}
