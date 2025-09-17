import { Twilio } from 'twilio';
import { SmsActionConfig, Result, success, failure, getEnv } from '@flowmate/shared';
import { ActionHandler } from '../engine';

export class SmsActionHandler implements ActionHandler {
  type = 'sms.send' as const;
  private client: Twilio | null = null;
  private initialized = false;

  private initialize(): void {
    if (this.initialized) return;

    try {
      const accountSid = getEnv('TWILIO_ACCOUNT_SID');
      const authToken = getEnv('TWILIO_AUTH_TOKEN');
      this.client = new Twilio(accountSid, authToken);
      this.initialized = true;
      console.log('Twilio SMS handler initialized');
    } catch (error) {
      console.warn('Twilio credentials not configured, SMS actions will be no-op');
    }
  }

  async execute(config: SmsActionConfig, context?: any): Promise<Result<any>> {
    this.initialize();

    if (!this.initialized || !this.client) {
      console.log('SMS action (no-op): would send SMS', { config, context });
      return success({ 
        status: 'no-op', 
        reason: 'Twilio not configured',
        message: `Would send SMS to ${config.to}: "${config.message}"` 
      });
    }

    try {
      const fromPhone = getEnv('FROM_PHONE');
      
      const message = await this.client.messages.create({
        body: config.message,
        from: fromPhone,
        to: config.to,
      });

      console.log('SMS sent successfully', { to: config.to, sid: message.sid });
      
      return success({
        status: 'sent',
        sid: message.sid,
        to: config.to,
        message: config.message,
      });
    } catch (error) {
      console.error('Failed to send SMS:', error);
      return failure(error as Error);
    }
  }
}