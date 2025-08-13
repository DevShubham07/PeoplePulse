# ⚛️ Frontend Development Guide - React.js

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [React Application Setup](#react-application-setup)
3. [Component Development](#component-development)
4. [State Management](#state-management)
5. [Routing](#routing)
6. [API Integration](#api-integration)
7. [Styling with Tailwind CSS](#styling-with-tailwind-css)
8. [Best Practices](#best-practices)
9. [Performance Optimization](#performance-optimization)

---

## 🏗️ Project Structure

```
frontend/
├── public/
│   ├── index.html              # Main HTML file
│   ├── favicon.ico             # App icon
│   └── manifest.json           # PWA manifest
├── src/
│   ├── components/
│   │   ├── Navigation.js       # Navigation component
│   │   └── ...                 # Other components
│   ├── contexts/
│   │   └── AuthContext.js      # Authentication context
│   ├── pages/
│   │   ├── Login.js            # Login page
│   │   ├── Dashboard.js        # Dashboard page
│   │   ├── TeamManagement.js   # Team management page
│   │   ├── Hierarchy.js        # Hierarchy page
│   │   ├── CompanyTree.js      # Company tree page
│   │   └── PaymentManagement.js # Payment management page
│   ├── services/
│   │   └── api.js              # API service functions
│   ├── App.js                  # Main app component
│   ├── index.js                # App entry point
│   └── index.css               # Global styles
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
└── postcss.config.js           # PostCSS configuration
```

---

## ⚙️ React Application Setup

### Package.json Dependencies
```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://devshubham07.github.io/PeoplePulse/",
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.1",
    "lucide-react": "^0.263.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "gh-pages": "^6.3.0",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.3.2"
  }
}
```

### Main App Component
```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TeamManagement from './pages/TeamManagement';
import Hierarchy from './pages/Hierarchy';
import CompanyTree from './pages/CompanyTree';
import PaymentManagement from './pages/PaymentManagement';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router basename="/PeoplePulse">
        <div className="min-h-screen bg-secondary-50">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/team" element={<TeamManagement />} />
            <Route path="/hierarchy" element={<Hierarchy />} />
            <Route path="/company-tree" element={<CompanyTree />} />
            <Route path="/payment" element={<PaymentManagement />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
```

**Key React Concepts:**
- **JSX**: JavaScript XML for component structure
- **Components**: Reusable UI building blocks
- **Props**: Data passed from parent to child components
- **State**: Component's internal data
- **Hooks**: Functions that let you use state and lifecycle features
- **Context**: Global state management
- **Routing**: Navigation between different pages

---

## 🧩 Component Development

### Functional Component Structure
```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ComponentName = ({ prop1, prop2 }) => {
  // State declarations
  const [state1, setState1] = useState(initialValue);
  const [state2, setState2] = useState(initialValue);
  
  // Hooks
  const navigate = useNavigate();
  
  // Effects
  useEffect(() => {
    // Side effects (API calls, subscriptions, etc.)
    return () => {
      // Cleanup function
    };
  }, [dependencies]);
  
  // Event handlers
  const handleClick = () => {
    // Handle click event
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };
  
  // Render
  return (
    <div className="container">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

### Login Component
```jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Building2, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const Login = () => {
  // State management
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Hooks
  const { login } = useAuth();
  const navigate = useNavigate();

  // Event handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    console.log('Attempting login with:', formData);

    try {
      const result = await login(formData.username, formData.password);
      console.log('Login result:', result);
      
      if (result.success) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="w-10 h-10 text-primary-600" />
            <span className="text-2xl font-bold text-secondary-900">PeoplePulse</span>
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Welcome back</h1>
          <p className="text-secondary-600">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error/Success Messages */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}
            
            {success && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-700 text-sm">{success}</span>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-secondary-700 mb-2">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your username or email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-secondary-400 hover:text-secondary-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-secondary-400 hover:text-secondary-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
            <p className="text-sm text-secondary-600 mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Username:</strong> admin</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
```

**React Hooks Explained:**
- **useState**: Manages component state
- **useEffect**: Handles side effects (API calls, subscriptions)
- **useNavigate**: Programmatic navigation
- **useContext**: Access context values

### Dashboard Component
```jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  User,
  LogOut
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    totalDepartments: 0,
    avgSalary: 0
  });

  useEffect(() => {
    // Fetch dashboard statistics
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // API call to get statistics
      const response = await fetch('/api/dashboard/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-secondary-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-secondary-600">Welcome, {user?.employee?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-900"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Total Employees</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.totalEmployees}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Active Employees</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.activeEmployees}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Departments</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.totalDepartments}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-secondary-600">Avg Salary</p>
                <p className="text-2xl font-bold text-secondary-900">${stats.avgSalary}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Activity items */}
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-secondary-600">New employee John Doe joined Engineering team</span>
              <span className="text-sm text-secondary-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-secondary-600">Performance review completed for Sarah Smith</span>
              <span className="text-sm text-secondary-400">1 day ago</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
```

---

## 🗃️ State Management

### Authentication Context
```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      console.log('AuthContext: Attempting login with:', username);
      const response = await authAPI.login(username, password);
      console.log('AuthContext: API response:', response);
      
      if (response.success) {
        // Create a mock employee object for the user
        const userWithEmployee = {
          ...response.user,
          employee: {
            id: response.user.id,
            name: 'John Doe',
            designation: 'Software Engineer',
            department: 'Engineering',
            joinDate: '2023-01-15'
          }
        };
        
        console.log('AuthContext: Setting user:', userWithEmployee);
        setUser(userWithEmployee);
        localStorage.setItem('user', JSON.stringify(userWithEmployee));
        return { success: true };
      } else {
        console.log('AuthContext: Login failed:', response.message);
        return { success: false, error: response.message || 'Login failed' };
      }
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      return { success: false, error: error.message || 'Network error occurred' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Context API Concepts:**
- **createContext**: Creates a context object
- **Provider**: Wraps components to provide context values
- **useContext**: Hook to consume context values
- **Global State**: Shared state across component tree

---

## 🛣️ Routing

### React Router Setup
```jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// App Routes
function App() {
  return (
    <AuthProvider>
      <Router basename="/PeoplePulse">
        <div className="min-h-screen bg-secondary-50">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/team" 
              element={
                <ProtectedRoute>
                  <TeamManagement />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
```

**Routing Concepts:**
- **BrowserRouter**: HTML5 history API for routing
- **Routes**: Container for route definitions
- **Route**: Individual route configuration
- **Navigate**: Programmatic navigation
- **Protected Routes**: Authentication-based access control

---

## 🌐 API Integration

### API Service Layer
```javascript
const API_BASE_URL = 'https://peoplepulse-bua7.onrender.com/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Authentication API
export const authAPI = {
  login: async (username, password) => {
    console.log('API: Making login request to:', `${API_BASE_URL}/auth/login`);
    console.log('API: Request payload:', { username, password });
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    console.log('API: Response status:', response.status);
    const result = await handleResponse(response);
    console.log('API: Response data:', result);
    return result;
  },

  getUser: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/auth/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },
};

// Employee API
export const employeeAPI = {
  getAllEmployees: async () => {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  getEmployeeById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },

  createEmployee: async (employeeData) => {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });
    return handleResponse(response);
  },

  updateEmployee: async (id, employeeData) => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });
    return handleResponse(response);
  },

  deleteEmployee: async (id) => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  },
};
```

**API Service Best Practices:**
- **Centralized Configuration**: Single API base URL
- **Error Handling**: Consistent error handling across all requests
- **Request/Response Logging**: Debug information for development
- **Type Safety**: Consider using TypeScript for better type safety
- **Interceptors**: Add authentication headers, error handling

---

## 🎨 Styling with Tailwind CSS

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### CSS Classes and Components
```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 
           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 
           transition-colors duration-200;
  }
  
  .btn-secondary {
    @apply bg-secondary-100 text-secondary-700 px-4 py-2 rounded-lg 
           hover:bg-secondary-200 focus:outline-none focus:ring-2 
           focus:ring-secondary-500 focus:ring-offset-2 transition-colors duration-200;
  }
  
  .input-field {
    @apply w-full px-3 py-2 border border-secondary-300 rounded-lg 
           focus:outline-none focus:ring-2 focus:ring-primary-500 
           focus:border-transparent transition-colors duration-200;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-lg p-6 border border-secondary-200;
  }
}
```

**Tailwind CSS Benefits:**
- **Utility-First**: Rapid development with utility classes
- **Responsive**: Built-in responsive design utilities
- **Customizable**: Easy to extend and customize
- **Performance**: Only includes used CSS in production
- **Consistency**: Design system consistency across components

---

## 📋 Best Practices

### 1. Component Structure
- **Single Responsibility**: Each component should have one clear purpose
- **Props Validation**: Use PropTypes or TypeScript for type checking
- **Default Props**: Provide sensible defaults for optional props
- **Component Composition**: Build complex UIs from simple components

### 2. State Management
- **Local State**: Use useState for component-specific state
- **Global State**: Use Context API for shared state
- **State Updates**: Always use setter functions, never mutate state directly
- **State Lifting**: Lift state up to the nearest common ancestor

### 3. Performance Optimization
```jsx
// Memoization for expensive calculations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// Memoization for components
const MemoizedComponent = React.memo(({ prop1, prop2 }) => {
  return <div>{prop1} {prop2}</div>;
});

// Callback memoization
const handleClick = useCallback(() => {
  console.log('Button clicked');
}, []);
```

### 4. Error Boundaries
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

### 5. Code Organization
- **File Structure**: Organize files by feature or type
- **Naming Conventions**: Use consistent naming for components, files, and functions
- **Import Organization**: Group imports by type (React, third-party, local)
- **Comments**: Add comments for complex logic or business rules

---

## 🚀 Performance Optimization

### 1. Code Splitting
```jsx
import React, { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const TeamManagement = lazy(() => import('./pages/TeamManagement'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/team" element={<TeamManagement />} />
      </Routes>
    </Suspense>
  );
}
```

### 2. Bundle Optimization
- **Tree Shaking**: Remove unused code
- **Dynamic Imports**: Load components on demand
- **Image Optimization**: Use WebP format and lazy loading
- **Caching**: Implement proper caching strategies

### 3. Rendering Optimization
- **Virtual Scrolling**: For large lists
- **Debouncing**: For search inputs
- **Throttling**: For scroll events
- **Memoization**: For expensive calculations

---

## 🚀 Next Steps

1. **Read the [Backend Development Guide](./Backend_Development_Guide.md)** for Spring Boot implementation
2. **Check the [Database Design Guide](./Database_Design_Guide.md)** for schema details
3. **Review the [Deployment Guide](./Deployment_Guide.md)** for production deployment
4. **Explore the [Testing Guide](./Testing_Guide.md)** for testing strategies

---

**This guide covers the complete React.js frontend development for PeoplePulse.**
