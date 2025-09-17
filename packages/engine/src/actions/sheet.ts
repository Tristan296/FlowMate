import { SheetActionConfig, Result, success } from '@flowmate/shared';
import { ActionHandler } from '../engine';

export class SheetActionHandler implements ActionHandler {
  type = 'sheet.append' as const;

  async execute(config: SheetActionConfig, context?: any): Promise<Result<any>> {
    // This is a stub implementation for now
    console.log('Sheet action (stub): would append data to sheet', { 
      sheetId: config.sheetId, 
      data: config.data, 
      context 
    });

    return success({
      status: 'stub',
      message: `Would append data to sheet ${config.sheetId}`,
      data: config.data,
    });
  }
}