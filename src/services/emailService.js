import nodemailer from 'nodemailer';
import {config} from '../config/index.js';
import logger from '../config/logger.js';

const transport = nodemailer.createTransport(config.email.smtp);
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch((error) => logger.warn(`Unable to connect to email server: ${error.message}`));
}

export const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};
