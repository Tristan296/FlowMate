import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { 
  WorkflowEngine, 
  CronTriggerHandler, 
  WebhookTriggerHandler,
  EmailActionHandler,
  SmsActionHandler,
  SheetActionHandler 
} from '@flowmate/engine';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);
  private readonly engine = new WorkflowEngine();

  constructor(private prisma: PrismaService) {
    this.setupEngine();
  }

  private setupEngine() {
    // Register triggers
    this.engine.registerTrigger(new CronTriggerHandler());
    this.engine.registerTrigger(new WebhookTriggerHandler());

    // Register actions
    this.engine.registerAction(new EmailActionHandler());
    this.engine.registerAction(new SmsActionHandler());
    this.engine.registerAction(new SheetActionHandler());

    this.logger.log('Workflow engine initialized with triggers and actions');
  }

  async startWorker() {
    this.logger.log('Starting queue worker...');

    // Load and setup all published workflows
    const workflows = await this.prisma.workflow.findMany({
      where: {
        status: 'PUBLISHED',
        trigger: { enabled: true },
      },
      include: {
        trigger: true,
        steps: {
          orderBy: { position: 'asc' },
        },
      },
    });

    for (const workflow of workflows) {
      if (workflow.trigger) {
        const result = await this.engine.setupWorkflow({
          id: workflow.id,
          workspaceId: workflow.workspaceId,
          templateId: workflow.templateId,
          name: workflow.name,
          description: workflow.description,
          status: workflow.status as 'draft' | 'published' | 'paused',
          trigger: {
            id: workflow.trigger.id,
            workflowId: workflow.trigger.workflowId,
            type: workflow.trigger.type.toLowerCase() as 'cron' | 'webhook',
            config: workflow.trigger.config,
            enabled: workflow.trigger.enabled,
            createdAt: workflow.trigger.createdAt,
            updatedAt: workflow.trigger.updatedAt,
          },
          steps: workflow.steps.map(step => ({
            id: step.id,
            workflowId: step.workflowId,
            type: step.type.toLowerCase().replace('_', '.') as 'email.send' | 'sms.send' | 'sheet.append',
            config: step.config,
            position: step.position,
            createdAt: step.createdAt,
            updatedAt: step.updatedAt,
          })),
          createdAt: workflow.createdAt,
          updatedAt: workflow.updatedAt,
        });

        if (result.success) {
          this.logger.log(`Setup workflow ${workflow.name} (${workflow.id})`);
        } else {
          this.logger.error(`Failed to setup workflow ${workflow.name}: ${result.error.message}`);
        }
      }
    }

    this.logger.log(`Queue worker started with ${workflows.length} workflows`);
  }

  async stopWorker() {
    this.logger.log('Stopping queue worker...');
    await this.engine.shutdown();
    this.logger.log('Queue worker stopped');
  }
}