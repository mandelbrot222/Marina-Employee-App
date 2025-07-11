# Marina Employee App

This project contains an Express backend and a Vite React frontend. The app allows employees to login with a personal code and access scheduling and request tools.

## Development

Install dependencies and start both the server and the React app in development mode:

```bash
cd frontend
npm install
npm run dev
```

In another terminal run the API server:

```bash
node index.js
```

The React dev server runs on port 5173 and the API runs on port 5000.

## Production build

To build the frontend and serve it from Express:

```bash
cd frontend
npm install
npm run build
```

Start the server and it will automatically serve the files from `frontend/dist`:

```bash
node index.js
```
