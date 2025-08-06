# 🚀 Deployment Steps for PeoplePulse

## 📋 **Prerequisites**
- GitHub repository: https://github.com/DevShubham07/PeoplePulse.git
- Railway account (free): https://railway.app
- Vercel account (free): https://vercel.com

## 🎯 **Option 1: Automated Deployment (Recommended)**

Run the automated deployment script:
```bash
./deploy-full.sh
```

This will:
1. ✅ Set up Railway configuration
2. ✅ Build backend
3. ✅ Deploy backend to Railway
4. ✅ Set up PostgreSQL database
5. ✅ Update frontend API URL
6. ✅ Build frontend
7. ✅ Deploy frontend to Vercel

## 🛠️ **Option 2: Manual Deployment**

### **Step 1: Deploy Backend to Railway**

1. **Login to Railway:**
   ```bash
   npx @railway/cli login
   ```

2. **Initialize Railway project:**
   ```bash
   npx @railway/cli init --name peoplepulse-backend
   ```

3. **Add PostgreSQL database:**
   ```bash
   npx @railway/cli service create --name peoplepulse-db --type postgresql
   ```

4. **Deploy backend:**
   ```bash
   npx @railway/cli up
   ```

5. **Get backend URL:**
   ```bash
   npx @railway/cli status
   ```

### **Step 2: Deploy Frontend to Vercel**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Update frontend API URL:**
   ```bash
   cd frontend
   # Replace localhost:8080 with your Railway backend URL
   sed -i '' "s|http://localhost:8080|YOUR_RAILWAY_BACKEND_URL|g" src/services/api.js
   ```

4. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

## 🔧 **Environment Variables Setup**

### **Railway Environment Variables:**
Set these in Railway dashboard:

```
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=postgresql://username:password@host:port/database
DB_USERNAME=postgres
DB_PASSWORD=your_password
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
```

### **Vercel Environment Variables:**
Set these in Vercel dashboard:

```
REACT_APP_API_URL=https://your-railway-backend-url.railway.app
```

## 📊 **Database Setup**

Railway will automatically:
- ✅ Create PostgreSQL database
- ✅ Set up connection string
- ✅ Handle migrations
- ✅ Provide database URL

## 🌐 **Custom Domains (Optional)**

### **Railway Custom Domain:**
1. Go to Railway dashboard
2. Select your backend service
3. Go to Settings → Domains
4. Add your custom domain

### **Vercel Custom Domain:**
1. Go to Vercel dashboard
2. Select your frontend project
3. Go to Settings → Domains
4. Add your custom domain

## 🔍 **Testing Your Deployment**

### **Backend Health Check:**
```bash
curl https://your-railway-backend-url.railway.app/api/employees
```

### **Frontend Test:**
1. Visit your Vercel frontend URL
2. Try logging in with: admin / admin123
3. Test all features

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **Backend Build Failed:**
   - Check Java version (requires Java 17)
   - Ensure all dependencies are in pom.xml

2. **Database Connection Failed:**
   - Verify DATABASE_URL in Railway
   - Check PostgreSQL service is running

3. **CORS Issues:**
   - Update FRONTEND_URL in Railway
   - Check CORS configuration

4. **Frontend Build Failed:**
   - Check Node.js version (requires 16+)
   - Verify all dependencies in package.json

## 📞 **Support**

### **Railway Support:**
- Documentation: https://docs.railway.app
- Discord: https://discord.gg/railway

### **Vercel Support:**
- Documentation: https://vercel.com/docs
- Discord: https://discord.gg/vercel

## 🎉 **Success Indicators**

✅ **Backend deployed and accessible**
✅ **Database connected and working**
✅ **Frontend deployed and accessible**
✅ **Login functionality working**
✅ **All features operational**

Your PeoplePulse application is now live! 🚀 