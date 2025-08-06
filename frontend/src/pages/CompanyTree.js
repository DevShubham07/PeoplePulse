import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { 
  Search, 
  Download, 
  Share2, 
  ZoomIn, 
  ZoomOut,
  User,
  Building,
  Users,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  MessageSquare,
  MoreVertical,
  Calendar,
  TrendingUp
} from 'lucide-react';

const CompanyTree = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [expandedNodes, setExpandedNodes] = useState(new Set(['ceo', 'engineering', 'product', 'marketing']));

  // Mock company tree data
  const companyTree = {
    ceo: {
      id: 'ceo',
      name: 'Jennifer Smith',
      title: 'Chief Executive Officer',
      department: 'Executive',
      email: 'jennifer.smith@company.com',
      phone: '+1 (555) 100-0001',
      joinDate: '2020-01-15',
      directReports: ['cto', 'cfo', 'cmo', 'chro']
    },
    cto: {
      id: 'cto',
      name: 'Robert Johnson',
      title: 'Chief Technology Officer',
      department: 'Technology',
      email: 'robert.johnson@company.com',
      phone: '+1 (555) 100-0002',
      joinDate: '2021-03-20',
      directReports: ['engineering', 'product', 'data']
    },
    cfo: {
      id: 'cfo',
      name: 'Maria Garcia',
      title: 'Chief Financial Officer',
      department: 'Finance',
      email: 'maria.garcia@company.com',
      phone: '+1 (555) 100-0003',
      joinDate: '2020-06-10',
      directReports: ['accounting', 'treasury', 'fp&a']
    },
    cmo: {
      id: 'cmo',
      name: 'David Chen',
      title: 'Chief Marketing Officer',
      department: 'Marketing',
      email: 'david.chen@company.com',
      phone: '+1 (555) 100-0004',
      joinDate: '2021-01-05',
      directReports: ['digital', 'brand', 'growth']
    },
    chro: {
      id: 'chro',
      name: 'Lisa Thompson',
      title: 'Chief Human Resources Officer',
      department: 'Human Resources',
      email: 'lisa.thompson@company.com',
      phone: '+1 (555) 100-0005',
      joinDate: '2020-08-15',
      directReports: ['recruitment', 'talent', 'benefits']
    },
    engineering: {
      id: 'engineering',
      name: 'Sarah Wilson',
      title: 'VP of Engineering',
      department: 'Engineering',
      email: 'sarah.wilson@company.com',
      phone: '+1 (555) 100-0006',
      joinDate: '2021-05-12',
      directReports: ['frontend', 'backend', 'devops', 'qa']
    },
    product: {
      id: 'product',
      name: 'Michael Brown',
      title: 'VP of Product',
      department: 'Product',
      email: 'michael.brown@company.com',
      phone: '+1 (555) 100-0007',
      joinDate: '2021-07-08',
      directReports: ['pm1', 'pm2', 'design']
    },
    marketing: {
      id: 'marketing',
      name: 'Emily Davis',
      title: 'VP of Marketing',
      department: 'Marketing',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 100-0008',
      joinDate: '2021-09-20',
      directReports: ['content', 'social', 'events']
    }
  };

  const departments = ['all', 'Executive', 'Technology', 'Finance', 'Marketing', 'Human Resources', 'Engineering', 'Product'];

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const filteredTree = Object.values(companyTree).filter(node => {
    const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         node.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         node.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || node.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const EmployeeNode = ({ employee, level = 0, isExpanded = false }) => (
    <div className={`${level > 0 ? 'ml-8' : ''}`}>
      <div className="card hover:shadow-lg transition-shadow duration-200 mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              level === 0 ? 'bg-primary-600' : 
              level === 1 ? 'bg-primary-100' : 
              'bg-secondary-100'
            }`}>
              <User className={`w-5 h-5 ${
                level === 0 ? 'text-white' : 
                level === 1 ? 'text-primary-600' : 
                'text-secondary-600'
              }`} />
            </div>
            <div>
              <h3 className={`font-semibold ${
                level === 0 ? 'text-primary-700' : 'text-secondary-900'
              }`}>
                {employee.name}
                {level === 0 && <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">CEO</span>}
              </h3>
              <p className="text-sm text-secondary-600">{employee.title}</p>
              <div className="flex items-center space-x-4 mt-1 text-xs text-secondary-500">
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
          <div className="flex items-center space-x-2">
            {employee.directReports && employee.directReports.length > 0 && (
              <button
                onClick={() => toggleNode(employee.id)}
                className="text-secondary-600 hover:text-secondary-900"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            )}
            <button className="text-secondary-400 hover:text-secondary-600">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <button className="btn-secondary text-xs py-1 px-2">
            <Mail className="w-3 h-3 mr-1" />
            Email
          </button>
          <button className="btn-secondary text-xs py-1 px-2">
            <MessageSquare className="w-3 h-3 mr-1" />
            Message
          </button>
          <button className="btn-secondary text-xs py-1 px-2">
            <Phone className="w-3 h-3 mr-1" />
            Call
          </button>
        </div>
      </div>

      {/* Direct Reports */}
      {isExpanded && employee.directReports && (
        <div className="space-y-2">
          {employee.directReports.map((reportId) => {
            const report = companyTree[reportId];
            if (!report) return null;
            return (
              <EmployeeNode
                key={reportId}
                employee={report}
                level={level + 1}
                isExpanded={expandedNodes.has(reportId)}
              />
            );
          })}
        </div>
      )}
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
              <h1 className="text-2xl font-bold text-secondary-900">Company Organizational Chart</h1>
              <p className="text-secondary-600">View the complete company hierarchy and structure</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="btn-secondary text-sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </button>
              <button className="btn-secondary text-sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Controls */}
          <div className="card mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Department Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="input-field"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                  className="p-2 text-secondary-600 hover:text-secondary-900"
                  disabled={zoomLevel <= 50}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm text-secondary-600 min-w-[60px] text-center">
                  {zoomLevel}%
                </span>
                <button
                  onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
                  className="p-2 text-secondary-600 hover:text-secondary-900"
                  disabled={zoomLevel >= 200}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Company Tree */}
          <div 
            className="card"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-2">Organizational Structure</h2>
              <p className="text-sm text-secondary-600">
                {filteredTree.length} positions found • Click on arrows to expand/collapse departments
              </p>
            </div>

            <div className="space-y-4">
              {filteredTree.map((employee) => (
                <EmployeeNode
                  key={employee.id}
                  employee={employee}
                  isExpanded={expandedNodes.has(employee.id)}
                />
              ))}
            </div>
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="card text-center">
              <p className="text-2xl font-bold text-secondary-900">150+</p>
              <p className="text-sm text-secondary-600">Total Employees</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl font-bold text-primary-600">8</p>
              <p className="text-sm text-secondary-600">Departments</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl font-bold text-green-600">12</p>
              <p className="text-sm text-secondary-600">Leadership Positions</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl font-bold text-purple-600">25</p>
              <p className="text-sm text-secondary-600">Teams</p>
            </div>
          </div>

          {/* Department Overview */}
          <div className="card mt-8">
            <h3 className="text-lg font-semibold text-secondary-900 mb-6">Department Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.filter(d => d !== 'all').map((dept) => (
                <div key={dept} className="text-center p-4 bg-secondary-50 rounded-lg">
                  <Building className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-secondary-900">{dept}</h4>
                  <p className="text-sm text-secondary-600">
                    {Math.floor(Math.random() * 30) + 10} employees
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card mt-8">
            <h3 className="text-lg font-semibold text-secondary-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                onClick={() => {
                  const searchTerm = prompt('Enter employee name to find:');
                  if (searchTerm) {
                    setSearchTerm(searchTerm);
                  }
                }}
                className="flex flex-col items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200"
              >
                <Search className="w-6 h-6 text-primary-600 mb-2" />
                <span className="text-sm font-medium text-primary-700">Find Employee</span>
              </button>
              <button 
                onClick={() => {
                  const dept = prompt('Enter department name (Engineering, Product, Marketing, etc.):');
                  if (dept) {
                    setSelectedDepartment(dept.toLowerCase());
                  }
                }}
                className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
              >
                <Users className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-green-700">Department View</span>
              </button>
              <button 
                onClick={() => {
                  alert('Performance view would show employee performance metrics and rankings. This feature would integrate with the performance management system.');
                }}
                className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
              >
                <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-purple-700">Performance View</span>
              </button>
              <button 
                onClick={() => {
                  // Export company tree as JSON
                  const treeData = {
                    company: 'PeoplePulse',
                    exportDate: new Date().toISOString(),
                    totalEmployees: 150,
                    departments: 8,
                    structure: companyTree
                  };
                  const blob = new Blob([JSON.stringify(treeData, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'company-tree.json';
                  a.click();
                  URL.revokeObjectURL(url);
                  alert('Company tree exported successfully!');
                }}
                className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200"
              >
                <Download className="w-6 h-6 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-orange-700">Export Chart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyTree; 