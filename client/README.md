# Email Parser Frontend

This is the frontend application for the Email Parser system that connects to the backend API.

## Configuration

The application is configured to connect to the backend API at:
`http://emailparser-env.eba-3evbrxvz.us-east-1.elasticbeanstalk.com`

### Environment Variables

You can override the API base URL by setting the `REACT_APP_API_BASE_URL` environment variable:

```bash
REACT_APP_API_BASE_URL=http://your-backend-url.com npm start
```

## Features

- **Dashboard**: Overview of receipt processing statistics
- **Ledger**: View and manage processed receipts
- **Reconciliation**: Upload bank statements and compare with ledger entries
- **Email Settings**: Configure email processing and monitor activity

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## API Configuration

The application uses a centralized axios configuration located in `src/config/axios.js` that:

- Sets the base URL to the backend server
- Configures request/response interceptors for logging (development only)
- Handles common headers and timeouts

All API calls in the application use this configured axios instance instead of the default axios.

## File Structure

```
src/
├── config/
│   ├── axios.js      # Axios configuration with backend URL
│   └── config.js     # Environment configuration
├── pages/
│   ├── Dashboard.js
│   ├── Ledger.js
│   ├── Reconciliation.js
│   └── EmailSettings.js
└── components/
    └── Navbar.js
```

## Recent Changes

- Updated all API calls to use the configured axios instance
- Added centralized configuration for backend URL
- Added environment variable support for API base URL
- Added request/response logging for development 