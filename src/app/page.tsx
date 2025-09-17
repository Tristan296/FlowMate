"use client";

import React from 'react';
import { 
  CheckCircle, 
  Users, 
  Zap, 
  Menu, 
  X,
  ArrowRight,
  Star,
  Calendar,
  FileText,
  Workflow,
  Mail,
  MessageSquare,
  DollarSign,
  Clock,
  Target
} from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const features = [
    {
      icon: <Mail className="h-8 w-8 text-blue-600" />,
      title: "Client Follow-Up Automation",
      description: "Never lose a lead again. Automatically follow up with quotes, proposals, and check-ins. Perfect for tradies and service businesses."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      title: "Invoice Reminders",
      description: "Stop chasing payments manually. Auto-send polite reminders at 7, 14, and 30 days overdue. Integrates with Xero and QuickBooks."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      title: "SMS & Email Templates",
      description: "Pre-built templates for appointment confirmations, service reminders, and thank you messages. Just set up once and let it run."
    },
    {
      icon: <Calendar className="h-8 w-8 text-orange-600" />,
      title: "Appointment Automation",
      description: "Send booking confirmations, SMS reminders, and follow-up surveys automatically. Perfect for salons, gyms, and consultants."
    },
    {
      icon: <Target className="h-8 w-8 text-red-600" />,
      title: "Review & Upsell Automation",
      description: "Ask for reviews 24 hours after service completion. Follow up with upsell offers after 30 days. Boost your reputation and revenue."
    },
    {
      icon: <Clock className="h-8 w-8 text-yellow-600" />,
      title: "Set & Forget Setup",
      description: "No complex setup like Zapier. Choose your industry template, connect your tools, and watch it work. Built for non-tech business owners."
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for solo business owners",
      features: [
        "Up to 100 automated emails/month",
        "Basic follow-up sequences",
        "SMS reminders (50/month)",
        "Email support",
        "Industry templates"
      ],
      highlighted: false
    },
    {
      name: "Professional",
      price: "$59",
      period: "/month",
      description: "For growing service businesses",
      features: [
        "Up to 500 automated emails/month",
        "Advanced automation sequences",
        "Unlimited SMS reminders",
        "Review automation",
        "Xero/QuickBooks integration",
        "Priority support"
      ],
      highlighted: true
    },
    {
      name: "Business",
      price: "$99",
      period: "/month",
      description: "For established SMBs",
      features: [
        "Unlimited automated emails",
        "Custom workflow builder",
        "Multi-location support",
        "Team collaboration",
        "Advanced analytics",
        "White-label options",
        "Dedicated support"
      ],
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Workflow className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">FlowMate</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
                <a href="#about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</a>
                <a href="/auth/signin" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Sign In
                </a>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <a href="#features" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">About</a>
              <a href="/auth/signin" className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors">
                Sign In
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Stop Chasing Clients.
              <span className="text-blue-600 block">Stop Drowning in Admin.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              FlowMate is the admin assistant for small business owners who don&apos;t have one. 
              Automate follow-ups, invoice reminders, client onboarding, and more. Set it and forget it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/auth/signup" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors">
                Watch Demo
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center text-sm text-gray-500">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <Star className="h-4 w-4 text-yellow-400 mr-2" />
              Trusted by 2,000+ small business owners
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Virtual Admin Assistant
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Automate the admin tasks that eat up 5-15 hours of your week. Focus on growing your business instead.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Target Industries Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Your Industry
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pre-configured workflows for the businesses that need them most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Businesses</h3>
              <p className="text-gray-600 text-sm mb-4">Salons, gyms, spas, personal trainers</p>
              <div className="text-sm text-gray-500">
                <strong>Example:</strong> New client gets welcome email → booking confirmation → SMS reminder → follow-up review request
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tradies & Contractors</h3>
              <p className="text-gray-600 text-sm mb-4">Plumbers, electricians, builders</p>
              <div className="text-sm text-gray-500">
                <strong>Example:</strong> Quote sent → 2 days no response → auto follow-up → payment reminder after job completion
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Services</h3>
              <p className="text-gray-600 text-sm mb-4">Consultants, agencies, accountants</p>
              <div className="text-sm text-gray-500">
                <strong>Example:</strong> Contract signed → auto-send onboarding pack → weekly progress updates → project completion survey
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">eCommerce SMBs</h3>
              <p className="text-gray-600 text-sm mb-4">Shopify stores, online retailers</p>
              <div className="text-sm text-gray-500">
                <strong>Example:</strong> Order shipped → thank you email → 7 days later ask for review → 30 days later upsell offer
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Affordable Virtual Admin
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Replaces a $25-30/hr admin assistant. All plans include a 14-day free trial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-lg border-2 ${
                  plan.highlighted 
                    ? 'border-blue-500 bg-white shadow-xl relative' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a href="/auth/signup" 
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Start Free Trial
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to stop drowning in admin?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 2,000+ small business owners who&apos;ve automated their admin tasks and gained back 10+ hours per week.
          </p>
          <a href="/auth/signup" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors">
            Start Your Free Trial
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Workflow className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">FlowMate</span>
              </div>
              <p className="text-gray-400">
                The admin assistant for small business owners who don&apos;t have one. Automate admin tasks and focus on growing your business.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FlowMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
