import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { 
  Calendar, 
  Download, 
  Eye, 
  EyeOff,
  TrendingUp,
  CreditCard,
  Building2,
  FileText,
  Shield,
  Heart,
  Car,
  Coffee,
  BookOpen,
  Users,
  CheckCircle,
  Info
} from 'lucide-react';

const PaymentManagement = () => {
  const [showSalary, setShowSalary] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  // Mock payment data
  const salaryData = {
    baseSalary: 85000,
    bonus: 12000,
    benefits: 8000,
    totalCompensation: 105000,
    currency: 'USD'
  };

  const paymentHistory = [
    {
      id: 1,
      date: '2024-01-31',
      amount: 7083.33,
      type: 'salary',
      status: 'paid',
      description: 'January 2024 Salary'
    },
    {
      id: 2,
      date: '2024-01-15',
      amount: 1000.00,
      type: 'bonus',
      status: 'paid',
      description: 'Performance Bonus'
    },
    {
      id: 3,
      date: '2023-12-31',
      amount: 7083.33,
      type: 'salary',
      status: 'paid',
      description: 'December 2023 Salary'
    },
    {
      id: 4,
      date: '2023-12-15',
      amount: 500.00,
      type: 'bonus',
      status: 'paid',
      description: 'Holiday Bonus'
    }
  ];

  const benefits = [
    {
      name: 'Health Insurance',
      value: 300,
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Dental Insurance',
      value: 50,
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Vision Insurance',
      value: 25,
      icon: Eye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: '401(k) Match',
      value: 4250,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      name: 'Life Insurance',
      value: 100,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      name: 'Professional Development',
      value: 2000,
      icon: BookOpen,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      name: 'Transportation Allowance',
      value: 150,
      icon: Car,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    },
    {
      name: 'Meal Allowance',
      value: 200,
      icon: Coffee,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    }
  ];

  const taxInfo = {
    federalTax: 18500,
    stateTax: 8500,
    socialSecurity: 6500,
    medicare: 1500,
    totalTaxes: 35000
  };

  const payrollSchedule = [
    { month: 'January', date: '2024-01-31', status: 'paid' },
    { month: 'February', date: '2024-02-29', status: 'pending' },
    { month: 'March', date: '2024-03-31', status: 'pending' },
    { month: 'April', date: '2024-04-30', status: 'pending' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <Navigation />
      
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-white border-b border-secondary-200 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">Payment & Salary Management</h1>
              <p className="text-secondary-600">View your salary, benefits, and payment history</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="btn-secondary text-sm">
                <Download className="w-4 h-4 mr-1" />
                Download Payslip
              </button>
              <button className="btn-primary text-sm">
                <FileText className="w-4 h-4 mr-1" />
                Request Documents
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Salary Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Current Salary */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-secondary-900">Current Salary</h3>
                <button
                  onClick={() => setShowSalary(!showSalary)}
                  className="text-secondary-600 hover:text-secondary-900"
                >
                  {showSalary ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Base Salary</span>
                  <span className="font-semibold">
                    {showSalary ? formatCurrency(salaryData.baseSalary) : '••••••'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Annual Bonus</span>
                  <span className="font-semibold text-green-600">
                    {showSalary ? formatCurrency(salaryData.bonus) : '••••••'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Benefits Value</span>
                  <span className="font-semibold text-blue-600">
                    {showSalary ? formatCurrency(salaryData.benefits) : '••••••'}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-secondary-900">Total Compensation</span>
                    <span className="font-bold text-lg text-primary-600">
                      {showSalary ? formatCurrency(salaryData.totalCompensation) : '••••••'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Information */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Tax Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Federal Tax</span>
                  <span className="font-semibold">{formatCurrency(taxInfo.federalTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">State Tax</span>
                  <span className="font-semibold">{formatCurrency(taxInfo.stateTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Social Security</span>
                  <span className="font-semibold">{formatCurrency(taxInfo.socialSecurity)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Medicare</span>
                  <span className="font-semibold">{formatCurrency(taxInfo.medicare)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-secondary-900">Total Taxes</span>
                    <span className="font-bold text-red-600">{formatCurrency(taxInfo.totalTaxes)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Payment Methods</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                  <Building2 className="w-5 h-5 text-primary-600" />
                  <div className="flex-1">
                    <p className="font-medium text-secondary-900">Primary Bank Account</p>
                    <p className="text-sm text-secondary-600">****1234 - Chase Bank</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                  <CreditCard className="w-5 h-5 text-secondary-600" />
                  <div className="flex-1">
                    <p className="font-medium text-secondary-900">Backup Method</p>
                    <p className="text-sm text-secondary-600">****5678 - Credit Card</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Overview */}
          <div className="card mb-8">
            <h3 className="text-lg font-semibold text-secondary-900 mb-6">Benefits Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-secondary-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${benefit.bgColor}`}>
                      <Icon className={`w-5 h-5 ${benefit.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-secondary-900">{benefit.name}</p>
                      <p className="text-sm font-semibold text-green-600">{formatCurrency(benefit.value)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment History */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary-900">Payment History</h3>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="input-field w-32"
                >
                  <option value="current">Current</option>
                  <option value="last3">Last 3 Months</option>
                  <option value="last6">Last 6 Months</option>
                  <option value="last12">Last 12 Months</option>
                </select>
              </div>
              <div className="space-y-3">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-secondary-900">{payment.description}</p>
                      <p className="text-sm text-secondary-600">{payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-secondary-900">{formatCurrency(payment.amount)}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payroll Schedule */}
            <div className="card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-6">Payroll Schedule</h3>
              <div className="space-y-3">
                {payrollSchedule.map((payroll, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900">{payroll.month} 2024</p>
                        <p className="text-sm text-secondary-600">Due: {payroll.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(payroll.status)}`}>
                      {payroll.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card mt-8">
            <h3 className="text-lg font-semibold text-secondary-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200">
                <Download className="w-6 h-6 text-primary-600 mb-2" />
                <span className="text-sm font-medium text-primary-700">Download Payslip</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                <FileText className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-green-700">Tax Documents</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                <Shield className="w-6 h-6 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-purple-700">Benefits Info</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
                <Users className="w-6 h-6 text-orange-600 mb-2" />
                <span className="text-sm font-medium text-orange-700">Contact HR</span>
              </button>
            </div>
          </div>

          {/* Information Notice */}
          <div className="card mt-8 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Important Information</h4>
                <p className="text-sm text-blue-700">
                  Your salary is processed on the last business day of each month. 
                  Direct deposits typically appear in your account within 1-2 business days. 
                  For any payment-related questions, please contact the HR department.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement; 