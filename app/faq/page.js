'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';
import { FAQ_DATA } from '@/src/data/mockData';

export default function FAQPage() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [expandedIndex, setExpandedIndex] = useState(0); // first item expanded by default
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategoryData = FAQ_DATA.find((c) => c.category === selectedCategory) || FAQ_DATA[0];

  const filteredItems = currentCategoryData.items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      (item.questionHi && item.questionHi.includes(q))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* HEADER */}
          <div className="text-center space-y-1.5 mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F4B]">
              {t('faqTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto">
              {t('faqSubtitle')}
            </p>
          </div>

          {/* SEARCH FAQS INPUT */}
          <div className="max-w-xl mx-auto mb-10">
            <div className="flex items-center bg-white rounded-xl shadow-xs border border-[#CBD5E1] p-1.5 focus-within:ring-2 focus-within:ring-[#1E40AF]">
              <Search className="w-4 h-4 text-slate-400 ml-3 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchFaqPlaceholder')}
                className="w-full text-xs sm:text-sm text-[#0B1F4B] placeholder:text-[#94A3B8] outline-none bg-transparent py-2"
              />
            </div>
          </div>

          {/* DESKTOP SPLIT: Categories on left, Accordions on right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Category Navigation (Horizontal on mobile, Vertical on desktop) */}
            <div className="md:col-span-4 bg-white rounded-xl border border-[#E2E8F0] p-3 shadow-2xs">
              <div className="flex md:flex-col overflow-x-auto gap-1">
                {FAQ_DATA.map((cat) => {
                  const isActive = selectedCategory === cat.category;
                  return (
                    <button
                      key={cat.category}
                      onClick={() => {
                        setSelectedCategory(cat.category);
                        setExpandedIndex(0);
                      }}
                      className={`text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                        isActive
                          ? 'bg-[#1E40AF] text-white shadow-xs'
                          : 'text-[#475569] hover:bg-slate-50 hover:text-[#0B1F4B]'
                      }`}
                    >
                      {language === 'hi' ? cat.categoryHi : cat.category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accordion Questions List */}
            <div className="md:col-span-8 bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs divide-y divide-[#F1F5F9]">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No questions match your search.
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isExpanded = expandedIndex === idx;
                  return (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                        className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-[#0B1F4B] hover:text-[#1E40AF] transition-colors"
                      >
                        <span className="pr-4">
                          {language === 'hi' ? item.questionHi : item.question}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#1E40AF] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="pt-3 text-xs text-[#64748B] leading-relaxed animate-in fade-in slide-in-from-top-1 duration-150">
                          {language === 'hi' ? item.answerHi : item.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
