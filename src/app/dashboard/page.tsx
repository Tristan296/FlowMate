"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  CheckCircle, 
  Clock, 
  Plus,
  Search,
  Bell,
  Settings,
  Workflow,
  Calendar,
  Zap,
  X
} from 'lucide-react';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  // Sample notifications data
  const notifications = useMemo(() => [
    {
      id: 1,
      title: "New task assigned",
      message: "Review marketing copy has been assigned to you",
      time: "2 minutes ago",
      type: "task",
      read: false
    },
    {
      id: 2,
      title: "Project deadline approaching",
      message: "Website Redesign is due in 3 days",
      time: "1 hour ago",
      type: "deadline",
      read: false
    },
    {
      id: 3,
      title: "Team member joined",
      message: "Alex Johnson joined Mobile App Development",
      time: "3 hours ago",
      type: "team",
      read: true
    }
  ], []);

  // Team members data for search
  const teamMembers = useMemo(() => [
    { name: "Sarah Chen", role: "Designer", email: "sarah@flowmate.com" },
    { name: "Mike Johnson", role: "Developer", email: "mike@flowmate.com" },
    { name: "Emily Davis", role: "Marketing", email: "emily@flowmate.com" },
    { name: "Alex Johnson", role: "Developer", email: "alex@flowmate.com" },
    { name: "Lisa Wang", role: "Project Manager", email: "lisa@flowmate.com" }
  ], []);

  const stats = [
    {
      title: "Active Projects",
      value: "24",
      change: "+12%",
      icon: <Workflow className="h-6 w-6 text-blue-600" />
    },
    {
      title: "Team Members",
      value: "12",
      change: "+2",
      icon: <Users className="h-6 w-6 text-green-600" />
    },
    {
      title: "Completed Tasks",
      value: "187",
      change: "+23%",
      icon: <CheckCircle className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Pending Tasks",
      value: "34",
      change: "-8%",
      icon: <Clock className="h-6 w-6 text-orange-600" />
    }
  ];

  const recentProjects = useMemo(() => [
    {
      name: "Website Redesign",
      status: "In Progress",
      progress: 75,
      dueDate: "2024-01-15",
      members: 5
    },
    {
      name: "Mobile App Development",
      status: "Planning",
      progress: 25,
      dueDate: "2024-02-28",
      members: 8
    },
    {
      name: "Marketing Campaign",
      status: "Review",
      progress: 90,
      dueDate: "2024-01-10",
      members: 3
    }
  ], []);

  const recentTasks = useMemo(() => [
    {
      title: "Design homepage mockups",
      project: "Website Redesign",
      assignee: "Sarah Chen",
      priority: "High",
      status: "In Progress"
    },
    {
      title: "Set up CI/CD pipeline",
      project: "Mobile App Development",
      assignee: "Mike Johnson",
      priority: "Medium",
      status: "Todo"
    },
    {
      title: "Review marketing copy",
      project: "Marketing Campaign",
      assignee: "Emily Davis",
      priority: "High",
      status: "Review"
    }
  ], []);

  // Search functionality
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return { projects: recentProjects, tasks: recentTasks, members: [] };
    }

    const query = searchQuery.toLowerCase();
    
    const filteredProjects = recentProjects.filter(project =>
      project.name.toLowerCase().includes(query) ||
      project.status.toLowerCase().includes(query)
    );

    const filteredTasks = recentTasks.filter(task =>
      task.title.toLowerCase().includes(query) ||
      task.project.toLowerCase().includes(query) ||
      task.assignee.toLowerCase().includes(query) ||
      task.priority.toLowerCase().includes(query)
    );

    const filteredMembers = teamMembers.filter(member =>
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query)
    );

    return { projects: filteredProjects, tasks: filteredTasks, members: filteredMembers };
  }, [searchQuery, recentProjects, recentTasks, teamMembers]);

  // Event handlers
  const handleCreateTask = () => {
    setShowNewTaskModal(true);
  };

  const handleInviteTeamMember = () => {
    alert('Invite Team Member feature - Coming soon!');
  };

  const handleViewReports = () => {
    alert('View Reports feature - Coming soon!');
  };

  const handleSetupAutomation = () => {
    alert('Set Up Automation feature - Coming soon!');
  };

  const handleNewProject = () => {
    setShowNewProjectModal(true);
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showNotifications || showSettings || showUserProfile) {
        const target = event.target as Element;
        if (!target.closest('.dropdown-container')) {
          setShowNotifications(false);
          setShowSettings(false);
          setShowUserProfile(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications, showSettings, showUserProfile]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Workflow className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">FlowMate</span>
            </div>
            
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, tasks, or team members..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative dropdown-container">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900"
                >
                  <Bell className="h-6 w-6" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 text-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative dropdown-container">
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <Settings className="h-6 w-6" />
                </button>
                
                {/* Settings Dropdown */}
                {showSettings && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile Settings</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Team Settings</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Notifications</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Billing</a>
                      <hr className="my-1" />
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</a>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative dropdown-container">
                <button 
                  onClick={() => setShowUserProfile(!showUserProfile)}
                  className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <span className="text-white text-sm font-medium">JD</span>
                </button>
                
                {/* User Profile Dropdown */}
                {showUserProfile && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-600">john@flowmate.com</p>
                    </div>
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Tasks</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Time Tracking</a>
                      <hr className="my-1" />
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Here&apos;s what&apos;s happening with your projects today.</p>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Search Results for &quot;{searchQuery}&quot;
              </h2>
              
              {filteredData.projects.length === 0 && filteredData.tasks.length === 0 && filteredData.members.length === 0 ? (
                <p className="text-gray-500">No results found. Try a different search term.</p>
              ) : (
                <div className="space-y-6">
                  {/* Projects Results */}
                  {filteredData.projects.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Projects ({filteredData.projects.length})</h3>
                      <div className="space-y-3">
                        {filteredData.projects.map((project, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-md font-semibold text-gray-900">{project.name}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                project.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-600">
                              <span>{project.progress}% complete</span>
                              <span className="mx-2">•</span>
                              <span>Due: {project.dueDate}</span>
                              <span className="mx-2">•</span>
                              <span>{project.members} members</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tasks Results */}
                  {filteredData.tasks.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Tasks ({filteredData.tasks.length})</h3>
                      <div className="space-y-3">
                        {filteredData.tasks.map((task, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-md font-semibold text-gray-900">{task.title}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                task.priority === 'High' ? 'bg-red-100 text-red-800' :
                                task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {task.priority}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-600">
                              <span>{task.project}</span>
                              <span className="mx-2">•</span>
                              <span>Assigned to: {task.assignee}</span>
                              <span className="mx-2">•</span>
                              <span>{task.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Team Members Results */}
                  {filteredData.members.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Team Members ({filteredData.members.length})</h3>
                      <div className="space-y-3">
                        {filteredData.members.map((member, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-md font-semibold text-gray-900">{member.name}</h4>
                                <p className="text-sm text-gray-600">{member.role}</p>
                              </div>
                              <p className="text-sm text-gray-500">{member.email}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
                  <button 
                    onClick={handleNewProject}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {recentProjects.map((project, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          project.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Due: {project.dueDate}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {project.members} members
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleCreateTask}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center"
                >
                  <Plus className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-900">Create New Task</span>
                </button>
                <button 
                  onClick={handleInviteTeamMember}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center"
                >
                  <Users className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-900">Invite Team Member</span>
                </button>
                <button 
                  onClick={handleViewReports}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center"
                >
                  <BarChart3 className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-900">View Reports</span>
                </button>
                <button 
                  onClick={handleSetupAutomation}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center"
                >
                  <Zap className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-900">Set Up Automation</span>
                </button>
              </div>
            </div>

            {/* Recent Tasks */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h3>
              <div className="space-y-4">
                {recentTasks.map((task, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <h4 className="text-sm font-semibold text-gray-900">{task.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{task.project}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{task.assignee}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        task.priority === 'High' ? 'bg-red-100 text-red-800' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New Project</h3>
              <button 
                onClick={() => setShowNewProjectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="projectDescription"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project description"
                />
              </div>
              <div>
                <label htmlFor="projectDueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  id="projectDueDate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Project creation feature - Coming soon!');
                    setShowNewProjectModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New Task</h3>
              <button 
                onClick={() => setShowNewTaskModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  id="taskTitle"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label htmlFor="taskProject" className="block text-sm font-medium text-gray-700 mb-1">
                  Project
                </label>
                <select
                  id="taskProject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select project</option>
                  <option value="website-redesign">Website Redesign</option>
                  <option value="mobile-app">Mobile App Development</option>
                  <option value="marketing">Marketing Campaign</option>
                </select>
              </div>
              <div>
                <label htmlFor="taskAssignee" className="block text-sm font-medium text-gray-700 mb-1">
                  Assignee
                </label>
                <select
                  id="taskAssignee"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select assignee</option>
                  <option value="sarah">Sarah Chen</option>
                  <option value="mike">Mike Johnson</option>
                  <option value="emily">Emily Davis</option>
                  <option value="alex">Alex Johnson</option>
                  <option value="lisa">Lisa Wang</option>
                </select>
              </div>
              <div>
                <label htmlFor="taskPriority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="taskPriority"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewTaskModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Task creation feature - Coming soon!');
                    setShowNewTaskModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}