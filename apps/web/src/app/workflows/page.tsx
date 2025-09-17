import Link from 'next/link'
import { Plus, Play, Pause, MoreVertical } from 'lucide-react'

// Mock workflow data
const workflows = [
  {
    id: '1',
    name: 'Appointment Reminders',
    description: 'Send SMS reminders to clients 24 hours before appointments',
    status: 'published',
    template: 'Salon Template',
    runCount: 47,
    lastRun: '2 hours ago',
  },
  {
    id: '2', 
    name: 'Welcome New Clients',
    description: 'Email sequence for new salon clients',
    status: 'draft',
    template: 'Salon Template',
    runCount: 0,
    lastRun: 'Never',
  },
  {
    id: '3',
    name: 'Quote Follow-up',
    description: 'Automated follow-up for pending quotes',
    status: 'paused',
    template: 'Tradie Template',
    runCount: 23,
    lastRun: '1 day ago',
  },
]

export default function WorkflowsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Workflows
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your automated workflows and monitor their performance.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/workflows/new"
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Workflow
          </Link>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Workflow
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Template
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Runs
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Last Run
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {workflows.map((workflow) => (
                    <tr key={workflow.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            <Link
                              href={`/workflows/${workflow.id}`}
                              className="hover:text-blue-600"
                            >
                              {workflow.name}
                            </Link>
                          </div>
                          <div className="text-sm text-gray-500">
                            {workflow.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            workflow.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : workflow.status === 'draft'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {workflow.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {workflow.template}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Link
                          href={`/runs?workflowId=${workflow.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {workflow.runCount}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {workflow.lastRun}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            className={`p-1 rounded ${
                              workflow.status === 'published'
                                ? 'text-yellow-600 hover:text-yellow-900'
                                : 'text-green-600 hover:text-green-900'
                            }`}
                          >
                            {workflow.status === 'published' ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}