import { Template } from '@flowmate/shared';
import { allTemplates } from './templates';

export class TemplateRenderer {
  static renderTemplate(template: Template, variables: Record<string, any>): Template {
    const rendered = JSON.parse(JSON.stringify(template));
    
    // Recursively replace variables in the template
    this.replaceVariables(rendered, variables);
    
    return rendered;
  }

  private static replaceVariables(obj: any, variables: Record<string, any>): void {
    if (typeof obj === 'string') {
      return this.interpolateString(obj, variables);
    }
    
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        if (typeof obj[i] === 'string') {
          obj[i] = this.interpolateString(obj[i], variables);
        } else if (typeof obj[i] === 'object' && obj[i] !== null) {
          this.replaceVariables(obj[i], variables);
        }
      }
      return;
    }
    
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          obj[key] = this.interpolateString(obj[key], variables);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          this.replaceVariables(obj[key], variables);
        }
      }
    }
  }

  private static interpolateString(str: string, variables: Record<string, any>): string {
    return str.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
      const value = this.getNestedValue(variables, path.trim());
      return value !== undefined ? String(value) : match;
    });
  }

  private static getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  }
}

export { allTemplates };
export * from './templates';