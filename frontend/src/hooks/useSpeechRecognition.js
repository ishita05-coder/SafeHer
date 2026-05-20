import { useState, useEffect, useRef } from 'react';

const useSpeechRecognition = (onEmergencyPhraseDetected) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          const transcript = event.results[i][0].transcript.toLowerCase();
          console.log('Voice Detected:', transcript);
          if (
            transcript.includes('help me') ||
            transcript.includes('save me') ||
            transcript.includes('emergency')
          ) {
            onEmergencyPhraseDetected();
          }
        }
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      // Restart if it stops automatically but we want it to listen
      if (isListening) {
        recognitionRef.current.start();
      }
    };

  }, [onEmergencyPhraseDetected, isListening]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return { isListening, toggleListening };
};

export default useSpeechRecognition;
