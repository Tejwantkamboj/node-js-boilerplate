import path from 'path';
import { fileURLToPath } from 'url';
import Joi from 'joi';
import dotenv from 'dotenv';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

dotenv.config();

console.log("env file congig", process.env.PORT)
const config="";
// const envVarsSchema = Joi.object()
//   .keys({
//     NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
//     PORT: Joi.number().default(3000),
//     MONGODB_URL: Joi.string().required().description('Mongo DB url'),
//     JWT_SECRET: Joi.string().required().description('JWT secret key'),
//     JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30),
//     JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30),
//     JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(10),
//     JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10),
//     SMTP_HOST: Joi.string(),
//     SMTP_PORT: Joi.number(),
//     SMTP_USERNAME: Joi.string(),
//     SMTP_PASSWORD: Joi.string(),
//     EMAIL_FROM: Joi.string(),
//   })
//   .unknown();

// const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

// if (error) {
//   throw new Error(`Config validation error: ${error.message}`);
// }

// const config = {
//   env: envVars.NODE_ENV,
//   port: envVars.PORT,
//   mongoose: {
//     url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
//     options: {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//   },
//   jwt: {
//     secret: envVars.JWT_SECRET,
//     accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
//     refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
//     resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
//     verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
//   },
//   email: {
//     smtp: {
//       host: envVars.SMTP_HOST,
//       port: envVars.SMTP_PORT,
//       auth: {
//         user: envVars.SMTP_USERNAME,
//         pass: envVars.SMTP_PASSWORD,
//       },
//     },
//     from: envVars.EMAIL_FROM,
//   },
// };

export default config;
