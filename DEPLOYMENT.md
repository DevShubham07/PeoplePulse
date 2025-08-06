# Employee Management System - Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Java 17 JDK
- Node.js 18+ and npm
- PostgreSQL 14+ (optional, H2 is used by default)

### 1. Backend Setup

#### Option A: Using H2 (In-Memory Database) - Default
```bash
cd backend
./mvnw spring-boot:run
```
The backend will start with H2 database on `http://localhost:8080`

#### Option B: Using PostgreSQL
1. Install PostgreSQL:
   ```bash
   ./setup-postgresql.sh
   ```

2. Start backend with PostgreSQL profile:
   ```bash
   cd backend
   ./mvnw spring-boot:run -Dspring.profiles.active=postgres
   ```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will start on `http://localhost:3000`

## 🔧 Configuration

### Database Configuration

#### H2 (Default)
- **URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: `password`
- **Console**: `http://localhost:8080/h2-console`

#### PostgreSQL
- **URL**: `jdbc:postgresql://localhost:5432/employee_management`
- **Username**: `postgres`
- **Password**: `12345678`
- **Port**: `5432`

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/user/{id}` - Get user by ID

#### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `GET /api/employees/manager/{managerId}` - Get employees by manager
- `POST /api/employees` - Create employee
- `DELETE /api/employees/{id}` - Delete employee

#### Attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/{id}` - Get attendance by ID
- `GET /api/attendance/employee/{employeeId}` - Get attendance by employee
- `POST /api/attendance` - Create attendance record
- `DELETE /api/attendance/{id}` - Delete attendance record

#### Performance
- `GET /api/performance` - Get all performance records
- `GET /api/performance/{id}` - Get performance by ID
- `GET /api/performance/employee/{employeeId}` - Get performance by employee
- `POST /api/performance` - Create performance record
- `DELETE /api/performance/{id}` - Delete performance record

## 👤 Default Users

The system comes with sample data including:

1. **Admin User**
   - Username: `admin`
   - Password: `admin123`
   - Role: ADMIN

2. **Employee Users**
   - Username: `john.doe`
   - Password: `password123`
   - Role: EMPLOYEE

   - Username: `sarah.johnson`
   - Password: `password123`
   - Role: EMPLOYEE

   - Username: `michael.chen`
   - Password: `password123`
   - Role: MANAGER

## 🌐 Production Deployment

### Backend Deployment

#### Using Docker
```bash
# Build the JAR
cd backend
./mvnw clean package

# Build Docker image
docker build -t employee-management-backend .

# Run with PostgreSQL
docker run -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=postgres \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://your-db-host:5432/employee_management \
  -e SPRING_DATASOURCE_USERNAME=your-username \
  -e SPRING_DATASOURCE_PASSWORD=your-password \
  employee-management-backend
```

#### Using Cloud Platforms

**Heroku:**
```bash
# Create Heroku app
heroku create your-app-name

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:mini

# Deploy
git push heroku main
```

**AWS Elastic Beanstalk:**
```bash
# Package the application
./mvnw clean package

# Deploy to Elastic Beanstalk
eb deploy
```

### Frontend Deployment

#### Using Netlify
```bash
# Build the React app
cd frontend
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=build
```

#### Using Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

## 🔒 Security Considerations

### For Production
1. **Change default passwords**
2. **Use environment variables for sensitive data**
3. **Enable HTTPS**
4. **Configure CORS properly**
5. **Use proper authentication (JWT, OAuth)**
6. **Implement rate limiting**
7. **Add input validation**
8. **Use prepared statements for SQL**

### Environment Variables
```bash
# Backend
SPRING_DATASOURCE_URL=jdbc:postgresql://your-db-host:5432/your-db
SPRING_DATASOURCE_USERNAME=your-username
SPRING_DATASOURCE_PASSWORD=your-password
SPRING_SECURITY_USER_NAME=admin
SPRING_SECURITY_USER_PASSWORD=secure-password

# Frontend
REACT_APP_API_BASE_URL=https://your-api-domain.com/api
```

## 📊 Monitoring and Logging

### Backend Monitoring
- **Actuator endpoints**: `http://localhost:8080/actuator`
- **Health check**: `http://localhost:8080/actuator/health`
- **Metrics**: `http://localhost:8080/actuator/metrics`

### Database Monitoring
- **H2 Console**: `http://localhost:8080/h2-console`
- **PostgreSQL**: Use pgAdmin or psql

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 8080
   lsof -ti:8080 | xargs kill -9
   ```

2. **Database connection failed**
   - Check if PostgreSQL is running: `brew services list`
   - Verify database exists: `psql -l`
   - Check connection: `psql -U postgres -d employee_management`

3. **Frontend build errors**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **CORS errors**
   - Ensure backend CORS is configured for your frontend domain
   - Check if frontend is making requests to correct backend URL

## 📝 API Documentation

The API follows RESTful conventions:

- **GET** - Retrieve data
- **POST** - Create new data
- **PUT** - Update existing data
- **DELETE** - Remove data

All responses are in JSON format with appropriate HTTP status codes.

## 🔄 Database Migrations

For production, consider using Flyway or Liquibase for database migrations:

```xml
<!-- Add to pom.xml -->
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
</dependency>
```

## 📈 Performance Optimization

1. **Database Indexing**
2. **Connection Pooling** (HikariCP is already configured)
3. **Caching** (Redis/Memcached)
4. **CDN for static assets**
5. **Load balancing for high traffic**

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Integration Tests
```bash
# Run with test profile
./mvnw spring-boot:run -Dspring.profiles.active=test
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the logs in the console
3. Verify all prerequisites are installed
4. Ensure all services are running

---

**Happy Coding! 🎉** 