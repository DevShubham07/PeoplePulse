#!/bin/bash

echo "🔄 Switching backend to use H2 (in-memory)..."

# Restore H2 configuration
cp backend/src/main/resources/application-h2.properties backend/src/main/resources/application.properties

echo "✅ Backend switched to H2!"
echo "💾 Database: In-memory H2"
echo "🌐 H2 Console: http://localhost:8080/h2-console"
echo ""
echo "🚀 To start the backend with H2, run:"
echo "   cd backend && ./mvnw spring-boot:run"
echo ""
echo "🔄 To switch to PostgreSQL, run:"
echo "   ./switch-to-postgres.sh" 