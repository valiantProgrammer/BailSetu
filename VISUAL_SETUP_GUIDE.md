# Google OAuth Visual Setup Guide

## 🎯 3-Step Visual Walkthrough

### STEP 1️⃣: Get Google Credentials (Google Cloud Console)

```
┌─────────────────────────────────────────────────────┐
│  https://console.cloud.google.com/                  │
├─────────────────────────────────────────────────────┤
│                                                       │
│  1. Click "Select a Project" → "New Project"       │
│     Enter: "BailSetu"                              │
│                                                       │
│  2. Search: "Google+ API" → Enable                 │
│                                                       │
│  3. Go to "Credentials" (left menu)                │
│     Click: "Create Credentials" → "OAuth 2.0..."  │
│                                                       │
│  4. Choose: "Web application"                       │
│                                                       │
│  5. Authorized redirect URIs:                       │
│     ADD: http://localhost:3000/api/auth/...       │
│              .../callback/google                   │
│                                                       │
│  6. SAVE Client ID & Client Secret                │
│                                                       │
└─────────────────────────────────────────────────────┘
```

✅ You now have: `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

---

### STEP 2️⃣: Setup Environment File

```bash
# Create .env.local in project root:
cd C:\myProgrammingLearning\javaScript\BailSetu

# Create file with this content:
┌──────────────────────────────────────────────────┐
│ .env.local                                       │
├──────────────────────────────────────────────────┤
│                                                  │
│ NEXTAUTH_SECRET=<run-command-below>            │
│ NEXTAUTH_URL=http://localhost:3000             │
│ GOOGLE_CLIENT_ID=<from-step-1>                 │
│ GOOGLE_CLIENT_SECRET=<from-step-1>             │
│ MONGODB_URI=<your-mongodb-uri>                 │
│                                                  │
└──────────────────────────────────────────────────┘
```

#### Generate NEXTAUTH_SECRET
```powershell
# Open PowerShell and run:
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# Copy the output to NEXTAUTH_SECRET
```

✅ Your `.env.local` file is ready!

---

### STEP 3️⃣: Test It!

```bash
# 1. Restart dev server (important!)
npm run dev

# 2. Open browser
http://localhost:3000/signin

# 3. See this screen:
┌─────────────────────────────────────────┐
│         BAIL सेतु                       │
│   Your Guide to Bail Laws & Rights     │
├─────────────────────────────────────────┤
│                                         │
│  Email: [_______________________]      │
│                                         │
│  Password: [_____________________]     │
│                                         │
│  [  Remember me ] [Forgot password?]   │
│                                         │
│  [      Login      ]                    │
│                                         │
│  ─── Or continue with ───              │
│                                         │
│  [ 🔴 Sign in with Google ]             │
│                                         │
│  Don't have account? Sign up            │
│                                         │
└─────────────────────────────────────────┘

# 4. Click "Sign in with Google"
```

✅ You're done! 🎉

---

## 📋 What Each File Does

```
app/
│
├── api/auth/[...nextauth]/route.js
│   └─ Handles: OAuth, sessions, user creation
│
├── signin/page.js
│   └─ UI: Email login + Google button
│
├── signup/page.js
│   └─ UI: OTP signup + Google button
│
├── layout.js
│   └─ Wraps app with SessionProvider
│
└── providers.js
    └─ Makes sessions available everywhere
```

---

## 🔄 What Happens When User Clicks Google

```
User clicks "Sign in with Google"
        ↓
Redirected to Google login page
        ↓
┌─────────────────────────────┐
│  Select Google Account      │
│  [account1@gmail.com]       │
│  [account2@gmail.com]       │
│  [+ Add another account]    │
└─────────────────────────────┘
        ↓
User selects account & approves
        ↓
Google sends profile info to app
        ↓
App checks MongoDB
        ├─ User exists? → Sign in
        └─ New user? → Create account
        ↓
JWT session created
        ↓
Redirect to /Home
        ↓
User logged in! ✅
```

---

## 🧪 How to Verify It Works

### Test 1: New User (Sign Up)
```
1. Click "Sign up with Google"
2. Use a NEW Gmail account
3. Should create user in database
4. Check MongoDB for new record ✓
```

### Test 2: Existing User (Sign In)
```
1. Click "Sign in with Google"
2. Use same Gmail as Test 1
3. Should log in immediately
4. localStorage has user data ✓
```

### Test 3: Traditional Login Still Works
```
1. Go to /signup (email/OTP method)
2. Complete signup with email/password
3. Go to /signin
4. Login with email/password
5. Should still work ✓
```

---

## ⚠️ Common Mistakes (and Fixes!)

### ❌ "Redirect URI mismatch"
```
❌ Wrong redirect URI in Google Console
   - `https://localhost:3000/...`
   - `http://localhost:3001/...`
   
✅ Correct:
   - `http://localhost:3000/api/auth/callback/google`
```

### ❌ "Cannot find next-auth"
```
❌ Package not installed
   npm install next-auth

✅ Then restart:
   npm run dev
```

### ❌ "Server error on signup"
```
❌ Missing environment variable
   Check `.env.local` has all 5 values
   
✅ Required:
   1. NEXTAUTH_SECRET
   2. NEXTAUTH_URL
   3. GOOGLE_CLIENT_ID
   4. GOOGLE_CLIENT_SECRET
   5. MONGODB_URI
```

### ❌ "Page keeps refreshing"
```
❌ Dev server not restarted after .env change
   
✅ Fix:
   1. Stop npm run dev (Ctrl+C)
   2. Start npm run dev
   3. Hard refresh browser (Ctrl+F5)
```

---

## 📊 Success Indicators

When everything works, you should see:

✅ Google button on signin page  
✅ Google button on signup page  
✅ Click Google button → Google login page  
✅ After Google auth → redirected to /Home  
✅ User appears in MongoDB  
✅ Subsequent login is instant  
✅ Session data in localStorage  

---

## 🎓 Understanding the Architecture

```
Browser Request
        ↓
SessionProvider (app/providers.js)
├─ Makes session available
├─ useSession() hook works
└─ Auto-refreshes tokens
        ↓
NextAuth API (/api/auth/[...nextauth]/route.js)
├─ Handles: signin, callback, signout
├─ Manages: JWT tokens, sessions
└─ Database: User creation/lookup
        ↓
UI Pages (signin, signup)
├─ Display: Google & email buttons
├─ Handle: User interaction
└─ Redirect: After authentication
```

---

## 🚀 Production Checklist

Before going live:

- [ ] Change `NEXTAUTH_URL` to your domain
- [ ] Add production redirect URI to Google Console
- [ ] Generate new strong `NEXTAUTH_SECRET`
- [ ] Use production MongoDB URI
- [ ] Test full flow in staging
- [ ] Monitor error logs
- [ ] Set up session cleanup (optional)

---

## 📞 Quick Reference

| Action | Command/Link |
|--------|------------|
| Start dev | `npm run dev` |
| Google Console | https://console.cloud.google.com/ |
| Test signin | http://localhost:3000/signin |
| Test signup | http://localhost:3000/signup |
| View docs | See `QUICK_START_OAUTH.md` |

---

**You're all set!** 🎉

Start from STEP 1 with Google Console, come back here to STEP 2 and 3.

Questions? Check `GOOGLE_OAUTH_SETUP.md` for detailed troubleshooting.
