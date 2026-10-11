'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, Trash2, MoreVertical, Search, ArrowLeft, 
  Bookmark, Clock, ExternalLink 
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import StatusBadge from '../components/ui/StatusBadge';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_USER } from '@/src/data/mockData';

export default function SavedSectionsPage() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('saved'); // 'saved' or 'recent'
  const [savedList, setSavedList] = useState(MOCK_USER.savedSections);
  const [recentList, setRecentList] = useState(MOCK_USER.recentSearches);

  const handleDeleteSaved = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteRecent = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setRecentList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* HEADER BACK LINK */}
          <div className="mb-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-xs font-semibold text-[#1E40AF] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              {language === 'hi' ? 'डैशबोर्ड पर वापस' : 'Back to Dashboard'}
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xs overflow-hidden">
            
            {/* TABS: Saved Sections vs Recent Searches (Mockup pixel-for-pixel) */}
            <div className="flex border-b border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setActiveTab('saved')}
                className={`flex-1 py-3.5 text-center text-xs sm:text-sm font-bold border-b-2 transition-colors ${
                  activeTab === 'saved'
                    ? 'border-[#1E40AF] text-[#1E40AF]'
                    : 'border-transparent text-[#64748B] hover:text-[#0B1F4B]'
                }`}
              >
                {t('savedSectionsTitle')} ({savedList.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('recent')}
                className={`flex-1 py-3.5 text-center text-xs sm:text-sm font-bold border-b-2 transition-colors ${
                  activeTab === 'recent'
                    ? 'border-[#1E40AF] text-[#1E40AF]'
                    : 'border-transparent text-[#64748B] hover:text-[#0B1F4B]'
                }`}
              >
                {t('recentSearchesTitle')} ({recentList.length})
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="p-4 sm:p-6">
              
              {activeTab === 'saved' && (
                <div className="divide-y divide-[#F1F5F9]">
                  {savedList.length === 0 ? (
                    <div className="text-center py-10 text-xs text-[#94A3B8]">
                      No saved sections yet. Browse legal sections to bookmark them.
                    </div>
                  ) : (
                    savedList.map((item) => (
                      <div
                        key={item.id}
                        className="py-4 flex items-center justify-between hover:bg-slate-50/70 p-2 rounded-lg transition-colors group"
                      >
                        <Link
                          href={`/section/${item.id}`}
                          className="flex items-center space-x-3 flex-1"
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] text-[#1E40AF] flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>

                          <div>
                            <p className="font-bold text-xs sm:text-sm text-[#0B1F4B] group-hover:text-[#1E40AF] transition-colors">
                              {language === 'hi' ? item.codeHi : item.code}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              {item.bailable ? (
                                <StatusBadge type="bailable" size="xs" />
                              ) : (
                                <StatusBadge type="non-bailable" size="xs" />
                              )}
                              <span className="text-[10px] text-[#94A3B8]">
                                {language === 'hi' ? item.savedDateHi : item.savedDate}
                              </span>
                            </div>
                          </div>
                        </Link>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 pl-3">
                          <button
                            type="button"
                            onClick={(e) => handleDeleteSaved(item.id, e)}
                            className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                            aria-label="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors rounded-md"
                            aria-label="More"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'recent' && (
                <div className="divide-y divide-[#F1F5F9]">
                  {recentList.length === 0 ? (
                    <div className="text-center py-10 text-xs text-[#94A3B8]">
                      No recent searches.
                    </div>
                  ) : (
                    recentList.map((item) => (
                      <div
                        key={item.id}
                        className="py-4 flex items-center justify-between hover:bg-slate-50/70 p-2 rounded-lg transition-colors group"
                      >
                        <Link
                          href={item.path}
                          className="flex items-center space-x-3 flex-1"
                        >
                          <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                            <Clock className="w-4 h-4" />
                          </div>

                          <div>
                            <p className="font-bold text-xs sm:text-sm text-[#0B1F4B] group-hover:text-[#1E40AF] transition-colors">
                              {item.query}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-[10px] text-[#94A3B8]">
                                {language === 'hi' ? item.timeHi : item.time}
                              </span>
                              <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm">
                                {item.section}
                              </span>
                            </div>
                          </div>
                        </Link>

                        <div className="flex items-center space-x-2 pl-3">
                          <button
                            type="button"
                            onClick={(e) => handleDeleteRecent(item.id, e)}
                            className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                            aria-label="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
