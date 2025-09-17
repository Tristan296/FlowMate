import { Workflow, WebhookTriggerConfig } from '@flowmate/shared';
import { TriggerHandler } from '../engine';

export class WebhookTriggerHandler implements TriggerHandler {
  type = 'webhook' as const;
  private workflows = new Map<string, {
    workflow: Workflow;
    onTrigger: (workflowId: string, context?: any) => Promise<void>;
  }>();

  async setup(
    workflow: Workflow, 
    onTrigger: (workflowId: string, context?: any) => Promise<void>
  ): Promise<void> {
    if (!workflow.trigger || workflow.trigger.type !== 'webhook') {
      throw new Error('Invalid trigger configuration for webhook handler');
    }

    const config = workflow.trigger.config as WebhookTriggerConfig;
    
    this.workflows.set(workflow.id, {
      workflow,
      onTrigger,
    });

    console.log(`Webhook trigger setup for workflow ${workflow.id} at endpoint: ${config.endpoint}`);
  }

  async teardown(workflowId: string): Promise<void> {
    this.workflows.delete(workflowId);
    console.log(`Webhook trigger torn down for workflow ${workflowId}`);
  }

  async handleWebhook(workflowId: string, payload: any): Promise<void> {
    const workflowData = this.workflows.get(workflowId);
    if (!workflowData) {
      throw new Error(`No webhook trigger found for workflow ${workflowId}`);
    }

    const { workflow, onTrigger } = workflowData;
    
    if (!workflow.trigger?.enabled) {
      console.log(`Webhook trigger disabled for workflow ${workflowId}`);
      return;
    }

    console.log(`Webhook trigger fired for workflow ${workflowId}`);
    await onTrigger(workflowId, {
      triggeredBy: 'webhook',
      payload,
      timestamp: new Date().toISOString(),
    });
  }

  getRegisteredWorkflows(): string[] {
    return Array.from(this.workflows.keys());
  }
}