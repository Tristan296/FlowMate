import Link from 'next/link'
import { Filter, Search } from 'lucide-react'

// Mock runs data
const runs = [
  {
    id: 'run1',
    workflowId: '1',
    workflowName: 'Appointment Reminders',
    status: 'completed',
    triggeredBy: 'cron',
    triggeredAt: '2023-11-15T10:00:00Z',
    completedAt: '2023-11-15T10:01:23Z',
    duration: '1m 23s',
  },
  {
    id: 'run2',
    workflowId: '1', 
    workflowName: 'Appointment Reminders',
    status: 'completed',
    triggeredBy: 'cron',
    triggeredAt: '2023-11-14T10:00:00Z',
    completedAt: '2023-11-14T10:00:45Z',
    duration: '45s',
  },
  {
    id: 'run3',
    workflowId: '1',
    workflowName: 'Appointment Reminders',
    status: 'failed',
    triggeredBy: 'cron',
    triggeredAt: '2023-11-13T10:00:00Z',
    error: 'SMS service unavailable',
    duration: '2s',
  },
  {
    id: 'run4',
    workflowId: '3',
    workflowName: 'Quote Follow-up',
    status: 'completed',
    triggeredBy: 'cron',
    triggeredAt: '2023-11-12T09:00:00Z',
    completedAt: '2023-11-12T09:02:15Z',
    duration: '2m 15s',
  },
  {
    id: 'run5',
    workflowId: '1',
    workflowName: 'Appointment Reminders',
    status: 'running',
    triggeredBy: 'webhook',
    triggeredAt: '2023-11-11T14:30:00Z',
    duration: '30s',
  },
]

const statuses = ['All', 'Running', 'Completed', 'Failed']

export default function RunsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Workflow Runs
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Monitor the execution history of your automated workflows.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search runs..."
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex space-x-2">
            {statuses.map((status) => (
              <button
                key={status}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Total Runs
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            156
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Success Rate
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-green-600">
            94.2%
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Running
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-blue-600">
            3
          </dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">
            Avg Duration
          </dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            1m 12s
          </dd>
        </div>
      </div>

      {/* Runs Table */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Run ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Workflow
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Triggered By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Started
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {runs.map((run) => (
                    <tr key={run.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Link
                          href={`/runs/${run.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {run.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          href={`/workflows/${run.workflowId}`}
                          className="text-sm text-blue-600 hover:text-blue-900"
                        >
                          {run.workflowName}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            run.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : run.status === 'failed'
                              ? 'bg-red-100 text-red-800'
                              : run.status === 'running'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {run.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {run.triggeredBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(run.triggeredAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {run.duration}
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