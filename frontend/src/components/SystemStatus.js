import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Server, 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';

const SystemStatus = () => {
  const [systemStats, setSystemStats] = useState({
    databaseStatus: 'connected',
    apiStatus: 'online',
    activeUsers: 0,
    totalRequests: 0,
    responseTime: 0,
    uptime: '99.9%'
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simulate real-time system monitoring
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        ...prev,
        activeUsers: Math.floor(Math.random() * 20) + 5, // Reduced range
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 2), // Reduced increment
        responseTime: Math.floor(Math.random() * 30) + 20 // Reduced range
      }));

      // Add random activity
      const activities = [
        'Database query executed',
        'User authentication successful',
        'Attendance record updated',
        'Performance data synchronized',
        'Employee profile accessed',
        'API endpoint called',
        'Data backup completed',
        'System health check passed'
      ];

      const newActivity = {
        id: Date.now(),
        message: activities[Math.floor(Math.random() * activities.length)],
        timestamp: new Date().toLocaleTimeString(),
        type: Math.random() > 0.1 ? 'success' : 'info'
      };

      setRecentActivity(prev => [newActivity, ...prev.slice(0, 7)]);
    }, 8000); // Reduced frequency from 3s to 8s

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
      case 'online':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
      case 'online':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-secondary-900">System Status</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-600 font-medium">Live</span>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-secondary-50 rounded-lg">
          <Database className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <p className="text-xs text-secondary-500">Database</p>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemStats.databaseStatus)}`}>
            {getStatusIcon(systemStats.databaseStatus)}
            <span className="ml-1">Connected</span>
          </div>
        </div>

        <div className="text-center p-3 bg-secondary-50 rounded-lg">
          <Server className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-xs text-secondary-500">API Server</p>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(systemStats.apiStatus)}`}>
            {getStatusIcon(systemStats.apiStatus)}
            <span className="ml-1">Online</span>
          </div>
        </div>

        <div className="text-center p-3 bg-secondary-50 rounded-lg">
          <Users className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <p className="text-xs text-secondary-500">Active Users</p>
          <p className="text-lg font-semibold text-secondary-900">{systemStats.activeUsers}</p>
        </div>

        <div className="text-center p-3 bg-secondary-50 rounded-lg">
          <TrendingUp className="w-5 h-5 text-orange-600 mx-auto mb-1" />
          <p className="text-xs text-secondary-500">Response Time</p>
          <p className="text-lg font-semibold text-secondary-900">{systemStats.responseTime}ms</p>
        </div>
      </div>

      {/* Recent System Activity */}
      <div>
        <h4 className="text-sm font-medium text-secondary-700 mb-3">Recent Activity</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {recentActivity.length > 0 ? (
            recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-2 bg-secondary-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-500' :
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
              <p className="text-sm text-secondary-500">No recent activity</p>
            </div>
          )}
        </div>
      </div>

      {/* System Uptime */}
      <div className="mt-4 pt-4 border-t border-secondary-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-secondary-400" />
            <span className="text-sm text-secondary-600">System Uptime</span>
          </div>
          <span className="text-sm font-semibold text-green-600">{systemStats.uptime}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-secondary-600">Total Requests</span>
          <span className="text-sm font-semibold text-secondary-900">{systemStats.totalRequests.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
