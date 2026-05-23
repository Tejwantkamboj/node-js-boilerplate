import { config } from './index.js';

const queueConfig = {
  defaultJobOptions: {
    attempts: config.queues.attempts,

    backoff: {
      type: 'exponential',
      delay: config.queues.backoff,
    },

    removeOnComplete: {
      age: config.queues.ageOnComplete,
      count: config.queues.count,
    },

    removeOnFail: {
      age: config.queues.removeOnFail,
    },
  },

  workerOptions: {
    concurrency: config.queues.concurrency,
  },
};

export default queueConfig;
