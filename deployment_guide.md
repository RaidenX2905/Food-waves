# Step-by-Step Deployment Guide: Food Waves

This guide will walk you through exactly how to deploy your Backend to Render and your Frontend to Vercel, and how to connect them so you only have **one single link** to share on your resume.

---

## 🛑 Step 0: Required Code Adjustments

Before deploying, your React frontend needs to know to talk to the production Render URL instead of `localhost`. 

In your React code, you have `http://localhost:5000` hardcoded in three files:
1. `frontend/src/pages/Menu.jsx`
2. `frontend/src/pages/Reviews.jsx`
3. `frontend/src/pages/Contact.jsx`

Change those lines to use an environment variable. For example, in `Menu.jsx`:
**Change this:**
```javascript
const res = await axios.get('http://localhost:5000/api/menu');
```
**To this:**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const res = await axios.get(`${API_URL}/api/menu`);
```
*(Repeat this pattern for Reviews and Contact. Push these changes to GitHub before proceeding).*

---

## 🟢 Step 1: Deploy Backend to Render

1. Go to [Render.com](https://render.com/) and create a free account (you can sign up with GitHub).
2. Click the **"New +"** button at the top right and select **"Web Service"**.
3. Choose **"Build and deploy from a Git repository"** and connect your GitHub account.
4. Select your `Food-waves` repository.
5. Fill out the configuration form:
   - **Name**: `food-waves-api` (or whatever you prefer)
   - **Root Directory**: `backend` *(⚠️ VERY IMPORTANT)*
   - **Environment**: Node
   - **Region**: Choose the closest one to you
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Scroll down to **Environment Variables** and click "Add Environment Variable":
   - Key: `MONGO_URI`
   - Value: `[Your MongoDB Atlas Connection String]` *(If you don't have one right now, leave it out. The app is built to use mock data securely if this is missing).*
7. Click **"Deploy Web Service"**.
8. Wait a few minutes for the build to finish. Once it says "Live", copy the URL provided at the top left (it will look something like `https://food-waves-api.onrender.com`).

---

## 🔵 Step 2: Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com/) and create a free account (sign up with GitHub).
2. Click **"Add New..."** -> **"Project"**.
3. Find your `Food-waves` repository in the list and click **"Import"**.
4. Configure the Project:
   - **Project Name**: `food-waves`
   - **Framework Preset**: Vercel should auto-detect **Vite**.
   - **Root Directory**: Click "Edit" and change it to `frontend`. *(⚠️ VERY IMPORTANT)*
5. Click to expand the **"Environment Variables"** section:
   - **Name**: `VITE_API_URL`
   - **Value**: Paste the Render URL you copied in Step 1 (e.g., `https://food-waves-api.onrender.com`).
6. Click **"Deploy"**.
7. Wait ~1 minute for Vercel to build the site. 
8. Once finished, Vercel will give you a final `.vercel.app` URL.

---

## 🎉 Step 3: You're Done!

You now have a **single link** (your Vercel URL) to put on your resume. 

When recruiters click your Vercel URL, they will see your beautiful frontend. When they click "Menu" or submit a "Review", your Vercel frontend will silently talk to your Render backend to get/save the data!
