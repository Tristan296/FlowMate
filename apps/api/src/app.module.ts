import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { PrismaModule } from './config/prisma.module';
import { HealthModule } from './health/health.module';
import { WorkflowsModule } from './workflows/workflows.module';
import { RunsModule } from './runs/runs.module';
import { TriggersModule } from './triggers/triggers.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    WorkflowsModule,
    RunsModule,
    TriggersModule,
    QueueModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}