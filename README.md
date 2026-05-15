# TrimURL - URL Shortener

A modern, aesthetic URL shortener application built with React (frontend) and Express.js (backend).

## Project Structure

```
trimurl/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── URLForm.jsx      # URL input form
│   │   │   ├── URLForm.css
│   │   │   ├── URLList.jsx      # Display shortened URLs
│   │   │   └── URLList.css
│   │   ├── App.jsx              # Main app component
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
└── server/          # Express backend
    ├── routes/
    │   ├── shortenRoute.js      # POST /create - Shorten URL
    │   └── getUrlRoute.js       # GET /:id - Redirect to long URL
    ├── index.js
    ├── package.json
    └── .env
```

## Features

✨ **Frontend**
- Clean, modern UI with gradient background
- Form to input long URLs and optional custom aliases
- Auto-generation of short codes using base-62 encoding
- Display history of shortened URLs
- Copy to clipboard functionality
- Open URLs in new tab
- Real-time feedback and error handling
- Fully responsive design

🚀 **Backend**
- Express.js API server
- PostgreSQL database with Prisma ORM
- Two main routes:
  - `POST /create` - Create shortened URL
  - `GET /:id` - Redirect using short code
- URL deduplication (checks if long URL already exists)
- Custom alias support
- Base-62 encoding for auto-generated codes
- Security through XOR encoding with SECRET_KEY

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL database (for backend)

### Setup

1. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

### Environment Setup

**Server (.env file)**
```
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/trimurl
SECRET_KEY=your_secret_key_here
```

Run migrations:
```bash
cd server
npx prisma migrate dev
```

### Running the Application

**Terminal 1 - Start Backend**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:4000`

**Terminal 2 - Start Frontend**
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:5173`

## API Documentation

### Create Shortened URL
```
POST /create
Content-Type: application/json

Request:
{
  "longurl": "https://example.com/very/long/url",
  "alias": ""  // Optional: leave empty for auto-generation
}

Response (Success):
{
  "msg": "Url has been shortened",
  "hash": "abc123"
}

Response (Custom Alias):
{
  "msg": "url created successfully"
}

Response (Duplicate):
{
  "msg": "url already exists, go to: abc123"
}
```

### Redirect to Original URL
```
GET /:id

Example: GET /abc123
Redirects to: https://example.com/very/long/url
```

## Technology Stack

**Frontend:**
- React 18
- Vite (build tool)
- CSS3 (custom styling)
- Modern JavaScript (ES6+)

**Backend:**
- Express.js
- Prisma ORM
- PostgreSQL
- dotenv (environment variables)

## Component Details

### URLForm Component
- Handles URL input and submission
- Validates URLs
- Shows loading states
- Error and success notifications
- Calls `/create` endpoint

### URLList Component
- Displays history of shortened URLs
- Shows original and short URLs
- Copy to clipboard with feedback
- Open URL in new tab button
- Timestamp display

## Styling Features

- **Color Scheme**: Modern purple gradient with indigo accents
- **Responsive**: Mobile-first design
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: Proper labels, ARIA attributes, keyboard navigation

## Notes

- Frontend communicates with backend on `http://localhost:4000`
- CORS is enabled in Express for local development
- Short URLs are prefixed with the domain running the redirect route
- Database stores both long and short URLs with timestamps

## Future Enhancements

- User authentication and URL history
- Analytics dashboard
- QR code generation
- Link expiration settings
- Rate limiting
- Admin panel