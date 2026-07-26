import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

export const postQueue = new Queue('post-scheduling', { connection });

export const postWorker = new Worker('post-scheduling', async job => {
  const { postId } = job.data;
  console.log(`Processing post ${postId}...`);
  // Here we would call the social media APIs
  // Update post status in DB
}, { connection });
