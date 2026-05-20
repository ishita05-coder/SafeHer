import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import useLocation from '../hooks/useLocation';
import useSpeechRecognition from '../hooks/useSpeechRecognition';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { location, error: locationError } = useLocation();
  const [isSOSActive, setIsSOSActive] = useState(user?.isSOSActive || false);
  const [loading, setLoading] = useState(false);

  const handleVoiceSOS = async () => {
    if (!isSOSActive) {
      handleSOS('voice');
    }
  };

  const { isListening, toggleListening } = useSpeechRecognition(handleVoiceSOS);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSOS = async (triggerMethod = 'button') => {
    if (!location) {
      alert('Location not available yet. Please wait or check permissions.');
      return;
    }

    setLoading(true);
    try {
      if (isSOSActive) {
        await api.put('/sos/cancel');
        setIsSOSActive(false);
      } else {
        await api.post('/sos/trigger', { location, triggerMethod });
        setIsSOSActive(true);
      }
    } catch (error) {
      alert('Error toggling SOS: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="glass p-4 rounded-xl flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          SafeHer Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-slate-300">Hello, {user?.name}</span>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-700"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={`glass p-6 rounded-2xl border-l-4 transition-transform ${isSOSActive ? 'border-red-500 scale-105' : 'border-pink-500'}`}>
          <h2 className="text-xl font-semibold mb-2">SOS Alert</h2>
          <p className="text-slate-400 text-sm mb-4">
            {isSOSActive ? 'SOS is currently ACTIVE. Help is on the way.' : 'Trigger an emergency alert to all your contacts.'}
          </p>
          <button 
            onClick={() => handleSOS('button')}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
              isSOSActive 
                ? 'bg-slate-800 hover:bg-slate-700 shadow-slate-900/50' 
                : 'bg-red-600 hover:bg-red-700 shadow-red-500/40 animate-pulse'
            }`}
          >
            {loading ? 'Processing...' : (isSOSActive ? 'CANCEL SOS' : 'PRESS FOR SOS')}
          </button>
          {locationError && <p className="text-xs text-red-400 mt-2">{locationError}</p>}
        </div>

        <div className="glass p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Live Location</h2>
            <p className="text-slate-400 text-sm">Share your real-time location with trusted contacts.</p>
          </div>
          <div className="mt-4 p-3 bg-slate-800 rounded-lg text-xs font-mono text-slate-300">
            {location ? `Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)}` : 'Locating...'}
          </div>
        </div>

        <div className="glass p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Voice Activation</h2>
          <p className="text-slate-400 text-sm mb-4">Say "Help me" or "Emergency" to automatically trigger SOS.</p>
          <button 
            onClick={toggleListening}
            className={`w-full py-3 rounded-lg font-bold transition-colors ${
              isListening ? 'bg-green-600 hover:bg-green-700 shadow-green-500/30 shadow-lg' : 'bg-slate-800 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            {isListening ? 'Listening (Active)' : 'Enable Voice SOS'}
          </button>
        </div>

        <div 
          onClick={() => navigate('/fake-call')}
          className="glass p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2">Fake Call</h2>
          <p className="text-slate-400 text-sm">Simulate an incoming call to get out of uncomfortable situations.</p>
          <button className="mt-4 text-pink-400 text-sm font-medium hover:text-pink-300">
            Setup Call →
          </button>
        </div>

        <div className="glass p-6 rounded-2xl hover:scale-105 transition-transform cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">Emergency Contacts</h2>
          <p className="text-slate-400 text-sm">Manage who gets notified in an emergency.</p>
          <button className="mt-4 text-pink-400 text-sm font-medium hover:text-pink-300">
            View Contacts →
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
