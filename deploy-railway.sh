#!/bin/bash

echo "🚂 Deploying to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "🔐 Logging into Railway..."
railway login

# Create Railway project
echo "📁 Creating Railway project..."
railway init --name peoplepulse-ems

# Create railway.json for backend
echo "📝 Creating Railway configuration..."
cat > backend/railway.json << EOF
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
cat > backend/nixpacks.toml << EOF
[phases.setup]
nixPkgs = ["openjdk17"]

[phases.install]
cmds = ["./mvnw clean package -DskipTests"]

[phases.build]
cmds = ["echo 'Build complete'"]
EOF

# Build backend
echo "🔨 Building backend..."
cd backend
./mvnw clean package -DskipTests

# Deploy backend
echo "🚀 Deploying backend to Railway..."
railway up

# Get backend URL
BACKEND_URL=$(railway status --json | jq -r '.url')
echo "🔗 Backend URL: $BACKEND_URL"

# Update frontend API URL
echo "🔧 Updating frontend API URL..."
cd ../frontend
sed -i '' "s|http://localhost:8080|$BACKEND_URL|g" src/services/api.js

# Build frontend
echo "🔨 Building frontend..."
npm run build

# Deploy frontend to Vercel
echo "🌐 Deploying frontend to Vercel..."
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Create vercel.json
cat > vercel.json << EOF
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "create-react-app",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
EOF

# Deploy to Vercel
vercel --prod

echo "✅ Deployment complete!"
echo "🔗 Backend: $BACKEND_URL"
echo "🌐 Frontend: Check Vercel dashboard for URL" 