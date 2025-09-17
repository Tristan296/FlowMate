# FlowMate

FlowMate is an admin workflow automation SaaS designed specifically for small business owners who don't have a dedicated admin team. Stop chasing clients, stop drowning in admin tasks - let FlowMate be your virtual assistant.

![FlowMate Admin Automation SaaS](https://github.com/user-attachments/assets/ff34508b-fbfe-4750-9d78-50554b364659)

## 🚀 Features

### Admin Workflow Automation
- **Client Follow-Up Automation** - Never lose a lead with automatic quote and proposal follow-ups
- **Invoice Reminders** - Auto-send payment reminders at 7, 14, and 30 days overdue
- **SMS & Email Templates** - Pre-built templates for appointments, confirmations, and thank you messages
- **Appointment Automation** - Booking confirmations, SMS reminders, and follow-up surveys
- **Review & Upsell Automation** - Automatic review requests and targeted upsell campaigns
- **Set & Forget Setup** - Industry-specific templates with simple, non-tech setup

### Target Industries
- **Service Businesses** - Salons, gyms, spas, personal trainers
- **Tradies & Contractors** - Plumbers, electricians, builders, landscapers  
- **Professional Services** - Consultants, agencies, accountants, legal advisors
- **eCommerce SMBs** - Shopify stores and small online retailers

### User Experience
- **Modern UI/UX** - Clean, intuitive interface built with Tailwind CSS
- **Responsive Design** - Works seamlessly across desktop, tablet, and mobile
- **Industry Templates** - Pre-configured workflows for common business types
- **Simple Setup** - No complex configuration like Zapier - built for non-tech users

## 🎯 Who It's For

FlowMate is designed for time-poor small business owners who:

- Don't have a dedicated admin team
- Spend 5-15 hours per week on repetitive admin tasks
- Can't afford complex software or don't have patience to learn it
- Need to automate emails, follow-ups, invoicing, and scheduling

**Replaces a $25-30/hr admin assistant for just $29-99/month.**

## 🎯 MVP Features Implemented

### 🏠 Landing Page
- Professional SaaS landing page with hero section
- Feature showcase with icons and descriptions
- Pricing tiers (Starter, Professional, Enterprise)
- Call-to-action buttons and conversion-optimized design
- Responsive navigation with mobile menu

### 🔐 Authentication System
- **Sign In Page** - Clean login form with social authentication options
- **Sign Up Page** - Comprehensive registration with password validation
- **Password Security** - Real-time password strength validation
- **Social Login** - Google and GitHub integration (UI ready)

### 💳 Payment Integration
- **Stripe Integration** - Secure subscription billing
- **Plan Selection** - Interactive pricing page with plan comparison
- **Free Trial** - 14-day trial period for all plans
- **Subscription Management** - Automated billing and renewals
- **Webhook Support** - Real-time payment event processing

### 📊 Dashboard
- **Project Overview** - Active projects with progress tracking
- **Team Management** - Team member statistics and management
- **Task Management** - Recent tasks with priority indicators
- **Quick Actions** - One-click access to common actions
- **Analytics Cards** - Key metrics and performance indicators

![FlowMate Dashboard](https://github.com/user-attachments/assets/54306274-85ca-4ebb-8df4-00b856bdbc0f)

## 🛠 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful SVG icons
- **React Hook Form** - Performant forms with easy validation

### Payment Processing
- **Stripe** - Secure subscription billing and payments
- **Webhook Support** - Real-time payment event handling
- **Subscription Management** - Automated recurring billing

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting (ready to configure)
- **Turbopack** - Ultra-fast bundler for development

### Deployment Ready
- **Vercel Ready** - Optimized for Vercel deployment
- **Docker Support** - Container-ready (can be added)
- **CI/CD Ready** - GitHub Actions workflows (can be added)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Stripe account (for payment processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tristan296/FlowMate.git
   cd FlowMate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Stripe credentials
   ```

4. **Set up Stripe** (see [STRIPE_SETUP.md](./STRIPE_SETUP.md) for detailed instructions)
   - Create Stripe account
   - Set up products and pricing
   - Configure webhooks
   - Add API keys to .env.local

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📁 Project Structure

```
FlowMate/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── signin/page.tsx       # Sign in page
│   │   │   └── signup/page.tsx       # Sign up page
│   │   ├── dashboard/page.tsx        # Main dashboard
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Landing page
│   └── components/                   # Reusable components (ready to add)
├── public/                           # Static assets
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb)
- **Success**: Green (#16a34a)
- **Warning**: Yellow (#ca8a04)
- **Error**: Red (#dc2626)
- **Neutral**: Gray shades

### Typography
- **Headings**: Font weight 700 (bold)
- **Body**: Font weight 400 (normal)
- **UI Elements**: Font weight 500 (medium)

## 🔮 Roadmap

### Phase 1 - Core Features (Current MVP)
- [x] Landing page
- [x] Authentication UI
- [x] Dashboard interface
- [x] Responsive design
- [x] Modern UI components
- [x] **Stripe payments integration**
- [x] **Subscription management**
- [x] **Plan selection flow**

### Phase 2 - Backend Integration
- [ ] User authentication system
- [ ] Database integration
- [ ] API development
- [ ] Real-time functionality
- [x] **Payment processing (Stripe)**

### Phase 3 - Advanced Features
- [ ] Project management
- [ ] Team collaboration tools
- [ ] File sharing
- [ ] Workflow automation
- [ ] Analytics and reporting

### Phase 4 - Enterprise Features
- [ ] Advanced security
- [ ] SSO integration
- [ ] Custom workflows
- [ ] API access
- [ ] White-labeling

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Lucide for the beautiful icons
- Vercel for hosting and deployment platform

## 📞 Support

For support, email support@flowmate.com or join our Slack channel.

---

**FlowMate** - Streamline Your Workflow 🚀
