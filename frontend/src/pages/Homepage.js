import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { 
  Users, 
  TrendingUp, 
  Shield, 
  Clock, 
  ArrowRight,
  Building2
} from 'lucide-react';

const Homepage = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Management",
      description: "Efficiently manage your team with comprehensive employee profiles and performance tracking."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Track employee performance with detailed analytics and actionable insights."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Attendance Tracking",
      description: "Automated attendance tracking with clock-in/out functionality and reporting."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Platform",
      description: "Enterprise-grade security with role-based access control and data protection."
    }
  ];

  const stats = [
    { number: "500+", label: "Employees" },
    { number: "50+", label: "Departments" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-secondary-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-secondary-900">PeoplePulse</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="btn-secondary">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-secondary-900 leading-tight">
                  Modern Employee
                  <span className="text-primary-600 block">Management</span>
                </h1>
                <p className="text-xl text-secondary-600 max-w-2xl">
                  Streamline your workforce management with our comprehensive platform. 
                  Track performance, manage teams, and drive productivity with ease.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="btn-primary text-lg px-8 py-3 inline-flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <button 
                  onClick={() => {
                    // Create a demo video modal
                    const modal = document.createElement('div');
                    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
                    modal.innerHTML = `
                      <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
                        <div class="flex items-center justify-between mb-4">
                          <h3 class="text-xl font-semibold">PeoplePulse Demo</h3>
                          <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-gray-500 hover:text-gray-700">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                        <div class="bg-gray-100 rounded-lg p-8 text-center">
                          <div class="text-6xl mb-4">🎥</div>
                          <h4 class="text-lg font-semibold mb-2">Interactive Demo</h4>
                          <p class="text-gray-600 mb-4">Experience the full features of PeoplePulse</p>
                          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                            <div class="bg-white p-4 rounded-lg">
                              <div class="text-2xl mb-2">👥</div>
                              <h5 class="font-semibold">Team Management</h5>
                              <p class="text-sm text-gray-600">Manage employees, view profiles, track performance</p>
                            </div>
                            <div class="bg-white p-4 rounded-lg">
                              <div class="text-2xl mb-2">📊</div>
                              <h5 class="font-semibold">Analytics Dashboard</h5>
                              <p class="text-sm text-gray-600">Real-time insights and performance metrics</p>
                            </div>
                            <div class="bg-white p-4 rounded-lg">
                              <div class="text-2xl mb-2">💰</div>
                              <h5 class="font-semibold">Payment Management</h5>
                              <p class="text-sm text-gray-600">Salary tracking and benefits management</p>
                            </div>
                          </div>
                          <div class="mt-6">
                            <a href="/login" class="btn-primary">Try It Now</a>
                          </div>
                        </div>
                      </div>
                    `;
                    document.body.appendChild(modal);
                  }}
                  className="btn-secondary text-lg px-8 py-3"
                >
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900">Team Overview</p>
                      <p className="text-sm text-secondary-500">Engineering Department</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary-600">24</p>
                      <p className="text-sm text-secondary-500">Members</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">92%</p>
                      <p className="text-sm text-secondary-500">Performance</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">15</p>
                      <p className="text-sm text-secondary-500">Projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-600">{stat.number}</p>
                <p className="text-secondary-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Everything you need to manage your team
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Comprehensive tools designed to streamline your employee management process
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                <div className="text-primary-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your workplace?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using PeoplePulse to manage their teams effectively.
          </p>
          <Link to="/login" className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-primary-50 transition-colors duration-200 inline-flex items-center">
            Start Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage; 