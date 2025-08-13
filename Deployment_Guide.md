# 🚀 Deployment Guide - GitHub Pages + Render

## 📋 Table of Contents

1. [Deployment Strategy](#deployment-strategy)
2. [Frontend Deployment (GitHub Pages)](#frontend-deployment-github-pages)
3. [Backend Deployment (Render)](#backend-deployment-render)
4. [Database Setup](#database-setup)
5. [Environment Configuration](#environment-configuration)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Deployment Strategy

### Architecture Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│ GitHub Pages    │◄──►│     Render      │◄──►│ Render PostgreSQL│
│                 │    │                 │    │                 │
│ • Static Files  │    │ • Spring Boot   │    │ • Managed DB    │
│ • React App     │    │ • REST APIs     │    │ • Auto Backups  │
│ • Free Hosting  │    │ • Auto Scaling  │    │ • SSL Enabled   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Choices
| Component | Platform | Why Chosen | Cost |
|-----------|----------|------------|------|
| **Frontend** | GitHub Pages | Free, Easy CI/CD, Custom domain | $0 |
| **Backend** | Render | Free tier, Auto-scaling, Easy setup | $0 (Free tier) |
| **Database** | Render PostgreSQL | Managed, Auto-backups, SSL | $0 (Free tier) |

---

## 🌐 Frontend Deployment (GitHub Pages)

### 1. GitHub Pages Setup

#### Enable GitHub Pages
1. **Go to your repository:** https://github.com/DevShubham07/PeoplePulse
2. **Click Settings** → **Pages**
3. **Under Source, select:** "Deploy from a branch"
4. **Select Branch:** `gh-pages`
5. **Click Save**

#### Configure Homepage URL
```json
// package.json
{
  "homepage": "https://devshubham07.github.io/PeoplePulse/",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

#### Install gh-pages Package
```bash
cd frontend
npm install --save-dev gh-pages
```

### 2. Build Configuration

#### React Router Basename
```jsx
// App.js
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router basename="/PeoplePulse">
      {/* Your routes */}
    </Router>
  );
}
```

#### Tailwind CSS Configuration
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
    },
  },
  plugins: [],
}
```

### 3. Deployment Process

#### Manual Deployment
```bash
# Build and deploy
cd frontend
npm run build
npm run deploy
```

#### GitHub Actions (Automated)
```yaml
# .github/workflows/deploy-frontend.yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
    paths:
      - 'frontend/**'

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Build project
        run: |
          cd frontend
          npm install
          npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/build
```

### 4. Custom Domain (Optional)
```bash
# Add CNAME file to public folder
echo "yourdomain.com" > frontend/public/CNAME
```

---

## ⚙️ Backend Deployment (Render)

### 1. Render Account Setup

#### Create Render Account
1. **Go to:** https://render.com
2. **Sign up with GitHub**
3. **Verify email address**

#### Create New Web Service
1. **Click "New"** → **"Web Service"**
2. **Connect GitHub repository**
3. **Select repository:** DevShubham07/PeoplePulse

### 2. Service Configuration

#### Build Settings
```
Build Command: cd backend && ./mvnw clean install
Start Command: cd backend && java -jar target/backend-0.0.1-SNAPSHOT.jar
```

#### Environment Variables
```
SPRING_PROFILES_ACTIVE=production
DATABASE_URL=postgresql://username:password@host:port/database
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
```

### 3. Render Configuration File

#### render.yaml
```yaml
services:
  - type: web
    name: peoplepulse-backend
    env: java
    buildCommand: cd backend && ./mvnw clean install
    startCommand: cd backend && java -jar target/backend-0.0.1-SNAPSHOT.jar
    envVars:
      - key: SPRING_PROFILES_ACTIVE
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: peoplepulse-db
          property: connectionString
      - key: DB_USERNAME
        fromDatabase:
          name: peoplepulse-db
          property: username
      - key: DB_PASSWORD
        fromDatabase:
          name: peoplepulse-db
          property: password

databases:
  - name: peoplepulse-db
    databaseName: peoplepulse
    user: peoplepulse_user
```

### 4. Production Configuration

#### application-prod.properties
```properties
# Production Database Configuration
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

# JPA Configuration
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Server Configuration
server.port=${PORT:8080}
server.servlet.context-path=/api

# Security Configuration
spring.security.user.name=${ADMIN_USERNAME:admin}
spring.security.user.password=${ADMIN_PASSWORD:admin123}

# Logging
logging.level.com.dev.backend=INFO
logging.level.org.springframework.security=WARN
```

---

## 🗄️ Database Setup

### 1. Render PostgreSQL

#### Create Database
1. **In Render dashboard:** Click "New" → "PostgreSQL"
2. **Name:** peoplepulse-db
3. **Database:** peoplepulse
4. **User:** peoplepulse_user
5. **Region:** Choose closest to your users

#### Database Configuration
```sql
-- Create database (if needed)
CREATE DATABASE peoplepulse;

-- Create user (if needed)
CREATE USER peoplepulse_user WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE peoplepulse TO peoplepulse_user;
```

### 2. Connection String Format
```
postgresql://username:password@host:port/database
```

### 3. Environment Variables
```bash
DATABASE_URL=postgresql://peoplepulse_user:password@host:5432/peoplepulse
DB_USERNAME=peoplepulse_user
DB_PASSWORD=your_secure_password
```

---

## 🔧 Environment Configuration

### 1. Frontend Environment

#### API Configuration
```javascript
// src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://peoplepulse-bua7.onrender.com/api';
```

#### Environment Variables
```bash
# .env.production
REACT_APP_API_URL=https://peoplepulse-bua7.onrender.com/api
REACT_APP_ENVIRONMENT=production
```

### 2. Backend Environment

#### Production Profile
```properties
# application-prod.properties
spring.profiles.active=production
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

#### Environment Variables in Render
```
SPRING_PROFILES_ACTIVE=production
DATABASE_URL=postgresql://...
DB_USERNAME=peoplepulse_user
DB_PASSWORD=your_password
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

---

## 🔄 CI/CD Pipeline

### 1. GitHub Actions Workflow

#### Frontend Deployment
```yaml
# .github/workflows/deploy-frontend.yml
name: Deploy Frontend to GitHub Pages

on:
  push:
    branches: [main]
    paths: ['frontend/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Build
        run: |
          cd frontend
          npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/build
```

#### Backend Deployment
```yaml
# .github/workflows/deploy-backend.yml
name: Deploy Backend to Render

on:
  push:
    branches: [main]
    paths: ['backend/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      
      - name: Build with Maven
        run: |
          cd backend
          ./mvnw clean package -DskipTests
      
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v0.0.1
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

### 2. Secrets Configuration

#### GitHub Secrets
```
RENDER_API_KEY=your_render_api_key
RENDER_SERVICE_ID=your_service_id
```

#### Render API Key
1. **Go to Render dashboard**
2. **Settings** → **API Keys**
3. **Create new API key**
4. **Copy the key**

---

## 🚨 Troubleshooting

### 1. Common Issues

#### Frontend Issues
**Problem:** 404 errors on GitHub Pages
```bash
# Solution: Check basename configuration
<Router basename="/PeoplePulse">
```

**Problem:** CORS errors
```javascript
// Solution: Update API URL
const API_BASE_URL = 'https://your-backend-url.onrender.com/api';
```

#### Backend Issues
**Problem:** Database connection failed
```properties
# Check environment variables
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

**Problem:** Build failed
```bash
# Check Java version
java -version
# Should be Java 17 or higher
```

### 2. Debugging Steps

#### Frontend Debugging
1. **Check browser console** for errors
2. **Verify API endpoints** are correct
3. **Check network tab** for failed requests
4. **Test locally** first

#### Backend Debugging
1. **Check Render logs** in dashboard
2. **Verify environment variables**
3. **Test database connection**
4. **Check application properties**

### 3. Performance Optimization

#### Frontend
- **Code splitting** for large bundles
- **Image optimization** and lazy loading
- **Caching strategies** for static assets

#### Backend
- **Database indexing** for queries
- **Connection pooling** configuration
- **Caching** for frequently accessed data

---

## 📊 Monitoring

### 1. Frontend Monitoring
- **GitHub Pages** provides basic analytics
- **Google Analytics** for detailed insights
- **Error tracking** with Sentry

### 2. Backend Monitoring
- **Render dashboard** for service metrics
- **Application logs** for debugging
- **Database monitoring** for performance

### 3. Health Checks
```java
@RestController
public class HealthController {
    
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }
}
```

---

## 🔒 Security Considerations

### 1. Environment Variables
- **Never commit** sensitive data to Git
- **Use Render secrets** for production
- **Rotate passwords** regularly

### 2. CORS Configuration
```java
@CrossOrigin(origins = {"https://devshubham07.github.io"})
```

### 3. HTTPS
- **GitHub Pages** provides HTTPS by default
- **Render** provides SSL certificates
- **Database** connections use SSL

---

## 🚀 Next Steps

1. **Test the deployment** thoroughly
2. **Set up monitoring** and alerts
3. **Configure custom domain** (optional)
4. **Implement CI/CD** for automated deployments
5. **Set up backup strategies** for database

---

**This guide covers the complete deployment strategy for PeoplePulse on GitHub Pages and Render.**
