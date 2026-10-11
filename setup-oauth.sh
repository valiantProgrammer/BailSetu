#!/bin/bash

# Google OAuth Setup Script
# This script helps you generate the NEXTAUTH_SECRET

echo "======================================"
echo "BailSetu - Google OAuth Setup"
echo "======================================"
echo ""

# Generate NEXTAUTH_SECRET
echo "Generating NEXTAUTH_SECRET..."
SECRET=$(openssl rand -base64 32)
echo "NEXTAUTH_SECRET=$SECRET"
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo ".env.local already exists!"
    echo "Please add the following to your .env.local:"
else
    echo "Creating .env.local..."
    cat > .env.local << EOF
# NextAuth Configuration
NEXTAUTH_SECRET=$SECRET
NEXTAUTH_URL=http://localhost:3000

# Google OAuth Configuration
# Get these from: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string_here
EOF
    echo ".env.local created successfully!"
fi

echo ""
echo "======================================"
echo "Next Steps:"
echo "======================================"
echo "1. Go to https://console.cloud.google.com/"
echo "2. Create a new project"
echo "3. Enable Google+ API"
echo "4. Create OAuth 2.0 credentials"
echo "5. Set Authorized redirect URIs:"
echo "   - http://localhost:3000/api/auth/callback/google"
echo "6. Copy Client ID and Client Secret"
echo "7. Update .env.local with your credentials"
echo "8. Restart your development server"
echo ""
echo "For more details, see GOOGLE_OAUTH_SETUP.md"
