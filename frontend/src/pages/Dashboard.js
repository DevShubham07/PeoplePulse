import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import SystemStatus from '../components/SystemStatus';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNotification } from '../components/NotificationProvider';
import { employeeAPI, attendanceAPI, performanceAPI } from '../services/api';
import { 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  Calendar,
  Target,
  Award,
  Activity,
  ArrowUpRight,
  User,
  Building,
  CalendarDays,
  DollarSign,
  Download
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError, showInfo } = useNotification();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [currentAttendanceId, setCurrentAttendanceId] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [performance, setPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbActivity, setDbActivity] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [employeesData, attendanceData, performanceData] = await Promise.all([
          employeeAPI.getAllEmployees(),
          attendanceAPI.getAllAttendance(),
          performanceAPI.getAllPerformance()
        ]);
        
        setEmployees(employeesData);
        setAttendance(attendanceData);
        setPerformance(performanceData);
        
        // Check if user is currently clocked in
        const today = new Date().toISOString().split('T')[0];
        const userAttendance = attendanceData.find(a => 
          a.employee?.id === user?.employee?.id && 
          a.date === today && 
          a.clockIn && 
          !a.clockOut
        );
        
        if (userAttendance) {
          setIsClockedIn(true);
          setClockInTime(new Date(userAttendance.clockIn));
          setCurrentAttendanceId(userAttendance.id);
        }
        
        // Add database activity log
        addDbActivity('Data fetched successfully', 'success');
        showInfo('Dashboard data loaded successfully');
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Use mock data if API fails
        setEmployees([]);
        setAttendance([]);
        setPerformance([]);
        addDbActivity('API connection failed - using mock data', 'warning');
        showError('Failed to load dashboard data. Using offline mode.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, showError, showInfo]);

  // Add database activity logging function
  const addDbActivity = (message, type = 'info') => {
    const activity = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    setDbActivity(prev => [activity, ...prev.slice(0, 9)]); // Keep last 10 activities
  };

  const handleClockInOut = async () => {
    try {
      if (isClockedIn) {
        // Clock out
        if (currentAttendanceId) {
          const clockOutData = {
            clockOut: new Date().toISOString()
          };
          await attendanceAPI.updateAttendance(currentAttendanceId, clockOutData);
          addDbActivity('Clock out recorded in database', 'success');
          showSuccess('Successfully clocked out!');
        }
        setIsClockedIn(false);
        setClockInTime(null);
        setCurrentAttendanceId(null);
      } else {
        // Clock in
        const clockInData = {
          employee: { id: user?.employee?.id || 1 },
          clockIn: new Date().toISOString(),
          date: new Date().toISOString().split('T')[0]
        };
        
        const response = await attendanceAPI.createAttendance(clockInData);
        setIsClockedIn(true);
        setClockInTime(new Date());
        setCurrentAttendanceId(response.id);
        addDbActivity('Clock in recorded in database', 'success');
        showSuccess('Successfully clocked in!');
        
        // Refresh attendance data
        const updatedAttendance = await attendanceAPI.getAllAttendance();
        setAttendance(updatedAttendance);
      }
    } catch (error) {
      console.error('Error clocking in/out:', error);
      addDbActivity('Clock in/out failed - API error', 'error');
      showError('Failed to update attendance. Please try again.');
      // Fallback to local state if API fails
      setIsClockedIn(!isClockedIn);
    }
  };

  // Calculate stats from real data
  const calculateStats = () => {
    const totalEmployees = employees.length;
    const activeAttendance = attendance.filter(a => a.clockOut === null).length;
    const avgPerformance = performance.length > 0 
      ? performance.reduce((sum, p) => sum + (p.score / 10), 0) / performance.length 
      : 8.7;

    return {
      attendanceRate: totalEmployees > 0 ? Math.round((activeAttendance / totalEmployees) * 100) : 95,
      performanceScore: avgPerformance.toFixed(1),
      tasksCompleted: `${performance.length}/${performance.length + 5}`,
      teamMembers: totalEmployees || 8
    };
  };

  const stats = calculateStats();

  const recentActivities = [
    {
      id: 1,
      type: 'task',
      message: 'Completed quarterly performance review',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'attendance',
      message: 'Clocked in at 9:00 AM',
      time: '4 hours ago',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'meeting',
      message: 'Team standup meeting',
      time: '1 day ago',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'achievement',
      message: 'Received Employee of the Month award',
      time: '3 days ago',
      icon: Award,
      color: 'text-yellow-600'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Team Meeting',
      time: '10:00 AM',
      date: 'Today',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Performance Review',
      time: '2:00 PM',
      date: 'Tomorrow',
      type: 'review'
    },
    {
      id: 3,
      title: 'Training Session',
      time: '11:00 AM',
      date: 'Friday',
      type: 'training'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50">
        <Navigation />
        <div className="lg:pl-64">
          <LoadingSpinner fullScreen text="Loading dashboard..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <Navigation />
      
      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-white border-b border-secondary-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-secondary-900">Dashboard</h1>
              <p className="text-sm sm:text-base text-secondary-600">Welcome back, {user?.employee?.name || user?.username}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="text-left sm:text-right">
                <p className="text-xs sm:text-sm text-secondary-500">Current Time</p>
                <p className="text-base sm:text-lg font-semibold text-secondary-900">
                  {currentTime.toLocaleTimeString()}
                </p>
                {isClockedIn && clockInTime && (
                  <p className="text-xs text-green-600">
                    Clocked in: {clockInTime.toLocaleTimeString()}
                  </p>
                )}
              </div>
              <button
                onClick={handleClockInOut}
                className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isClockedIn
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {isClockedIn ? 'Clock Out' : 'Clock In'}
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Employee Profile Card */}
          <div className="card mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-secondary-900">
                  {user?.employee?.name || user?.username}
                </h2>
                <p className="text-secondary-600">{user?.employee?.designation}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-secondary-500">
                  <div className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>{user?.employee?.department}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CalendarDays className="w-4 h-4" />
                    <span>Joined {user?.employee?.joinDate}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-secondary-500">Employee ID</p>
                <p className="text-lg font-semibold text-secondary-900">#{user?.employee?.id || user?.id}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Attendance Rate</p>
                  <p className="text-2xl font-bold text-secondary-900 mt-1">{stats.attendanceRate}%</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600 ml-1">+2.5%</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-100">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Performance Score</p>
                  <p className="text-2xl font-bold text-secondary-900 mt-1">{stats.performanceScore}/10</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600 ml-1">+0.3</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Tasks Completed</p>
                  <p className="text-2xl font-bold text-secondary-900 mt-1">{stats.tasksCompleted}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600 ml-1">+3</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-100">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Team Members</p>
                  <p className="text-2xl font-bold text-secondary-900 mt-1">{stats.teamMembers}</p>
                  <div className="flex items-center mt-2">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600 ml-1">+1</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-orange-100">
                  <User className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* Recent Activities */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary-900">Recent Activities</h3>
                <Activity className="w-5 h-5 text-secondary-400" />
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-secondary-100`}>
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900">{activity.message}</p>
                        <p className="text-xs text-secondary-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Real-time Database Activity */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary-900">Database Activity</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">Live</span>
                </div>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {dbActivity.length > 0 ? (
                  dbActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-2 bg-secondary-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'success' ? 'bg-green-500' :
                        activity.type === 'error' ? 'bg-red-500' :
                        activity.type === 'warning' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900">{activity.message}</p>
                        <p className="text-xs text-secondary-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-secondary-500">No database activity yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* System Status */}
            <SystemStatus />

            {/* Upcoming Events */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary-900">Upcoming Events</h3>
                <Calendar className="w-5 h-5 text-secondary-400" />
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                    <div>
                      <p className="font-medium text-secondary-900">{event.title}</p>
                      <p className="text-sm text-secondary-500">{event.date} at {event.time}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'meeting' ? 'bg-blue-100 text-blue-700' :
                      event.type === 'review' ? 'bg-purple-100 text-purple-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {event.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card mt-8">
            <h3 className="text-lg font-semibold text-secondary-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <button 
                onClick={() => navigate('/team')}
                className="flex flex-col items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200"
              >
                <Clock className="w-6 h-6 text-primary-600 mb-2" />
                <span className="text-sm font-medium text-primary-700">View Schedule</span>
              </button>
              <button 
                onClick={() => navigate('/hierarchy')}
                className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
              >
                <Target className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-green-700">Set Goals</span>
              </button>
              <button 
                onClick={() => navigate('/payment')}
                className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
              >
                <DollarSign className="w-6 h-6 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-purple-700">View Payroll</span>
              </button>
              <button 
                onClick={() => navigate('/team')}
                className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200"
              >
                <User className="w-6 h-6 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-orange-700">Team Directory</span>
              </button>
            </div>
          </div>

          {/* Download Section */}
          <div className="card mt-8">
            <h3 className="text-lg font-semibold text-secondary-900 mb-6">Downloads</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button 
                onClick={() => {
                  const data = {
                    employee: user?.employee?.name || user?.username,
                    date: new Date().toISOString().split('T')[0],
                    attendance: stats.attendanceRate,
                    performance: stats.performanceScore
                  };
                  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'employee-report.json';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
              >
                <Download className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-700">Download Report</span>
              </button>
              <button 
                onClick={() => {
                  const csvContent = `Name,Department,Attendance,Performance\n${user?.employee?.name || user?.username},${user?.employee?.department || 'N/A'},${stats.attendanceRate}%,${stats.performanceScore}/10`;
                  const blob = new Blob([csvContent], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'employee-data.csv';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
              >
                <Download className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-700">Export CSV</span>
              </button>
              <button 
                onClick={() => {
                  const pdfContent = `
                    Employee Report
                    ===============
                    Name: ${user?.employee?.name || user?.username}
                    Department: ${user?.employee?.department || 'N/A'}
                    Attendance: ${stats.attendanceRate}%
                    Performance: ${stats.performanceScore}/10
                    Date: ${new Date().toLocaleDateString()}
                  `;
                  const blob = new Blob([pdfContent], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'employee-report.txt';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
              >
                <Download className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-700">Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 