'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaHistory, FaTimes } from 'react-icons/fa';
import { MdTipsAndUpdates } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const quickCategories = [
  { icon: '🔪', en: 'Against Person', hi: 'व्यक्ति के विरुद्ध', query: 'murder assault hurt' },
  { icon: '🏠', en: 'Property Offences', hi: 'संपत्ति अपराध', query: 'theft robbery burglary' },
  { icon: '👩', en: 'Women & Children', hi: 'महिला एवं बाल', query: 'dowry harassment women children' },
  { icon: '💻', en: 'Cyber Crime', hi: 'साइबर अपराध', query: 'cyber crime fraud online' },
  { icon: '💊', en: 'Drugs & NDPS', hi: 'नशीले पदार्थ', query: 'drugs narcotic NDPS' },
  { icon: '🚗', en: 'Traffic Offences', hi: 'यातायात अपराध', query: 'traffic rash driving accident' },
];

const Search = ({ inputRef, onAction }) => {
  const [value, setValue] = useState('');
  const [historyVisible, setHistoryVisible] = useState(false);
  const [hisCard, setHisCard] = useState([]);
  const [langu, setLangu] = useState('en');
  const textareaRef = useRef(null);
  const wrapperRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const cache = JSON.parse(localStorage.getItem('searchKeys')) || [];
    const lang = localStorage.getItem('bailLang') || 'en';
    setLangu(lang);

    const valid = cache.filter(term => {
      const item = localStorage.getItem(`bail-result-${term}`);
      if (!item) return false;
      try {
        const parsed = JSON.parse(item);
        return Array.isArray(parsed) && parsed.length > 0;
      } catch { return false; }
    });
    setHisCard(valid);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setHistoryVisible(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const submitSearch = (e) => {
    e?.preventDefault();
    const term = value.trim();
    if (!term) return;

    const cache = JSON.parse(localStorage.getItem('searchKeys')) || [];
    const filtered = cache.filter(t => t !== term);
    filtered.unshift(term);
    if (filtered.length > 10) filtered.pop();
    localStorage.setItem('searchKeys', JSON.stringify(filtered));
    setHisCard(filtered);

    onAction?.('search');
    router.push(`/result?message=${encodeURIComponent(term)}&lang=${langu}`);
    setHistoryVisible(false);
  };

  const searchClick = (term) => {
    setValue(term);
    setHistoryVisible(false);
  };

  const clearHistory = (term, e) => {
    e.stopPropagation();
    const newHis = hisCard.filter(t => t !== term);
    setHisCard(newHis);
    localStorage.setItem('searchKeys', JSON.stringify(newHis));
    localStorage.removeItem(`bail-result-${term}`);
  };

  const T = {
    en: {
      eyebrow: 'Search IPC / BNS Sections',
      heading: 'Find Your Legal Section',
      sub: 'Enter a description of the incident, offence name or IPC/BNS section to get relevant legal information.',
      placeholderMain: 'e.g. theft of mobile phone, hurt, dowry harassment, or Section 302...',
      searchBtn: 'Search Now',
      historyLabel: 'Recent Searches',
      categoriesLabel: 'Or browse by category',
    },
    hi: {
      eyebrow: 'IPC / BNS धाराएं खोजें',
      heading: 'अपनी कानूनी धारा खोजें',
      sub: 'घटना का विवरण, अपराध का नाम या IPC/BNS धारा दर्ज करें।',
      placeholderMain: 'जैसे: मोबाइल चोरी, मारपीट, दहेज उत्पीड़न, या धारा 302...',
      searchBtn: 'अभी खोजें',
      historyLabel: 'हाल की खोजें',
      categoriesLabel: 'या श्रेणी से ब्राउज़ करें',
    },
  };

  const txt = T[langu] || T.en;

  return (
    <section
      id="home"
      style={{
        background: 'linear-gradient(135deg, #f8f9fc 0%, #eef2f7 100%)',
        padding: '100px 24px 80px',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        {/* Eyebrow */}
        <div className="flex justify-center mb-4">
          <span
            className="flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full border"
            style={{ background: 'rgba(192,57,43,0.08)', color: 'var(--primary)', borderColor: 'rgba(192,57,43,0.2)' }}
          >
            <FaSearch size={11} />
            {txt.eyebrow}
          </span>
        </div>

        <h2
          className="text-4xl sm:text-5xl font-black text-center mb-4"
          style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)', lineHeight: 1.15 }}
        >
          {txt.heading}
        </h2>
        <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">{txt.sub}</p>

        {/* Search bar */}
        <div ref={wrapperRef} className="relative">
          <form onSubmit={submitSearch} className="relative">
            <div
              className="flex items-center bg-white rounded-2xl overflow-hidden"
              style={{
                border: '2px solid var(--border)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
              }}
            >
              <FaSearch className="ml-5 flex-shrink-0 text-gray-400" size={18} />
              <textarea
                ref={el => {
                  textareaRef.current = el;
                  if (inputRef) inputRef.current = el;
                }}
                value={value}
                onChange={e => setValue(e.target.value)}
                onFocus={() => setHistoryVisible(true)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) submitSearch(e); }}
                placeholder={txt.placeholderMain}
                rows={1}
                className="flex-1 px-4 py-4 text-base outline-none resize-none bg-transparent"
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  maxHeight: 120,
                  overflowY: 'auto',
                }}
              />
              <button
                type="submit"
                className="m-2 px-6 py-3 rounded-xl text-white font-semibold text-sm flex items-center gap-2 flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 15px rgba(192,57,43,0.4)',
                }}
              >
                <FaSearch size={13} />
                {txt.searchBtn}
              </button>
            </div>
          </form>

          {/* History dropdown */}
          {historyVisible && hisCard.length > 0 && (
            <div className="bs-history-dropdown">
              <div className="px-4 py-2 flex items-center gap-2 border-b border-gray-100">
                <FaHistory size={11} className="text-gray-400" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {txt.historyLabel}
                </span>
              </div>
              {hisCard.slice(0, 6).map(term => (
                <div
                  key={term}
                  className="bs-history-item justify-between"
                  onMouseDown={() => searchClick(term)}
                >
                  <span className="flex items-center gap-2">
                    <FaHistory size={11} className="flex-shrink-0" />
                    {term}
                  </span>
                  <button
                    onMouseDown={e => clearHistory(term, e)}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <FaTimes size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick categories */}
        <div className="mt-10">
          <p className="text-center text-sm text-gray-400 mb-4 flex items-center justify-center gap-2">
            <MdTipsAndUpdates className="text-yellow-500" />
            {txt.categoriesLabel}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => {
                  setValue(cat.query);
                  onAction?.('search');
                  router.push(`/result?message=${encodeURIComponent(cat.query)}&lang=${langu}`);
                }}
                className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border transition-all duration-200 text-left group"
                style={{
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(192,57,43,0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-sm font-medium text-gray-700">
                  {langu === 'en' ? cat.en : cat.hi}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
