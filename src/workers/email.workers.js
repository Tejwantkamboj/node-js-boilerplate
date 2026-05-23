import { Worker } from 'bullmq';
import { sendEmail } from '../services/emailService.js';
import { queueConfig, redisConnection } from '../config/index.js';

const emailWorker = new Worker(
  'emailQueue',

  async (job) => {
    const { email, subject, message } = job.data;
    switch (job.name) {
      case 'registerEmail': {
        await sendEmail(email, subject, message);
        break;
      }

      default: {
        console.log(`❌ Unknown Job Name: ${job.name}`);
      }
    }
  },

  {
    connection: redisConnection,
    concurrency: queueConfig.workerOptions.concurrency,
  },
);

emailWorker.on('ready', () => {
  console.log('🚀 Email Worker Started');
});

emailWorker.on('completed', (job) => {
  console.log(`✅ Completed Job: ${job.name}`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`❌ Failed Job: ${job?.name}`);
  console.error(err.message);
});

emailWorker.on('error', (err) => {
  console.error('❌ Worker Error:', err.message);
});

export default emailWorker;
