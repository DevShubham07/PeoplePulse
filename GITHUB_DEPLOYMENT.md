# 🚀 GitHub-Based Deployment Guide

## 📋 **Complete GitHub Deployment Strategy**

### **✅ What We're Setting Up:**
- **Frontend:** GitHub Pages (Free)
- **Backend:** Render (Free tier)
- **Database:** Render PostgreSQL (Free tier)
- **CI/CD:** GitHub Actions (Free)

## 🎯 **Step-by-Step Deployment**

### **Step 1: Enable GitHub Pages**

1. **Go to your repository:** https://github.com/DevShubham07/PeoplePulse
2. **Click Settings** → **Pages**
3. **Source:** Select "Deploy from a branch"
4. **Branch:** Select "gh-pages" (will be created by GitHub Actions)
5. **Click Save**

### **Step 2: Set up Render for Backend**

1. **Go to:** https://render.com
2. **Sign up with GitHub**
3. **Click "New"** → **"Blueprint"**
4. **Connect your GitHub repo:** DevShubham07/PeoplePulse
5. **Render will automatically detect the `render.yaml`**
6. **Click "Apply"**

### **Step 3: Get Render API Token**

1. **In Render dashboard:** Settings → API Keys
2. **Create new API key**
3. **Copy the token**

### **Step 4: Add GitHub Secrets**

1. **Go to your GitHub repo:** Settings → Secrets and variables → Actions
2. **Add these secrets:**
   ```
   RENDER_TOKEN=your_render_api_token
   RENDER_SERVICE_ID=your_render_service_id
   ```

### **Step 5: Update Frontend API URL**

Once your backend is deployed on Render, update the API URL:

```bash
# Get your Render backend URL
# Update frontend/src/services/api.js
# Replace: http://localhost:8080
# With: https://your-render-backend-url.onrender.com
```

## 🔄 **Automatic Deployments**

### **Frontend (GitHub Pages):**
- ✅ Automatically deploys when you push to `main`
- ✅ Only triggers when `frontend/` files change
- ✅ Free hosting on GitHub Pages

### **Backend (Render):**
- ✅ Automatically deploys when you push to `main`
- ✅ Only triggers when `backend/` files change
- ✅ Free PostgreSQL database included

## 📊 **Your URLs After Deployment:**

### **Frontend:** `https://devshubham07.github.io/PeoplePulse`
### **Backend:** `https://your-app-name.onrender.com`
### **Database:** Managed by Render (PostgreSQL)

## 🔧 **Environment Variables**

### **Render Backend Variables (Auto-set):**
```
SPRING_PROFILES_ACTIVE=production
DATABASE_URL=postgresql://...
DB_USERNAME=postgres
DB_PASSWORD=...
```

### **Frontend Environment:**
```javascript
// In frontend/src/services/api.js
const API_BASE_URL = 'https://your-render-backend-url.onrender.com';
```

## 🚀 **Deploy Now!**

1. **Commit and push the new files:**
   ```bash
   git add .
   git commit -m "Add GitHub Actions and Render deployment"
   git push origin main
   ```

2. **Set up Render:**
   - Follow Step 2 above
   - Get your backend URL

3. **Update frontend API URL:**
   - Update `frontend/src/services/api.js`
   - Push changes

4. **Enable GitHub Pages:**
   - Follow Step 1 above

## ✅ **Success Indicators**

- ✅ **GitHub Actions:** Running successfully
- ✅ **Frontend:** Accessible at GitHub Pages URL
- ✅ **Backend:** Responding to API calls
- ✅ **Database:** Connected and working
- ✅ **Login:** Working with admin/admin123

## 🎉 **Benefits of This Setup:**

1. **💰 Completely Free** (GitHub Pages + Render free tier)
2. **🔄 Automatic Deployments** (GitHub Actions)
3. **📊 Database Included** (Render PostgreSQL)
4. **🔒 Secure** (Environment variables)
5. **📱 Professional URLs** (GitHub Pages + Render)

## 🚨 **Troubleshooting**

### **GitHub Pages not working:**
- Check if gh-pages branch exists
- Verify GitHub Actions ran successfully
- Check repository settings

### **Backend not responding:**
- Check Render logs
- Verify environment variables
- Test database connection

### **Frontend can't connect to backend:**
- Update API URL in frontend
- Check CORS settings
- Verify backend is running

## 📞 **Support**

- **GitHub Actions:** Check Actions tab in your repo
- **Render:** Check dashboard for logs
- **GitHub Pages:** Check repository settings

Your PeoplePulse application will be live on GitHub! 🚀 