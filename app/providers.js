'use client';

import { SessionProvider } from 'next-auth/react';
import { LanguageProvider } from './context/LanguageContext';

export function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </SessionProvider>
  );
}
