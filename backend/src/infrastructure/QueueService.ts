import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { PrismaClient } from '@prisma/client';
import { SocialService } from '../services/SocialService';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null
});
const prisma = new PrismaClient();

export const postQueue = new Queue('post-scheduling', { connection });

export const postWorker = new Worker('post-scheduling', async job => {
  const { postId } = job.data;
  console.log(`Processing post ${postId}...`);

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { account: true }
    });

    if (!post || !post.account) {
      console.error('Post or Social Account not found');
      return;
    }

    // Call Social Service to actually POST to social media
    await SocialService.publishPost(
      post.account.platform,
      post.content,
      post.account.accessToken
    );

    // Update post status to PUBLISHED
    await prisma.post.update({
      where: { id: postId },
      data: { status: 'PUBLISHED', publishedAt: new Date() }
    });

    console.log(`Post ${postId} published successfully.`);
  } catch (error) {
    console.error(`Post ${postId} failed:`, error);
    await prisma.post.update({
      where: { id: postId },
      data: { status: 'FAILED' }
    });
  }
}, { connection });
