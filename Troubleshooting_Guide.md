# 🚨 Troubleshooting Guide - PeoplePulse

## 📋 Table of Contents

1. [Common Issues](#common-issues)
2. [Frontend Issues](#frontend-issues)
3. [Backend Issues](#backend-issues)
4. [Database Issues](#database-issues)
5. [Deployment Issues](#deployment-issues)
6. [Performance Issues](#performance-issues)

---

## 🔍 Common Issues

### 1. CORS Errors
**Problem:** `Access to fetch at '...' has been blocked by CORS policy`

**Solution:**
```java
// Backend: Update SecurityConfig.java
@CrossOrigin(origins = {"http://localhost:3000", "https://devshubham07.github.io"})
```

### 2. 404 Errors on GitHub Pages
**Problem:** React routes return 404 on GitHub Pages

**Solution:**
```jsx
// Frontend: Update App.js
<Router basename="/PeoplePulse">
```

### 3. Database Connection Failed
**Problem:** `Connection refused` or `Authentication failed`

**Solution:**
```properties
# Check environment variables
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

---

## ⚛️ Frontend Issues

### 1. Build Failures
**Problem:** `npm run build` fails

**Solutions:**
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 18+
```

### 2. Routing Issues
**Problem:** Links don't work or show 404

**Solutions:**
```jsx
// Use Link component
import { Link } from 'react-router-dom';
<Link to="/dashboard">Dashboard</Link>

// Use navigate for programmatic navigation
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/dashboard');
```

### 3. API Calls Failing
**Problem:** Network errors or timeouts

**Solutions:**
```javascript
// Check API URL
const API_BASE_URL = 'https://peoplepulse-bua7.onrender.com/api';

// Add error handling
try {
  const response = await fetch(`${API_BASE_URL}/employees`);
  if (!response.ok) throw new Error('API call failed');
  const data = await response.json();
} catch (error) {
  console.error('API Error:', error);
}
```

---

## 🔧 Backend Issues

### 1. Application Won't Start
**Problem:** Spring Boot fails to start

**Solutions:**
```bash
# Check Java version
java -version  # Should be 17+

# Check port availability
lsof -i :8080

# Check database connection
./mvnw spring-boot:run -Dspring.profiles.active=dev
```

### 2. JPA/Hibernate Errors
**Problem:** `Table doesn't exist` or `Column not found`

**Solutions:**
```properties
# Update application.properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

### 3. Security Configuration Issues
**Problem:** Authentication fails or CORS errors

**Solutions:**
```java
// Update SecurityConfig.java
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .authorizeHttpRequests()
            .anyRequest().permitAll();
        return http.build();
    }
}
```

---

## 🗄️ Database Issues

### 1. Connection Timeout
**Problem:** Database connection times out

**Solutions:**
```properties
# Add connection pool settings
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
```

### 2. Query Performance Issues
**Problem:** Slow database queries

**Solutions:**
```sql
-- Add indexes
CREATE INDEX idx_employees_department ON employees(department);
CREATE INDEX idx_attendance_employee_date ON attendance(employee_id, date);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM employees WHERE department = 'ENGINEERING';
```

### 3. Data Integrity Issues
**Problem:** Foreign key violations or constraint errors

**Solutions:**
```sql
-- Check foreign key constraints
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE constraint_type = 'FOREIGN KEY';
```

---

## 🚀 Deployment Issues

### 1. GitHub Pages Not Updating
**Problem:** Changes not reflected on live site

**Solutions:**
```bash
# Force rebuild and deploy
cd frontend
npm run build
npm run deploy

# Check GitHub Actions
# Go to repository → Actions tab
```

### 2. Render Deployment Fails
**Problem:** Backend deployment fails on Render

**Solutions:**
```yaml
# Check render.yaml
services:
  - type: web
    name: peoplepulse-backend
    env: java
    buildCommand: cd backend && ./mvnw clean install
    startCommand: cd backend && java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### 3. Environment Variables Missing
**Problem:** Application can't find environment variables

**Solutions:**
```bash
# Check Render environment variables
# Go to Render dashboard → Your service → Environment

# Required variables:
SPRING_PROFILES_ACTIVE=production
DATABASE_URL=postgresql://...
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

---

## ⚡ Performance Issues

### 1. Slow Page Load
**Problem:** Frontend takes too long to load

**Solutions:**
```javascript
// Code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Image optimization
<img src={image} loading="lazy" alt="description" />

// Bundle analysis
npm install --save-dev webpack-bundle-analyzer
```

### 2. API Response Time
**Problem:** Backend API calls are slow

**Solutions:**
```java
// Add caching
@Cacheable("employees")
public List<Employee> getAllEmployees() {
    return employeeRepository.findAll();
}

// Database optimization
@Query("SELECT e FROM Employee e WHERE e.department = :dept")
List<Employee> findByDepartment(@Param("dept") Department dept);
```

### 3. Database Performance
**Problem:** Database queries are slow

**Solutions:**
```sql
-- Add composite indexes
CREATE INDEX idx_employees_dept_role ON employees(department, role);

-- Use pagination
SELECT * FROM employees LIMIT 20 OFFSET 0;

-- Optimize queries
SELECT e.name, d.name as dept_name 
FROM employees e 
JOIN departments d ON e.department_id = d.id;
```

---

## 🔧 Debugging Tools

### 1. Frontend Debugging
```javascript
// Browser Developer Tools
console.log('Debug info:', data);
debugger; // Breakpoint

// React Developer Tools
// Install browser extension for React debugging
```

### 2. Backend Debugging
```java
// Add logging
@Slf4j
public class EmployeeService {
    public Employee createEmployee(Employee employee) {
        log.info("Creating employee: {}", employee.getEmail());
        // ... business logic
        log.info("Employee created with ID: {}", savedEmployee.getId());
        return savedEmployee;
    }
}
```

### 3. Database Debugging
```sql
-- Enable query logging
SET log_statement = 'all';
SET log_min_duration_statement = 1000;

-- Check slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC;
```

---

## 📞 Getting Help

### 1. Check Logs
- **Frontend:** Browser console
- **Backend:** Render logs or local console
- **Database:** PostgreSQL logs

### 2. Common Commands
```bash
# Frontend
npm start          # Start development server
npm run build      # Build for production
npm run deploy     # Deploy to GitHub Pages

# Backend
./mvnw spring-boot:run    # Start Spring Boot
./mvnw test              # Run tests
./mvnw clean install     # Clean build

# Database
psql -h localhost -U username -d peoplepulse  # Connect to database
pg_dump -h localhost -U username -d peoplepulse > backup.sql  # Backup
```

### 3. Resources
- **GitHub Issues:** Create issue in repository
- **Stack Overflow:** Search for similar problems
- **Documentation:** Check specific guide files
- **Community:** Ask in relevant forums

---

## 🚀 Prevention Tips

### 1. Development Best Practices
- **Test locally** before deploying
- **Use version control** for all changes
- **Follow coding standards** and conventions
- **Document changes** and decisions

### 2. Monitoring
- **Set up alerts** for critical issues
- **Monitor performance** regularly
- **Keep dependencies** updated
- **Backup data** regularly

### 3. Security
- **Never commit** sensitive data
- **Use environment variables** for secrets
- **Validate inputs** on both frontend and backend
- **Keep security patches** updated

---

**This guide covers common troubleshooting scenarios for PeoplePulse.**
