#!/bin/bash

echo "🔄 Switching backend to use PostgreSQL..."

# Backup current application.properties
cp backend/src/main/resources/application.properties backend/src/main/resources/application-h2.properties

# Create PostgreSQL configuration
cat > backend/src/main/resources/application.properties << 'EOF'
spring.application.name=backend

# PostgreSQL Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/employee_management
spring.datasource.username=postgres
spring.datasource.password=12345678
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Security Configuration
spring.security.user.name=admin
spring.security.user.password=admin123

# Server Configuration
server.port=8080

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
EOF

echo "✅ Backend switched to PostgreSQL!"
echo "📊 Database: employee_management"
echo "👤 Username: postgres"
echo "🔑 Password: 12345678"
echo ""
echo "🚀 To start the backend with PostgreSQL, run:"
echo "   cd backend && ./mvnw spring-boot:run"
echo ""
echo "🔄 To switch back to H2, run:"
echo "   ./switch-to-h2.sh" 