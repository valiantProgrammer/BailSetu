# GitHub OAuth Setup Guide

## Overview
This application now supports GitHub OAuth for sign up and sign in, alongside Google OAuth and traditional email/password authentication.

## GitHub OAuth Credentials Setup

### Step 1: Go to GitHub Developer Settings

1. Log in to your GitHub account
2. Go to: https://github.com/settings/developers
3. Click **"New OAuth App"** or **"New GitHub App"**

### Step 2: Create OAuth Application

Fill in the application details:

**Application name:**
```
BailSetu
```

**Homepage URL:**
```
http://localhost:3000
```
For production: `https://yourdomain.com`

**Application description:**
```
Legal bail information and OAuth authentication for BailSetu
```

**Authorization callback URL:**
```
http://localhost:3000/api/auth/callback/github
```
For production: `https://yourdomain.com/api/auth/callback/github`

### Step 3: Get Credentials

After creating the app, you'll see:
- **Client ID** - Copy this
- **Client Secret** - Generate and copy this (keep it secret!)

## Add to Environment

Add to your `.env.local` file:

```env
GITHUB_ID=your_client_id_from_github
GITHUB_SECRET=your_client_secret_from_github
```

### Complete `.env.local` Example:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=google_id_here
GOOGLE_CLIENT_SECRET=google_secret_here

# GitHub OAuth
GITHUB_ID=github_id_here
GITHUB_SECRET=github_secret_here

# MongoDB
MONGODB_URI=your_mongodb_uri
```

## How It Works

### User Signs in with GitHub:
1. User clicks **"GitHub"** button on signin/signup page
2. Redirected to GitHub login
3. User authenticates with GitHub
4. Redirected back to app with GitHub profile
5. Account auto-created if new user
6. JWT session created
7. Redirected to /Home

### What Gets Stored:

When a GitHub user signs in:
- **Email**: From GitHub profile
- **Username**: Generated from GitHub name
- **Display Name**: From GitHub profile name
- **Avatar**: From GitHub profile picture (in session)
- **Provider**: "github" (tracked in session)

## Testing

### Test GitHub Sign In:

1. Go to http://localhost:3000/signin
2. Click **"GitHub"** button
3. Authenticate with your GitHub account
4. Should be redirected to /Home
5. Check user in MongoDB

### Test GitHub Sign Up:

1. Go to http://localhost:3000/signup
2. Click **"GitHub"** button
3. Authenticate with different GitHub account (or new one)
4. New account should be created
5. Check MongoDB for new user

### Switch Between Providers:

You can now use:
- **Email/Password** - Traditional login
- **Google OAuth** - One-click Google signin
- **GitHub OAuth** - One-click GitHub signin

All three methods work simultaneously!

## Production Setup

### Update Callback URL:

In GitHub app settings, add production redirect URI:
```
https://yourdomain.com/api/auth/callback/github
```

### Update Environment:

```env
NEXTAUTH_URL=https://yourdomain.com
GITHUB_ID=your_production_github_id
GITHUB_SECRET=your_production_github_secret
```

## Troubleshooting

### "Invalid redirect_uri"
- **Issue**: Redirect URL doesn't match GitHub settings
- **Fix**: Ensure exact match in GitHub app settings
  - Dev: `http://localhost:3000/api/auth/callback/github`
  - Prod: `https://yourdomain.com/api/auth/callback/github`

### "The server returned an invalid response"
- **Issue**: GitHub API error or network issue
- **Fix**:
  1. Check GitHub app credentials are correct
  2. Verify internet connection
  3. Check server logs for details

### User not created in database
- **Issue**: MongoDB connection problem
- **Fix**:
  1. Verify `MONGODB_URI` is correct
  2. Check MongoDB is running
  3. Verify network access to MongoDB

### Session not persistent
- **Issue**: Browser cookies or secrets problem
- **Fix**:
  1. Clear browser cookies
  2. Verify `NEXTAUTH_SECRET` is set
  3. Restart dev server

## Security Notes

✅ **GitHub Secret**: Never commit `.env.local` with secrets  
✅ **Permissions**: GitHub OAuth requests minimal permissions  
✅ **JWT Tokens**: Sessions encrypted with NEXTAUTH_SECRET  
✅ **HTTPS**: Use HTTPS in production  

## What Users Can Do

After signing in with GitHub, users can:
- Access the bail information system
- Search IPC sections
- View results in their language preference
- Use all app features normally
- Sign out and choose another provider next time

## Comparison: Google vs GitHub

| Feature | Google | GitHub |
|---------|--------|--------|
| Ease of Setup | ⭐⭐⭐ | ⭐⭐ |
| User Base | Large | Developers |
| Permission Scope | Minimal | Minimal |
| Speed | Fast | Fast |
| Profile Data | Good | Good |

Both work great! Use both for maximum user flexibility.

## Multiple Providers Support

Your app now supports:
1. **Email/Password** - Traditional
2. **Google OAuth** - Consumer users
3. **GitHub OAuth** - Developer users

Users can sign up with any method and sign in with any method later!

## File Changes

### Modified:
- `app/api/auth/[...nextauth]/route.js` - Added GitHub provider
- `app/signin/page.js` - Added GitHub button
- `app/signup/page.js` - Added GitHub button
- `.env.local.example` - Added GitHub credentials

### New:
- This documentation file

## Need Help?

For issues with GitHub OAuth:
1. Check [GitHub Developer Documentation](https://docs.github.com/en/developers)
2. Verify redirect URI exactly matches
3. Ensure environment variables are set
4. Check browser console for errors
5. Check server logs for API errors

## Next Steps

1. Create GitHub OAuth App (steps above)
2. Add `GITHUB_ID` and `GITHUB_SECRET` to `.env.local`
3. Restart dev server
4. Test sign in/up with GitHub button
5. Enjoy! 🎉
