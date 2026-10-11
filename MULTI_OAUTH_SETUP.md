# 🔐 Multi-OAuth Setup (Google + GitHub)

## Quick Overview

Your BailSetu app now supports **3 authentication methods**:

| Method | Status | Button |
|--------|--------|--------|
| Email/Password | ✅ Original | Always available |
| Google OAuth | ✅ New | 🔴 Google button |
| GitHub OAuth | ✅ New | ⚫ GitHub button |

All three work simultaneously!

---

## Setup Comparison

### Google OAuth Setup

1. Go to: https://console.cloud.google.com/
2. Create OAuth 2.0 Client ID
3. Add redirect: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Secret
5. Add to `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=your_id
   GOOGLE_CLIENT_SECRET=your_secret
   ```

**Time**: ~5 minutes  
**Complexity**: Easy

### GitHub OAuth Setup

1. Go to: https://github.com/settings/developers
2. Click "New OAuth App"
3. Add redirect: `http://localhost:3000/api/auth/callback/github`
4. Generate Client Secret
5. Add to `.env.local`:
   ```env
   GITHUB_ID=your_id
   GITHUB_SECRET=your_secret
   ```

**Time**: ~3 minutes  
**Complexity**: Very Easy

---

## Complete `.env.local` Setup

```env
# NextAuth Configuration
NEXTAUTH_SECRET=generate_random_string
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret

# GitHub OAuth (Optional)
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret

# MongoDB (Required)
MONGODB_URI=your_mongodb_uri
```

**Note**: You can use just one provider or both!

---

## Testing Both Providers

### Test 1: Sign Up with Google
1. Go to `/signup`
2. Click **Google** button
3. Sign in with Google account
4. Account created, redirected to /Home

### Test 2: Sign Up with GitHub
1. Go to `/signup`
2. Click **GitHub** button
3. Sign in with GitHub account
4. Account created, redirected to /Home

### Test 3: Mix Providers
1. Sign up with Google
2. Sign in with GitHub using same email
3. Same account recognized
4. Works seamlessly!

### Test 4: Email/Password Still Works
1. Traditional signup/signin
2. All old functionality preserved
3. No conflicts

---

## Database Changes

### What Gets Stored:

When user signs in with any provider:

```javascript
{
  emailAddress: "user@email.com",
  username: "user_name",
  anonymousUser: "Display Name",
  password: "google_oauth" | "github_oauth" | "hashed_password",
  // Other fields auto-populated
}
```

### OAuth User Detection:

- **Google**: `password === "google_oauth"`
- **GitHub**: `password === "github_oauth"`
- **Email/Pass**: `password === "hashed_password"`

---

## UI Changes

### Sign In Page

Before:
```
[Email input]
[Password input]
[Login button]
[Or Google button]
```

After:
```
[Email input]
[Password input]
[Login button]
─── Or continue with ───
[Google] [GitHub]
```

### Sign Up Page

Same changes as signin!

---

## Security Features

✅ **JWT Tokens** - Encrypted sessions  
✅ **CSRF Protection** - Built-in  
✅ **Env Secrets** - Never exposed  
✅ **Secure Callbacks** - URL validation  
✅ **HTTPS Ready** - Production secure  

---

## User Experience Flow

### New User Signs in with GitHub:
```
User → GitHub button
  ↓
GitHub login page
  ↓
User authenticates
  ↓
Back to app
  ↓
Check if email exists
  → No: Create account
  → Yes: Sign in
  ↓
JWT session created
  ↓
Redirected to /Home
  ↓
Logged in! ✅
```

### Existing User Signs in with Google:
```
User → Google button
  ↓
Google login page
  ↓
User authenticates
  ↓
Back to app
  ↓
Email matches existing account
  ↓
Session created
  ↓
Redirected to /Home
  ↓
Logged in! ✅
```

---

## Production Checklist

- [ ] Both OAuth apps created (Google + GitHub)
- [ ] Credentials added to `.env.local`
- [ ] Redirect URIs updated in console settings
- [ ] Dev server restarted
- [ ] Both buttons tested on signin page
- [ ] Both buttons tested on signup page
- [ ] Email/password auth still works
- [ ] MongoDB receives new users
- [ ] Session persists after redirect
- [ ] Production URLs configured

---

## Troubleshooting

### "I see only Google button"
- Missing `GITHUB_ID` and `GITHUB_SECRET`
- Add them to `.env.local`
- Restart dev server

### "I see only GitHub button"
- Missing `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Add them to `.env.local`
- Restart dev server

### "Both buttons but one doesn't work"
- Check redirect URI matches exactly in console
- Verify credentials are correct
- Check browser console for errors
- Check server logs

### "Redirect URI mismatch"
- **Google**: `http://localhost:3000/api/auth/callback/google`
- **GitHub**: `http://localhost:3000/api/auth/callback/github`
- Must match exactly in respective console

---

## Documentation Files

| Document | Purpose |
|----------|---------|
| `QUICK_START_OAUTH.md` | 3-step Google setup |
| `GOOGLE_OAUTH_SETUP.md` | Complete Google guide |
| `GITHUB_OAUTH_SETUP.md` | Complete GitHub guide |
| This file | Combined reference |

---

## Step-by-Step: Setup Both Providers

### Step 1: Generate NEXTAUTH_SECRET

PowerShell:
```powershell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

Copy the output.

### Step 2: Get Google Credentials

1. https://console.cloud.google.com/
2. Create project → Enable Google+ API
3. Create OAuth 2.0 Client ID
4. Add redirect: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Secret

### Step 3: Get GitHub Credentials

1. https://github.com/settings/developers
2. Click "New OAuth App"
3. Add redirect: `http://localhost:3000/api/auth/callback/github`
4. Generate and copy Client Secret

### Step 4: Create `.env.local`

```env
NEXTAUTH_SECRET=from_step_1
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=from_step_2
GOOGLE_CLIENT_SECRET=from_step_2
GITHUB_ID=from_step_3
GITHUB_SECRET=from_step_3
MONGODB_URI=your_mongodb_uri
```

### Step 5: Test

```bash
npm run dev
# Visit http://localhost:3000/signin
# Test both Google and GitHub buttons
```

✅ Done!

---

## Optional: Use Only One Provider

### If you want only Google:
- Skip GitHub OAuth setup
- Leave `GITHUB_ID` and `GITHUB_SECRET` empty
- Only Google button shows
- Everything works normally

### If you want only GitHub:
- Skip Google OAuth setup
- Leave `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` empty
- Only GitHub button shows
- Everything works normally

### If you want both:
- Complete both setups
- Both buttons show
- Maximum flexibility!

---

## Statistics

After setup, track:
- Users signing in with Google: [Check session data]
- Users signing in with GitHub: [Check session data]
- Email/password users: [Existing users]
- Total active users: [Combine all methods]

---

## Support Resources

- [NextAuth.js Docs](https://next-auth.js.org/)
- [Google OAuth](https://developers.google.com/identity)
- [GitHub OAuth](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [OAuth 2.0 Spec](https://tools.ietf.org/html/rfc6749)

---

## What's Next?

✅ OAuth setup complete  
→ Deploy to production  
→ Monitor user signups  
→ Collect user feedback  
→ Add more features!

---

**Status**: ✅ Ready to Use

Both Google and GitHub OAuth are configured and ready. Just add credentials and restart!

🎉 **You now have 3 ways for users to authenticate!**
