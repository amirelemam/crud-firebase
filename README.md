# CRUD User with Firebase

A full-stack application with a Firebase backend API, React frontend for user management and Firestore for database.

## Project Structure

```
crud-firebase/
├── backend/          # Firebase Functions API
│   ├── functions/    # Cloud Functions
│   ├── config/       # Firebase configuration
│   └── db/          # Database services
└── frontend/        # React application
    ├── src/         # React source code
    └── public/      # Static assets
```

## Features

- User creation with form validation
- Real-time user listing
- Update and delete operations
- Error handling and user feedback
- Responsive design with modern UI
- US zip code validation (5 digits)
- Automatic latitude/longitude fetching
- UTC offset timezone
- Error handling for invalid zip codes
- Location data refresh on zip code updates

## Assumptions

- **Multiple Users**: Multiple users can have the same name and zip code
- **Unique Identification**: A unique key is required to differentiate users
- **Geographic Scope**: Country is limited to USA
- **Timezone Storage**: Timezone is stored as UTC offset in seconds, but displayed to users as UTC offset in hours.

## Requirements

- Install Node.js v22
- Install Firebase CLI:
  ```bash
  npm install -g firebase-tools
  ```
- OpenWeather API key [check out](https://openweathermap.org/appid)

### Firebase Setup

1. Create a Firebase project
2. Enable Firestore Database
3. Download service account key
4. Configure database rules for security
5. Enable Firestore API

## Backend

### Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   cd functions
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `functions` directory with:

   ```
   OPENWEATHER_API_KEY=your_openweather_api_key
   ```

4. Set up Firebase credentials:

   - Download your Firebase service account key as `serviceAccountKey.json`
   - Place it in the `config` directory

5. Login to Firebase:

   ```bash
   firebase login
   ```

6. Initialize your Firebase project:
   ```bash
   firebase use --add
   ```

### Development

#### Running Tests

```bash
cd backend/functions
npm test
```

#### Linting

```bash
cd backend/functions
npm run lint
```

#### Available Scripts

```bash
cd backend
# Start emulators
npm run serve

# Deploy to Firebase
npm run deploy

# View logs
npm run logs
```

### Local Development

1. Start the Firebase emulators from the backend directory:

   ```bash
   cd backend
   npm run serve
   ```

2. The API will be available at:
   - Local: `http://localhost:5001/{project-name}/{gcp-region}/api`
   - Emulator UI: `http://localhost:4000`

### Deployment

Deploy the Firebase Functions:

```bash
cd backend
npm run deploy
```

### Security Features

- **CORS**: Configured for cross-origin requests
- **Input Validation**: Comprehensive validation using Zod schemas
- **Error Sanitization**: Error messages don't expose sensitive information
- **Helmet**: Security headers for Express app

### API Documentation

For detailed API documentation, including endpoints, data models, and usage examples, see [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md).

## Frontend

### Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure API endpoints:
   Update the API base URL in `src/api/index.js` to point to your backend:
   - Local development: `http://localhost:5001/{project-name}/{gcp-region}/api`
   - Production: `https://{gcp-region}-{project-name}.cloudfunctions.net/api`

### Development

#### Available Scripts

```bash
cd frontend
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (not recommended)
npm run eject
```

#### Features

- React-based user interface
- User management with CRUD operations
- Modal dialogs for create/edit/delete operations
- Responsive design
- Error handling and loading states
- Form validation

### Local Development

1. Start the React development server from the frontend directory:

   ```bash
   cd frontend
   npm start
   ```

2. The React app will be available at:
   - Local: `http://localhost:3000`

### Deployment

Build and deploy the React app:

```bash
cd frontend
npm run build
```

You can deploy the `build` folder to any static hosting service like:

- Firebase Hosting
- Netlify
- Vercel
- GitHub Pages

## Local Development (Both Together)

1. Start the backend (in one terminal):

   ```bash
   cd backend
   npm run serve
   ```

2. Start the frontend (in another terminal):

   ```bash
   cd frontend
   npm start
   ```

3. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5001/{project-name}/{gcp-region}/api`
   - Emulator UI: `http://localhost:4000`

## Next Steps

- [ ] Add unit tests for both backend and frontend
- [ ] Add end-to-end testing
- [ ] Implement user authentication
- [ ] Add user roles and permissions
- [ ] Support more geographic regions
- [ ] Add pagination for large datasets
- [ ] Implement caching for location data
- [ ] Update Cloud Function to 2nd Generation
