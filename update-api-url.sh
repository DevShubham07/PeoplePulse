#!/bin/bash

# Script to update API URL for production deployment
echo "🚀 PeoplePulse API URL Update Script"
echo "====================================="

# Check if backend URL is provided
if [ -z "$1" ]; then
    echo "❌ Please provide your Render backend URL"
    echo "Usage: ./update-api-url.sh https://your-app-name.onrender.com"
    echo ""
    echo "To get your backend URL:"
    echo "1. Go to https://render.com/dashboard"
    echo "2. Find your 'peoplepulse-backend' service"
    echo "3. Copy the URL (e.g., https://peoplepulse-backend.onrender.com)"
    exit 1
fi

BACKEND_URL="$1"
API_FILE="frontend/src/services/api.js"

echo "📝 Updating API URL to: $BACKEND_URL"

# Create backup
cp "$API_FILE" "$API_FILE.backup"
echo "✅ Created backup: $API_FILE.backup"

# Update the API URL
sed -i '' "s|const API_BASE_URL = '/api';|const API_BASE_URL = '$BACKEND_URL/api';|g" "$API_FILE"

echo "✅ Updated API URL in $API_FILE"
echo ""
echo "🔄 Next steps:"
echo "1. Test the change: npm start (in frontend directory)"
echo "2. Commit and push:"
echo "   git add frontend/src/services/api.js"
echo "   git commit -m 'Update API URL for production'"
echo "   git push origin main"
echo ""
echo "🎉 Your frontend will automatically deploy to GitHub Pages!"
