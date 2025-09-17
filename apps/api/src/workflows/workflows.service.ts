import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config/prisma.service';
import { CreateWorkflowDto, UpdateWorkflowDto } from './workflows.dto';

@Injectable()
export class WorkflowsService {
  constructor(private prisma: PrismaService) {}

  async create(workspaceId: string, createWorkflowDto: CreateWorkflowDto) {
    return this.prisma.workflow.create({
      data: {
        ...createWorkflowDto,
        workspaceId,
      },
      include: {
        trigger: true,
        steps: true,
        template: true,
      },
    });
  }

  async findAll(workspaceId: string) {
    return this.prisma.workflow.findMany({
      where: { workspaceId },
      include: {
        trigger: true,
        steps: true,
        template: true,
        _count: {
          select: { runs: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string, workspaceId: string) {
    const workflow = await this.prisma.workflow.findFirst({
      where: { id, workspaceId },
      include: {
        trigger: true,
        steps: {
          orderBy: { position: 'asc' },
        },
        template: true,
        runs: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!workflow) {
      throw new NotFoundException(`Workflow with ID ${id} not found`);
    }

    return workflow;
  }

  async update(id: string, workspaceId: string, updateWorkflowDto: UpdateWorkflowDto) {
    const workflow = await this.findOne(id, workspaceId);
    
    return this.prisma.workflow.update({
      where: { id },
      data: updateWorkflowDto,
      include: {
        trigger: true,
        steps: true,
        template: true,
      },
    });
  }

  async remove(id: string, workspaceId: string) {
    const workflow = await this.findOne(id, workspaceId);
    
    return this.prisma.workflow.delete({
      where: { id },
    });
  }
}