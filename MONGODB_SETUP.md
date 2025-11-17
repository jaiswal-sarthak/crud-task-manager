# MongoDB Setup Guide

The application requires MongoDB to be running. Here are three ways to set it up:

## Option 1: Using Docker (Recommended - Easiest)

If you have Docker Desktop installed:

```powershell
# Start only MongoDB (without the full app)
docker run -d -p 27017:27017 --name mongodb mongo:5.0
```

To stop MongoDB:
```powershell
docker stop mongodb
docker rm mongodb
```

Or use Docker Compose to start just MongoDB:
```powershell
docker-compose -f docker-compose.dev.yml up app-db -d
```

## Option 2: Install MongoDB Locally on Windows

1. **Download MongoDB Community Server:**
   - Visit: https://www.mongodb.com/try/download/community
   - Select: Windows, MSI package
   - Download and run the installer

2. **Install MongoDB:**
   - Choose "Complete" installation
   - Install as a Windows Service (recommended)
   - Install MongoDB Compass (optional GUI tool)

3. **Verify Installation:**
   ```powershell
   # MongoDB should start automatically as a service
   # Check if it's running:
   Get-Service MongoDB
   ```

4. **If MongoDB service is not running:**
   ```powershell
   # Start the MongoDB service
   Start-Service MongoDB
   ```

5. **Test Connection:**
   ```powershell
   # MongoDB should be accessible at localhost:27017
   # The app will connect automatically when you restart the backend
   ```

## Option 3: Use MongoDB Atlas (Cloud - Free Tier)

1. **Sign up for MongoDB Atlas:**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Create a free account (M0 cluster is free)

2. **Create a Cluster:**
   - Choose a free M0 cluster
   - Select a region close to you
   - Wait for cluster to be created (~5 minutes)

3. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

4. **Update Configuration:**
   - Create a `.env` file in `src/apps/backend/` (if it doesn't exist)
   - Add: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flask-react-template-dev`
   - Replace `username` and `password` with your Atlas credentials

5. **Or update `config/development.yml`:**
   ```yaml
   mongodb:
     uri: 'mongodb+srv://username:password@cluster.mongodb.net/flask-react-template-dev'
   ```

## Verify MongoDB is Running

After setting up MongoDB, restart your backend server:

```powershell
npm run serve:backend
```

You should see:
```
INFO - connecting to database - mongodb://localhost:27017/flask-react-template-dev
INFO - connected to database - mongodb://localhost:27017/flask-react-template-dev
```

If you see connection errors, MongoDB is not running or not accessible.

## Quick Start (Docker)

The fastest way to get started:

```powershell
# Start MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:5.0

# Wait a few seconds, then start your backend
npm run serve:backend
```

That's it! Your backend should now connect to MongoDB successfully.

