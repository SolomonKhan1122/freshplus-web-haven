/**
 * Google reCAPTCHA v3 Integration
 * Provides invisible bot protection with score-based validation
 */

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let recaptchaLoaded = false;
let recaptchaLoadPromise: Promise<void> | null = null;

/**
 * Load the reCAPTCHA v3 script dynamically
 */
export const loadRecaptchaScript = (): Promise<void> => {
  if (recaptchaLoaded) {
    return Promise.resolve();
  }

  if (recaptchaLoadPromise) {
    return recaptchaLoadPromise;
  }

  recaptchaLoadPromise = new Promise((resolve, reject) => {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    if (!siteKey) {
      reject(new Error('reCAPTCHA site key is not configured'));
      return;
    }

    // Check if script already exists
    if (document.querySelector('script[src*="recaptcha"]')) {
      recaptchaLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      recaptchaLoaded = true;
      resolve();
    };

    script.onerror = () => {
      reject(new Error('Failed to load reCAPTCHA script'));
    };

    document.head.appendChild(script);
  });

  return recaptchaLoadPromise;
};

/**
 * Execute reCAPTCHA and get a token
 * @param action - The action name (e.g., 'quote_form', 'contact_form')
 * @returns Promise with reCAPTCHA token
 */
export const executeRecaptcha = async (action: string): Promise<string> => {
  try {
    await loadRecaptchaScript();

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      throw new Error('reCAPTCHA site key is not configured');
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(siteKey, { action });
          resolve(token);
        } catch (error) {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('reCAPTCHA execution failed:', error);
    throw error;
  }
};

/**
 * Verify reCAPTCHA token on the server
 * @param token - The reCAPTCHA token from executeRecaptcha
 * @returns Promise with verification result and score
 */
export const verifyRecaptchaToken = async (
  token: string
): Promise<{ success: boolean; score: number; action: string }> => {
  try {
    const response = await fetch('/api/verify-recaptcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error('Failed to verify reCAPTCHA');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    throw error;
  }
};

