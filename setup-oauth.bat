@echo off
REM Google OAuth Setup Script for Windows

echo ======================================
echo BailSetu - Google OAuth Setup
echo ======================================
echo.

REM Check if .env.local exists
if exist ".env.local" (
    echo .env.local already exists!
    echo Please manually update it with your Google OAuth credentials.
    echo.
) else (
    echo Creating .env.local...
    (
        echo # NextAuth Configuration
        echo NEXTAUTH_SECRET=your_nextauth_secret_here
        echo NEXTAUTH_URL=http://localhost:3000
        echo.
        echo # Google OAuth Configuration
        echo # Get these from: https://console.cloud.google.com/
        echo GOOGLE_CLIENT_ID=your_google_client_id_here
        echo GOOGLE_CLIENT_SECRET=your_google_client_secret_here
        echo.
        echo # MongoDB Connection
        echo MONGODB_URI=your_mongodb_connection_string_here
    ) > .env.local
    echo .env.local created successfully!
)

echo.
echo ======================================
echo Next Steps:
echo ======================================
echo 1. Go to https://console.cloud.google.com/
echo 2. Create a new project
echo 3. Enable Google+ API
echo 4. Create OAuth 2.0 credentials
echo 5. Set Authorized redirect URIs:
echo    - http://localhost:3000/api/auth/callback/google
echo 6. Copy Client ID and Client Secret
echo 7. Update .env.local with your credentials
echo 8. To generate NEXTAUTH_SECRET, run in PowerShell:
echo    [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
echo 9. Restart your development server
echo.
echo For more details, see GOOGLE_OAUTH_SETUP.md
echo.
pause
