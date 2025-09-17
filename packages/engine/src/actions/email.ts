import sgMail from '@sendgrid/mail';
import { EmailActionConfig, Result, success, failure, getEnv } from '@flowmate/shared';
import { ActionHandler } from '../engine';

export class EmailActionHandler implements ActionHandler {
  type = 'email.send' as const;
  private initialized = false;

  private initialize(): void {
    if (this.initialized) return;

    try {
      const apiKey = getEnv('SENDGRID_API_KEY');
      sgMail.setApiKey(apiKey);
      this.initialized = true;
      console.log('SendGrid email handler initialized');
    } catch (error) {
      console.warn('SendGrid API key not configured, email actions will be no-op');
    }
  }

  async execute(config: EmailActionConfig, context?: any): Promise<Result<any>> {
    this.initialize();

    if (!this.initialized) {
      console.log('Email action (no-op): would send email', { config, context });
      return success({ 
        status: 'no-op', 
        reason: 'SendGrid not configured',
        message: `Would send email to ${config.to} with subject "${config.subject}"` 
      });
    }

    try {
      const fromEmail = getEnv('FROM_EMAIL', 'noreply@flowmate.com');
      
      const msg = {
        to: config.to,
        from: fromEmail,
        subject: config.subject,
        text: config.body,
        html: config.body.replace(/\n/g, '<br>'),
      };

      const result = await sgMail.send(msg);
      console.log('Email sent successfully', { to: config.to, subject: config.subject });
      
      return success({
        status: 'sent',
        messageId: result[0].headers['x-message-id'],
        to: config.to,
        subject: config.subject,
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      return failure(error as Error);
    }
  }
}