'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Search, Shield, BookOpen, Users, HelpCircle, 
  ChevronRight, ArrowRight, CheckCircle2, FileText, Scale
} from 'lucide-react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { useLanguage } from './context/LanguageContext';
import { POPULAR_SEARCHES, CATEGORIES } from '@/src/data/mockData';

export default function HomePage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/results?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/search');
    }
  };

  const handleChipClick = (term) => {
    router.push(`/search/results?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* MOBILE: Hero image appears on top or below heading */}
              <div className="block lg:hidden w-full max-w-sm mx-auto mb-2">
                <div className="relative rounded-2xl overflow-hidden shadow-sm aspect-[4/3] bg-gradient-to-b from-blue-50/50 to-orange-50/30 p-2 border border-slate-100">
                  <Image
                    src="/supreme_court_hero.jpg"
                    alt="Supreme Court of India"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              {/* LEFT / HERO CONTENT */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Main Headings */}
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1F4B] tracking-tight leading-[1.15]">
                    {t('heroTitle1')}
                  </h1>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F97316] tracking-tight leading-[1.15]">
                    {t('heroTitle2')}
                  </h2>
                </div>

                {/* Subtext */}
                <p className="text-sm sm:text-base text-[#64748B] max-w-xl leading-relaxed">
                  {t('heroSubtext')}
                </p>

                {/* SEARCH BAR (Mockup Pixel-for-Pixel) */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="relative flex items-center bg-white rounded-xl shadow-md border border-[#E2E8F0] p-1.5 focus-within:ring-2 focus-within:ring-[#1E40AF] focus-within:border-[#1E40AF] transition-all"
                >
                  <div className="pl-3 pr-2 text-[#94A3B8]">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('heroSearchPlaceholder')}
                    className="w-full text-sm text-[#0B1F4B] placeholder:text-[#94A3B8] outline-none bg-transparent py-2 px-1"
                  />
                  <button
                    type="submit"
                    className="bg-[#1E40AF] hover:bg-[#1D4ED8] text-white p-3 rounded-lg shadow-sm transition-colors flex items-center justify-center shrink-0"
                    aria-label="Search"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </form>

                {/* POPULAR SEARCHES CHIPS */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-semibold text-[#64748B] block">
                    {t('popularSearches')}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleChipClick(item)}
                        className="px-3 py-1.5 bg-white hover:bg-[#EFF6FF] hover:text-[#1E40AF] text-[#475569] text-xs font-medium rounded-full border border-[#E2E8F0] transition-colors shadow-2xs"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* DESKTOP RIGHT: Hero Graphic with Indian courthouse + Tricolor */}
              <div className="hidden lg:block lg:col-span-5">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 bg-gradient-to-tr from-white via-orange-50/20 to-blue-50/30 p-2">
                  <Image
                    src="/supreme_court_hero.jpg"
                    alt="Supreme Court of India"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

            </div>

            {/* FOUR QUICK-ACTION TILES (Pixel-for-pixel matching mockup) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-10">
              
              {/* Tile 1: Bail Information */}
              <Link
                href="/search"
                className="bg-white rounded-xl p-4 sm:p-5 text-center border border-[#E2E8F0] shadow-xs hover:shadow-md hover:border-[#F97316]/50 transition-all group flex flex-col items-center justify-center space-y-2.5"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Scale className="w-6 h-6" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#0B1F4B] group-hover:text-[#EA580C] transition-colors">
                  {t('tileBailInfo')}
                </span>
              </Link>

              {/* Tile 2: Legal Provisions */}
              <Link
                href="/search"
                className="bg-white rounded-xl p-4 sm:p-5 text-center border border-[#E2E8F0] shadow-xs hover:shadow-md hover:border-[#10B981]/50 transition-all group flex flex-col items-center justify-center space-y-2.5"
              >
                <div className="w-12 h-12 rounded-full bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#0B1F4B] group-hover:text-[#16A34A] transition-colors">
                  {t('tileLegalProvisions')}
                </span>
              </Link>

              {/* Tile 3: Find Advocates */}
              <Link
                href="/advocates"
                className="bg-white rounded-xl p-4 sm:p-5 text-center border border-[#E2E8F0] shadow-xs hover:shadow-md hover:border-[#1E40AF]/50 transition-all group flex flex-col items-center justify-center space-y-2.5"
              >
                <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#1E40AF] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#0B1F4B] group-hover:text-[#1E40AF] transition-colors">
                  {t('tileFindAdvocates')}
                </span>
              </Link>

              {/* Tile 4: Legal Aid Support */}
              <Link
                href="/legal-aid"
                className="bg-white rounded-xl p-4 sm:p-5 text-center border border-[#E2E8F0] shadow-xs hover:shadow-md hover:border-[#0D9488]/50 transition-all group flex flex-col items-center justify-center space-y-2.5"
              >
                <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#0D9488] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#0B1F4B] group-hover:text-[#0D9488] transition-colors">
                  {t('tileLegalAidSupport')}
                </span>
              </Link>

            </div>

          </div>
        </section>

        {/* QUICK CATEGORY HIGHLIGHT STRIP */}
        <section className="py-8 bg-white border-y border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#0B1F4B]">
                  {language === 'hi' ? 'कानूनी अपराध श्रेणियां' : 'Browse Legal Categories'}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {language === 'hi' ? 'विभिन्न अपराध श्रेणियों के अंतर्गत जमानत नियम समझें' : 'Explore bail eligibility across various penal provisions'}
                </p>
              </div>
              <Link
                href="/search"
                className="text-xs font-semibold text-[#1E40AF] hover:underline flex items-center"
              >
                {t('viewAll')} <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/search/results?category=${cat.id}`}
                  className={`p-4 rounded-xl border ${cat.borderClass} ${cat.bgClass} hover:shadow-sm transition-all group`}
                >
                  <p className={`font-bold text-xs sm:text-sm ${cat.textClass}`}>
                    {language === 'hi' ? cat.nameHi : cat.name}
                  </p>
                  <p className="text-[11px] text-[#64748B] mt-1">
                    {language === 'hi' ? cat.exampleHi : cat.example}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}