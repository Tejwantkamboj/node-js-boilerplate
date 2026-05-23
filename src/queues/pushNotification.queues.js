import { Queue } from 'bullmq';
import { redisConnection, queueConfig } from '../config/index.js';

const notificationQueue = new Queue('notificationQueue', {
  connection: redisConnection,

  defaultJobOptions: queueConfig.defaultJobOptions,
});

export const pushNotification = async (data) => {
  await notificationQueue.add('pushNotification', data);
};
