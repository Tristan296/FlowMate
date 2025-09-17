# FlowMate

FlowMate is a modern SaaS productivity platform designed to streamline workflows, enhance team collaboration, and boost productivity for teams and individuals.

![FlowMate Landing Page](https://github.com/user-attachments/assets/f71d8be5-b15e-4ea4-bbaa-20cb568a6a7a)

## 🚀 Features

### Core Functionality
- **Workflow Automation** - Automate repetitive tasks and streamline processes
- **Team Collaboration** - Real-time collaboration and communication tools
- **Analytics & Insights** - Comprehensive productivity analytics and reporting
- **Smart Scheduling** - Intelligent scheduling that adapts to your workflow
- **Document Management** - Organize, share, and collaborate on documents
- **Lightning Fast** - Built with modern technology for instant responses

### User Experience
- **Modern UI/UX** - Clean, intuitive interface built with Tailwind CSS
- **Responsive Design** - Works seamlessly across desktop, tablet, and mobile
- **Dark/Light Mode** - Coming soon
- **Real-time Updates** - Live collaboration and instant synchronization

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

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
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

### Phase 2 - Backend Integration
- [ ] User authentication system
- [ ] Database integration
- [ ] API development
- [ ] Real-time functionality

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
