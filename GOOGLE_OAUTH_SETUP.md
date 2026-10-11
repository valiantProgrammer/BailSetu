# Google OAuth Setup Guide

## Overview
This application now supports Google OAuth for sign up and sign in, along with traditional email/password authentication.

## Prerequisites
- Node.js and npm installed
- Next.js 15.3.4+ running
- MongoDB connection string

## Installation

### 1. Install Dependencies
NextAuth.js has been installed. Ensure you have it:
```bash
npm install next-auth
```

## Google OAuth Configuration

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Choose **Web application**
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy your **Client ID** and **Client Secret**

### Step 2: Set Environment Variables

Create a `.env.local` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string_here
```

#### How to generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

Or run this in Node.js:
```javascript
require('crypto').randomBytes(32).toString('hex')
```

## How It Works

### Authentication Flow

1. **Sign In / Sign Up Page**
   - Users can choose to sign in with email/password
   - OR click "Sign in with Google"
   - OR click "Sign up with Google"

2. **Google OAuth Flow**
   - User is redirected to Google login
   - After authentication, user is redirected back to the app
   - If user doesn't exist in the database, a new account is created automatically
   - User data is stored in localStorage and session

3. **Session Management**
   - Sessions are managed via JWT tokens
   - Session lasts 30 days by default
   - User info is available via NextAuth's `useSession()` hook

### API Routes

**Sign In/Sign Up Endpoint:**
```
POST /api/auth/signin
POST /api/auth/callback/google
```

**Session Endpoint:**
```
GET /api/auth/session
```

## Usage in Components

### Check if User is Logged In

```javascript
import { useSession } from 'next-auth/react';

export default function MyComponent() {
  const { data: session } = useSession();

  if (session) {
    return <p>Signed in as {session.user.email}</p>;
  }
  return <p>Not signed in</p>;
}
```

### Sign In

```javascript
import { signIn } from 'next-auth/react';

// Email/Password
await signIn('credentials', { 
  email: 'user@example.com', 
  password: 'password123',
  redirect: false 
});

// Google
await signIn('google');
```

### Sign Out

```javascript
import { signOut } from 'next-auth/react';

await signOut();
```

## Database Changes

When a user signs in with Google:
- New record is created in the `Login` collection automatically
- Fields populated:
  - `emailAddress`: User's Google email
  - `username`: Generated from user's name
  - `anonymousUser`: User's Google display name
  - `password`: Set to "google_oauth" (placeholder)

Existing email/password login is still available.

## Security Features

✅ JWT-based session tokens
✅ Encrypted credentials
✅ CSRF protection via NextAuth
✅ Secure callback URLs validation
✅ Environment variable protection

## Troubleshooting

### "Redirect URI mismatch" Error
- Ensure your redirect URL in `.env.local` matches exactly in Google Cloud Console
- For development: `http://localhost:3000/api/auth/callback/google`
- For production: `https://yourdomain.com/api/auth/callback/google`

### NEXTAUTH_SECRET Missing
- Generate a secret: `openssl rand -base64 32`
- Add to `.env.local`

### User Not Saved
- Check MongoDB connection
- Ensure `MONGODB_URI` is correct in `.env.local`

### Session Not Persisting
- Clear browser cache/cookies
- Restart the development server
- Check that `NEXTAUTH_URL` matches your app URL

## Files Modified/Created

### New Files:
- `/app/api/auth/[...nextauth]/route.js` - NextAuth configuration
- `/app/providers.js` - SessionProvider wrapper
- `/.env.local.example` - Environment variables template

### Modified Files:
- `/app/layout.js` - Added AuthProvider wrapper
- `/app/signin/page.js` - Added Google OAuth button
- `/app/signup/page.js` - Added Google OAuth button

## Next Steps

1. Get Google OAuth credentials from Google Cloud Console
2. Create `.env.local` with your credentials
3. Restart the development server
4. Test sign in/sign up with Google
5. Test traditional email/password auth still works

## Support

For issues:
1. Check the [NextAuth.js Documentation](https://next-auth.js.org/)
2. Check the [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
3. Verify all environment variables are set correctly
