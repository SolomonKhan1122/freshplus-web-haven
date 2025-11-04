# Google Maps Address Autocomplete - Implementation Guide

## ✅ What Has Been Implemented

### 1. **Files Created/Modified**
- ✅ `/src/lib/googleMaps.ts` - Google Maps API loader utility
- ✅ `/src/hooks/useGoogleMapsAutocomplete.ts` - Custom React hook for address autocomplete
- ✅ `/src/components/forms/AddressAutocomplete.tsx` - Reusable address autocomplete component
- ✅ `/src/pages/Quote.tsx` - Updated to use AddressAutocomplete
- ✅ `/src/components/forms/LandingPageForm.tsx` - Updated to use AddressAutocomplete
- ✅ `.env.local` - Created with placeholder for API key (you've already added your key)

### 2. **Features Implemented**
✅ **Victoria-Only Restriction**: Autocomplete is strictly limited to Victoria addresses
✅ **Auto-population**: Address, City, and Postcode fields auto-fill from selected address
✅ **Real-time Validation**: Rejects non-Victorian addresses with user-friendly error messages
✅ **Cost Optimization**: Only requests necessary address fields from Google Maps API
✅ **Loading States**: Shows "Powered by Google" badge when API is loaded
✅ **Error Handling**: Graceful fallback if API fails to load
✅ **Toast Notifications**: User feedback when address is selected or errors occur

### 3. **Victoria Bounding Box**
The autocomplete uses these coordinates to restrict searches:
- **North**: -33.98° (Northern Victoria border)
- **South**: -39.16° (Southern Victoria border, includes Melbourne)
- **East**: 150.02° (Eastern Victoria border)
- **West**: 140.96° (Western Victoria border)

With `strictBounds: true`, users cannot select addresses outside Victoria.

---

## 🔧 Environment Setup Status

### ✅ Completed
- [x] `.env.local` file created in project root
- [x] `VITE_GOOGLE_MAPS_API_KEY` added to Vercel environment variables
- [x] API key added to `.env.local` (by you)
- [x] `.env.local` already in `.gitignore`

### 🔐 Google Cloud Console Setup Required

You need to complete these steps in Google Cloud Console:

#### **1. Enable Required APIs**
Go to: https://console.cloud.google.com/apis/library

Enable these APIs:
- ✅ Places API
- ✅ Maps JavaScript API
- ✅ Geocoding API (optional but recommended)

#### **2. Configure API Key Restrictions**

Go to: https://console.cloud.google.com/apis/credentials

**Application Restrictions:**
- Select: `HTTP referrers (websites)`
- Add these referrers:
  ```
  https://freshpluscleaning.com.au/*
  https://*.freshpluscleaning.com.au/*
  https://*.vercel.app/*
  http://localhost:3000/*
  http://localhost:5173/*
  ```

**API Restrictions:**
- Select: `Restrict key`
- Check ONLY:
  - Places API
  - Maps JavaScript API
  - Geocoding API

#### **3. Set Usage Quotas (Recommended)**
Go to: https://console.cloud.google.com/apis/api/places-backend.googleapis.com/quotas

- Set daily limit: `1,000 requests/day` (adjust based on traffic)
- This prevents unexpected charges

#### **4. Set Billing Alerts**
Go to: https://console.cloud.google.com/billing/budgets

- Create budget: $50/month (or your preferred limit)
- Alert thresholds: 50%, 90%, 100%
- Add your email for notifications

---

## 🚀 How to Test

### **Local Development**

1. **Ensure `.env.local` has your API key:**
   ```bash
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyB...your_actual_key
   ```

2. **Restart your dev server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Navigate to a form with address fields:**
   - Quote page: http://localhost:5173/quote
   - Landing pages: 
     - http://localhost:5173/pressure-washing
     - http://localhost:5173/tile-grout
     - http://localhost:5173/end-of-lease

4. **Test address autocomplete:**
   - Type "123 Collins Street" → Should show Melbourne addresses
   - Type "456 Chapel Street" → Should show South Yarra addresses
   - Type "Sydney" → Should NOT show results (Victoria only!)

### **Expected Behavior**

✅ **Should Work:**
- Melbourne addresses (e.g., "123 Collins Street, Melbourne VIC 3000")
- Geelong addresses
- All Victorian suburbs
- Auto-fills City and Postcode fields

❌ **Should NOT Work:**
- Sydney addresses (shows error: "We only service Victoria")
- Brisbane, Adelaide, Perth addresses
- Any non-Victorian addresses

---

## 📊 Cost Information

### **Google Maps Pricing**
- **Autocomplete - Per Session**: ~$0.017 per session
- **Free Tier**: First $200/month free (≈11,700 sessions)
- **Session**: Starts when user types, ends when they select an address

### **Cost Optimization Implemented**
✅ Only requests necessary fields (`address_components`, `formatted_address`, `geometry`)
✅ Uses session-based pricing (cheapest option)
✅ Restricts to Victoria to reduce irrelevant API calls

---

## 🐛 Troubleshooting

### **Issue: Autocomplete not showing**
**Solution:**
1. Check browser console for errors
2. Verify API key in `.env.local`
3. Restart dev server after adding API key
4. Check Google Cloud Console → APIs enabled
5. Check API key restrictions allow your domain

### **Issue: "Failed to load Google Maps API"**
**Solution:**
1. Check API key is valid
2. Verify Maps JavaScript API is enabled in Google Cloud
3. Check browser console for specific error
4. Verify API key has correct HTTP referrer restrictions

### **Issue: Sydney/non-Victorian addresses showing**
**Solution:**
1. Verify `strictBounds: true` in `useGoogleMapsAutocomplete.ts`
2. Check Victoria bounding box coordinates are correct
3. The state validation (`state === 'VIC'`) should still catch it

### **Issue: Form fields not auto-populating**
**Solution:**
1. Ensure form is wrapped with `FormProvider` (should be automatic with `<Form>`)
2. Check field names match: `address`, `city`, `postcode`
3. Check browser console for validation errors

---

## 🔄 Next Steps

1. ✅ **Complete Google Cloud Console setup** (follow steps above)
2. ✅ **Test thoroughly** on local development
3. ✅ **Deploy to Vercel** (API key already added to environment variables)
4. ✅ **Test on production** with real Victorian addresses
5. ✅ **Monitor usage** in Google Cloud Console billing section

---

## 📝 Files Reference

### **Where to find the implementation:**

**Main Hook:**
- `/src/hooks/useGoogleMapsAutocomplete.ts` - Contains Victoria restrictions and logic

**Component:**
- `/src/components/forms/AddressAutocomplete.tsx` - Reusable component for any form

**Used In:**
- `/src/pages/Quote.tsx` - Quote request form
- `/src/components/forms/LandingPageForm.tsx` - Landing page forms (Pressure Washing, Tile & Grout, End of Lease)

**Utility:**
- `/src/lib/googleMaps.ts` - Google Maps API loader

---

## 🎉 Ready to Use!

The implementation is complete and ready to use. Just complete the Google Cloud Console setup steps and test it out!

If you have any issues, check the troubleshooting section or review the browser console for specific error messages.

