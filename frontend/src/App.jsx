import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FakeCall from './pages/FakeCall';
import Contacts from './pages/Contacts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-pink-500 selection:text-white">
            <header className="glass fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                SafeHer AI
              </h1>
              <nav>
                <Link to="/login" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 transition-colors rounded-lg font-medium shadow-lg shadow-pink-500/30">
                  Login
                </Link>
              </nav>
            </header>

            <main className="pt-24 px-6 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col items-center justify-center">
              <div className="text-center space-y-6 max-w-2xl">
                <h2 className="text-5xl font-extrabold leading-tight">
                  Smart Women Safety & <br/>
                  <span className="text-pink-500">Emergency Platform</span>
                </h2>
                <p className="text-slate-400 text-lg">
                  Empowering women with real-time SOS alerts, AI threat detection, and live location tracking.
                </p>
                
                <div className="pt-8">
                  <Link to="/register" className="relative group inline-flex h-16 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-600 px-8 font-medium text-white transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-pink-500/40">
                    <span className="absolute -inset-1 rounded-full bg-pink-500 opacity-20 group-hover:opacity-40 blur transition duration-200"></span>
                    <span className="relative flex items-center gap-2 text-xl font-bold uppercase tracking-wider">
                      Setup SafeHer Now
                    </span>
                  </Link>
                </div>
              </div>
            </main>
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fake-call" element={<FakeCall />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Router>
  );
}

export default App;
