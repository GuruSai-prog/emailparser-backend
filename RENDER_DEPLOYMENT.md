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