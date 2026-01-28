# Google Maps Autocomplete - Testing Checklist

## ✅ Pre-Testing Setup

Before testing, ensure:
- [x] `.env.local` file exists with `VITE_GOOGLE_MAPS_API_KEY=your_key`
- [x] Dev server restarted after adding API key
- [x] Google Cloud Console APIs enabled (Places API, Maps JavaScript API)
- [x] API key restrictions configured in Google Cloud Console

---

## 🧪 Test Scenarios

### **Test 1: Victoria Address - Should Work ✅**

**Location:** http://localhost:5173/quote

1. Click on "Street Address" field
2. Type: `123 Collins`
3. **Expected:** Dropdown shows Melbourne addresses
4. Select: `123 Collins St, Melbourne VIC 3000`
5. **Expected:** 
   - ✅ Address field: `123 Collins St`
   - ✅ City field: `Melbourne`
   - ✅ Postcode field: `3000`
   - ✅ Green success toast: "Address selected - Melbourne, VIC 3000"

---

### **Test 2: Another Victoria Address - Should Work ✅**

**Location:** http://localhost:5173/quote

1. Clear the form
2. Type: `456 Chapel Street`
3. **Expected:** Dropdown shows South Yarra addresses
4. Select: `456 Chapel St, South Yarra VIC 3141`
5. **Expected:**
   - ✅ Address: `456 Chapel St`
   - ✅ City: `South Yarra`
   - ✅ Postcode: `3141`
   - ✅ Success toast displayed

---

### **Test 3: Geelong Address - Should Work ✅**

**Location:** http://localhost:5173/quote

1. Type: `45 Malop Street, Geelong`
2. **Expected:** Dropdown shows Geelong addresses
3. Select any Geelong address
4. **Expected:**
   - ✅ All fields populated correctly
   - ✅ City shows Geelong suburb
   - ✅ Postcode in 3200s range
   - ✅ Success toast displayed

---

### **Test 4: Non-Victoria Address - Should FAIL ❌**

**Location:** http://localhost:5173/quote

1. Type: `Circular Quay, Sydney`
2. **Expected:** 
   - ❌ Either no results shown (strictBounds working)
   - ❌ OR if result appears and user selects it: Red error toast
   - ❌ Error message: "Sorry, Fresh Plus Cleaning only services addresses in Victoria, Australia"
   - ❌ Address field cleared automatically

---

### **Test 5: Brisbane Address - Should FAIL ❌**

**Location:** http://localhost:5173/quote

1. Type: `Queen Street, Brisbane`
2. **Expected:**
   - ❌ No results OR error on selection
   - ❌ Fields not populated
   - ❌ Error toast if selected

---

### **Test 6: Landing Page Form - Pressure Washing**

**Location:** http://localhost:5173/pressure-washing

1. Scroll to "Get a Quote" form
2. Test with: `789 Burke Road, Camberwell`
3. **Expected:**
   - ✅ Autocomplete works
   - ✅ Fields auto-populate
   - ✅ Toast notification shows
   - ✅ City: `Camberwell`, Postcode: `3124`

---

### **Test 7: Landing Page Form - Tile & Grout**

**Location:** http://localhost:5173/tile-grout

1. Test form with another Melbourne address
2. **Expected:** Same behavior as main quote form

---

### **Test 8: Landing Page Form - End of Lease**

**Location:** http://localhost:5173/end-of-lease

1. Test form with another Melbourne address
2. **Expected:** Same behavior as main quote form

---

### **Test 9: Manual Input Still Works**

**Location:** http://localhost:5173/quote

1. Type a custom address manually (don't select from dropdown): `999 Made Up Street`
2. Manually enter City: `Melbourne`
3. Manually enter Postcode: `3000`
4. **Expected:**
   - ✅ Form accepts manual input
   - ✅ No errors
   - ✅ Form submission should still work

---

### **Test 10: Edge Case - Partial Selection**

**Location:** http://localhost:5173/quote

1. Start typing: `123 Swanston`
2. Click away WITHOUT selecting from dropdown
3. **Expected:**
   - ❌ Fields remain empty OR show what was typed
   - ⚠️ User can still manually enter details

---

## 🔍 Visual Checks

### **When API Loads Successfully:**
- ✅ Small "Powered by Google" logo appears on the right side of address field
- ✅ Dropdown suggestions appear smoothly when typing

### **When Typing:**
- ✅ Dropdown appears after 2-3 characters
- ✅ Only Australian addresses shown
- ✅ Addresses include street number, street name, suburb, state, postcode

### **After Selection:**
- ✅ Green success toast at top-right
- ✅ All three fields (Address, City, Postcode) filled instantly
- ✅ City and Postcode fields become read-only (greyed out background)
- ✅ Form validation passes (no red error messages)

---

## 🐛 What to Check If Something Fails

### **No dropdown appears:**
1. Open browser console (F12)
2. Look for errors like:
   - `Failed to load Google Maps API`
   - `API key not configured`
   - `This API project is not authorized...`
3. Check:
   - `.env.local` file has correct API key
   - Dev server restarted
   - APIs enabled in Google Cloud Console

### **Sydney/Brisbane addresses showing:**
1. Check browser console for warnings
2. Verify `strictBounds: true` in code
3. Even if shown, selection should trigger error toast

### **Fields not auto-populating:**
1. Check browser console for errors
2. Look for validation errors
3. Verify field names match: `address`, `city`, `postcode`

### **"Powered by Google" not showing:**
- API might not have loaded yet (wait a few seconds)
- Check browser console for loading errors

---

## 📊 Success Criteria

### **All tests pass if:**
- ✅ Victorian addresses work smoothly
- ✅ Non-Victorian addresses are blocked or show error
- ✅ All three fields auto-populate on selection
- ✅ Manual input still works as fallback
- ✅ Works on all forms (Quote + Landing Pages)
- ✅ No console errors
- ✅ Toast notifications appear correctly
- ✅ Form can be submitted successfully

---

## 🚀 Production Testing

After deploying to Vercel:

1. Test on: https://freshpluscleaning.com.au/quote
2. Repeat all test scenarios above
3. Verify API key restrictions working (domain-locked)
4. Check Google Cloud Console → Metrics for API usage

---

## 📞 Support

If tests fail and you can't resolve:
1. Check `GOOGLE_MAPS_SETUP.md` for detailed troubleshooting
2. Review browser console errors
3. Verify Google Cloud Console configuration
4. Check API quota/billing status

---

**All implementation complete! Ready for testing.** 🎉

