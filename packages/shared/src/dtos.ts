import { z } from 'zod';
import { WorkflowSchema, RunSchema, StepRunSchema, TemplateSchema } from './types';

// DTOs for API endpoints

// Workflow DTOs
export const CreateWorkflowDtoSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  templateId: z.string().optional(),
});

export const UpdateWorkflowDtoSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['draft', 'published', 'paused']).optional(),
});

export const WorkflowResponseDtoSchema = WorkflowSchema.omit({
  createdAt: true,
  updatedAt: true,
}).extend({
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Run DTOs
export const CreateRunDtoSchema = z.object({
  workflowId: z.string(),
  triggeredBy: z.string(),
  input: z.any().optional(),
});

export const RunResponseDtoSchema = RunSchema.omit({
  triggeredAt: true,
  startedAt: true,
  completedAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  triggeredAt: z.string(),
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Step Run DTOs
export const StepRunResponseDtoSchema = StepRunSchema.omit({
  startedAt: true,
  completedAt: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  startedAt: z.string().optional(),
  completedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Template DTOs
export const TemplateResponseDtoSchema = TemplateSchema.omit({
  createdAt: true,
  updatedAt: true,
}).extend({
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Pagination DTOs
export const PaginationDtoSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export const PaginatedResponseDtoSchema = <T>(itemSchema: z.ZodSchema<T>) =>
  z.object({
    data: z.array(itemSchema),
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      totalPages: z.number(),
    }),
  });

// Export type definitions
export type CreateWorkflowDto = z.infer<typeof CreateWorkflowDtoSchema>;
export type UpdateWorkflowDto = z.infer<typeof UpdateWorkflowDtoSchema>;
export type WorkflowResponseDto = z.infer<typeof WorkflowResponseDtoSchema>;
export type CreateRunDto = z.infer<typeof CreateRunDtoSchema>;
export type RunResponseDto = z.infer<typeof RunResponseDtoSchema>;
export type StepRunResponseDto = z.infer<typeof StepRunResponseDtoSchema>;
export type TemplateResponseDto = z.infer<typeof TemplateResponseDtoSchema>;
export type PaginationDto = z.infer<typeof PaginationDtoSchema>;
export type PaginatedResponseDto<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};