import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Joi from 'joi';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPaths = [path.resolve(process.cwd(), '.env'), path.resolve(__dirname, '../.env')];

const envPath = envPaths.find((currentPath) => fs.existsSync(currentPath));

dotenv.config(envPath ? { path: envPath } : undefined);

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(10),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10),
    SMTP_HOST: Joi.string(),
    SMTP_PORT: Joi.number(),
    SMTP_USERNAME: Joi.string(),
    SMTP_PASSWORD: Joi.string(),
    EMAIL_FROM: Joi.string(),
    REDIS_HOST: Joi.string().default('127.0.0.1'),
    REDIS_PORT: Joi.number().default(6379),
    REDIS_PASSWORD: Joi.string(),
    CACHE_PREFIX: Joi.string().default('app_cache'),
    CACHE_TTL_USER: Joi.number().default(3600),
    CACHE_TTL_SESSION: Joi.number().default(604800),
    AGENDA_PROCESS_EVERY: Joi.string().default('30 seconds'),
    AGENDA_MAX_CONCURRENCY: Joi.number().default(20),
    AGENDA_DEFAULT_CONCURRENCY: Joi.number().default(5),
    AGENDA_DEFAULT_LOCK_LIFETIME: Joi.number().default(10 * 60 * 1000),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    password: envVars.REDIS_PASSWORD,
    cachePrefix: envVars.CACHE_PREFIX || 'app_cache',
    ttl: {
      user: envVars.CACHE_TTL_USER || 3600,
      session: envVars.CACHE_TTL_SESSION || 604800,
    },
  },
  agenda: {
    agendaProcessEvery: envVars.AGENDA_PROCESS_EVERY,
    maxConcurrency: envVars.AGENDA_MAX_CONCURRENCY,
    defaultConcurrency: envVars.AGENDA_DEFAULT_CONCURRENCY,
    defaultLockLifetime: envVars.AGENDA_DEFAULT_LOCK_LIFETIME,
  },
};

export default config;
