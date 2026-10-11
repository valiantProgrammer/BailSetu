'use client';

import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function StatusBadge({ type, label, size = 'sm' }) {
  const { language } = useLanguage();

  let defaultText = label;
  let colorStyles = '';

  switch (type?.toLowerCase()) {
    case 'bailable':
      defaultText = defaultText || (language === 'hi' ? 'जमानती' : 'Bailable');
      colorStyles = 'bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]';
      break;
    case 'non-bailable':
    case 'nonbailable':
      defaultText = defaultText || (language === 'hi' ? 'गैर-जमानती' : 'Non-Bailable');
      colorStyles = 'bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]';
      break;
    case 'depends':
      defaultText = defaultText || (language === 'hi' ? 'मामले पर निर्भर' : 'Depends');
      colorStyles = 'bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]';
      break;
    case 'cognizable':
      defaultText = defaultText || (language === 'hi' ? 'संज्ञेय' : 'Cognizable');
      colorStyles = 'bg-[#DBEAFE] text-[#1E40AF] border border-[#93C5FD]';
      break;
    case 'non-compoundable':
      defaultText = defaultText || (language === 'hi' ? 'अशमनीय' : 'Non-Compoundable');
      colorStyles = 'bg-[#FEF2F2] text-[#DC2626] border border-[#F87171]';
      break;
    case 'compoundable':
      defaultText = defaultText || (language === 'hi' ? 'शमनीय' : 'Compoundable');
      colorStyles = 'bg-[#F0FDF4] text-[#15803D] border border-[#86EFAC]';
      break;
    default:
      colorStyles = 'bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]';
  }

  const paddingClass = size === 'xs' 
    ? 'px-2 py-0.5 text-[10px]' 
    : size === 'lg' 
    ? 'px-3.5 py-1 text-xs' 
    : 'px-2.5 py-0.5 text-[11px]';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${paddingClass} ${colorStyles}`}
    >
      {defaultText}
    </span>
  );
}
