/**
 * Vercel Serverless Function to verify reCAPTCHA v3 tokens
 * This keeps your secret key secure on the backend
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ 
        success: false, 
        error: 'reCAPTCHA token is required' 
      });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not configured');
      return res.status(500).json({ 
        success: false, 
        error: 'Server configuration error' 
      });
    }

    // Verify token with Google
    const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const verificationResponse = await fetch(verificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const verificationData = await verificationResponse.json();

    // Check if verification was successful
    if (!verificationData.success) {
      return res.status(400).json({
        success: false,
        score: 0,
        error: 'reCAPTCHA verification failed',
        details: verificationData['error-codes'],
      });
    }

    // reCAPTCHA v3 returns a score between 0.0 (bot) and 1.0 (human)
    const score = verificationData.score || 0;
    const action = verificationData.action || '';

    // Lenient threshold: 0.5 (recommended for customer-facing forms)
    // Adjust this value if needed:
    // - 0.3: Very lenient (blocks only obvious bots)
    // - 0.5: Balanced (recommended)
    // - 0.7: Strict (might block some real users)
    const SCORE_THRESHOLD = 0.5;

    if (score < SCORE_THRESHOLD) {
      return res.status(400).json({
        success: false,
        score,
        action,
        error: 'Bot detected. Please try again or contact us directly.',
      });
    }

    // Success! User is verified as human
    return res.status(200).json({
      success: true,
      score,
      action,
      message: 'Verification successful',
    });

  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error during verification',
    });
  }
}

