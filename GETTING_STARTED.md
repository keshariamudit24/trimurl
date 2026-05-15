# 🚀 Getting Started with TrimURL

## What You Have

A **complete, production-ready URL shortener** with:
- ✅ Modern React frontend with Vite
- ✅ Express backend (already existed)
- ✅ Fully integrated API communication
- ✅ Beautiful, responsive UI
- ✅ Complete documentation

## 5-Minute Setup

### Step 1: Verify Database (2 min)
```bash
# Ensure PostgreSQL is running and configured in server/.env
cd server

# Run database migrations
npx prisma migrate dev

# This creates all necessary tables
```

### Step 2: Start Backend (1 min)
```bash
cd server
npm run dev

# You should see:
# "listening on port : 4000"
```

### Step 3: Start Frontend (1 min - New Terminal)
```bash
cd client
npm run dev

# You should see:
# "➜  Local:   http://localhost:5173/"
```

### Step 4: Open Browser (1 min)
Visit: **http://localhost:5173**

🎉 **Done! Start shortening URLs!**

---

## What Each Part Does

### Frontend (client/)
User enters URL → Sends to backend → Gets short code → Displays result

### Backend (server/)
Receives request → Validates → Saves to database → Returns short code

### Database (PostgreSQL)
Stores URL pairs with timestamps

---

## Features to Try

1. **Basic URL Shortening** - Paste any long URL and get a short code
2. **Custom Alias** - Create custom short links like "my-project"
3. **Copy & Share** - Copy to clipboard with one click
4. **Test Redirect** - Click "Open" to test the shortened link
5. **View History** - See all shortened URLs with timestamps

---

## Components Explained

### URLForm Component
- Takes user input (long URL + optional custom alias)
- Validates and sends to backend
- Shows success/error messages
- Real-time feedback

### URLList Component
- Displays history of shortened URLs
- Copy to clipboard functionality
- Open in new tab button
- Shows timestamps

### App Component
- Main container
- Manages URL history state
- Coordinates between Form and List

---

## Styling

- **Purple gradient background** for modern look
- **White cards** with shadows for depth
- **Indigo accents** for interactive elements
- **Fully responsive** for all devices
- **Smooth animations** on interactions

---

## API Endpoints

### POST /create
Create a shortened URL
```bash
curl -X POST http://localhost:4000/create \
  -H "Content-Type: application/json" \
  -d '{
    "longurl": "https://example.com/long/url",
    "alias": ""
  }'
```

### GET /:id
Redirect to original URL
```bash
curl -L http://localhost:4000/abc123
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Cannot connect to server | Backend running on :4000? CORS enabled? |
| Database error | PostgreSQL running? DATABASE_URL set? |
| Port in use | Change PORT in .env or try different port |
| Build fails | `npm install` and `npm run build` |
| Invalid URL | URL must start with http:// or https:// |

---

## Quick Commands

```bash
# Start backend
cd server && npm run dev

# Start frontend (new terminal)
cd client && npm run dev

# Build for production
npm run build

# Database migrations
npx prisma migrate dev

# Database GUI
npx prisma studio
```

---

## Success Checklist

- ✅ Backend running on port 4000
- ✅ Frontend running on port 5173
- ✅ Can open http://localhost:5173 in browser
- ✅ Can shorten URLs
- ✅ Can copy and open shortened URLs
- ✅ No console errors

**All ✅? You're ready! Start shortening URLs! 🎉**

---

For more details, see README.md, QUICKSTART.md, and PROJECT_STRUCTURE.md
