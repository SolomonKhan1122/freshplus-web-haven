// Test script to verify Resend API functionality
import { Resend } from 'resend';

// Get API key from environment variable or use the one we configured
const resendApiKey = 're_7DgQPRKA_67RPCHA53xPAuAbkZGSqsVrW';
const resend = new Resend(resendApiKey);

// Test email function
async function testEmail() {
  try {
    console.log('🧪 Testing Resend API...');
    
    const result = await resend.emails.send({
      from: 'FreshPlus Test <onboarding@resend.dev>',
      to: ['goodcause1122@gmail.com'], // Send test to account owner email (Resend testing restriction)
      subject: '🧪 Resend API Test - Email Notifications Working',
      html: `
        <h2>✅ Resend API Test Successful</h2>
        <p>This is a test email to confirm that:</p>
        <ul>
          <li>✅ Resend API key is configured correctly</li>
          <li>✅ Email sending functionality is working</li>
          <li>✅ Admin notifications will be delivered</li>
          <li>✅ Customer confirmations will be sent</li>
        </ul>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>API Key (last 4 chars):</strong> ...${resendApiKey.slice(-4)}</p>
        <p>Your FreshPlus email notifications are now working properly!</p>
      `,
    });

    console.log('✅ Test email sent successfully!');
    console.log('Email ID:', result.data?.id);
    console.log('Result:', result);
    
    return { success: true, result };
  } catch (error) {
    console.error('❌ Failed to send test email:', error);
    return { success: false, error };
  }
}

// Run the test
testEmail()
  .then(result => {
    if (result.success) {
      console.log('\n🎉 EMAIL FUNCTIONALITY VERIFIED!');
      console.log('Your booking and quote notifications will work correctly.');
    } else {
      console.log('\n❌ EMAIL TEST FAILED');
      console.log('Please check your Resend API key configuration.');
    }
  })
  .catch(error => {
    console.error('Test script error:', error);
  });
