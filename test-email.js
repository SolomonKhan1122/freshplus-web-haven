// Simple email test script
import { sendBookingEmails, sendQuoteEmails } from './src/lib/emailService.ts';

console.log('🧪 Testing email functionality...');

// Test booking email
const testBooking = {
  id: 'test-booking-123',
  name: 'John Test',
  email: 'john.test@example.com',
  phone: '+61 400 123 456',
  service: 'end-of-lease',
  address: '123 Test Street, Melbourne VIC 3000',
  service_date: '2024-02-15',
  service_time: '09:00',
  special_instructions: 'This is a test booking'
};

// Test quote email
const testQuote = {
  id: 'test-quote-456',
  name: 'Jane Test',
  address: '456 Quote Street',
  city: 'Melbourne',
  postcode: '3000',
  phone1: '+61 400 789 012',
  phone2: null,
  email: 'jane.test@example.com',
  services: ['end-of-lease', 'carpet-dry'],
  preferred_date: '2024-02-20',
  job_description: 'This is a test quote request'
};

async function testEmails() {
  try {
    console.log('\n📧 Testing booking emails...');
    const bookingResult = await sendBookingEmails(testBooking);
    console.log('Booking email result:', bookingResult);

    console.log('\n📧 Testing quote emails...');
    const quoteResult = await sendQuoteEmails(testQuote);
    console.log('Quote email result:', quoteResult);

    console.log('\n✅ Email tests completed!');
  } catch (error) {
    console.error('❌ Email test failed:', error);
  }
}

testEmails();
