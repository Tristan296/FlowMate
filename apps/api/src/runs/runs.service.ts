import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';

@Injectable()
export class RunsService {
  constructor(private prisma: PrismaService) {}

  async findAll(workspaceId: string, workflowId?: string) {
    const where: any = {
      workflow: { workspaceId },
    };

    if (workflowId) {
      where.workflowId = workflowId;
    }

    return this.prisma.run.findMany({
      where,
      include: {
        workflow: {
          select: { id: true, name: true },
        },
        stepRuns: {
          include: {
            step: {
              select: { id: true, type: true, position: true },
            },
          },
          orderBy: { step: { position: 'asc' } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, workspaceId: string) {
    const run = await this.prisma.run.findFirst({
      where: {
        id,
        workflow: { workspaceId },
      },
      include: {
        workflow: {
          select: { id: true, name: true, workspaceId: true },
        },
        stepRuns: {
          include: {
            step: {
              select: { id: true, type: true, config: true, position: true },
            },
          },
          orderBy: { step: { position: 'asc' } },
        },
      },
    });

    if (!run) {
      throw new NotFoundException(`Run with ID ${id} not found`);
    }

    return run;
  }

  async getStats(workspaceId: string) {
    const [total, completed, failed, running] = await Promise.all([
      this.prisma.run.count({
        where: { workflow: { workspaceId } },
      }),
      this.prisma.run.count({
        where: {
          workflow: { workspaceId },
          status: 'COMPLETED',
        },
      }),
      this.prisma.run.count({
        where: {
          workflow: { workspaceId },
          status: 'FAILED',
        },
      }),
      this.prisma.run.count({
        where: {
          workflow: { workspaceId },
          status: 'RUNNING',
        },
      }),
    ]);

    return {
      total,
      completed,
      failed,
      running,
      pending: total - completed - failed - running,
    };
  }
}