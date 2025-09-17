import {
  Controller,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { TriggersService } from './triggers.service';

@ApiTags('Triggers')
@Controller('triggers')
export class TriggersController {
  constructor(private readonly triggersService: TriggersService) {}

  @Post('webhook/:workflowId')
  @ApiOperation({ summary: 'Trigger workflow via webhook' })
  @ApiParam({ name: 'workflowId', description: 'Workflow ID to trigger' })
  async webhook(
    @Param('workflowId') workflowId: string,
    @Body() payload: any,
  ) {
    return this.triggersService.handleWebhook(workflowId, payload);
  }
}