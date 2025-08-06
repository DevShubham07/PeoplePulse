import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { 
  User, 
  ChevronDown, 
  ChevronRight,
  Building,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  TrendingUp,
  Users,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const Hierarchy = () => {
  const [expandedNodes, setExpandedNodes] = useState(new Set(['1', '2']));
  const [viewMode, setViewMode] = useState('current'); // current, up, down

  // Mock hierarchy data
  const hierarchyData = {
    currentEmployee: {
      id: '1',
      name: 'John Doe',
      designation: 'Software Engineer',
      department: 'Engineering',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2023-01-15',
      performance: 8.7,
      attendance: 95
    },
    manager: {
      id: '2',
      name: 'Sarah Johnson',
      designation: 'Senior Software Engineer',
      department: 'Engineering',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 234-5678',
      joinDate: '2022-03-15',
      performance: 9.2,
      attendance: 98,
      directReports: 8
    },
    directReports: [
      {
        id: '3',
        name: 'Michael Chen',
        designation: 'Junior Developer',
        department: 'Engineering',
        email: 'michael.chen@company.com',
        phone: '+1 (555) 345-6789',
        joinDate: '2023-06-01',
        performance: 7.8,
        attendance: 92,
        directReports: 0
      },
      {
        id: '4',
        name: 'Emily Rodriguez',
        designation: 'Frontend Developer',
        department: 'Engineering',
        email: 'emily.rodriguez@company.com',
        phone: '+1 (555) 456-7890',
        joinDate: '2023-03-10',
        performance: 8.5,
        attendance: 94,
        directReports: 0
      },
      {
        id: '5',
        name: 'David Kim',
        designation: 'Backend Developer',
        department: 'Engineering',
        email: 'david.kim@company.com',
        phone: '+1 (555) 567-8901',
        joinDate: '2022-11-05',
        performance: 8.9,
        attendance: 96,
        directReports: 0
      }
    ],
    peers: [
      {
        id: '6',
        name: 'Lisa Wang',
        designation: 'Software Engineer',
        department: 'Engineering',
        email: 'lisa.wang@company.com',
        phone: '+1 (555) 678-9012',
        joinDate: '2023-06-12',
        performance: 8.3,
        attendance: 93
      },
      {
        id: '7',
        name: 'James Wilson',
        designation: 'Software Engineer',
        department: 'Engineering',
        email: 'james.wilson@company.com',
        phone: '+1 (555) 789-0123',
        joinDate: '2022-09-18',
        performance: 8.6,
        attendance: 97
      }
    ]
  };

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const EmployeeCard = ({ employee, isCurrent = false, isManager = false }) => (
    <div className={`card ${isCurrent ? 'ring-2 ring-primary-500' : ''} ${isManager ? 'bg-primary-50' : ''}`}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isCurrent ? 'bg-primary-600' : isManager ? 'bg-primary-100' : 'bg-secondary-100'
          }`}>
            <User className={`w-6 h-6 ${isCurrent ? 'text-white' : isManager ? 'text-primary-600' : 'text-secondary-600'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold truncate ${isCurrent ? 'text-primary-700' : 'text-secondary-900'}`}>
              {employee.name}
              {isCurrent && <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">You</span>}
              {isManager && <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">Manager</span>}
            </h3>
            <p className="text-sm text-secondary-600 truncate">{employee.designation}</p>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-secondary-500">
              <div className="flex items-center space-x-1">
                <Building className="w-3 h-3" />
                <span>{employee.department}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>Joined {employee.joinDate}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-xs text-secondary-500">Performance</p>
              <p className={`text-sm font-semibold ${employee.performance >= 8.5 ? 'text-green-600' : 'text-blue-600'}`}>
                {employee.performance}/10
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-secondary-500">Attendance</p>
              <p className={`text-sm font-semibold ${employee.attendance >= 95 ? 'text-green-600' : 'text-blue-600'}`}>
                {employee.attendance}%
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <button 
          onClick={() => window.open(`mailto:${employee.email}`)}
          className="btn-secondary text-xs py-1 px-2"
        >
          <Mail className="w-3 h-3 mr-1" />
          Email
        </button>
        <button 
          onClick={() => window.open(`tel:${employee.phone}`)}
          className="btn-secondary text-xs py-1 px-2"
        >
          <Phone className="w-3 h-3 mr-1" />
          Call
        </button>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(employee.email);
            alert('Email copied to clipboard!');
          }}
          className="btn-secondary text-xs py-1 px-2"
        >
          Copy Email
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary-50">
      <Navigation />
      
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-white border-b border-secondary-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">Organizational Hierarchy</h1>
              <p className="text-secondary-600">View your position in the company structure</p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setViewMode('up')}
                className={`btn-secondary text-sm ${viewMode === 'up' ? 'bg-primary-600 text-white' : ''}`}
              >
                <ArrowUp className="w-4 h-4 mr-1" />
                View Up
              </button>
              <button 
                onClick={() => setViewMode('current')}
                className={`btn-secondary text-sm ${viewMode === 'current' ? 'bg-primary-600 text-white' : ''}`}
              >
                Current
              </button>
              <button 
                onClick={() => setViewMode('down')}
                className={`btn-secondary text-sm ${viewMode === 'down' ? 'bg-primary-600 text-white' : ''}`}
              >
                <ArrowDown className="w-4 h-4 mr-1" />
                View Down
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-secondary-600 mb-6">
            <span>Company</span>
            <ChevronRight className="w-4 h-4" />
            <span>Engineering</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-secondary-900 font-medium">Your Position</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Manager Section */}
            <div className="lg:col-span-3">
              <div className="flex items-center space-x-2 mb-4">
                <ArrowUp className="w-5 h-5 text-secondary-400" />
                <h2 className="text-lg font-semibold text-secondary-900">Your Manager</h2>
              </div>
              <EmployeeCard employee={hierarchyData.manager} isManager={true} />
            </div>

            {/* Current Employee Section */}
            <div className="lg:col-span-3">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-secondary-900">Your Position</h2>
              </div>
              <EmployeeCard employee={hierarchyData.currentEmployee} isCurrent={true} />
            </div>

            {/* Direct Reports Section */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <ArrowDown className="w-5 h-5 text-secondary-400" />
                  <h2 className="text-lg font-semibold text-secondary-900">Direct Reports</h2>
                  <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                    {hierarchyData.directReports.length} members
                  </span>
                </div>
                <button
                  onClick={() => toggleNode('direct-reports')}
                  className="text-secondary-600 hover:text-secondary-900"
                >
                  {expandedNodes.has('direct-reports') ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedNodes.has('direct-reports') && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hierarchyData.directReports.map((employee) => (
                    <EmployeeCard key={employee.id} employee={employee} />
                  ))}
                </div>
              )}
            </div>

            {/* Peers Section */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-secondary-400" />
                  <h2 className="text-lg font-semibold text-secondary-900">Your Peers</h2>
                  <span className="bg-secondary-100 text-secondary-700 text-xs px-2 py-1 rounded-full">
                    {hierarchyData.peers.length} members
                  </span>
                </div>
                <button
                  onClick={() => toggleNode('peers')}
                  className="text-secondary-600 hover:text-secondary-900"
                >
                  {expandedNodes.has('peers') ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedNodes.has('peers') && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hierarchyData.peers.map((employee) => (
                    <EmployeeCard key={employee.id} employee={employee} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Department Overview */}
          <div className="card mt-8">
            <h3 className="text-lg font-semibold text-secondary-900 mb-6">Department Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary-900">15</p>
                <p className="text-sm text-secondary-600">Total Members</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">12</p>
                <p className="text-sm text-secondary-600">Active Members</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">8.7</p>
                <p className="text-sm text-secondary-600">Avg Performance</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">96%</p>
                <p className="text-sm text-secondary-600">Avg Attendance</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card mt-8">
            <h3 className="text-lg font-semibold text-secondary-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200">
                <MessageSquare className="w-6 h-6 text-primary-600 mb-2" />
                <span className="text-sm font-medium text-primary-700">Message Manager</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                <Users className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-green-700">Team Meeting</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-purple-700">Performance Review</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
                <Building className="w-6 h-6 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-orange-700">Department Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hierarchy; 