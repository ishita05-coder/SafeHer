# SafeHer AI Platform

SafeHer is a production-ready, full-stack women's safety platform built with the MERN stack (MongoDB, Express, React, Node.js). It provides critical safety features including real-time SOS panic buttons, voice activation, and live location tracking.

## 🌟 Features

- **Secure Authentication:** JWT-based user registration and login system.
- **SOS Panic Button:** Trigger an immediate SOS alert that captures your exact GPS location.
- **Voice Activation:** Hands-free emergency trigger by saying "Help me" or "Emergency" using browser speech recognition.
- **Real-Time Location Tracking:** Instantly fetches and shares your live coordinates (Latitude & Longitude) when an alert is triggered.
- **Emergency Notifications (Twilio):** Automatically dispatches SMS alerts containing a Google Maps link of your location to your designated Emergency Contacts.
- **Fake Call Simulator:** Quickly simulate an incoming call to get out of uncomfortable situations.
- **Modern UI/UX:** Responsive, premium design built with Tailwind CSS and smooth animations via Framer Motion.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Framer Motion, Axios
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), Twilio SDK
- **APIs:** Geolocation API, Web Speech API

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) account/URI
- [Twilio](https://www.twilio.com/) account for SMS notifications

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ishita05-coder/SafeHer.git
   cd SafeHer
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder with the following variables:
   ```env
   NODE_ENV=development
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Setup the Frontend:**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## 📱 Usage

1. Create a new account or login.
2. Add an Emergency Contact to your profile (ensure it's a verified number if using a Twilio Trial account).
3. On the Dashboard, click **Enable Voice SOS** or manually click the **PRESS FOR SOS** button to trigger an alert.
4. An SMS will be dispatched to your contacts with your real-time location.
