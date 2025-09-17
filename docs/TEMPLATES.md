# Template Development Guide

FlowMate templates provide pre-built workflow configurations that users can quickly customize for their specific needs. This guide explains how to create, modify, and contribute new templates.

## Template Structure

### Template Schema

Templates are defined using the following TypeScript interface:

```typescript
interface Template {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  description: string;           // Brief description
  category: string;             // Industry category
  tags: string[];               // Searchable tags
  workflowTemplate: {           // Workflow configuration
    name: string;
    description?: string;
    trigger: TriggerConfig;
    steps: StepConfig[];
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### Example Template

```typescript
const appointmentReminderTemplate: Template = {
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
};
```

## Template Categories

### Current Categories

#### Salons
Templates for beauty salons, spas, and personal care businesses:
- Appointment reminders
- Client welcome sequences
- Birthday promotions
- Service feedback collection

#### Tradies
Templates for trade professionals and contractors:
- Quote follow-ups
- Job completion surveys
- Payment reminders
- Customer testimonial requests

#### Agencies
Templates for marketing agencies and consultants:
- Lead nurturing sequences
- Client check-ins
- Project milestone notifications
- Proposal follow-ups

### Adding New Categories

To add a new category:

1. Define templates in `/packages/templates/src/templates/index.ts`
2. Export templates from the category module
3. Update the category filter in the web interface
4. Add category-specific documentation

## Variable Templating

Templates support variable substitution using double curly braces `{{variable.name}}`.

### Variable Categories

#### User Variables
```typescript
// User-related data
{{user.name}}           // User's display name
{{user.email}}          // User's email address
{{user.phone}}          // User's phone number
```

#### Business Variables
```typescript
// Business/workspace data
{{business.name}}       // Business name
{{business.phone}}      // Business phone
{{business.email}}      // Business email
{{business.address}}    // Business address
```

#### Dynamic Variables
```typescript
// Context-specific data
{{client.name}}         // Client name
{{client.email}}        // Client email
{{client.phone}}        // Client phone
{{appointment.time}}    // Appointment time
{{appointment.date}}    // Appointment date
{{service.name}}        // Service name
{{service.price}}       // Service price
```

### Variable Rendering

The template renderer handles variable substitution:

```typescript
export class TemplateRenderer {
  static renderTemplate(template: Template, variables: Record<string, any>): Template {
    const rendered = JSON.parse(JSON.stringify(template));
    this.replaceVariables(rendered, variables);
    return rendered;
  }

  private static replaceVariables(obj: any, variables: Record<string, any>): void {
    // Recursively replace variables in strings
    if (typeof obj === 'string') {
      return this.interpolateString(obj, variables);
    }
    // Handle objects and arrays...
  }
}
```

### Usage Example

```typescript
const variables = {
  client: {
    name: 'John Doe',
    phone: '+61400123456',
  },
  salon: {
    name: 'Beautiful Hair Studio',
  },
  appointment: {
    time: '2:00 PM',
    date: '2023-11-16',
  },
};

const rendered = TemplateRenderer.renderTemplate(template, variables);
// Result: "Hi John Doe, this is a reminder that you have an appointment at Beautiful Hair Studio tomorrow at 2:00 PM. See you then!"
```

## Trigger Types

### Cron Triggers

Schedule-based triggers using cron expressions:

```typescript
{
  type: 'cron',
  config: {
    schedule: '0 10 * * *',  // Every day at 10 AM
  },
}
```

**Common Cron Patterns**:
- `0 9 * * 1-5`: Weekdays at 9 AM
- `0 0 1 * *`: First day of every month
- `0 */6 * * *`: Every 6 hours
- `0 10 * * 0`: Sundays at 10 AM

### Webhook Triggers

Event-driven triggers from external systems:

```typescript
{
  type: 'webhook',
  config: {
    endpoint: '/triggers/webhook/new-appointment',
  },
}
```

### Manual Triggers

User-initiated triggers (future enhancement):

```typescript
{
  type: 'manual',
  config: {
    requireConfirmation: true,
  },
}
```

## Action Types

### Email Actions

Send emails using SendGrid:

```typescript
{
  type: 'email.send',
  config: {
    to: '{{client.email}}',
    subject: 'Welcome to {{business.name}}!',
    body: 'Thank you for choosing us...',
  },
  position: 1,
}
```

**Email Features**:
- HTML and plain text support
- Variable substitution in all fields
- Attachment support (planned)
- Template-based emails (planned)

### SMS Actions

Send SMS messages using Twilio:

```typescript
{
  type: 'sms.send',
  config: {
    to: '{{client.phone}}',
    message: 'Reminder: Your appointment is tomorrow at {{appointment.time}}',
  },
  position: 1,
}
```

**SMS Features**:
- International phone number support
- Message length validation
- Delivery status tracking (planned)
- Two-way messaging (planned)

### Webhook Actions

Send data to external systems:

```typescript
{
  type: 'webhook.send',
  config: {
    url: '{{integration.webhook_url}}',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer {{integration.token}}',
      'Content-Type': 'application/json',
    },
    body: {
      event: 'appointment_created',
      data: '{{appointment}}',
    },
  },
  position: 1,
}
```

### Sheet Actions

Append data to Google Sheets (stub implementation):

```typescript
{
  type: 'sheet.append',
  config: {
    sheetId: '{{integration.sheet_id}}',
    data: {
      date: '{{appointment.date}}',
      client: '{{client.name}}',
      service: '{{service.name}}',
      amount: '{{service.price}}',
    },
  },
  position: 1,
}
```

## Creating New Templates

### Step-by-Step Process

1. **Define Template Structure**
   ```typescript
   const newTemplate: Template = {
     id: 'unique-template-id',
     name: 'Template Display Name',
     description: 'Brief description of what this template does',
     category: 'Industry Category',
     tags: ['tag1', 'tag2', 'tag3'],
     workflowTemplate: {
       // Workflow configuration
     },
     createdAt: new Date(),
     updatedAt: new Date(),
   };
   ```

2. **Add to Templates Collection**
   ```typescript
   // In packages/templates/src/templates/index.ts
   export const newCategoryTemplates: Template[] = [
     newTemplate,
     // other templates...
   ];
   
   export const allTemplates: Template[] = [
     ...existingTemplates,
     ...newCategoryTemplates,
   ];
   ```

3. **Test Template Rendering**
   ```typescript
   const testVariables = {
     // Provide test data for all variables used
   };
   
   const rendered = TemplateRenderer.renderTemplate(newTemplate, testVariables);
   console.log('Rendered template:', rendered);
   ```

4. **Add to Seeding Script**
   ```typescript
   // The template will automatically be included in the seed script
   // when added to allTemplates array
   ```

### Template Validation

Templates should include validation for:

```typescript
const validateTemplate = (template: Template): boolean => {
  // Check required fields
  if (!template.id || !template.name || !template.category) {
    return false;
  }
  
  // Validate workflow structure
  if (!template.workflowTemplate.trigger || !template.workflowTemplate.steps.length) {
    return false;
  }
  
  // Check for valid action types
  const validActionTypes = ['email.send', 'sms.send', 'webhook.send', 'sheet.append'];
  for (const step of template.workflowTemplate.steps) {
    if (!validActionTypes.includes(step.type)) {
      return false;
    }
  }
  
  return true;
};
```

## Best Practices

### Template Design

1. **Clear Naming**: Use descriptive names that explain the template's purpose
2. **Appropriate Triggers**: Choose triggers that match the business process
3. **Variable Usage**: Use meaningful variable names that are self-documenting
4. **Step Ordering**: Arrange steps in logical execution order
5. **Error Handling**: Consider what happens when variables are missing

### Message Templates

1. **Professional Tone**: Maintain a professional but friendly tone
2. **Clear Call-to-Action**: Include specific next steps when appropriate
3. **Personalization**: Use variables to personalize messages
4. **Compliance**: Ensure messages comply with communication regulations
5. **Length Limits**: Keep SMS messages under 160 characters when possible

### Variable Design

1. **Consistent Naming**: Use consistent variable naming across templates
2. **Nested Structure**: Group related variables (e.g., `client.name`, `client.email`)
3. **Default Values**: Consider providing default values for optional variables
4. **Documentation**: Document expected variable structure

## Template Testing

### Unit Testing

```typescript
describe('Template Rendering', () => {
  it('should render variables correctly', () => {
    const template = appointmentReminderTemplate;
    const variables = {
      client: { name: 'John Doe', phone: '+61400123456' },
      salon: { name: 'Test Salon' },
      appointment: { time: '2:00 PM' },
    };
    
    const rendered = TemplateRenderer.renderTemplate(template, variables);
    expect(rendered.workflowTemplate.steps[0].config.message)
      .toContain('John Doe');
  });
});
```

### Integration Testing

```typescript
describe('Template Execution', () => {
  it('should execute email template successfully', async () => {
    const workflow = await createWorkflowFromTemplate(emailTemplate);
    const result = await executeWorkflow(workflow.id, testData);
    
    expect(result.status).toBe('completed');
    expect(result.steps[0].status).toBe('completed');
  });
});
```

### Manual Testing

1. Create workflow from template in UI
2. Provide test variable values
3. Execute workflow manually
4. Verify output matches expectations
5. Check logs for errors or warnings

## Contributing Templates

### Submission Process

1. **Fork Repository**: Fork the FlowMate repository
2. **Create Branch**: Create a feature branch for your template
3. **Add Template**: Add template to appropriate category
4. **Add Tests**: Include unit tests for template rendering
5. **Update Documentation**: Add template to relevant documentation
6. **Submit PR**: Submit pull request with detailed description

### Review Criteria

Templates will be reviewed for:
- **Functionality**: Does the template work as described?
- **Usefulness**: Does it solve a real business problem?
- **Quality**: Is the message professional and well-written?
- **Variables**: Are variables used appropriately?
- **Testing**: Are adequate tests included?

### Template Guidelines

1. **Industry Focus**: Templates should be specific to an industry or use case
2. **Real-World Utility**: Address actual business automation needs
3. **Professional Quality**: Messages should be business-appropriate
4. **Variable Documentation**: Clearly document required variables
5. **Compliance Awareness**: Consider legal and regulatory requirements

## Future Enhancements

### Planned Features

1. **Conditional Logic**: If/then statements in templates
2. **Template Marketplace**: Community-contributed templates
3. **Template Versioning**: Version control for template updates
4. **A/B Testing**: Test different template variations
5. **Template Analytics**: Track template usage and success rates

### Advanced Template Features

1. **Multi-Step Workflows**: Complex workflows with branching
2. **Delay Actions**: Wait periods between steps
3. **Approval Steps**: Human approval requirements
4. **Error Handling**: Custom error handling logic
5. **Integration Templates**: Pre-configured third-party integrations

## Resources

### Documentation
- [Template API Reference](api-reference.md)
- [Variable Reference](variables.md)
- [Trigger Configuration](triggers.md)
- [Action Configuration](actions.md)

### Examples
- [Complete Template Examples](examples/)
- [Industry-Specific Templates](examples/industries/)
- [Advanced Workflow Patterns](examples/patterns/)

### Tools
- [Template Validator](tools/validator.ts)
- [Variable Extractor](tools/extractor.ts)
- [Test Data Generator](tools/generator.ts)