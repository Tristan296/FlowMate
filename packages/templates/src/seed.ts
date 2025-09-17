#!/usr/bin/env node

import { allTemplates } from './index';

async function seed() {
  console.log('Seeding templates...');
  
  try {
    // In a real implementation, this would insert templates into the database
    // For now, we'll just log them
    console.log(`Found ${allTemplates.length} templates to seed:`);
    
    for (const template of allTemplates) {
      console.log(`- ${template.name} (${template.category}): ${template.description}`);
    }
    
    // TODO: Connect to database and insert templates
    console.log('\nNote: This is a stub implementation. In a real app, templates would be inserted into the database.');
    console.log('Templates are available in the @flowmate/templates package.');
    
  } catch (error) {
    console.error('Error seeding templates:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seed();
}