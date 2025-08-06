import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { employeeAPI } from '../services/api';
import { 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  MoreVertical,
  User,
  Building,
  Calendar,
  X
} from 'lucide-react';

const TeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    designation: '',
    department: 'Engineering',
    email: '',
    phone: '',
    joinDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const employees = await employeeAPI.getAllEmployees();
        // Transform backend data to include performance and attendance
        const transformedEmployees = employees.map(emp => ({
          ...emp,
          performance: emp.performance?.score ? emp.performance.score / 10 : 8.5,
          attendance: 95 + Math.floor(Math.random() * 5), // Mock attendance
          status: 'active'
        }));
        setTeamMembers(transformedEmployees);
      } catch (error) {
        console.error('Error fetching team members:', error);
        // Use mock data if API fails
        setTeamMembers([
          {
            id: 1,
            name: 'Sarah Johnson',
            designation: 'Senior Software Engineer',
            department: 'Engineering',
            email: 'sarah.johnson@company.com',
            phone: '+1 (555) 123-4567',
            joinDate: '2022-03-15',
            performance: 9.2,
            attendance: 98,
            avatar: null,
            status: 'active'
          },
          {
            id: 2,
            name: 'Michael Chen',
            designation: 'Product Manager',
            department: 'Product',
            email: 'michael.chen@company.com',
            phone: '+1 (555) 234-5678',
            joinDate: '2021-08-20',
            performance: 8.8,
            attendance: 95,
            avatar: null,
            status: 'active'
          },
          {
            id: 3,
            name: 'Emily Rodriguez',
            designation: 'UX Designer',
            department: 'Design',
            email: 'emily.rodriguez@company.com',
            phone: '+1 (555) 345-6789',
            joinDate: '2023-01-10',
            performance: 9.0,
            attendance: 97,
            avatar: null,
            status: 'active'
          },
          {
            id: 4,
            name: 'David Kim',
            designation: 'Data Analyst',
            department: 'Analytics',
            email: 'david.kim@company.com',
            phone: '+1 (555) 456-7890',
            joinDate: '2022-11-05',
            performance: 8.5,
            attendance: 94,
            avatar: null,
            status: 'active'
          },
          {
            id: 5,
            name: 'Lisa Wang',
            designation: 'Marketing Specialist',
            department: 'Marketing',
            email: 'lisa.wang@company.com',
            phone: '+1 (555) 567-8901',
            joinDate: '2023-06-12',
            performance: 8.9,
            attendance: 96,
            avatar: null,
            status: 'active'
          },
          {
            id: 6,
            name: 'James Wilson',
            designation: 'DevOps Engineer',
            department: 'Engineering',
            email: 'james.wilson@company.com',
            phone: '+1 (555) 678-9012',
            joinDate: '2022-09-18',
            performance: 9.1,
            attendance: 99,
            avatar: null,
            status: 'active'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const departments = ['all', 'Engineering', 'Product', 'Design', 'Analytics', 'Marketing'];

  const filteredMembers = teamMembers.filter(member => {
    if (!member) return false;
    
    const matchesSearch = (member.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (member.designation?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (member.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getPerformanceColor = (score) => {
    if (score >= 9.0) return 'text-green-600';
    if (score >= 8.0) return 'text-blue-600';
    if (score >= 7.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 95) return 'text-green-600';
    if (percentage >= 90) return 'text-blue-600';
    if (percentage >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <Navigation />
      
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-white border-b border-secondary-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">Team Management</h1>
              <p className="text-secondary-600">Manage your team members and their information</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn-primary inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Filters and Search */}
          <div className="card mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Department Filter */}
              <div className="sm:w-48">
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

              {/* View Mode Toggle */}
              <div className="flex border border-secondary-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-secondary-600 hover:bg-secondary-50'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'list'
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-secondary-600 hover:bg-secondary-50'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Team Members */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <div key={member.id} className="card hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary-900">{member.name}</h3>
                        <p className="text-sm text-secondary-600">{member.designation}</p>
                      </div>
                    </div>
                    <button className="text-secondary-400 hover:text-secondary-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Building className="w-4 h-4 text-secondary-400" />
                      <span className="text-secondary-600">{member.department}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-secondary-400" />
                      <span className="text-secondary-600">Joined {member.joinDate}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-secondary-500">Performance</p>
                      <p className={`text-lg font-semibold ${getPerformanceColor(member.performance)}`}>
                        {member.performance}/10
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-secondary-500">Attendance</p>
                      <p className={`text-lg font-semibold ${getAttendanceColor(member.attendance)}`}>
                        {member.attendance}%
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button 
                      className="flex-1 btn-secondary text-xs py-2"
                      onClick={() => {
                        setSelectedContact({ type: 'email', value: member.email, name: member.name });
                        setShowContactModal(true);
                      }}
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      Email
                    </button>
                    <button 
                      className="flex-1 btn-secondary text-xs py-2"
                      onClick={() => {
                        setSelectedContact({ type: 'phone', value: member.phone, name: member.name });
                        setShowContactModal(true);
                      }}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Phone
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-secondary-200">
                  <thead className="bg-secondary-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Attendance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-secondary-200">
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-primary-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-secondary-900">{member.name}</div>
                              <div className="text-sm text-secondary-500">{member.designation}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-secondary-900">{member.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${getPerformanceColor(member.performance)}`}>
                            {member.performance}/10
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${getAttendanceColor(member.attendance)}`}>
                            {member.attendance}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="text-primary-600 hover:text-primary-800">
                              <Mail className="w-4 h-4" />
                            </button>
                            <button className="text-primary-600 hover:text-primary-800">
                              <Phone className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-secondary-400 hover:text-secondary-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="card text-center">
              <p className="text-2xl font-bold text-secondary-900">{filteredMembers.length}</p>
              <p className="text-sm text-secondary-600">Total Members</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl font-bold text-green-600">
                {filteredMembers.filter(m => m.performance >= 8.5).length}
              </p>
              <p className="text-sm text-secondary-600">High Performers</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl font-bold text-blue-600">
                {filteredMembers.filter(m => m.attendance >= 95).length}
              </p>
              <p className="text-sm text-secondary-600">Perfect Attendance</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl font-bold text-purple-600">
                {new Set(filteredMembers.map(m => m.department)).size}
              </p>
              <p className="text-sm text-secondary-600">Departments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-secondary-900">
                Contact {selectedContact.name}
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-secondary-400 hover:text-secondary-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {selectedContact.type === 'email' ? (
                  <Mail className="w-5 h-5 text-primary-600" />
                ) : (
                  <Phone className="w-5 h-5 text-primary-600" />
                )}
                <div>
                  <p className="text-sm text-secondary-600 capitalize">
                    {selectedContact.type}
                  </p>
                  <p className="font-medium text-secondary-900">
                    {selectedContact.value}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    if (selectedContact.type === 'email') {
                      window.open(`mailto:${selectedContact.value}`);
                    } else {
                      window.open(`tel:${selectedContact.value}`);
                    }
                  }}
                  className="flex-1 btn-primary"
                >
                  {selectedContact.type === 'email' ? 'Send Email' : 'Call'}
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedContact.value);
                    alert('Copied to clipboard!');
                  }}
                  className="flex-1 btn-secondary"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Team Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-secondary-900">
                Add New Team Member
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-secondary-400 hover:text-secondary-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const memberToAdd = {
                id: Date.now(),
                ...newMember,
                performance: 8.0 + Math.random() * 2,
                attendance: 90 + Math.floor(Math.random() * 10),
                avatar: null,
                status: 'active'
              };
              setTeamMembers([...teamMembers, memberToAdd]);
              setShowAddModal(false);
              setNewMember({
                name: '',
                designation: '',
                department: 'Engineering',
                email: '',
                phone: '',
                joinDate: new Date().toISOString().split('T')[0]
              });
              alert('Team member added successfully!');
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    className="input-field"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMember.designation}
                    onChange={(e) => setNewMember({...newMember, designation: e.target.value})}
                    className="input-field"
                    placeholder="e.g., Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Department *
                  </label>
                  <select
                    required
                    value={newMember.department}
                    onChange={(e) => setNewMember({...newMember, department: e.target.value})}
                    className="input-field"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    className="input-field"
                    placeholder="email@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newMember.phone}
                    onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                    className="input-field"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Join Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newMember.joinDate}
                    onChange={(e) => setNewMember({...newMember, joinDate: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div className="flex space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    Add Member
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement; 