const queueConfig = {
  defaultJobOptions: {
    attempts: 5,

    backoff: {
      type: 'exponential',
      delay: 3000,
    },

    removeOnComplete: {
      age: 3600,
      count: 1000,
    },

    removeOnFail: {
      age: 7 * 24 * 3600,
    },
  },

  workerOptions: {
    concurrency: 20,
  },
};

export default queueConfig;
