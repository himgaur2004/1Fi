# 1Fi

A modern full-stack smartphone financing platform that enables users to browse flagship devices, configure editions and colors, and select flexible EMI installment plans backed by investment portfolios.

---

## Live Deployments

- **Frontend (Vercel)**: [https://1-fi-eight.vercel.app/](https://1-fi-eight.vercel.app/)
- **Backend API (Render)**: [https://onefi-zkkz.onrender.com/](https://onefi-zkkz.onrender.com/)

> **Important**: If the backend has been idle, Render's free tier spins down the web service. Please open the [Render backend link](https://onefi-zkkz.onrender.com/api/health) first to wake up the server (~30 seconds on cold start), and then open the [Vercel frontend link](https://1-fi-eight.vercel.app/) to experience the fully functional catalog and EMI configurator.

---

## Features
- **Interactive Catalog**: Browse flagship devices with real-time pricing and verified seller guarantees.
- **Interactive Gallery**: Multi-angle high-resolution product photography with hover magnification zoom.
- **Flexible Installment Plans**: Interactive tenure selector supporting 3 to 60-month schedules with zero-interest tenures and cashback rewards.
- **Delivery Verification**: Instant delivery date and PIN code checker.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose

---

## Local Development

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## Deployment Configuration

### Backend (Render)
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `MONGODB_URI`: MongoDB Atlas connection URI
  - `CLIENT_ORIGIN`: `*` (or your Vercel URL)

### Frontend (Vercel)
- **Root Directory**: `frontend`
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL`: `https://onefi-zkkz.onrender.com`
