import { 
  Workflow, 
  Run, 
  StepRun, 
  TriggerType, 
  ActionType,
  Result,
  success,
  failure,
  retry
} from '@flowmate/shared';

export interface TriggerHandler {
  type: TriggerType;
  setup(workflow: Workflow, onTrigger: (workflowId: string, context?: any) => Promise<void>): Promise<void>;
  teardown(workflowId: string): Promise<void>;
}

export interface ActionHandler {
  type: ActionType;
  execute(config: any, context?: any): Promise<Result<any>>;
}

export class WorkflowEngine {
  private triggers = new Map<TriggerType, TriggerHandler>();
  private actions = new Map<ActionType, ActionHandler>();
  private runningWorkflows = new Map<string, any>();

  registerTrigger(handler: TriggerHandler): void {
    this.triggers.set(handler.type, handler);
  }

  registerAction(handler: ActionHandler): void {
    this.actions.set(handler.type, handler);
  }

  async setupWorkflow(workflow: Workflow): Promise<Result<void>> {
    try {
      if (!workflow.trigger) {
        return failure(new Error('Workflow has no trigger configured'));
      }

      const triggerHandler = this.triggers.get(workflow.trigger.type);
      if (!triggerHandler) {
        return failure(new Error(`No handler registered for trigger type: ${workflow.trigger.type}`));
      }

      await triggerHandler.setup(workflow, this.executeWorkflow.bind(this));
      this.runningWorkflows.set(workflow.id, { workflow, triggerHandler });
      
      return success(undefined);
    } catch (error) {
      return failure(error as Error);
    }
  }

  async teardownWorkflow(workflowId: string): Promise<Result<void>> {
    try {
      const runningWorkflow = this.runningWorkflows.get(workflowId);
      if (!runningWorkflow) {
        return success(undefined); // Already torn down or never set up
      }

      await runningWorkflow.triggerHandler.teardown(workflowId);
      this.runningWorkflows.delete(workflowId);
      
      return success(undefined);
    } catch (error) {
      return failure(error as Error);
    }
  }

  async executeWorkflow(workflowId: string, context?: any): Promise<Result<string>> {
    try {
      const runningWorkflow = this.runningWorkflows.get(workflowId);
      if (!runningWorkflow) {
        return failure(new Error(`Workflow ${workflowId} not found or not running`));
      }

      const { workflow } = runningWorkflow;
      const runId = this.generateRunId();
      
      // Create run record (in a real implementation, this would be stored in DB)
      const run: Run = {
        id: runId,
        workflowId,
        status: 'running',
        triggeredBy: context?.triggeredBy || 'system',
        triggeredAt: new Date(),
        startedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log(`Starting workflow execution for ${workflowId}, run: ${runId}`);

      // Execute steps sequentially
      for (const step of workflow.steps) {
        const stepRunResult = await this.executeStep(runId, step, context);
        if (!stepRunResult.success) {
          console.error(`Step ${step.id} failed:`, stepRunResult.error);
          // In a real implementation, update run status to failed
          return failure(stepRunResult.error);
        }
      }

      console.log(`Workflow execution completed for ${workflowId}, run: ${runId}`);
      return success(runId);
    } catch (error) {
      return failure(error as Error);
    }
  }

  private async executeStep(runId: string, step: any, context?: any): Promise<Result<any>> {
    const actionHandler = this.actions.get(step.type);
    if (!actionHandler) {
      return failure(new Error(`No handler registered for action type: ${step.type}`));
    }

    console.log(`Executing step ${step.id} of type ${step.type}`);

    return retry(
      () => actionHandler.execute(step.config, context),
      3, // max retries
      1000 // backoff ms
    );
  }

  private generateRunId(): string {
    return 'run_' + Math.random().toString(36).substr(2, 9);
  }

  async shutdown(): Promise<void> {
    const workflowIds = Array.from(this.runningWorkflows.keys());
    await Promise.all(workflowIds.map(id => this.teardownWorkflow(id)));
  }
}