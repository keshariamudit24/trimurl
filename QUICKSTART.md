# TrimURL - Quick Start Guide

## 🚀 Getting Started in 2 Minutes

### Step 1: Setup Backend Database
The server requires a PostgreSQL database. Make sure your `.env` file has the DATABASE_URL configured.

```bash
cd server
npx prisma migrate dev
```

### Step 2: Start the Backend Server
```bash
cd server
npm run dev
```
✓ Backend will run on `http://localhost:4000`

### Step 3: Start the Frontend (New Terminal)
```bash
cd client
npm run dev
```
✓ Frontend will run on `http://localhost:5173`

### Step 4: Open in Browser
Navigate to `http://localhost:5173` and start shortening URLs!

---

## 📋 Features You Can Try

1. **Shorten a URL**
   - Paste any long URL
   - Click "Shorten URL"
   - Get an auto-generated short code

2. **Custom Alias**
   - Enter a URL
   - Add a custom alias (e.g., "my-project")
   - Your short URL: `http://localhost:4000/my-project`

3. **Copy & Share**
   - Click "Copy" button to copy short URL
   - Click "Open" to test the redirect

4. **View History**
   - All shortened URLs appear below the form
   - Shows timestamp and both URLs

---

## 🏗️ Project Architecture

```
Frontend (React/Vite)         Backend (Express)
├── URLForm.jsx    ───POST──→ /create endpoint
├── URLList.jsx    ←────────  Returns shortened URL
└── Styling        ────GET──→ /:shortCode endpoint
                   ←────────  Redirects to long URL
```

---

## 🛠️ Troubleshooting

**"Cannot connect to server" error?**
- Make sure backend is running on port 4000
- Check that `http://localhost:4000/create` is accessible

**Database connection error?**
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Run `npx prisma db push`

**Port already in use?**
- Backend: Change PORT in `.env`
- Frontend: Vite will ask to use another port

---

## 📚 API Endpoints

### POST /create
Shorten a URL
```json
{
  "longurl": "https://example.com/long/path",
  "alias": ""
}
```

### GET /:id
Redirect to original URL
```
GET /abc123 → Redirects to original long URL
```

---

## 🎨 Frontend Tech

- **React 18** with Hooks
- **Vite** for fast development
- **CSS3** with custom design
- **Fetch API** for backend calls

## 🔧 Backend Tech

- **Express.js** server
- **Prisma** ORM
- **PostgreSQL** database
- **Base-62 encoding** for short codes

---

Happy URL shortening! 🎉
