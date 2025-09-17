import { z } from 'zod';

// User and Workspace types
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const WorkspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  ownerId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Trigger types
export const TriggerTypeEnum = z.enum(['cron', 'webhook']);

export const CronTriggerConfigSchema = z.object({
  schedule: z.string(), // cron expression
});

export const WebhookTriggerConfigSchema = z.object({
  endpoint: z.string(),
});

export const TriggerSchema = z.object({
  id: z.string(),
  workflowId: z.string(),
  type: TriggerTypeEnum,
  config: z.union([CronTriggerConfigSchema, WebhookTriggerConfigSchema]),
  enabled: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Action types
export const ActionTypeEnum = z.enum(['email.send', 'sms.send', 'sheet.append']);

export const EmailActionConfigSchema = z.object({
  to: z.string(),
  subject: z.string(),
  body: z.string(),
});

export const SmsActionConfigSchema = z.object({
  to: z.string(),
  message: z.string(),
});

export const SheetActionConfigSchema = z.object({
  sheetId: z.string(),
  data: z.record(z.any()),
});

export const ActionConfigSchema = z.union([
  EmailActionConfigSchema,
  SmsActionConfigSchema,
  SheetActionConfigSchema,
]);

// Step types
export const StepSchema = z.object({
  id: z.string(),
  workflowId: z.string(),
  type: ActionTypeEnum,
  config: ActionConfigSchema,
  position: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Workflow types
export const WorkflowStatusEnum = z.enum(['draft', 'published', 'paused']);

export const WorkflowSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  templateId: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  status: WorkflowStatusEnum.default('draft'),
  trigger: TriggerSchema.optional(),
  steps: z.array(StepSchema).default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Run types
export const RunStatusEnum = z.enum(['pending', 'running', 'completed', 'failed', 'cancelled']);

export const RunSchema = z.object({
  id: z.string(),
  workflowId: z.string(),
  status: RunStatusEnum.default('pending'),
  triggeredBy: z.string(),
  triggeredAt: z.date(),
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  error: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const StepRunStatusEnum = z.enum(['pending', 'running', 'completed', 'failed', 'skipped']);

export const StepRunSchema = z.object({
  id: z.string(),
  runId: z.string(),
  stepId: z.string(),
  status: StepRunStatusEnum.default('pending'),
  input: z.any().optional(),
  output: z.any().optional(),
  error: z.string().optional(),
  retryCount: z.number().default(0),
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Template types
export const TemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  workflowTemplate: z.object({
    name: z.string(),
    description: z.string().optional(),
    trigger: z.object({
      type: TriggerTypeEnum,
      config: z.union([CronTriggerConfigSchema, WebhookTriggerConfigSchema]),
    }),
    steps: z.array(z.object({
      type: ActionTypeEnum,
      config: ActionConfigSchema,
      position: z.number(),
    })),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Export type definitions
export type User = z.infer<typeof UserSchema>;
export type Workspace = z.infer<typeof WorkspaceSchema>;
export type Trigger = z.infer<typeof TriggerSchema>;
export type TriggerType = z.infer<typeof TriggerTypeEnum>;
export type CronTriggerConfig = z.infer<typeof CronTriggerConfigSchema>;
export type WebhookTriggerConfig = z.infer<typeof WebhookTriggerConfigSchema>;
export type Action = z.infer<typeof ActionConfigSchema>;
export type ActionType = z.infer<typeof ActionTypeEnum>;
export type EmailActionConfig = z.infer<typeof EmailActionConfigSchema>;
export type SmsActionConfig = z.infer<typeof SmsActionConfigSchema>;
export type SheetActionConfig = z.infer<typeof SheetActionConfigSchema>;
export type Step = z.infer<typeof StepSchema>;
export type Workflow = z.infer<typeof WorkflowSchema>;
export type WorkflowStatus = z.infer<typeof WorkflowStatusEnum>;
export type Run = z.infer<typeof RunSchema>;
export type RunStatus = z.infer<typeof RunStatusEnum>;
export type StepRun = z.infer<typeof StepRunSchema>;
export type StepRunStatus = z.infer<typeof StepRunStatusEnum>;
export type Template = z.infer<typeof TemplateSchema>;