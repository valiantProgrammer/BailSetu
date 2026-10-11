# Google OAuth Quick Start ⚡

## What You Can Do Now

✅ Sign in with Google  
✅ Sign up with Google  
✅ Keep using email/password login  
✅ Automatic user account creation  
✅ Secure JWT sessions  

## 3-Step Setup

### Step 1: Get Google Credentials (5 minutes)
1. Visit https://console.cloud.google.com/
2. Create new project → Enable Google+ API
3. Create OAuth 2.0 Client ID (Web application)
4. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Client Secret

### Step 2: Create `.env.local` (2 minutes)
```env
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=copy_from_step_1
GOOGLE_CLIENT_SECRET=copy_from_step_1
MONGODB_URI=your_mongodb_uri
```

**How to generate NEXTAUTH_SECRET:**
```powershell
# PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

### Step 3: Restart & Test (1 minute)
```bash
npm run dev
```
- Go to http://localhost:3000/signin
- Click "Sign in with Google"
- Done! 🎉

## What Was Added

| File | Purpose |
|------|---------|
| `/app/api/auth/[...nextauth]/route.js` | OAuth configuration |
| `/app/providers.js` | Session provider |
| Updated: `/app/signin/page.js` | Google button |
| Updated: `/app/signup/page.js` | Google button |
| Updated: `/app/layout.js` | Auth wrapper |

## Key Benefits

🔐 **Secure** - JWT tokens, encrypted secrets  
⚡ **Fast** - One-click sign in  
📱 **Universal** - Works on desktop & mobile  
🔄 **Compatible** - Email/password still works  
🗄️ **Integrated** - Users auto-saved to MongoDB  

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Redirect URI mismatch" | Add to Google Console: `http://localhost:3000/api/auth/callback/google` |
| "Cannot find module 'next-auth'" | Run `npm install next-auth` |
| Session not persisting | Check `.env.local` has all 5 variables |
| User not created in DB | Check MongoDB connection |

## Documentation

- **Full Setup**: See `GOOGLE_OAUTH_SETUP.md`
- **Implementation Details**: See `GOOGLE_OAUTH_IMPLEMENTATION.md`
- **Setup Helper**: Run `setup-oauth.bat` (Windows) or `setup-oauth.sh` (Linux)

## Need Help?

1. Check if `.env.local` has all variables
2. Verify Google OAuth credentials are correct
3. Check browser console for errors
4. Restart the dev server after changing `.env.local`

## Production

Before going live:
1. Update `NEXTAUTH_URL` to your domain
2. Register production redirect URI in Google Console
3. Use strong `NEXTAUTH_SECRET` (32+ chars)
4. Set all env variables in production platform

---

**You're all set!** The Google OAuth button is ready on signin/signup pages. 🚀
