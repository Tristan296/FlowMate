import * as cron from 'node-cron';
import { Workflow, CronTriggerConfig } from '@flowmate/shared';
import { TriggerHandler } from '../engine';

export class CronTriggerHandler implements TriggerHandler {
  type = 'cron' as const;
  private tasks = new Map<string, cron.ScheduledTask>();

  async setup(
    workflow: Workflow, 
    onTrigger: (workflowId: string, context?: any) => Promise<void>
  ): Promise<void> {
    if (!workflow.trigger || workflow.trigger.type !== 'cron') {
      throw new Error('Invalid trigger configuration for cron handler');
    }

    const config = workflow.trigger.config as CronTriggerConfig;
    
    // Validate cron expression
    if (!cron.validate(config.schedule)) {
      throw new Error(`Invalid cron expression: ${config.schedule}`);
    }

    const task = cron.schedule(config.schedule, async () => {
      console.log(`Cron trigger fired for workflow ${workflow.id}`);
      await onTrigger(workflow.id, {
        triggeredBy: 'cron',
        schedule: config.schedule,
        timestamp: new Date().toISOString(),
      });
    }, {
      scheduled: workflow.trigger.enabled,
    });

    this.tasks.set(workflow.id, task);
    console.log(`Cron trigger setup for workflow ${workflow.id} with schedule: ${config.schedule}`);
  }

  async teardown(workflowId: string): Promise<void> {
    const task = this.tasks.get(workflowId);
    if (task) {
      task.stop();
      this.tasks.delete(workflowId);
      console.log(`Cron trigger torn down for workflow ${workflowId}`);
    }
  }
}