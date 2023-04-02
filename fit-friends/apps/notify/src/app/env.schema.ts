import Joi from 'joi';

const DEFAULT_MONGO_DB_PORT = 27019;
const DEFAULT_MAIL_SMTP_PORT = 5025;

export default Joi.object({
  MONGO_DB: Joi
    .string()
    .required(),
  MONGO_HOST: Joi
    .string()
    .hostname()
    .required(),
  MONGO_PORT: Joi
    .number()
    .port()
    .default(DEFAULT_MONGO_DB_PORT)
    .required(),
  MONGO_USER: Joi
    .string()
    .required(),
  MONGO_PASSWORD: Joi
    .string(),
  MONGO_DB_BASE: Joi
    .string()
    .required(),
  MAIL_SMTP_HOST: Joi
    .string()
    .required(),
  MAIL_SMTP_PORT: Joi
    .number()
    .port()
    .default(DEFAULT_MAIL_SMTP_PORT)
    .required(),
  MAIL_USER_NAME: Joi
    .string()
    .required(),
  MAIL_USER_PASSWORD: Joi
    .string()
    .required(),
  MAIL_FROM: Joi
    .string()
    .required(),
});