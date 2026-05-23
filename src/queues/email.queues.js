import { Queue } from 'bullmq';
import { redisConnection, queueConfig } from '../config/index.js';

const emailQueue = new Queue('emailQueue', {
  connection: redisConnection,

  defaultJobOptions: queueConfig.defaultJobOptions,
});

export const sendRegisterEmail = async (data) => {
  await emailQueue.add('registerEmail', data);
};

export const sendForgotPasswordEmail = async (data) => {
  await emailQueue.add('forgotPasswordEmail', data);
};

export const sendResetPasswordEmail = async (data) => {
  await emailQueue.add('resetPasswordEmail', data);
};

export default {
  sendRegisterEmail,
  sendForgotPasswordEmail,
  sendResetPasswordEmail,
};
