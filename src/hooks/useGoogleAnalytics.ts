import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Hook to handle Google Analytics page tracking for React SPA
export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route changes for SPA
    if (typeof gtag !== 'undefined') {
      gtag('config', 'G-VY43MPH5J3', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname
      });
      
      gtag('config', 'AW-17525851975', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname
      });
      
      console.log('📊 Page view tracked:', location.pathname);
    }
  }, [location]);
};

// Function to track custom events
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, parameters);
    console.log('🎯 Event tracked:', eventName, parameters);
  } else {
    console.warn('⚠️ gtag not available for event:', eventName);
  }
};
