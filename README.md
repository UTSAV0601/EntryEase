# GlobalLogic Onboarding Portal

A modern employee onboarding portal built with React, TypeScript, Material-UI, and Node.js. This application provides a comprehensive onboarding experience with progress tracking, profile management, task completion, and document upload capabilities.

## Features

- **User Authentication** - Secure login system with JWT tokens
- **Interactive Dashboard** - Real-time progress tracking and onboarding metrics
- **Profile Management** - Complete employee profile setup and editing
- **Task Management** - Interactive onboarding tasks with completion tracking
- **Document Upload** - File upload system for onboarding documents
- **Responsive Design** - Mobile-friendly interface using Material-UI
- **Smooth Animations** - Enhanced user experience with Framer Motion

## Tech Stack

- **Frontend**: React 18, TypeScript, Material-UI v5, Framer Motion
- **Backend**: Node.js, Express.js, TypeScript
- **Authentication**: JWT (JSON Web Tokens)
- **Build Tool**: Vite
- **Styling**: Material-UI with custom theme

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## Installation & Setup

1. **Clone or download this project**
   ```bash
   # If you have the project as a zip file, extract it
   # If you have a git repository, clone it:
   git clone <your-repo-url>
   cd globallogic-onboarding-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the application**
   ```bash
   npm run build
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5000`
   - The application should load and show the login page

## Demo Credentials

Use these credentials to test the application:

- **Email**: `demo@globallogic.com`
- **Password**: `demo123`

## Available Scripts

- `npm start` - Runs the production server
- `npm run dev` - Runs the development server with hot reload
- `npm run build` - Builds the application for production
- `npm run build:client` - Builds only the client (React app)
- `npm run build:server` - Builds only the server
- `npm run serve` - Serves the built application

## Project Structure

```
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── contexts/          # React context providers
│   ├── pages/             # Application pages
│   └── main.tsx           # Application entry point
├── server/                # Backend Express server
│   ├── auth.ts            # Authentication routes
│   └── index.ts           # Server entry point
├── dist/                  # Built application files
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Development

For development with hot reload:

```bash
npm run dev
```

This will start both the frontend and backend in development mode.

## Deployment

The application is configured for easy deployment:

1. Run `npm run build` to create production builds
2. Run `npm start` to serve the application
3. The server will serve both the API and static frontend files

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

1. **Port already in use**
   - The application runs on port 5000 by default
   - If port 5000 is busy, stop other applications or change the PORT environment variable

2. **Build errors**
   - Make sure you have Node.js 16+ installed
   - Delete `node_modules` and run `npm install` again

3. **Login not working**
   - Ensure you're using the correct demo credentials
   - Check browser console for any error messages

### Getting Help

If you encounter issues:

1. Check the browser console for error messages
2. Verify all dependencies are installed correctly
3. Ensure you're using the correct Node.js version

## Features Overview

### Dashboard
- Welcome message with user information
- Progress tracking with interactive progress bars
- Quick access to onboarding tasks
- Real-time completion statistics

### Profile Management
- Personal information form
- Contact details
- Emergency contact information
- Department and role assignment
- Profile completion tracking

### Task Management
- Interactive task cards
- Progress tracking
- Task categorization
- Completion status indicators

### Document Upload
- File upload interface
- Document type categorization
- Upload progress tracking
- File management

## Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation

## Performance

- Code splitting for optimal loading
- Optimized Material-UI imports
- Efficient state management
- Responsive design for all devices

---

**Note**: This is a demo application built for portfolio purposes. It includes mock data and simulated features for demonstration.