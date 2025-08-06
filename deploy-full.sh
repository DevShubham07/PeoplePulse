#!/bin/bash

echo "🚀 Starting full deployment to Railway (Backend + DB) and Vercel (Frontend)..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "backend/pom.xml" ] || [ ! -f "frontend/package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Setting up Railway deployment..."

# Create Railway configuration for backend
cat > backend/railway.json << 'EOF'
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "java -jar target/backend-0.0.1-SNAPSHOT.jar",
    "healthcheckPath": "/api/employees",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
EOF

# Create nixpacks.toml for Java
cat > backend/nixpacks.toml << 'EOF'
[phases.setup]
nixPkgs = ["openjdk17"]

[phases.install]
cmds = ["./mvnw clean package -DskipTests"]

[phases.build]
cmds = ["echo 'Build complete'"]
EOF

# Create production application.properties
cat > backend/src/main/resources/application-prod.properties << 'EOF'
spring.application.name=backend

# PostgreSQL Database Configuration (will be set by Railway)
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DB_USERNAME:-postgres}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Security Configuration
spring.security.user.name=${ADMIN_USERNAME:-admin}
spring.security.user.password=${ADMIN_PASSWORD:-admin123}

# Server Configuration
server.port=${PORT:-8080}

# CORS Configuration
spring.web.cors.allowed-origins=${FRONTEND_URL:-https://peoplepulse-frontend.vercel.app}
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
EOF

print_success "Railway configuration created"

# Build backend
print_status "Building backend..."
cd backend
./mvnw clean package -DskipTests
cd ..

if [ $? -ne 0 ]; then
    print_error "Backend build failed"
    exit 1
fi

print_success "Backend built successfully"

# Deploy to Railway
print_status "Deploying backend to Railway..."
print_warning "You'll need to login to Railway in your browser"

# Use npx to run Railway CLI
npx @railway/cli login
npx @railway/cli init --name peoplepulse-backend

# Add PostgreSQL service
print_status "Adding PostgreSQL database..."
npx @railway/cli service create --name peoplepulse-db --type postgresql

# Deploy the backend
print_status "Deploying backend..."
npx @railway/cli up

# Get the backend URL
BACKEND_URL=$(npx @railway/cli status --json | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
print_success "Backend deployed to: $BACKEND_URL"

# Update frontend API URL
print_status "Updating frontend API URL..."
cd frontend
sed -i '' "s|http://localhost:8080|$BACKEND_URL|g" src/services/api.js

# Create vercel.json for frontend
cat > vercel.json << 'EOF'
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "create-react-app",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "env": {
    "REACT_APP_API_URL": "REPLACE_WITH_BACKEND_URL"
  }
}
EOF

# Replace placeholder with actual backend URL
sed -i '' "s|REPLACE_WITH_BACKEND_URL|$BACKEND_URL|g" vercel.json

# Build frontend
print_status "Building frontend..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Frontend build failed"
    exit 1
fi

print_success "Frontend built successfully"

# Deploy to Vercel
print_status "Deploying frontend to Vercel..."
print_warning "You'll need to login to Vercel in your browser"

# Install Vercel CLI if not available
if ! command -v vercel &> /dev/null; then
    print_status "Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to Vercel
vercel --prod

print_success "Deployment completed!"
echo ""
echo "🔗 Backend URL: $BACKEND_URL"
echo "🌐 Frontend URL: Check Vercel dashboard"
echo ""
echo "📊 Database: PostgreSQL (managed by Railway)"
echo "🔧 Environment Variables: Set in Railway dashboard"
echo ""
echo "Next steps:"
echo "1. Set environment variables in Railway dashboard"
echo "2. Configure custom domain in Vercel (optional)"
echo "3. Test the application" 