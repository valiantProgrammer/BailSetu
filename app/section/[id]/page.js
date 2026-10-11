'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Bookmark, Share2, Check, X, AlertTriangle, 
  ExternalLink, FileText, Scale, ShieldCheck, Info 
} from 'lucide-react';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import { useLanguage } from '@/app/context/LanguageContext';
import { LegalService } from '@/src/services/legalService';

export default function LegalSectionDetailsPage({ params }) {
  const unwrappedParams = use(params);
  const sectionId = unwrappedParams.id;
  const router = useRouter();
  const { language, t } = useLanguage();

  const [section, setSection] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'law', 'related'
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  useEffect(() => {
    async function loadSection() {
      const found = await LegalService.getSectionById(sectionId);
      if (found) {
        setSection(found);
      } else {
        // default to 379 if not found
        const fallback = await LegalService.getSectionById('379');
        setSection(fallback);
      }
    }
    loadSection();
  }, [sectionId]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  if (!section) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <p className="text-sm text-slate-500">Loading section details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-6 sm:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* BACK LINK */}
          <div className="mb-4">
            <Link
              href="/search/results"
              className="inline-flex items-center text-xs font-semibold text-[#1E40AF] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              {language === 'hi' ? 'परिणामों पर वापस जाएं' : 'Back to Results'}
            </Link>
          </div>

          {/* TITLE & HEADER ACTIONS */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs mb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F4B]">
                  {section.code}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-[#64748B] mt-0.5">
                  {language === 'hi' ? section.titleHi : section.title}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isBookmarked
                      ? 'bg-[#EFF6FF] text-[#1E40AF] border-[#93C5FD]'
                      : 'bg-white text-[#64748B] border-[#CBD5E1] hover:bg-slate-50'
                  }`}
                  aria-label="Bookmark Section"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#1E40AF]' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2.5 rounded-lg border bg-white text-[#64748B] border-[#CBD5E1] hover:bg-slate-50 transition-colors relative"
                  aria-label="Share Section"
                >
                  <Share2 className="w-4 h-4" />
                  {copiedNotification && (
                    <span className="absolute -bottom-8 right-0 bg-[#0B1F4B] text-white text-[10px] py-1 px-2 rounded-md whitespace-nowrap shadow-md">
                      Link Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* THREE LARGE STATUS CARDS (Pixel-for-pixel matching mockup 4) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
              
              {/* Card 1: Bailable */}
              <div className="bg-[#F0FDF4] border border-[#86EFAC] rounded-xl p-3 sm:p-4 text-center flex flex-col items-center justify-center space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#166534]">
                    {t('bailable')}
                  </p>
                  <p className="text-xs sm:text-sm font-black text-[#15803D]">
                    {section.bailable ? t('yes') : t('no')}
                  </p>
                </div>
              </div>

              {/* Card 2: Cognizable */}
              <div className="bg-[#EFF6FF] border border-[#93C5FD] rounded-xl p-3 sm:p-4 text-center flex flex-col items-center justify-center space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#DBEAFE] text-[#1E40AF] flex items-center justify-center">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#1E40AF]">
                    {t('cognizable')}
                  </p>
                  <p className="text-xs sm:text-sm font-black text-[#1E3A8A]">
                    {section.cognizable ? t('yes') : t('no')}
                  </p>
                </div>
              </div>

              {/* Card 3: Non-Compoundable */}
              <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl p-3 sm:p-4 text-center flex flex-col items-center justify-center space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
                  <X className="w-4 h-4 stroke-[3]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#991B1B]">
                    {t('nonCompoundable')}
                  </p>
                  <p className="text-xs sm:text-sm font-black text-[#B91C1C]">
                    {!section.compoundable ? t('yes') : t('no')}
                  </p>
                </div>
              </div>

            </div>

            {/* TABS: Overview / Law Details / Related Sections */}
            <div className="flex border-b border-[#E2E8F0] mt-8">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-[#1E40AF] text-[#1E40AF]'
                    : 'border-transparent text-[#64748B] hover:text-[#0B1F4B]'
                }`}
              >
                {t('overview')}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('law')}
                className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
                  activeTab === 'law'
                    ? 'border-[#1E40AF] text-[#1E40AF]'
                    : 'border-transparent text-[#64748B] hover:text-[#0B1F4B]'
                }`}
              >
                {t('lawDetails')}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('related')}
                className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors ${
                  activeTab === 'related'
                    ? 'border-[#1E40AF] text-[#1E40AF]'
                    : 'border-transparent text-[#64748B] hover:text-[#0B1F4B]'
                }`}
              >
                {t('relatedSections')}
              </button>
            </div>

            {/* TAB CONTENT: Key-Value Table / Specifications */}
            <div className="pt-6">
              {activeTab === 'overview' && (
                <div className="divide-y divide-[#F1F5F9] text-xs sm:text-sm">
                  
                  <div className="py-3 sm:grid sm:grid-cols-3 gap-4">
                    <span className="font-semibold text-[#64748B]">
                      {t('law')}
                    </span>
                    <span className="sm:col-span-2 font-medium text-[#0B1F4B]">
                      {section.law}
                    </span>
                  </div>

                  <div className="py-3 sm:grid sm:grid-cols-3 gap-4">
                    <span className="font-semibold text-[#64748B]">
                      {t('sectionNumber')}
                    </span>
                    <span className="sm:col-span-2 font-medium text-[#0B1F4B]">
                      {section.id}
                    </span>
                  </div>

                  <div className="py-3 sm:grid sm:grid-cols-3 gap-4">
                    <span className="font-semibold text-[#64748B]">
                      {t('description')}
                    </span>
                    <span className="sm:col-span-2 text-[#334155] leading-relaxed">
                      {language === 'hi' ? section.shortDescHi : section.shortDesc}
                    </span>
                  </div>

                  <div className="py-3 sm:grid sm:grid-cols-3 gap-4">
                    <span className="font-semibold text-[#64748B]">
                      {t('punishment')}
                    </span>
                    <span className="sm:col-span-2 font-medium text-[#0B1F4B]">
                      {language === 'hi' ? section.punishmentHi : section.punishment}
                    </span>
                  </div>

                  <div className="py-3 sm:grid sm:grid-cols-3 gap-4">
                    <span className="font-semibold text-[#64748B]">
                      {t('courtLevel')}
                    </span>
                    <span className="sm:col-span-2 font-medium text-[#0B1F4B]">
                      {language === 'hi' ? section.courtLevelHi : section.courtLevel}
                    </span>
                  </div>

                  <div className="py-3 sm:grid sm:grid-cols-3 gap-4">
                    <span className="font-semibold text-[#64748B]">
                      {t('bailType')}
                    </span>
                    <span className="sm:col-span-2 font-medium text-[#0B1F4B]">
                      {language === 'hi' ? section.bailTypeHi : section.bailType}
                    </span>
                  </div>

                  <div className="py-3 sm:grid sm:grid-cols-3 gap-4">
                    <span className="font-semibold text-[#64748B]">
                      {t('relevantJudgments')}
                    </span>
                    <div className="sm:col-span-2">
                      <a
                        href={section.sourceLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#1E40AF] font-semibold hover:underline inline-flex items-center"
                      >
                        {t('viewLandmarkJudgments')} →
                      </a>
                    </div>
                  </div>

                  <div className="py-3 sm:grid sm:grid-cols-3 gap-4">
                    <span className="font-semibold text-[#64748B]">
                      {t('sourceLink')}
                    </span>
                    <div className="sm:col-span-2">
                      <a
                        href={section.sourceLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#1E40AF] hover:underline inline-flex items-center break-all text-xs"
                      >
                        {section.sourceLink}
                        <ExternalLink className="w-3.5 h-3.5 ml-1 shrink-0" />
                      </a>
                    </div>
                  </div>

                </div>
              )}

              {activeTab === 'law' && (
                <div className="space-y-4 text-xs sm:text-sm text-[#334155] leading-relaxed">
                  <p className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    {section.fullDescription}
                  </p>
                  {section.relevantJudgments?.map((j, idx) => (
                    <div key={idx} className="p-3 border border-slate-200 rounded-lg bg-white">
                      <p className="font-bold text-[#0B1F4B]">{j.title}</p>
                      <p className="text-xs text-[#64748B] mt-1">{j.summary}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'related' && (
                <div className="space-y-3">
                  <p className="text-xs text-[#64748B]">
                    Corresponding provisions and connected criminal sections:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link
                      href="/section/356"
                      className="p-3 border border-[#E2E8F0] rounded-lg hover:border-[#1E40AF] bg-white transition-colors block"
                    >
                      <p className="font-bold text-xs text-[#0B1F4B]">IPC Section 356</p>
                      <p className="text-[11px] text-[#64748B]">Assault to commit theft</p>
                    </Link>
                    <Link
                      href="/section/411"
                      className="p-3 border border-[#E2E8F0] rounded-lg hover:border-[#1E40AF] bg-white transition-colors block"
                    >
                      <p className="font-bold text-xs text-[#0B1F4B]">IPC Section 411</p>
                      <p className="text-[11px] text-[#64748B]">Dishonestly receiving stolen property</p>
                    </Link>
                    <Link
                      href="/section/bns-303-2"
                      className="p-3 border border-[#E2E8F0] rounded-lg hover:border-[#1E40AF] bg-white transition-colors block"
                    >
                      <p className="font-bold text-xs text-[#0B1F4B]">BNS Section 303(2)</p>
                      <p className="text-[11px] text-[#64748B]">New Criminal Code Equivalent</p>
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* YELLOW DISCLAIMER BOX (Mockup pixel-for-pixel) */}
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-4 flex items-start space-x-3 text-xs text-[#92400E]">
            <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t('disclaimer')}
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
