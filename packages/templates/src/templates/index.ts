import { Template } from '@flowmate/shared';

export const salonTemplates: Template[] = [
  {
    id: 'salon-appointment-reminder',
    name: 'Appointment Reminder',
    description: 'Send SMS reminders to clients 24 hours before their salon appointment',
    category: 'Salons',
    tags: ['appointments', 'reminders', 'sms'],
    workflowTemplate: {
      name: 'Salon Appointment Reminder',
      description: 'Automated SMS reminders for salon appointments',
      trigger: {
        type: 'cron',
        config: {
          schedule: '0 10 * * *', // Daily at 10 AM
        },
      },
      steps: [
        {
          type: 'sms.send',
          config: {
            to: '{{client.phone}}',
            message: 'Hi {{client.name}}, this is a reminder that you have an appointment at {{salon.name}} tomorrow at {{appointment.time}}. See you then!',
          },
          position: 1,
        },
      ],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'salon-welcome-sequence',
    name: 'New Client Welcome',
    description: 'Welcome new salon clients with a thank you email and care instructions',
    category: 'Salons',
    tags: ['welcome', 'onboarding', 'email'],
    workflowTemplate: {
      name: 'New Client Welcome Sequence',
      description: 'Welcome new clients to the salon',
      trigger: {
        type: 'webhook',
        config: {
          endpoint: '/triggers/webhook/new-client',
        },
      },
      steps: [
        {
          type: 'email.send',
          config: {
            to: '{{client.email}}',
            subject: 'Welcome to {{salon.name}}!',
            body: 'Hi {{client.name}},\n\nThank you for choosing {{salon.name}}! We\'re excited to help you look and feel your best.\n\nHere are some aftercare tips:\n- Avoid washing your hair for 24-48 hours after coloring\n- Use sulfate-free shampoo to maintain your color\n- Book your next appointment in 6-8 weeks\n\nIf you have any questions, please don\'t hesitate to contact us.\n\nBest regards,\nThe {{salon.name}} Team',
          },
          position: 1,
        },
      ],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const tradieTemplates: Template[] = [
  {
    id: 'tradie-quote-followup',
    name: 'Quote Follow-up',
    description: 'Follow up with customers who haven\'t responded to quotes within 3 days',
    category: 'Tradies',
    tags: ['quotes', 'followup', 'email'],
    workflowTemplate: {
      name: 'Quote Follow-up',
      description: 'Automated follow-up for pending quotes',
      trigger: {
        type: 'cron',
        config: {
          schedule: '0 9 * * 1-5', // Weekdays at 9 AM
        },
      },
      steps: [
        {
          type: 'email.send',
          config: {
            to: '{{customer.email}}',
            subject: 'Following up on your {{service.type}} quote',
            body: 'Hi {{customer.name}},\n\nI hope this email finds you well. I wanted to follow up on the quote I sent for your {{service.type}} project.\n\nQuote Details:\n- Service: {{service.type}}\n- Estimated Cost: ${{quote.amount}}\n- Timeline: {{quote.timeline}}\n\nI understand you might need time to consider your options. If you have any questions or would like to discuss the quote further, please don\'t hesitate to reach out.\n\nI\'m here to help make your project a success!\n\nBest regards,\n{{tradie.name}}\n{{tradie.business}}\n{{tradie.phone}}',
          },
          position: 1,
        },
      ],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'tradie-job-completion',
    name: 'Job Completion Survey',
    description: 'Send satisfaction survey and request for review after job completion',
    category: 'Tradies',
    tags: ['completion', 'survey', 'reviews'],
    workflowTemplate: {
      name: 'Job Completion Follow-up',
      description: 'Survey and review request after job completion',
      trigger: {
        type: 'webhook',
        config: {
          endpoint: '/triggers/webhook/job-completed',
        },
      },
      steps: [
        {
          type: 'email.send',
          config: {
            to: '{{customer.email}}',
            subject: 'How did we do? {{service.type}} completed',
            body: 'Hi {{customer.name}},\n\nThank you for choosing {{tradie.business}} for your {{service.type}} project. I hope you\'re happy with the completed work!\n\nYour feedback is incredibly valuable to us. Could you please take a moment to:\n\n1. Rate your experience (1-5 stars)\n2. Leave a review on Google/Facebook if you were satisfied\n3. Let us know if there\'s anything else we can help with\n\nWe also offer maintenance services and would be happy to help with any future projects.\n\nThank you again for your business!\n\nBest regards,\n{{tradie.name}}\n{{tradie.business}}\n{{tradie.phone}}',
          },
          position: 1,
        },
      ],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const agencyTemplates: Template[] = [
  {
    id: 'agency-lead-nurture',
    name: 'Lead Nurturing Sequence',
    description: 'Multi-step email sequence to nurture new leads over 2 weeks',
    category: 'Agencies',
    tags: ['leads', 'nurturing', 'email', 'sequence'],
    workflowTemplate: {
      name: 'Lead Nurturing Sequence',
      description: 'Educational email sequence for new leads',
      trigger: {
        type: 'webhook',
        config: {
          endpoint: '/triggers/webhook/new-lead',
        },
      },
      steps: [
        {
          type: 'email.send',
          config: {
            to: '{{lead.email}}',
            subject: 'Welcome! Here\'s how we help businesses like yours grow',
            body: 'Hi {{lead.name}},\n\nThank you for your interest in {{agency.name}}! I\'m excited to share how we can help {{lead.company}} achieve its growth goals.\n\nOver the next two weeks, I\'ll be sending you valuable insights about:\n- Digital marketing strategies that work\n- Case studies from similar businesses\n- Common mistakes to avoid\n- How to measure marketing ROI\n\nOur approach is different - we focus on sustainable growth rather than quick fixes. I believe you\'ll find these emails valuable whether we work together or not.\n\nLooking forward to helping you grow!\n\nBest regards,\n{{agency.contact.name}}\n{{agency.name}}\n{{agency.contact.phone}}',
          },
          position: 1,
        },
      ],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'agency-client-checkin',
    name: 'Monthly Client Check-in',
    description: 'Automated monthly check-in with clients to maintain relationships',
    category: 'Agencies',
    tags: ['clients', 'checkin', 'relationship'],
    workflowTemplate: {
      name: 'Monthly Client Check-in',
      description: 'Regular client relationship maintenance',
      trigger: {
        type: 'cron',
        config: {
          schedule: '0 10 1 * *', // First day of each month at 10 AM
        },
      },
      steps: [
        {
          type: 'email.send',
          config: {
            to: '{{client.email}}',
            subject: 'Monthly check-in: How are things going?',
            body: 'Hi {{client.name}},\n\nI hope this email finds you well! As we start another month, I wanted to check in and see how things are going with {{client.company}}.\n\nA few questions for you:\n- How are you feeling about our current marketing efforts?\n- Are there any new challenges or opportunities we should discuss?\n- Is there anything specific you\'d like to focus on this month?\n- Any feedback on how we can better support your goals?\n\nI\'m always here to help and would love to schedule a quick call if you\'re interested. Sometimes a brief conversation can uncover new opportunities!\n\nLooking forward to another successful month together.\n\nBest regards,\n{{agency.contact.name}}\n{{agency.name}}\n{{agency.contact.phone}}',
          },
          position: 1,
        },
      ],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const allTemplates: Template[] = [
  ...salonTemplates,
  ...tradieTemplates,
  ...agencyTemplates,
];