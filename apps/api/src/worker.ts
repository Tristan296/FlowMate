import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { QueueService } from './queue/queue.service';
import { env } from './config/env';

async function startWorker() {
  console.log('🔧 Starting FlowMate Worker...');
  
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'error', 'warn'],
  });

  const queueService = app.get(QueueService);
  
  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('📤 Received SIGINT, shutting down gracefully...');
    await queueService.stopWorker();
    await app.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('📤 Received SIGTERM, shutting down gracefully...');
    await queueService.stopWorker();
    await app.close();
    process.exit(0);
  });

  try {
    await queueService.startWorker();
    console.log('✅ FlowMate Worker started successfully');
  } catch (error) {
    console.error('❌ Failed to start worker:', error);
    await app.close();
    process.exit(1);
  }
}

startWorker();