import agenda from '../config/agenda.js';
import logger from '../config/logger.js';
import { sendEmail } from '../services/emailService.js';

console.log('Register email worker loaded');

agenda.define('send-register-mail', async (job) => {
  const { email, subject, text } = job.attrs.data;

  console.log(`Register email worker triggered for ${email}`);
  await sendEmail(email, subject, text);
  logger.info(`Register email sent to ${email}`);
});

agenda.on('start:send-register-mail', (job) => {
  console.log(`Register email job started: ${job.attrs._id}`);
});

agenda.on('success:send-register-mail', (job) => {
  console.log(`Register email job completed: ${job.attrs._id}`);
});

agenda.on('fail:send-register-mail', (error, job) => {
  console.error(`Register email job failed: ${job.attrs._id}`, error);
});
