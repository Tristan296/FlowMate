# FlowMate Architecture

FlowMate is designed as a modern, scalable workflow automation platform using a monorepo architecture. This document outlines the key architectural decisions and patterns used throughout the system.

## High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Frontend  │    │   API Backend   │    │  Worker Process │
│    (Next.js)    │◄──►│   (NestJS)      │◄──►│   (Engine)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │                         │
                              ▼                         ▼
                       ┌─────────────┐           ┌─────────────┐
                       │ PostgreSQL  │           │   Redis     │
                       │ (Database)  │           │  (Queue)    │
                       └─────────────┘           └─────────────┘
```

## Core Components

### 1. Web Frontend (`apps/web`)

**Technology**: Next.js 14 with App Router, TypeScript, Tailwind CSS

**Responsibilities**:
- User interface for workflow management
- Dashboard and monitoring views
- Template gallery and workflow builder
- Authentication and workspace management

**Key Features**:
- Server-side rendering for optimal performance
- Responsive design for mobile and desktop
- Real-time updates via API polling
- Mock authentication system (OAuth integration planned)

### 2. API Backend (`apps/api`)

**Technology**: NestJS, Prisma ORM, TypeScript

**Responsibilities**:
- RESTful API for all business operations
- Database operations and data validation
- Webhook endpoint handling
- Queue management for workflow execution

**Modules**:
- **Health**: System health checks
- **Workflows**: CRUD operations for workflows
- **Runs**: Execution history and monitoring
- **Triggers**: Webhook and manual trigger handling
- **Queue**: Background job processing

### 3. Workflow Engine (`packages/engine`)

**Technology**: TypeScript, Node.js

**Responsibilities**:
- Workflow execution and orchestration
- Trigger and action registry
- Retry logic with exponential backoff
- Error handling and logging

**Components**:
- **Engine Core**: Main orchestration logic
- **Trigger Handlers**: Cron, webhook, and manual triggers
- **Action Handlers**: Email, SMS, and webhook actions
- **Registry System**: Plugin-like architecture for extensibility

### 4. Shared Package (`packages/shared`)

**Technology**: TypeScript, Zod validation

**Responsibilities**:
- Type definitions and schemas
- Data Transfer Objects (DTOs)
- Utility functions and helpers
- Environment configuration

### 5. Templates Package (`packages/templates`)

**Technology**: TypeScript, JSON templates

**Responsibilities**:
- Pre-built workflow templates
- Template rendering and variable substitution
- Database seeding scripts

## Data Architecture

### Database Schema

The system uses PostgreSQL with the following core entities:

```
User ──────┐
           │
           ▼
Workspace ──────┐
                │
                ├─── Workflow ──── Trigger
                │         │
                │         └─── Step[]
                │         │
                │         └─── Run[] ──── StepRun[]
                │
                ├─── Connection
                ├─── Usage
                └─── AuditLog
```

**Key Relationships**:
- Users own Workspaces (multi-tenancy)
- Workflows belong to Workspaces
- Each Workflow has one Trigger and multiple Steps
- Runs track execution instances with detailed StepRuns

### Queue System

Redis is used for:
- Background job queuing
- Workflow execution scheduling
- Temporary data storage
- Caching frequently accessed data

## Workflow Execution Flow

```
1. Trigger Event
   │
   ▼
2. Create Run Record
   │
   ▼
3. Queue Execution Job
   │
   ▼
4. Worker Picks Up Job
   │
   ▼
5. Execute Steps Sequentially
   │
   ├─── Step 1: Send Email
   ├─── Step 2: Log Activity
   └─── Step N: Update CRM
   │
   ▼
6. Update Run Status
   │
   ▼
7. Handle Success/Failure
```

## Security Architecture

### Authentication & Authorization

**Current**: Mock authentication system for MVP
**Planned**: OAuth 2.0 integration with Google, Microsoft

### Data Protection

- Environment-based configuration
- Encrypted sensitive data in database
- HTTPS-only communication in production
- Input validation using Zod schemas

### API Security

- Request validation at all endpoints
- Rate limiting (planned)
- CORS configuration
- Audit logging for all operations

## Deployment Architecture

### Development Environment

```
Docker Compose
├── PostgreSQL Container
├── Redis Container
└── Local Development Servers
    ├── Next.js (Port 3000)
    ├── NestJS API (Port 4000)
    └── Worker Process
```

### Production Architecture (Planned)

```
Load Balancer
├── Web Servers (Next.js)
├── API Servers (NestJS)
└── Worker Nodes
    │
    ├── Managed PostgreSQL (AU Region)
    ├── Redis Cluster
    └── S3-Compatible Storage
```

## Scalability Considerations

### Horizontal Scaling

- **Web Tier**: Stateless Next.js instances
- **API Tier**: Multiple NestJS instances behind load balancer
- **Worker Tier**: Multiple worker processes for job processing
- **Database**: Read replicas for query scaling

### Performance Optimizations

- Database indexing on frequently queried fields
- Redis caching for template and configuration data
- Background job processing for heavy operations
- Pagination for large result sets

### Monitoring & Observability

- Structured logging with Pino
- Health check endpoints
- Execution metrics and statistics
- Error tracking and alerting (planned)

## Data Residency & Compliance

### Australian Data Residency

- All user data stored in Australian data centers
- Database hosting in AU regions
- S3-compatible storage in AU
- Compliance with Australian privacy laws

### GDPR Considerations

- User data export capabilities
- Right to deletion implementation
- Data processing audit trails
- Consent management (planned)

## Extension Points

### Adding New Triggers

1. Implement `TriggerHandler` interface
2. Register with engine
3. Add to shared types
4. Update UI components

### Adding New Actions

1. Implement `ActionHandler` interface
2. Register with engine
3. Add configuration schema
4. Update template system

### Adding New Integrations

1. Create connection type in database
2. Implement authentication flow
3. Add action handlers for integration
4. Update UI for connection management

## Future Enhancements

### Planned Features

- **Conditional Logic**: Branching and decision nodes
- **Advanced Scheduling**: Complex time-based triggers
- **Template Marketplace**: Community-contributed templates
- **API Gateway**: Centralized API management
- **Real-time Updates**: WebSocket-based live updates

### Technology Roadmap

- **Microservices**: Split into domain-specific services
- **GraphQL**: Enhanced API flexibility
- **Event Sourcing**: Complete audit trail
- **Container Orchestration**: Kubernetes deployment
- **AI/ML**: Intelligent workflow optimization

## Development Patterns

### Code Organization

- **Monorepo**: Shared code and coordinated releases
- **Domain-Driven Design**: Clear module boundaries
- **Dependency Injection**: Testable and modular code
- **Type Safety**: End-to-end TypeScript

### Testing Strategy

- **Unit Tests**: Individual function testing
- **Integration Tests**: API endpoint testing
- **End-to-End Tests**: Full workflow testing
- **Load Tests**: Performance and scalability testing

### CI/CD Pipeline

- **Continuous Integration**: Automated testing on all commits
- **Continuous Deployment**: Automated deployment to staging
- **Quality Gates**: Linting, type checking, and test coverage
- **Security Scanning**: Dependency and code vulnerability checks