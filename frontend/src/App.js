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
      <Router>
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
