-- Create email_templates table for FreshPlus
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS public.email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  subject text NOT NULL,
  html text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS and allow reads for anon users
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read for all" ON public.email_templates FOR SELECT USING (true);

-- Insert email templates
INSERT INTO public.email_templates (key, subject, html) VALUES 
(
  'booking_customer',
  '✅ Booking Confirmed - FreshPlus Professional Cleaning Service',
  '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Booking Confirmed - FreshPlus</title></head><body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,''Segoe UI'',Roboto,''Helvetica Neue'',Arial,sans-serif;color:#111827">
  <div style="max-width:640px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,.08)">
    <div style="background:linear-gradient(135deg,#1e3a8a 0%,#1e40af 100%);color:#fff;padding:28px 24px;text-align:center">
      <div style="font-size:28px;font-weight:900"><span style="color:#fbbf24">Fresh</span>Plus</div>
      <div style="opacity:.9">Professional Cleaning Services</div>
    </div>
    <div style="padding:24px">
      <h2 style="color:#1e3a8a;margin:0 0 8px">Booking Confirmed</h2>
      <p style="margin:0 0 12px">Hi {{name}}, your booking has been received. We''ll be in touch shortly with confirmation details.</p>
      <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;padding:12px 16px">
        <p style="margin:0 0 6px"><strong>Service:</strong> {{service}}</p>
        <p style="margin:0 0 6px"><strong>Date:</strong> {{service_date}}</p>
        <p style="margin:0 0 6px"><strong>Time:</strong> {{service_time}}</p>
        <p style="margin:0 0 6px"><strong>Address:</strong> {{address}}</p>
        <p style="margin:0 0 6px"><strong>Phone:</strong> {{phone}}</p>
        {{#special_instructions}}<p style="margin:0 0 6px"><strong>Notes:</strong> {{special_instructions}}</p>{{/special_instructions}}
      </div>
    </div>
    <div style="background:#f9fafb;color:#6b7280;font-size:12px;text-align:center;padding:16px">Fresh Plus Professional Cleaning Services · Melbourne, AU</div>
  </div>
</body></html>'
),
(
  'booking_admin',
  '🚨 New Booking Alert - {{name}} - {{service}}',
  '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"/><title>New Booking - FreshPlus Admin</title></head><body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,''Segoe UI'',Roboto,''Helvetica Neue'',Arial,sans-serif;color:#111827">
  <div style="max-width:640px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,.08)">
    <div style="background:linear-gradient(135deg,#1e3a8a 0%,#1e40af 100%);color:#fff;padding:28px 24px;text-align:center">
      <div style="font-size:28px;font-weight:900"><span style="color:#fbbf24">Fresh</span>Plus</div>
      <div style="opacity:.9">Professional Cleaning Services</div>
    </div>
    <div style="padding:24px">
      <div style="background:#dc2626;color:#fff;padding:12px 16px;border-radius:8px;margin-bottom:12px;text-align:center;font-weight:700">NEW BOOKING ALERT</div>
      <div style="background:#fef3f2;border:1px solid #fecaca;border-radius:8px;padding:12px 16px">
        <p style="margin:0 0 6px"><strong>Name:</strong> {{name}}</p>
        <p style="margin:0 0 6px"><strong>Email:</strong> {{email}}</p>
        <p style="margin:0 0 6px"><strong>Phone:</strong> {{phone}}</p>
        <p style="margin:0 0 6px"><strong>Service:</strong> {{service}}</p>
        <p style="margin:0 0 6px"><strong>Date:</strong> {{service_date}}</p>
        <p style="margin:0 0 6px"><strong>Time:</strong> {{service_time}}</p>
        <p style="margin:0 0 6px"><strong>Address:</strong> {{address}}</p>
        {{#special_instructions}}<p style="margin:0 0 6px"><strong>Notes:</strong> {{special_instructions}}</p>{{/special_instructions}}
      </div>
    </div>
    <div style="background:#f9fafb;color:#6b7280;font-size:12px;text-align:center;padding:16px">Fresh Plus Professional Cleaning Services · Melbourne, AU</div>
  </div>
</body></html>'
),
(
  'quote_customer',
  '📋 Quote Request Received - FreshPlus Professional Cleaning Service',
  '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Quote Request Received - FreshPlus</title></head><body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,''Segoe UI'',Roboto,''Helvetica Neue'',Arial,sans-serif;color:#111827">
  <div style="max-width:640px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,.08)">
    <div style="background:linear-gradient(135deg,#1e3a8a 0%,#1e40af 100%);color:#fff;padding:28px 24px;text-align:center">
      <div style="font-size:28px;font-weight:900"><span style="color:#fbbf24">Fresh</span>Plus</div>
      <div style="opacity:.9">Professional Cleaning Services</div>
    </div>
    <div style="padding:24px">
      <h2 style="color:#1e3a8a;margin:0 0 8px">Quote Request Received</h2>
      <p style="margin:0 0 12px">Hi {{name}}, thanks for contacting FreshPlus. We''ll get back to you within 24 hours with your personalized quote.</p>
      <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;padding:12px 16px">
        <p style="margin:0 0 6px"><strong>Address:</strong> {{address}}, {{city}} {{postcode}}</p>
        <p style="margin:0 0 6px"><strong>Services:</strong> {{services}}</p>
        <p style="margin:0 0 6px"><strong>Preferred date:</strong> {{preferred_date}}</p>
        {{#job_description}}<p style="margin:0 0 6px"><strong>Notes:</strong> {{job_description}}</p>{{/job_description}}
      </div>
    </div>
    <div style="background:#f9fafb;color:#6b7280;font-size:12px;text-align:center;padding:16px">Fresh Plus Professional Cleaning Services · Melbourne, AU</div>
  </div>
</body></html>'
),
(
  'quote_admin',
  '💰 New Quote Request - {{name}}',
  '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"/><title>New Quote Request - FreshPlus Admin</title></head><body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,''Segoe UI'',Roboto,''Helvetica Neue'',Arial,sans-serif;color:#111827">
  <div style="max-width:640px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,.08)">
    <div style="background:linear-gradient(135deg,#1e3a8a 0%,#1e40af 100%);color:#fff;padding:28px 24px;text-align:center">
      <div style="font-size:28px;font-weight:900"><span style="color:#fbbf24">Fresh</span>Plus</div>
      <div style="opacity:.9">Professional Cleaning Services</div>
    </div>
    <div style="padding:24px">
      <div style="background:#059669;color:#fff;padding:12px 16px;border-radius:8px;margin-bottom:12px;text-align:center;font-weight:700">NEW QUOTE REQUEST</div>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px 16px">
        <p style="margin:0 0 6px"><strong>Name:</strong> {{name}}</p>
        <p style="margin:0 0 6px"><strong>Email:</strong> {{email}}</p>
        <p style="margin:0 0 6px"><strong>Phone:</strong> {{phone1}}{{#phone2}}, {{phone2}}{{/phone2}}</p>
        <p style="margin:0 0 6px"><strong>Address:</strong> {{address}}, {{city}} {{postcode}}</p>
        <p style="margin:0 0 6px"><strong>Services:</strong> {{services}}</p>
        <p style="margin:0 0 6px"><strong>Preferred date:</strong> {{preferred_date}}</p>
        {{#job_description}}<p style="margin:0 0 6px"><strong>Description:</strong> {{job_description}}</p>{{/job_description}}
      </div>
    </div>
    <div style="background:#f9fafb;color:#6b7280;font-size:12px;text-align:center;padding:16px">Fresh Plus Professional Cleaning Services · Melbourne, AU</div>
  </div>
</body></html>'
);
