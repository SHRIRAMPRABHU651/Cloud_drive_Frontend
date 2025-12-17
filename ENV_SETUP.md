# Frontend Environment Setup

## Your Backend URL
Your backend is deployed at: **https://cloud-drive-backend-iqjt.onrender.com**

## Environment Files Created

### For Development (Local Testing)
Create `.env` or use the provided `.env.development`:

```env
VITE_API_URL=https://cloud-drive-backend-iqjt.onrender.com/api
VITE_NODE_ENV=development
```

### For Production Deployment
When you deploy your frontend to Vercel/Netlify, create `.env.production`:

```env
VITE_API_URL=https://cloud-drive-backend-iqjt.onrender.com/api
VITE_NODE_ENV=production
```

Or set the environment variable in your deployment platform:
- **Vercel**: Settings → Environment Variables → Add `VITE_API_URL`
- **Netlify**: Site settings → Environment variables → Add `VITE_API_URL`

## Testing Locally

1. Create `.env` file in `Cloud_drive_Frontend/` directory:
   ```bash
   VITE_API_URL=https://cloud-drive-backend-iqjt.onrender.com/api
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## After Frontend Deployment

⚠️ **IMPORTANT**: After you deploy your frontend, you MUST update the backend's `FRONTEND_URL` environment variable on Render to include your deployed frontend URL.

Example:
```
FRONTEND_URL=https://your-app.vercel.app,https://your-app.netlify.app,http://localhost:5173
```

This prevents CORS errors!

