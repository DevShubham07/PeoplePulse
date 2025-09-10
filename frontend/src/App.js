import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TeamManagement from './pages/TeamManagement';
import Hierarchy from './pages/Hierarchy';
import CompanyTree from './pages/CompanyTree';
import PaymentManagement from './pages/PaymentManagement';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import { NotificationProvider } from './components/NotificationProvider';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner fullScreen text="Authenticating..." />;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <AuthProvider>
          <Router basename="/PeoplePulse">
            <div className="min-h-screen bg-secondary-50">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/team" element={
                  <ProtectedRoute>
                    <TeamManagement />
                  </ProtectedRoute>
                } />
                <Route path="/hierarchy" element={
                  <ProtectedRoute>
                    <Hierarchy />
                  </ProtectedRoute>
                } />
                <Route path="/company-tree" element={
                  <ProtectedRoute>
                    <CompanyTree />
                  </ProtectedRoute>
                } />
                <Route path="/payment" element={
                  <ProtectedRoute>
                    <PaymentManagement />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
