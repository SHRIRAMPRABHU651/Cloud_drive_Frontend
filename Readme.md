# File Sharing System - Frontend

A modern React frontend for a Google Drive-like file sharing system with beautiful UI built with Tailwind CSS.

## 🚀 Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios
- **State Management:** React Context API

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── axios.js          # Axios instance with interceptors
│   ├── components/
│   │   ├── FileUpload.jsx    # File upload component
│   │   └── ShareModal.jsx    # File sharing modal
│   ├── context/
│   │   └── AuthContext.jsx   # Authentication context
│   ├── pages/
│   │   ├── Login.jsx         # Login page
│   │   ├── Register.jsx      # Registration page
│   │   ├── Dashboard.jsx     # Main dashboard
│   │   └── SharedFiles.jsx   # Shared files page
│   ├── App.jsx               # Main app component with routing
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles with Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Features

- **User Authentication:** Login and registration with JWT
- **File Upload:** Single and bulk file uploads
- **File Management:** View, download, and organize files
- **File Sharing:** Share files with specific users or generate shareable links
- **Access Control:** View files shared with you
- **Responsive Design:** Works on desktop and mobile devices
- **Protected Routes:** Automatic redirects for unauthenticated users

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running (see backend README)

## 🛠️ Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API URL:**
   
   **Quick Setup:** Run the setup script:
   ```bash
   # On Unix/Mac
   bash ../setup-env.sh
   
   # On Windows
   ..\setup-env.bat
   ```
   
   Or manually create `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_NODE_ENV=development
   ```
   
   Default is `http://localhost:5000/api`

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

The app will start on `http://localhost:5173` with hot module replacement.

### Production Build
```bash
npm run build
```

Builds the app for production to the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## 🎯 Pages & Routes

### Public Routes
- `/login` - User login page
- `/register` - User registration page

### Protected Routes (Require Authentication)
- `/dashboard` - Main dashboard with file management
- `/shared` - Files shared with current user
- `/` - Redirects to `/dashboard`

## 🔐 Authentication Flow

1. **Registration/Login:**
   - User enters credentials
   - API returns JWT token
   - Token stored in localStorage
   - User data stored in context

2. **Protected Routes:**
   - Check authentication status
   - Redirect to login if not authenticated
   - Include token in API requests

3. **Token Management:**
   - Axios interceptor adds token to requests
   - Auto-logout on 401 responses
   - Token stored securely in localStorage

## 📤 File Upload

The file upload component supports:
- Multiple file selection
- File type validation (client-side)
- File size display
- Upload progress feedback
- Error handling

**Supported File Types:**
- PDF documents
- Images (JPEG, PNG, GIF, WebP)
- CSV files
- Text files

## 🔗 File Sharing

### Share with User
1. Click "Share" on any file
2. Enter user email
3. File is shared with that user

### Generate Share Link
1. Click "Share" on any file
2. Switch to "Generate Link" tab
3. Optionally set expiration date
4. Copy and share the link

**Note:** Users accessing via share link must be authenticated.

## 🎨 Styling

The app uses Tailwind CSS for styling:
- Utility-first CSS framework
- Responsive design classes
- Custom color scheme (Indigo theme)
- Modern UI components

## 🔧 Configuration

### Vite Configuration
- Proxy setup for API calls in development
- React plugin for JSX support
- Port: 5173

### Tailwind Configuration
- Content paths configured
- Default theme extended
- PostCSS integration

## 🌐 Deployment

### Build for Production

**Important:** Create `.env.production` file first:
```env
VITE_API_URL=https://your-backend-api.com/api
VITE_NODE_ENV=production
```

Then build:
```bash
npm run build
```

### Quick Deployment Guide

📖 **See `DEPLOYMENT_GUIDE.md` in the project root for complete instructions**

### Deployment Platforms

#### Vercel (Recommended)
1. Connect GitHub repository
2. Set root directory: `Cloud_drive_Frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-backend.com/api`
6. Deploy!

#### Netlify
1. Connect GitHub repository
2. Base directory: `Cloud_drive_Frontend`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-backend.com/api`
6. Deploy!

### Environment Variables

**Development:**
```env
VITE_API_URL=http://localhost:5000/api
```

**Production:**
```env
VITE_API_URL=https://your-backend-api.com/api
VITE_NODE_ENV=production
```

**Note:** After deploying frontend, remember to add the frontend URL to backend's `FRONTEND_URL` environment variable!

## 🐛 Troubleshooting

### API Connection Issues
- Verify backend server is running
- Check `VITE_API_URL` environment variable
- Verify CORS settings on backend

### Authentication Not Working
- Check localStorage for token
- Verify token format in network requests
- Check browser console for errors

### File Upload Fails
- Verify file size is within limits
- Check file type is allowed
- Verify backend is accepting multipart/form-data

### Build Errors
- Clear `node_modules` and reinstall
- Check Node.js version (v18+)
- Verify all dependencies are installed

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Security Considerations

- Tokens stored in localStorage (consider httpOnly cookies for production)
- API calls include authentication headers
- Protected routes prevent unauthorized access
- File validation on both client and server

## 📝 License

ISC

## 👤 Author

Built as a production-ready MERN stack file sharing system.


