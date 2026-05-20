import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const FakeCall = () => {
  const [isRinging, setIsRinging] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [callerName, setCallerName] = useState('Dad');
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/fake_call_audio.mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const startFakeCall = () => {
    setIsRinging(true);
  };

  const acceptCall = () => {
    setIsRinging(false);
    setIsActive(true);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.error('Audio error:', err));
    }
  };

  const declineCall = () => {
    setIsRinging(false);
    setIsActive(false);
    setTimer(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    navigate('/dashboard');
  };

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-between py-16 px-6 font-sans">
      {!isRinging && !isActive && (
        <div className="flex flex-col items-center w-full max-w-sm mt-20">
          <h2 className="text-2xl mb-6">Setup Fake Call</h2>
          <input 
            type="text" 
            value={callerName} 
            onChange={(e) => setCallerName(e.target.value)}
            placeholder="Caller Name"
            className="w-full p-4 mb-4 bg-slate-800 rounded-lg text-white"
          />
          <button 
            onClick={startFakeCall}
            className="w-full py-4 bg-green-500 rounded-lg font-bold text-xl"
          >
            Trigger Call Now
          </button>
        </div>
      )}

      {(isRinging || isActive) && (
        <>
          <div className="flex flex-col items-center mt-10">
            <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center text-4xl mb-6 shadow-xl">
              👤
            </div>
            <h1 className="text-4xl font-light tracking-wider">{callerName}</h1>
            <p className="text-slate-400 mt-2 text-lg">
              {isRinging ? 'Incoming call...' : formatTime(timer)}
            </p>
          </div>

          <div className="w-full max-w-sm grid grid-cols-3 gap-6 mb-12">
             <div className="flex flex-col items-center gap-2">
               <button className="w-16 h-16 rounded-full bg-slate-800 text-xl">🔇</button>
               <span className="text-xs text-slate-400">mute</span>
             </div>
             <div className="flex flex-col items-center gap-2">
               <button className="w-16 h-16 rounded-full bg-slate-800 text-xl">⌨️</button>
               <span className="text-xs text-slate-400">keypad</span>
             </div>
             <div className="flex flex-col items-center gap-2">
               <button className="w-16 h-16 rounded-full bg-slate-800 text-xl">🔊</button>
               <span className="text-xs text-slate-400">speaker</span>
             </div>
          </div>

          <div className="w-full max-w-sm flex justify-between px-8 pb-10">
            {isRinging && (
              <button 
                onClick={declineCall}
                className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center text-3xl shadow-lg shadow-red-500/40 animate-pulse"
              >
                📞
              </button>
            )}
            {isRinging && (
              <button 
                onClick={acceptCall}
                className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-3xl shadow-lg shadow-green-500/40 animate-pulse"
              >
                📞
              </button>
            )}
            {isActive && (
              <button 
                onClick={declineCall}
                className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center text-3xl shadow-lg shadow-red-500/40 mx-auto"
              >
                📞
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FakeCall;
