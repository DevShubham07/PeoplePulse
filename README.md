# 🚀 PeoplePulse - Employee Management System

A modern, full-stack employee management system built with React frontend and Spring Boot backend.

## 🎯 **Live Demo**

- **Frontend:** https://devshubham07.github.io/PeoplePulse
- **Backend:** https://peoplepulse-backend.onrender.com

## 🛠️ **Tech Stack**

### **Frontend**
- React.js 18.2.0 with Hooks and Context API
- Tailwind CSS with custom animations
- React Router DOM with protected routes
- Lucide Icons for consistent iconography
- Error Boundaries for production-ready error handling
- Real-time notification system

### **Backend**
- Spring Boot 3.1.0 (Java 17)
- Spring Security with JWT authentication
- Spring Data JPA with PostgreSQL
- RESTful API design with comprehensive CRUD operations
- Data initialization with realistic sample data

### **Deployment**
- **Frontend:** GitHub Pages with automatic deployment
- **Backend:** Render with PostgreSQL database
- **CI/CD:** GitHub Actions for automated builds
- **Monitoring:** Real-time system status and database activity tracking

## 🚀 **Quick Start**

### **Local Development**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DevShubham07/PeoplePulse.git
   cd PeoplePulse
   ```

2. **Start Backend:**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

3. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8080

### **Default Login**
- **Username:** `admin`
- **Password:** `admin123`

## 📋 **Features**

- ✅ **Employee Dashboard** - Personalized employee information with real-time data
- ✅ **Team Management** - View and manage team members with advanced filtering
- ✅ **Organizational Hierarchy** - Interactive company structure visualization
- ✅ **Payment Management** - Comprehensive salary and benefits tracking
- ✅ **Attendance Tracking** - Real-time clock in/out with database persistence
- ✅ **Performance Management** - Employee performance metrics and analytics
- ✅ **System Status** - Live database activity monitoring and system health
- ✅ **Responsive Design** - Mobile-first design that works on all devices
- ✅ **Real-time Notifications** - Professional notification system for user feedback
- ✅ **Error Handling** - Comprehensive error boundaries and graceful fallbacks

## 🔧 **Deployment**

For deployment instructions, see [GITHUB_DEPLOYMENT.md](GITHUB_DEPLOYMENT.md)

## 📊 **API Endpoints**

- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/auth/login` - User authentication
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Create attendance record
- `PUT /api/attendance/{id}` - Update attendance record
- `GET /api/performance` - Get performance metrics
- `GET /api/users` - Get all users

## 🆕 **Recent Improvements**

### **Enhanced User Experience**
- ✅ **Real-time Database Activity** - Live monitoring of database operations
- ✅ **Professional Notifications** - Toast notifications for user feedback
- ✅ **Error Boundaries** - Graceful error handling with user-friendly messages
- ✅ **Loading States** - Professional loading indicators throughout the app
- ✅ **Mobile Optimization** - Enhanced mobile responsiveness and touch interactions

### **Technical Enhancements**
- ✅ **Persistent Clock-in System** - Database-backed attendance tracking
- ✅ **Protected Routes** - Secure authentication guards for all pages
- ✅ **Performance Optimizations** - React.memo and optimized re-renders
- ✅ **Rich Sample Data** - 12+ employees with realistic historical data
- ✅ **System Status Dashboard** - Real-time monitoring of API health and performance

### **Production Ready Features**
- ✅ **Comprehensive Error Handling** - Try-catch blocks and fallback mechanisms
- ✅ **Professional UI/UX** - Smooth animations and micro-interactions
- ✅ **Accessibility** - ARIA labels and keyboard navigation support
- ✅ **SEO Optimization** - Meta tags and semantic HTML structure

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 **License**

This project is licensed under the MIT License.

---

**Built with ❤️ by DevShubham07**
