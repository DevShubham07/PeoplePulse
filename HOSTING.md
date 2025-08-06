# 🚀 Hosting Guide for Employee Management System

## ✅ **Current Status: PostgreSQL Working!**

Your backend is successfully running with PostgreSQL:
- **Backend URL:** http://localhost:8080
- **Database:** PostgreSQL (local)
- **API Endpoint:** http://localhost:8080/api/employees ✅

## 📊 **Database Location & Management**

### **Local PostgreSQL Database:**
```
Location: ~/postgres_data/
Database: employee_management
Username: postgres
Password: 12345678
```

### **View Database Data:**
```bash
# Connect to database
export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"
psql -d employee_management -U postgres

# View tables
\dt

# View employees
SELECT * FROM employee;

# View users
SELECT * FROM users;
```

## 🌐 **Hosting Options**

### **1. 🚀 Heroku (Recommended for Beginners)**
**Pros:** Easy setup, free tier, PostgreSQL included
**Cons:** Free tier discontinued, paid plans required

**Deploy:**
```bash
./deploy-heroku.sh
```

**Manual Steps:**
1. Install Heroku CLI: `brew install heroku`
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Add PostgreSQL: `heroku addons:create heroku-postgresql:mini`
5. Deploy: `git push heroku main`

### **2. 🚂 Railway (Modern & Easy)**
**Pros:** Free tier, automatic deployments, PostgreSQL included
**Cons:** Limited free tier

**Deploy:**
```bash
./deploy-railway.sh
```

**Manual Steps:**
1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Deploy: `railway up`

### **3. 🎨 Render (Professional)**
**Pros:** Free tier, automatic deployments, good performance
**Cons:** Free tier limitations

**Deploy:**
```bash
./deploy-render.sh
```

**Manual Steps:**
1. Push code to GitHub
2. Connect repo to Render
3. Render uses `render.yaml` for configuration

### **4. ☁️ AWS (Enterprise)**
**Pros:** Scalable, reliable, full control
**Cons:** Complex setup, costs

**Services:**
- **Backend:** AWS Elastic Beanstalk
- **Database:** AWS RDS PostgreSQL
- **Frontend:** AWS S3 + CloudFront

## 🔧 **Environment Variables for Production**

Create `.env` files for different environments:

### **Backend Environment Variables:**
```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database
SPRING_DATASOURCE_URL=${DATABASE_URL}
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=your_password

# Security
SPRING_SECURITY_USER_NAME=admin
SPRING_SECURITY_USER_PASSWORD=admin123

# CORS
SPRING_WEB_CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### **Frontend Environment Variables:**
```bash
# API URL
REACT_APP_API_URL=https://your-backend-url.com
```

## 📋 **Deployment Checklist**

### **Before Deploying:**
- [ ] Test backend locally with PostgreSQL ✅
- [ ] Test frontend locally ✅
- [ ] Update API URLs in frontend
- [ ] Set environment variables
- [ ] Configure CORS for production domain

### **After Deploying:**
- [ ] Test API endpoints
- [ ] Test frontend functionality
- [ ] Test database connections
- [ ] Monitor logs for errors
- [ ] Set up monitoring/analytics

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **Database Connection Failed:**
   ```bash
   # Check if PostgreSQL is running
   pg_ctl -D ~/postgres_data status
   
   # Start PostgreSQL
   pg_ctl -D ~/postgres_data start
   ```

2. **Port Already in Use:**
   ```bash
   # Kill process on port 8080
   lsof -ti:8080 | xargs kill -9
   ```

3. **CORS Issues:**
   - Update CORS configuration in backend
   - Check frontend API URL

4. **Build Failures:**
   - Check Java version (requires Java 17)
   - Check Node.js version (requires Node 16+)

## 📞 **Support**

### **For Interview Demo:**
- **Local Setup:** Everything working ✅
- **Database:** PostgreSQL with sample data ✅
- **API:** All endpoints functional ✅
- **Frontend:** All features working ✅

### **For Production:**
Choose your preferred hosting platform and run the corresponding deployment script!

## 🎯 **Quick Start for Demo:**

1. **Start Backend:** `cd backend && ./mvnw spring-boot:run`
2. **Start Frontend:** `cd frontend && npm start`
3. **Access:** http://localhost:3000
4. **Login:** admin / admin123

**Database Commands:**
```bash
# View data
psql -d employee_management -U postgres -c "SELECT * FROM employee;"

# Switch between H2 and PostgreSQL
./switch-to-h2.sh
./switch-to-postgres.sh
``` 