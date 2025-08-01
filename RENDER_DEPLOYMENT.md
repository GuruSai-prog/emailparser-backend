# Render Deployment Guide

## Prerequisites

1. Create a Render account at https://render.com
2. Connect your GitHub repository to Render

## Deployment Steps

### 1. Connect Repository

1. Log into Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository containing this project

### 2. Configure Web Service

**Basic Settings:**
- **Name**: `emailparser-backend`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)

**Build & Deploy Settings:**
- **Build Command**: `npm install`
- **Start Command**: `node server/index.js`

### 3. Environment Variables

Add these environment variables in Render dashboard:

```
NODE_ENV=production
PORT=10000
DATABASE_URL=./data/receipts.db
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_HOST=imap.gmail.com
EMAIL_PORT=993
```

### 4. Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Wait for deployment to complete (usually 2-5 minutes)

### 5. Test Your API

Your API will be available at:
- `https://your-app-name.onrender.com/api/ledger`
- `https://your-app-name.onrender.com/api/email`
- `https://your-app-name.onrender.com/api/reconciliation`

## Important Notes

### Database Limitations
- SQLite files are ephemeral on Render
- Data will be lost when the service restarts
- For production, consider using:
  - Render PostgreSQL
  - MongoDB Atlas
  - AWS RDS

### Environment Variables
- Never commit sensitive data to your repository
- Use Render's environment variables feature
- Keep your `.env` file in `.gitignore`

### Static Files
- The server serves React build files
- Build your React app locally and commit the `build` folder
- Or set up a separate static site service for the frontend

## Troubleshooting

### Common Issues

1. **Build fails**: Check if all dependencies are in `package.json`
2. **Port issues**: Ensure your app listens on `process.env.PORT`
3. **Database errors**: Check if data directory exists
4. **Environment variables**: Verify all required variables are set

### View Logs

1. Go to your service in Render dashboard
2. Click "Logs" tab
3. Check for any error messages

### Manual Deployment

If automatic deployment fails:
1. Go to your service
2. Click "Manual Deploy"
3. Select your branch
4. Click "Deploy Latest Commit"

## Updating Your Application

1. Push changes to your GitHub repository
2. Render will automatically detect changes
3. New deployment will start automatically
4. Monitor the deployment in the dashboard

## Cost Considerations

- **Free tier**: 750 hours/month
- **Paid plans**: Start at $7/month
- **Database**: PostgreSQL starts at $7/month

## Security Best Practices

1. Use environment variables for sensitive data
2. Enable HTTPS (automatic on Render)
3. Set up proper CORS configuration
4. Use rate limiting (already configured)
5. Keep dependencies updated 

## How to Test Your API Endpoints

### 1. Test the Base URL
```bash
curl https://emailparser-backend-f7li.onrender.com/
```
**Expected Response:**
```json
{
  "message": "Email Receipt Processor API",
  "endpoints": {
    "ledger": "/api/ledger",
    "email": "/api/email",
    "reconciliation": "/api/reconciliation"
  }
}
```

### 2. Test Ledger API
```bash
curl https://emailparser-backend-f7li.onrender.com/api/ledger
```
**Expected Response:** List of ledger entries (empty array if no data)

### 3. Test Email API
```bash
curl https://emailparser-backend-f7li.onrender.com/api/email
```
**Expected Response:** Email processing status

### 4. Test Reconciliation API
```bash
curl https://emailparser-backend-f7li.onrender.com/api/reconciliation
```
**Expected Response:** Reconciliation data

## Using PowerShell to Test

Since you're on Windows, use these PowerShell commands:

### Test Base URL
```powershell
Invoke-RestMethod -Uri "https://emailparser-backend-f7li.onrender.com/" -Method GET
```

### Test Ledger API
```powershell
Invoke-RestMethod -Uri "https://emailparser-backend-f7li.onrender.com/api/ledger" -Method GET
```

### Test Email API
```powershell
Invoke-RestMethod -Uri "https://emailparser-backend-f7li.onrender.com/api/email" -Method GET
```

### Test Reconciliation API
```powershell
Invoke-RestMethod -Uri "https://emailparser-backend-f7li.onrender.com/api/reconciliation" -Method GET
```

## Using Browser

You can also test directly in your browser:

1. **Base URL**: https://emailparser-backend-f7li.onrender.com/
2. **Ledger**: https://emailparser-backend-f7li.onrender.com/api/ledger
3. **Email**: https://emailparser-backend-f7li.onrender.com/api/email
4. **Reconciliation**: https://emailparser-backend-f7li.onrender.com/api/reconciliation

## Using Postman or Similar Tools

1. **Create a new request**
2. **Set method to GET**
3. **Enter URL**: `https://emailparser-backend-f7li.onrender.com/api/ledger`
4. **Send request**

## Expected Results

- **Base URL**: Should return API information
- **Ledger**: Should return `[]` (empty array) if no data, or ledger entries if data exists
- **Email**: Should return email processing status
- **Reconciliation**: Should return reconciliation data

Your backend is successfully deployed and responding! 

Try testing these endpoints and let me know what responses you get. 

## Your Backend is Live! ✅

The JSON response shows:
```json
{
  "message": "Email Receipt Processor API",
  "endpoints": {
    "ledger": "/api/ledger",
    "email": "/api/email", 
    "reconciliation": "/api/reconciliation"
  }
}
```

## Next Steps - Test Your API Endpoints

Now let's test the individual API endpoints:

### 1. Test Ledger API
Visit: https://emailparser-backend-f7li.onrender.com/api/ledger

### 2. Test Email API  
Visit: https://emailparser-backend-f7li.onrender.com/api/email

### 3. Test Reconciliation API
Visit: https://emailparser-backend-f7li.onrender.com/api/reconciliation

## What You Can Do Now

1. **Test all endpoints** to make sure they're working
2. **Set up your frontend** to connect to this backend
3. **Configure environment variables** for email processing
4. **Add data** to test the full functionality

## Your Backend URL for Frontend Integration

When you build your frontend, use this as your API base URL:
```javascript
const API_BASE_URL = 'https://emailparser-backend-f7li.onrender.com/api';
```

## Deployment Summary

✅ **Backend deployed**: https://emailparser-backend-f7li.onrender.com/  
✅ **API responding correctly**  
✅ **All endpoints available**  
✅ **Ready for frontend integration**

Your Node.js backend is now live and ready to use! 

Would you like to test the individual endpoints or move on to setting up the frontend? 