#!/bin/bash

echo "🎨 Deploying to Render..."

# Create render.yaml for backend
echo "📝 Creating Render configuration..."
cat > render.yaml << EOF
services:
  - type: web
    name: peoplepulse-backend
    env: java
    buildCommand: ./mvnw clean package -DskipTests
    startCommand: java -jar target/backend-0.0.1-SNAPSHOT.jar
    envVars:
      - key: SPRING_PROFILES_ACTIVE
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: peoplepulse-db
          property: connectionString
    healthCheckPath: /api/employees

databases:
  - name: peoplepulse-db
    databaseName: employee_management
    user: postgres
EOF

# Create Dockerfile for backend
echo "🐳 Creating Dockerfile..."
cat > backend/Dockerfile << EOF
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make mvnw executable
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
EOF

# Create .dockerignore
cat > backend/.dockerignore << EOF
target/
.git/
.gitignore
README.md
EOF

# Build backend
echo "🔨 Building backend..."
cd backend
./mvnw clean package -DskipTests

# Create frontend build
echo "🔨 Building frontend..."
cd ../frontend
npm run build

# Create _redirects for Netlify
cat > build/_redirects << EOF
/*    /index.html   200
EOF

echo "✅ Render configuration created!"
echo ""
echo "🚀 To deploy:"
echo "1. Push your code to GitHub"
echo "2. Connect your repo to Render"
echo "3. Render will automatically deploy using render.yaml"
echo ""
echo "📊 Database will be automatically provisioned"
echo "🌐 Frontend can be deployed to Netlify/Vercel" 