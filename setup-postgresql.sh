#!/bin/bash

echo "🚀 Setting up PostgreSQL for Employee Management System..."

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew is not installed. Please install Homebrew first:"
    echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    exit 1
fi

# Install PostgreSQL
echo "📦 Installing PostgreSQL..."
brew install postgresql@14

# Start PostgreSQL service
echo "🔄 Starting PostgreSQL service..."
brew services start postgresql@14

# Wait a moment for the service to start
sleep 3

# Create database
echo "🗄️ Creating database..."
createdb employee_management 2>/dev/null || echo "Database already exists"

# Create user (optional)
echo "👤 Creating user 'postgres'..."
createuser -P postgres 2>/dev/null || echo "User already exists"

echo "✅ PostgreSQL setup complete!"
echo ""
echo "📋 Database Details:"
echo "   Database: employee_management"
echo "   Username: postgres"
echo "   Password: 12345678"
echo "   Host: localhost"
echo "   Port: 5432"
echo ""
echo "🔧 To connect to the database:"
echo "   psql -U postgres -d employee_management"
echo ""
echo "🛑 To stop PostgreSQL:"
echo "   brew services stop postgresql@14" 