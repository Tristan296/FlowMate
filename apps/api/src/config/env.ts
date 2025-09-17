import { str, port, cleanEnv } from 'envalid';

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ default: 'development' }),
  DATABASE_URL: str(),
  REDIS_URL: str(),
  API_PORT: port({ default: 4000 }),
  SENDGRID_API_KEY: str({ default: '' }),
  FROM_EMAIL: str({ default: 'noreply@flowmate.com' }),
  TWILIO_ACCOUNT_SID: str({ default: '' }),
  TWILIO_AUTH_TOKEN: str({ default: '' }),
  FROM_PHONE: str({ default: '' }),
  ENCRYPTION_KEY: str({ default: 'default-key-for-development-only' }),
});