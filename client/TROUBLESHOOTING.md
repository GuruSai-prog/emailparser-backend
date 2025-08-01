# Troubleshooting Guide: Frontend to Backend Connection

## 1. CORS Setup in Backend

Add this to your Express server (in your backend code):

```javascript
const cors = require('cors');

const corsOptions = {
  origin: [
    'http://localhost:3000',           // React development server
    'https://your-frontend-domain.com', // Add your production frontend domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ]
};

app.use(cors(corsOptions));
```

## 2. Check Backend Routes

Make sure your backend has these routes that match your frontend API calls:

- `GET /api/ledger/stats/summary`
- `GET /api/email/stats`
- `POST /api/email/process`
- `GET /api/ledger`
- `PUT /api/ledger/:id`
- `DELETE /api/ledger/:id`
- `GET /api/email/log`
- `POST /api/email/test-connection`
- `POST /api/email/process-here-is-receipt-fixed`
- `POST /api/reconciliation/upload-statement`
- `POST /api/reconciliation/compare`
- `POST /api/reconciliation/save`

## 3. Test Backend Directly

Test your backend endpoints directly in the browser:

```
http://emailparser-env.eba-3evbrxvz.us-east-1.elasticbeanstalk.com/api/ledger/stats/summary
http://emailparser-env.eba-3evbrxvz.us-east-1.elasticbeanstalk.com/api/email/stats
```

## 4. Check Backend Logs

In AWS Elastic Beanstalk console:
1. Go to your environment
2. Click "Logs" tab
3. Request and download logs
4. Look for:
   - Startup errors
   - CORS errors
   - Missing dependencies
   - Route errors

## 5. Frontend Debugging

Open browser DevTools (F12) and check:

### Console Tab
Look for errors like:
- `CORS policy: No 'Access-Control-Allow-Origin'`
- `Failed to fetch`
- `404 Not Found`
- `500 Internal Server Error`

### Network Tab
1. Go to Dashboard page
2. Look for API requests to your EBS URL
3. Check response status codes
4. Look for CORS preflight requests (OPTIONS)

## 6. Common Issues & Solutions

### CORS Error
**Error**: `CORS policy: No 'Access-Control-Allow-Origin'`
**Solution**: Add CORS middleware to backend (see step 1)

### 404 Not Found
**Error**: `404` responses
**Solution**: Check that backend routes match frontend API calls

### 500 Internal Server Error
**Error**: `500` responses
**Solution**: Check backend logs for server errors

### Timeout Errors
**Error**: Requests timing out after 10 seconds
**Solution**: 
- Check if backend is running
- Verify EBS URL is correct
- Check network connectivity

## 7. Quick Test Commands

Test your backend from command line:

```bash
# Test if backend is responding
curl -I http://emailparser-env.eba-3evbrxvz.us-east-1.elasticbeanstalk.com/

# Test API endpoint
curl http://emailparser-env.eba-3evbrxvz.us-east-1.elasticbeanstalk.com/api/ledger/stats/summary

# Test CORS preflight
curl -X OPTIONS -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  http://emailparser-env.eba-3evbrxvz.us-east-1.elasticbeanstalk.com/api/ledger/stats/summary
```

## 8. Frontend Configuration Check

Your frontend is now configured to use:
- Base URL: `http://emailparser-env.eba-3evbrxvz.us-east-1.elasticbeanstalk.com`
- Timeout: 10 seconds
- Logging: Enabled in development

## 9. Next Steps

1. **Add CORS to your backend** using the configuration above
2. **Test backend endpoints** directly in browser
3. **Check backend logs** in AWS console
4. **Test frontend** and check browser console for errors
5. **Share any error messages** you see for further debugging

## 10. Error Message Examples

If you see these errors, here's what they mean:

```
CORS policy: No 'Access-Control-Allow-Origin' header is present
→ Backend needs CORS middleware

Failed to fetch
→ Network error or backend not responding

404 Not Found
→ Backend route doesn't exist

500 Internal Server Error
→ Backend server error (check logs)
``` 