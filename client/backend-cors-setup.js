// CORS Configuration for Backend
// Add this to your Express server

const cors = require('cors');

// CORS configuration for development and production
const corsOptions = {
  origin: [
    'http://localhost:3000',           // React development server
    'https://your-frontend-domain.com', // Add your production frontend domain here
    // Add any other domains you want to allow
  ],
  credentials: true, // Allow cookies and authentication headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Alternative: If you want to allow all origins (NOT recommended for production)
// app.use(cors());

// Alternative: If you want to allow specific origins with more control
// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
//     
//     const allowedOrigins = [
//       'http://localhost:3000',
//       'https://your-frontend-domain.com'
//     ];
//     
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));

console.log('CORS configured for origins:', corsOptions.origin); 