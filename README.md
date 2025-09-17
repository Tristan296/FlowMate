# FlowMate

FlowMate is a workflow automation platform that helps businesses automate repetitive tasks and streamline their operations. Built with a modern monorepo architecture using Next.js, NestJS, and Prisma.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or later
- pnpm 8.0.0 or later
- Docker and Docker Compose
- PostgreSQL and Redis (via Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/FlowMate.git
   cd FlowMate
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the infrastructure**
   ```bash
   docker compose up -d
   ```

5. **Set up the database**
   ```bash
   pnpm db:migrate
   pnpm seed
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```

The application will be available at:
- **Web App**: http://localhost:3000
- **API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api/docs

## 🏗️ Architecture

FlowMate is built as a monorepo with the following structure:

### Applications

- **`apps/web`**: Next.js 14 frontend with App Router and Tailwind CSS
- **`apps/api`**: NestJS backend API with Prisma ORM and BullMQ

### Packages

- **`packages/shared`**: Shared types, DTOs, and utilities
- **`packages/engine`**: Workflow execution engine with triggers and actions
- **`packages/templates`**: Pre-built workflow templates and seeding scripts

### Infrastructure

- **PostgreSQL**: Primary database for storing workflows, runs, and user data
- **Redis**: Queue system for background job processing
- **Docker Compose**: Local development environment

## 📖 Features

### Workflow Automation
- **Visual Workflow Builder**: Create workflows using pre-built templates
- **Multiple Triggers**: Cron schedules, webhooks, and manual triggers
- **Rich Actions**: Email, SMS, webhooks, and custom integrations
- **Error Handling**: Automatic retry with exponential backoff
- **Monitoring**: Real-time execution tracking and logs

### Industry Templates
- **Salons**: Appointment reminders, client welcome sequences
- **Tradies**: Quote follow-ups, job completion surveys
- **Agencies**: Lead nurturing, client check-ins

### Integrations
- **Email**: SendGrid integration for transactional emails
- **SMS**: Twilio integration for SMS notifications
- **Webhooks**: Trigger workflows from external systems

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev          # Start all development servers
pnpm build        # Build all packages and applications
pnpm lint         # Run ESLint across all packages
pnpm typecheck    # Run TypeScript type checking
pnpm test         # Run all tests

# Database
pnpm db:migrate   # Run Prisma migrations
pnpm db:reset     # Reset database and re-run migrations
pnpm seed         # Seed database with demo data
```

### Testing Workflows

1. **Create a workflow from a template**:
   - Visit http://localhost:3000/templates
   - Choose a template and create a workflow

2. **Test webhook triggers**:
   ```bash
   curl -X POST http://localhost:4000/api/triggers/webhook/YOUR_WORKFLOW_ID \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'
   ```

3. **Monitor execution**:
   - Check the runs dashboard at http://localhost:3000/runs
   - View logs in the API console

## 🔧 Configuration

### Environment Variables

Required environment variables (see `.env.example`):

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/flowmate"

# Redis
REDIS_URL="redis://localhost:6379"

# SendGrid (optional)
SENDGRID_API_KEY="your_sendgrid_api_key"
FROM_EMAIL="noreply@yoursite.com"

# Twilio (optional)
TWILIO_ACCOUNT_SID="your_twilio_account_sid"
TWILIO_AUTH_TOKEN="your_twilio_auth_token"
FROM_PHONE="+1234567890"

# Security
ENCRYPTION_KEY="your_32_character_encryption_key"
```

### Integration Setup

#### SendGrid Email
1. Create a SendGrid account
2. Generate an API key
3. Add the API key to your `.env` file
4. Verify your sender email address

#### Twilio SMS
1. Create a Twilio account
2. Get your Account SID and Auth Token
3. Purchase a phone number
4. Add credentials to your `.env` file

## 📝 API Documentation

The API documentation is available at http://localhost:4000/api/docs when running the development server.

### Key Endpoints

- `GET /api/health` - Health check
- `GET /api/workflows` - List workflows
- `POST /api/workflows` - Create workflow
- `GET /api/runs` - List workflow runs
- `POST /api/triggers/webhook/:id` - Trigger workflow via webhook

## 🧪 Testing

FlowMate includes a comprehensive test suite:

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm -C packages/shared test
pnpm -C apps/api test
pnpm -C apps/web test
```

## 🚀 Deployment

### Production Deployment

1. **Build the application**:
   ```bash
   pnpm build
   ```

2. **Set up production database**:
   ```bash
   NODE_ENV=production pnpm db:migrate
   ```

3. **Start the production servers**:
   ```bash
   # API Server
   cd apps/api && npm run start:prod

   # Web Server
   cd apps/web && npm run start

   # Worker Process
   cd apps/api && npm run worker
   ```

### Docker Deployment

Docker files and orchestration will be added in future releases.

## 🔒 Security

See [docs/SECURITY_NOTES.md](docs/SECURITY_NOTES.md) for security considerations and best practices.

## 📚 Documentation

- [Architecture Guide](docs/ARCHITECTURE.md)
- [Security Notes](docs/SECURITY_NOTES.md)
- [Template Development](docs/TEMPLATES.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

For support, please open an issue on GitHub or contact the development team.