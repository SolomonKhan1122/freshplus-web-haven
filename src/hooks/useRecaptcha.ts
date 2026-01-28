import { useEffect, useState } from 'react';
import { loadRecaptchaScript, executeRecaptcha } from '@/lib/recaptcha';

/**
 * React hook for reCAPTCHA v3 integration
 * Automatically loads the reCAPTCHA script and provides token generation
 */
export const useRecaptcha = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecaptchaScript()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load reCAPTCHA:', err);
        setError('Failed to load bot protection. Please try again.');
      });
  }, []);

  /**
   * Execute reCAPTCHA and get a token for form submission
   * @param action - The action name (e.g., 'quote_submission')
   * @returns Promise with reCAPTCHA token
   */
  const getRecaptchaToken = async (action: string): Promise<string | null> => {
    if (!isLoaded) {
      console.error('reCAPTCHA not loaded yet');
      return null;
    }

    try {
      const token = await executeRecaptcha(action);
      return token;
    } catch (err) {
      console.error('Failed to execute reCAPTCHA:', err);
      setError('Failed to verify you are human. Please try again.');
      return null;
    }
  };

  return {
    isLoaded,
    error,
    getRecaptchaToken,
  };
};

