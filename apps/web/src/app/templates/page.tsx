import Link from 'next/link'
import { Tag, Clock } from 'lucide-react'

// Mock template data
const templates = [
  {
    id: 'salon-appointment-reminder',
    name: 'Appointment Reminder',
    description: 'Send SMS reminders to clients 24 hours before their salon appointment',
    category: 'Salons',
    tags: ['appointments', 'reminders', 'sms'],
  },
  {
    id: 'salon-welcome-sequence',
    name: 'New Client Welcome',
    description: 'Welcome new salon clients with a thank you email and care instructions',
    category: 'Salons',
    tags: ['welcome', 'onboarding', 'email'],
  },
  {
    id: 'tradie-quote-followup',
    name: 'Quote Follow-up',
    description: 'Follow up with customers who haven&apos;t responded to quotes within 3 days',
    category: 'Tradies',
    tags: ['quotes', 'followup', 'email'],
  },
  {
    id: 'tradie-job-completion',
    name: 'Job Completion Survey',
    description: 'Send satisfaction survey and request for review after job completion',
    category: 'Tradies',
    tags: ['completion', 'survey', 'reviews'],
  },
  {
    id: 'agency-lead-nurture',
    name: 'Lead Nurturing Sequence',
    description: 'Multi-step email sequence to nurture new leads over 2 weeks',
    category: 'Agencies',
    tags: ['leads', 'nurturing', 'email', 'sequence'],
  },
  {
    id: 'agency-client-checkin',
    name: 'Monthly Client Check-in',
    description: 'Automated monthly check-in with clients to maintain relationships',
    category: 'Agencies',
    tags: ['clients', 'checkin', 'relationship'],
  },
]

const categories = ['All', 'Salons', 'Tradies', 'Agencies']

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Workflow Templates
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Get started quickly with pre-built templates for your industry
        </p>
      </div>

      {/* Category Filter */}
      <div className="mt-8 flex justify-center">
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="relative rounded-lg border border-gray-300 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {template.category}
              </span>
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900">
                {template.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {template.description}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-1">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={`/workflows/new?template=${template.id}`}
                className="block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              >
                Use Template
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}