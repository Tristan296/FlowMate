import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Welcome to FlowMate!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Let&apos;s get you set up with your first automated workflow
        </p>
      </div>

      <div className="mt-16">
        <div className="space-y-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">
                1. Choose a Template
              </h3>
              <p className="mt-2 text-gray-600">
                Start with one of our pre-built templates designed for your industry.
                We have templates for salons, tradies, agencies, and more.
              </p>
              <Link
                href="/templates"
                className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Browse templates
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">
                2. Connect Your Tools
              </h3>
              <p className="mt-2 text-gray-600">
                Connect your email provider, SMS service, and other tools.
                We support SendGrid, Twilio, Google Sheets, and more.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">
                3. Test Your Workflow
              </h3>
              <p className="mt-2 text-gray-600">
                Run a test to make sure everything is working correctly.
                You can always make changes later.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">
                4. Go Live
              </h3>
              <p className="mt-2 text-gray-600">
                Activate your workflow and start saving time with automation.
                Monitor your workflows from the dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/templates"
            className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Get Started with Templates
          </Link>
        </div>
      </div>
    </div>
  )
}