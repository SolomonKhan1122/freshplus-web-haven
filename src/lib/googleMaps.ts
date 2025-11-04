/**
 * Google Maps API Loader
 * Dynamically loads the Google Maps JavaScript API with Places library
 */

let googleMapsPromise: Promise<void> | null = null;

export const loadGoogleMapsScript = (): Promise<void> => {
  // Return existing promise if already loading or loaded
  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  // Check if already loaded
  if (window.google?.maps?.places) {
    return Promise.resolve();
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      reject(new Error('Google Maps API key is not configured. Please add VITE_GOOGLE_MAPS_API_KEY to your environment variables.'));
      return;
    }

    // Create callback function
    (window as any).initGoogleMaps = () => {
      resolve();
    };

    // Create and append script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      reject(new Error('Failed to load Google Maps API'));
    };

    document.head.appendChild(script);
  });

  return googleMapsPromise;
};

// Type declarations for Google Maps
declare global {
  interface Window {
    google: typeof google;
    initGoogleMaps: () => void;
  }
}

