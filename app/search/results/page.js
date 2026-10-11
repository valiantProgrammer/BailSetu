'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Search, Bookmark, CheckCircle2, 
  Clock, Scale, ChevronRight, FileText, Filter, SlidersHorizontal 
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import StatusBadge from '../../components/ui/StatusBadge';
import { useLanguage } from '../../context/LanguageContext';
import { LegalService } from '@/src/services/legalService';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language, t } = useLanguage();

  const query = searchParams.get('q') || 'theft of mobile phone';
  const categoryParam = searchParams.get('category') || '';
  
  const [filterType, setFilterType] = useState('all'); // 'all', 'ipc', 'bns'
  const [results, setResults] = useState([]);
  const [savedSearch, setSavedSearch] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    async function loadData() {
      const data = await LegalService.searchSections({
        query: categoryParam ? '' : query,
        filterType,
        category: categoryParam,
      });
      setResults(data);
    }
    loadData();
  }, [query, filterType, categoryParam]);

  const countAll = 5;
  const countIPC = 3;
  const countBNS = 2;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-6 sm:py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* TOP BACK LINK */}
          <div className="mb-4">
            <Link
              href="/search"
              className="inline-flex items-center text-xs font-semibold text-[#1E40AF] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              {language === 'hi' ? 'खोज पर वापस जाएं' : 'Back to Search'}
            </Link>
          </div>

          {/* PAGE HEADER & ACTIONS */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F4B]">
                {language === 'hi' ? 'खोज परिणाम' : 'Search Results'}
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
                {t('resultsFor')}{' '}
                <span className="font-semibold text-[#0B1F4B]">"{query}"</span>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setSavedSearch(!savedSearch)}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  savedSearch
                    ? 'bg-[#EFF6FF] text-[#1E40AF] border-[#93C5FD]'
                    : 'bg-white text-[#475569] border-[#CBD5E1] hover:bg-slate-50'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 mr-1.5 ${savedSearch ? 'fill-[#1E40AF]' : ''}`} />
                {savedSearch
                  ? (language === 'hi' ? 'सहेजा गया' : 'Saved')
                  : t('saveSearch')}
              </button>
            </div>
          </div>

          {/* DESKTOP SUMMARY STRIP (Mockup pixel-for-pixel) */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-2xs mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              
              {/* Stat 1: Bail Eligibility */}
              <div className="flex items-center space-x-3 md:px-3">
                <div className="w-9 h-9 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                    {t('bailEligibility')}
                  </p>
                  <p className="text-sm font-bold text-[#16A34A]">
                    {t('generallyBailable')}
                  </p>
                </div>
              </div>

              {/* Stat 2: Bail Type */}
              <div className="flex items-center space-x-3 pt-3 md:pt-0 md:px-3">
                <div className="w-9 h-9 rounded-full bg-[#EFF6FF] text-[#1E40AF] flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                    {t('bailType')}
                  </p>
                  <p className="text-sm font-bold text-[#0B1F4B]">
                    {t('regularBail')}
                  </p>
                </div>
              </div>

              {/* Stat 3: Typical Time Limit */}
              <div className="flex items-center space-x-3 pt-3 md:pt-0 md:px-3">
                <div className="w-9 h-9 rounded-full bg-[#FFFBEB] text-[#D97706] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                    {t('typicalTime')}
                  </p>
                  <p className="text-sm font-bold text-[#0B1F4B]">
                    1 - 3 days
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* FILTER TABS & SORT (All, IPC, BNS) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'all'
                    ? 'bg-[#1E40AF] text-white shadow-xs'
                    : 'bg-white text-[#475569] border border-[#CBD5E1] hover:bg-slate-50'
                }`}
              >
                All ({countAll})
              </button>
              <button
                type="button"
                onClick={() => setFilterType('ipc')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'ipc'
                    ? 'bg-[#1E40AF] text-white shadow-xs'
                    : 'bg-white text-[#475569] border border-[#CBD5E1] hover:bg-slate-50'
                }`}
              >
                IPC ({countIPC})
              </button>
              <button
                type="button"
                onClick={() => setFilterType('bns')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'bns'
                    ? 'bg-[#1E40AF] text-white shadow-xs'
                    : 'bg-white text-[#475569] border border-[#CBD5E1] hover:bg-slate-50'
                }`}
              >
                BNS ({countBNS})
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-[#64748B]">{t('sortBy')}</span>
            </div>
          </div>

          {/* SEARCH RESULTS LIST CARDS */}
          <div className="space-y-3.5">
            {results.map((item) => (
              <Link
                key={item.id}
                href={`/section/${item.id}`}
                className="block bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-2xs hover:shadow-md hover:border-[#BFDBFE] transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start space-x-3.5 flex-1">
                    {/* Document Icon in rounded box */}
                    <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#1E40AF] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#1E40AF] group-hover:text-white transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-black text-sm sm:text-base text-[#0B1F4B]">
                          {item.code}
                        </span>
                        <span className="text-xs font-bold text-[#64748B]">
                          • {language === 'hi' ? item.titleHi : item.title}
                        </span>
                      </div>

                      <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                        {language === 'hi' ? item.shortDescHi : item.shortDesc}
                      </p>

                      {/* BADGES ROW */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        {item.bailable === true && (
                          <StatusBadge type="bailable" />
                        )}
                        {item.bailable === false && (
                          <StatusBadge type="non-bailable" />
                        )}
                        {item.bailable === null && (
                          <StatusBadge type="depends" />
                        )}

                        {item.cognizable && (
                          <StatusBadge type="cognizable" />
                        )}

                        {/* Desktop extra badges */}
                        <span className="hidden md:inline-flex text-[11px] font-medium text-[#475569] bg-[#F1F5F9] px-2.5 py-0.5 rounded-full border border-slate-200">
                          {language === 'hi' ? item.punishmentHi : item.punishment}
                        </span>
                        <span className="hidden md:inline-flex text-[11px] font-medium text-[#475569] bg-[#F1F5F9] px-2.5 py-0.5 rounded-full border border-slate-200">
                          {language === 'hi' ? item.courtLevelHi : item.courtLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Chevron */}
                  <div className="shrink-0 pt-2 text-[#94A3B8] group-hover:text-[#1E40AF] group-hover:translate-x-1 transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading search results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
