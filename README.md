# Food Waves 🌊

A modern, production-ready full-stack restaurant web application developed for professional showcasing. Designed with a mobile-first approach, it features a sleek dark UI with glassmorphism, fluid animations, and a seamless user experience.

## 📌 Features

### Frontend (Client)
- **Framework:** React + Vite
- **Styling:** Tailwind CSS (custom design system)
- **Animations:** Framer Motion (page transitions & micro-interactions)
- **Routing:** React Router DOM (SPA)
- **API Client:** Axios
- **Icons:** Lucide React
- **Performance:** Optimized for a Lighthouse score ≥ 90 (Accessibility & Performance)
- **Responsive:** Mobile-first design principles.

### Backend (Server)
- **Runtime:** Node.js + Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Security:** Helmet, CORS, Express-validator
- **Architecture:** MVC (Model-View-Controller) structure
- **Resilience:** Graceful fallback to mock data if MongoDB is unreachable or unconfigured.

## 🚀 Live Demo

- **Frontend:** [Deployment Link Here (e.g., Vercel)](#)
- **Backend API:** [Deployment Link Here (e.g., Render)](#)

## 💻 Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account (Free Cluster)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/food-waves.git
cd food-waves
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file in the `backend` directory (refer to `.env.example`).
- Add your `MONGO_URI`. If not added, the server will run in "Mock Data Mode" securely.
- Start the server:
```bash
npm run dev
```
The backend will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
- To start the development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📡 API Documentation

### `GET /api/menu`
Fetches all menu items. Includes fallback mock data.

### `POST /api/menu`
Adds a new menu item.

### `GET /api/reviews`
Fetches all customer reviews.

### `POST /api/reviews`
Submits a new customer review. Includes validation.

### `POST /api/contact`
Submits a contact form message. Includes validation.


## 🛠️ Deployment Instructions

### Deploying Frontend (Vercel recommended for SPA)
1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Set the Framework Preset to **Vite**.
4. Set the Root Directory to `frontend`.
5. Ensure `vercel.json` is present so React Router handles paths correctly.
6. Click Deploy.

### Deploying Backend (Render Free Tier)
1. Go to [Render](https://render.com) and deploy a "Web Service".
2. Connect your GitHub repository.
3. Set the Root Directory to `backend`.
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add Environment Variables:
   - `MONGO_URI` = your Production MongoDB Connection String.
   - `PORT` = `5000`
7. _Note on Free Tier_: Render free instances spin down after 15m of inactivity. The `/health` endpoint is configured to allow health checks/pinging if you choose to set up uptime monitoring.

## 📝 License
This project is open-source and available under the ISC License.
