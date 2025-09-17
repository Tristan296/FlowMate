import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto, UpdateWorkflowDto } from './workflows.dto';

@ApiTags('Workflows')
@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workflow' })
  create(
    @Body() createWorkflowDto: CreateWorkflowDto,
    @Query('workspaceId') workspaceId: string = 'demo-workspace',
  ) {
    return this.workflowsService.create(workspaceId, createWorkflowDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all workflows' })
  findAll(@Query('workspaceId') workspaceId: string = 'demo-workspace') {
    return this.workflowsService.findAll(workspaceId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a workflow by ID' })
  @ApiParam({ name: 'id', description: 'Workflow ID' })
  findOne(
    @Param('id') id: string,
    @Query('workspaceId') workspaceId: string = 'demo-workspace',
  ) {
    return this.workflowsService.findOne(id, workspaceId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a workflow' })
  @ApiParam({ name: 'id', description: 'Workflow ID' })
  update(
    @Param('id') id: string,
    @Body() updateWorkflowDto: UpdateWorkflowDto,
    @Query('workspaceId') workspaceId: string = 'demo-workspace',
  ) {
    return this.workflowsService.update(id, workspaceId, updateWorkflowDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workflow' })
  @ApiParam({ name: 'id', description: 'Workflow ID' })
  remove(
    @Param('id') id: string,
    @Query('workspaceId') workspaceId: string = 'demo-workspace',
  ) {
    return this.workflowsService.remove(id, workspaceId);
  }
}