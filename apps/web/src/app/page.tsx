import Link from 'next/link'
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Automate Your Workflows with{' '}
            <span className="text-blue-600">FlowMate</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Connect your favorite tools and automate repetitive tasks. 
            Build powerful workflows without writing code.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/onboarding"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Get started
              <ArrowRight className="ml-2 h-4 w-4 inline" />
            </Link>
            <Link
              href="/templates"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Browse templates <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Powerful automation
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to automate your business
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                Lightning Fast
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Set up workflows in minutes, not hours. Our intuitive interface makes automation accessible to everyone.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                Secure & Reliable
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Enterprise-grade security with Australian data residency. Your data stays safe and compliant.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                Save Time
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Automate repetitive tasks and focus on what matters most. Get hours back in your day.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}