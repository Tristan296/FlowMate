import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class TriggersService {
  private readonly logger = new Logger(TriggersService.name);

  constructor(private prisma: PrismaService) {}

  async handleWebhook(workflowId: string, payload: any) {
    this.logger.log(`Webhook triggered for workflow ${workflowId}`);

    // Find the workflow
    const workflow = await this.prisma.workflow.findFirst({
      where: {
        id: workflowId,
        status: 'PUBLISHED',
        trigger: {
          type: 'WEBHOOK',
          enabled: true,
        },
      },
      include: {
        trigger: true,
        steps: {
          orderBy: { position: 'asc' },
        },
      },
    });

    if (!workflow) {
      throw new NotFoundException(`Active workflow with webhook trigger not found: ${workflowId}`);
    }

    // Create a new run
    const run = await this.prisma.run.create({
      data: {
        workflowId,
        status: 'PENDING',
        triggeredBy: 'webhook',
        triggeredAt: new Date(),
      },
    });

    this.logger.log(`Created run ${run.id} for workflow ${workflowId}`);

    // Create step runs
    for (const step of workflow.steps) {
      await this.prisma.stepRun.create({
        data: {
          runId: run.id,
          stepId: step.id,
          status: 'PENDING',
          input: payload,
        },
      });
    }

    // In a real implementation, this would queue the run for execution
    this.logger.log(`Queued run ${run.id} for execution`);

    return {
      runId: run.id,
      workflowId,
      status: 'queued',
      message: 'Workflow execution queued successfully',
    };
  }
}