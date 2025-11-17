# How to Run the Application

## ⚠️ IMPORTANT: Both Servers Must Be Running!

The frontend (port 3000) proxies API requests to the backend (port 8080).  
**You MUST run both servers for the application to work.**

## Quick Start - Separate Terminals (Recommended)

### Option 1: Using Batch Files (Windows)

**Terminal 1 - Frontend:**
```powershell
.\start-frontend.bat
```

**Terminal 2 - Backend:**
```powershell
.\start-backend.bat
```

### Option 2: Using Shell Scripts (Git Bash)

**Terminal 1 - Frontend:**
```bash
bash start-frontend.sh
```

**Terminal 2 - Backend:**
```bash
bash start-backend.sh
```

### Option 3: Using npm scripts directly

**Terminal 1 - Frontend:**
```powershell
npm run serve:frontend
```

**Terminal 2 - Backend:**
```powershell
npm run serve:backend
```

## Server URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **Tasks Page:** http://localhost:3000/tasks

## Notes

- The backend will show a warning about Temporal server - this is expected and can be ignored. Your APIs will work fine.
- Make sure MongoDB is running if you're using it for data storage.
- Both servers need to be running for the full application to work.

