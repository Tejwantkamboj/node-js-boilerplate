import agenda from '../config/agenda.js';
import logger from '../config/logger.js';
import { sendEmail } from '../services/emailService.js';

agenda.define('send-register-mail', async (job) => {
  const { email, subject, text } = job.attrs.data;

  await sendEmail(email, subject, text);
  logger.info(`Register email sent to ${email}`);
});
