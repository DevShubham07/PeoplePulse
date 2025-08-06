#!/bin/bash

echo "🚀 Deploying to Heroku..."

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI not found. Installing..."
    brew tap heroku/brew && brew install heroku
fi

# Create Heroku app if it doesn't exist
if ! heroku apps:info --app peoplepulse-ems &> /dev/null; then
    echo "📱 Creating Heroku app..."
    heroku create peoplepulse-ems
fi

# Set up PostgreSQL addon
echo "🗄️ Setting up PostgreSQL..."
heroku addons:create heroku-postgresql:mini --app peoplepulse-ems

# Get database URL
DATABASE_URL=$(heroku config:get DATABASE_URL --app peoplepulse-ems)
echo "📊 Database URL: $DATABASE_URL"

# Create Procfile for backend
echo "📝 Creating Procfile..."
cat > backend/Procfile << EOF
web: java -jar target/backend-0.0.1-SNAPSHOT.jar
EOF

# Create system.properties for Java version
echo "☕ Setting Java version..."
cat > backend/system.properties << EOF
java.runtime.version=17
EOF

# Build the backend
echo "🔨 Building backend..."
cd backend
./mvnw clean package -DskipTests

# Deploy backend
echo "🚀 Deploying backend to Heroku..."
git add .
git commit -m "Deploy backend to Heroku"
git push heroku main

# Get backend URL
BACKEND_URL=$(heroku info --app peoplepulse-ems | grep "Web URL" | awk '{print $3}')
echo "🔗 Backend URL: $BACKEND_URL"

# Update frontend API URL
echo "🔧 Updating frontend API URL..."
cd ../frontend
sed -i '' "s|http://localhost:8080|$BACKEND_URL|g" src/services/api.js

# Build frontend
echo "🔨 Building frontend..."
npm run build

# Deploy frontend to Netlify
echo "🌐 Deploying frontend to Netlify..."
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Create netlify.toml
cat > netlify.toml << EOF
[build]
  publish = "build"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF

# Deploy to Netlify
netlify deploy --prod --dir=build

echo "✅ Deployment complete!"
echo "🔗 Backend: $BACKEND_URL"
echo "🌐 Frontend: Check Netlify dashboard for URL" 