'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, User, Home, HeartHandshake, Laptop, 
  FlaskConical, Coins, Car, FileSpreadsheet, ArrowRight 
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '@/src/data/mockData';

const iconMap = {
  UserAlert: User,
  Home: Home,
  HeartHandshake: HeartHandshake,
  Laptop: Laptop,
  FlaskConical: FlaskConical,
  Coins: Coins,
  Car: Car,
  FileSpreadsheet: FileSpreadsheet,
};

export default function SearchOffencePage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('desc'); // 'desc' or 'section'
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search/results?q=${encodeURIComponent(searchInput.trim())}&type=${activeTab}`);
    } else {
      router.push('/search/results');
    }
  };

  const handleCategoryClick = (catId) => {
    router.push(`/search/results?category=${catId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* PAGE HEADER */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F4B]">
              {t('searchTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto">
              {t('searchSubtitle')}
            </p>
          </div>

          {/* TOGGLE TABS: Description vs Section Number */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-[#E2E8F0] p-1 rounded-full border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('desc')}
                className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold rounded-full transition-all ${
                  activeTab === 'desc'
                    ? 'bg-[#1E40AF] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#0B1F4B]'
                }`}
              >
                {t('searchByDesc')}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('section')}
                className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold rounded-full transition-all ${
                  activeTab === 'section'
                    ? 'bg-[#1E40AF] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#0B1F4B]'
                }`}
              >
                {t('searchBySection')}
              </button>
            </div>
          </div>

          {/* SEARCH INPUT BAR */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-white rounded-xl shadow-md border border-[#CBD5E1] p-1.5 focus-within:ring-2 focus-within:ring-[#1E40AF] focus-within:border-[#1E40AF] transition-all mb-10"
          >
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={
                activeTab === 'desc'
                  ? t('searchPlaceholderDesc')
                  : t('searchPlaceholderSec')
              }
              className="w-full text-xs sm:text-sm text-[#0B1F4B] placeholder:text-[#94A3B8] outline-none bg-transparent py-2.5 px-4"
            />
            <button
              type="submit"
              className="bg-[#1E40AF] hover:bg-[#1D4ED8] text-white p-3 rounded-lg shadow-sm transition-colors flex items-center justify-center shrink-0"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* "OR TRY THESE CATEGORIES" (8 Color-tinted cards) */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[#0B1F4B]">
              {t('tryCategories')}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {CATEGORIES.map((cat) => {
                const IconComponent = iconMap[cat.icon] || User;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`text-left p-4 rounded-xl border ${cat.borderClass} ${cat.bgClass} hover:shadow-md hover:scale-[1.02] transition-all duration-150 flex flex-col justify-between h-28 group`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-1.5 rounded-lg bg-white/70 ${cat.textClass}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                        {cat.count}
                      </span>
                    </div>

                    <div>
                      <p className={`font-bold text-xs sm:text-sm ${cat.textClass} line-clamp-1`}>
                        {language === 'hi' ? cat.nameHi : cat.name}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
                        {language === 'hi' ? cat.exampleHi : cat.example}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
