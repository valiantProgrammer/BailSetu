'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

export default function BrandLogo({ size = 'normal', showTagline = true }) {
  const { t } = useLanguage();

  return (
    <Link href="/" className="inline-flex flex-col items-start select-none group">
      <div className="flex items-center tracking-tight leading-none">
        <span
          className={`font-black tracking-tight text-[#0B1F4B] ${
            size === 'large' ? 'text-3xl' : 'text-2xl'
          }`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          BAIL
        </span>
        <span
          className={`font-black text-[#F97316] ml-0.5 ${
            size === 'large' ? 'text-3xl' : 'text-2xl'
          }`}
          style={{ fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif" }}
        >
          {t('brandHindi')}
        </span>
      </div>
      {showTagline && (
        <span className="text-[10px] text-[#64748B] font-medium tracking-tight mt-0.5">
          {t('tagline')}
        </span>
      )}
    </Link>
  );
}
