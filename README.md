# 1Fi

A modern full-stack smartphone financing platform that enables users to browse flagship devices, configure editions and colors, and select flexible EMI installment plans backed by investment portfolios.

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

## Deployment

### Backend (Render)
1. Create a new **Web Service** on Render connecting this repository.
2. Configuration:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
3. Environment Variables:
   - `MONGODB_URI`: MongoDB Atlas connection URI
   - `CLIENT_ORIGIN`: Deployed Vercel frontend URL (or `*`)

### Frontend (Vercel)
1. Import this repository on Vercel.
2. Configuration:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
3. Environment Variables:
   - `VITE_API_URL`: Deployed Render backend URL
