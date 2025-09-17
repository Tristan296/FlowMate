import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { RunsService } from './runs.service';

@ApiTags('Runs')
@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all runs' })
  @ApiQuery({ name: 'workflowId', required: false, description: 'Filter by workflow ID' })
  findAll(
    @Query('workspaceId') workspaceId: string = 'demo-workspace',
    @Query('workflowId') workflowId?: string,
  ) {
    return this.runsService.findAll(workspaceId, workflowId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get run statistics' })
  getStats(@Query('workspaceId') workspaceId: string = 'demo-workspace') {
    return this.runsService.getStats(workspaceId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a run by ID' })
  @ApiParam({ name: 'id', description: 'Run ID' })
  findOne(
    @Param('id') id: string,
    @Query('workspaceId') workspaceId: string = 'demo-workspace',
  ) {
    return this.runsService.findOne(id, workspaceId);
  }
}