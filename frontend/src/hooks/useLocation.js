import { useState, useEffect } from 'react';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    const success = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setLoading(false);
    };

    const handleError = (err) => {
      setError(err.message);
      setLoading(false);
    };

    // Get current location once
    navigator.geolocation.getCurrentPosition(success, handleError);

    // Watch for location changes
    const watchId = navigator.geolocation.watchPosition(success, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { location, error, loading };
};

export default useLocation;
