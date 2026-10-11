'use client';

import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaBalanceScale, FaArrowLeft, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import { MdGavel, MdTimer, MdCheckCircle, MdCancel, MdSecurity } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import SkeletonCard from '../components/SkeletonCard';

const translations = {
  en: {
    bridge: 'Your bridge to legal freedom',
    resultsFor: 'Results for',
    ipcHeader: 'Legal Sections Found',
    section: 'Section',
    subSection: 'Sub-Section',
    description: 'Description',
    punishment: 'Punishment',
    bailable: 'Bailable',
    bailYes: 'Bailable',
    bailNo: 'Non-Bailable',
    bailType: 'Bail Type',
    bailTime: 'Bail Time Limit',
    moreInfo: 'View Source',
    backToHome: 'Back to Home',
    loadingInsights: 'Analyzing legal sections...',
    loadMore: 'Load More Results',
    category: 'Category',
    noDescription: 'No description available',
    statute: 'As per statute',
    notSpecified: 'As per court discretion',
    courtDiscretion: 'As per court discretion',
    notFound: "Sorry, we couldn't find any legal sections related to your query.",
    tryAgain: 'Try a different search',
    resultsCount: 'sections found',
    cognizable: 'Cognizable',
  },
  hi: {
    bridge: 'आपकी कानूनी स्वतंत्रता की सेतु',
    resultsFor: 'खोज परिणाम',
    ipcHeader: 'कानूनी धाराएं मिली',
    section: 'धारा',
    subSection: 'उप-धारा',
    description: 'विवरण',
    punishment: 'सजा',
    bailable: 'जमानती',
    bailYes: 'जमानती',
    bailNo: 'गैर-जमानती',
    bailType: 'जमानत का प्रकार',
    bailTime: 'जमानत की समय-सीमा',
    moreInfo: 'स्रोत देखें',
    backToHome: 'मुखपृष्ठ पर जाएं',
    loadingInsights: 'कानूनी जानकारियाँ लोड हो रही हैं...',
    loadMore: 'अधिक परिणाम लोड करें',
    category: 'श्रेणी',
    noDescription: 'कोई विवरण उपलब्ध नहीं',
    statute: 'कानून के अनुसार',
    notSpecified: 'न्यायालय के विवेक के अनुसार',
    courtDiscretion: 'न्यायालय के विवेक के अनुसार',
    notFound: 'माफ़ कीजिए, आपकी खोज से संबंधित कोई धारा नहीं मिली।',
    tryAgain: 'अलग खोज करें',
    resultsCount: 'धाराएं मिलीं',
    cognizable: 'संज्ञेय',
  },
};

const triviaList = [
  'In India, bail is a constitutional right under Article 21.',
  'Anticipatory bail is covered under Section 438 CrPC.',
  'The concept of bail traces back to medieval England.',
  'Supreme Court: "Bail is the rule, jail the exception."',
  'Juveniles are usually granted bail by default.',
  'Bail can be denied to prevent evidence tampering.',
  'Police can grant bail for bailable offences directly.',
];

const iconList = ['⚖️', '📜', '🏛️', '⏳', '🧑‍⚖️', '🪪', '🔍', '📂'];

export default function Result() {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [progress, setProgress] = useState(0);
  const [trivia, setTrivia] = useState('');
  const [icon, setIcon] = useState('⚖️');
  const [lang, setLang] = useState('en');
  const [searchInput, setSearchInput] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();
  const message = searchParams.get('message');

  useEffect(() => {
    const savedLang = localStorage.getItem('bailLang') || 'en';
    setLang(savedLang);
    setSearchInput(message || '');
  }, [message]);

  useEffect(() => {
    setDisplayedCards(cards.slice(0, visibleCount));
  }, [cards, visibleCount]);

  const t = translations[lang] || translations.en;

  // Progress bar logic
  useEffect(() => {
    let progressInterval, triviaInterval, iconInterval;
    if (loading) {
      setProgress(0);
      setTrivia(triviaList[Math.floor(Math.random() * triviaList.length)]);
      progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + Math.random() * 5 + 2, 96));
      }, 1800);
      triviaInterval = setInterval(() => {
        setTrivia(triviaList[Math.floor(Math.random() * triviaList.length)]);
      }, 3500);
      iconInterval = setInterval(() => {
        setIcon(prev => {
          let next;
          do { next = iconList[Math.floor(Math.random() * iconList.length)]; } while (next === prev);
          return next;
        });
      }, 1000);
    }
    return () => { clearInterval(progressInterval); clearInterval(triviaInterval); clearInterval(iconInterval); };
  }, [loading]);

  // Fetch data
  useEffect(() => {
    if (!message) return;
    async function fetchData() {
      const cacheKey = `bail-result-${message}`;
      const cached = typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null;
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCards(parsed.map(item => ({ ...item, id: uuidv4(), isCollapsed: true })));
            return;
          }
        } catch {}
      }

      setLoading(true);
      try {
        const response = await fetch('/api/classify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
        });
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        if (data.error) { setCards([]); setLoading(false); return; }
        if (data.original_language) {
          const dl = data.original_language === 'hi' ? 'hi' : 'en';
          setLang(dl);
          localStorage.setItem('bailLang', dl);
        }
        const result = data.sections || [];
        if (Array.isArray(result)) {
          setCards(result.map(item => ({ ...item, id: uuidv4(), isCollapsed: true })));
          localStorage.setItem(cacheKey, JSON.stringify(result));
          let keys = JSON.parse(localStorage.getItem('searchKeys') || '[]');
          if (!keys.includes(message)) {
            keys.unshift(message);
            if (keys.length > 10) { const removed = keys.pop(); localStorage.removeItem(`bail-result-${removed}`); }
            localStorage.setItem('searchKeys', JSON.stringify(keys));
          }
        } else { setCards([]); }
      } catch (error) {
        console.error('Error:', error);
        setCards([]);
      } finally {
        setProgress(100);
        setTimeout(() => setLoading(false), 400);
      }
    }
    fetchData();
  }, [message]);

  function toggleView(id) {
    setCards(prev => prev.map(c => c.id === id ? { ...c, isCollapsed: !c.isCollapsed } : c));
  }

  const handleNewSearch = (e) => {
    e.preventDefault();
    const term = searchInput.trim();
    if (!term) return;
    router.push(`/result?message=${encodeURIComponent(term)}&lang=${lang}`);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', paddingTop: 0 }}>

      {/* Top bar */}
      <div
        className="sticky top-0 z-50 border-b"
        style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', borderColor: 'var(--border)' }}
      >
        <div className="container py-3 flex items-center gap-4">
          {/* Back button */}
          <button
            onClick={() => router.push('/Home')}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
          >
            <FaArrowLeft size={13} />
            <span className="hidden sm:inline">{t.backToHome}</span>
          </button>

          {/* Brand */}
          <div className="flex items-center gap-2 text-lg font-black" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)' }}>
            <FaBalanceScale className="text-red-600" />
            BAIL <span className="text-red-600">सेतु</span>
          </div>

          {/* Inline search */}
          <form onSubmit={handleNewSearch} className="flex-1 max-w-lg ml-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
              <input
                type="text"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-100 border border-transparent rounded-full text-sm outline-none transition-all focus:bg-white focus:border-red-300 focus:shadow-sm"
                style={{ fontFamily: 'var(--font-sans)' }}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="container py-8">

        {/* Search context */}
        {message && (
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-1">{t.resultsFor}:</p>
            <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display, serif' }}>
              &ldquo;{message}&rdquo;
            </h1>
            {!loading && cards.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                {cards.length} {t.resultsCount}
              </p>
            )}
          </div>
        )}

        {/* === LOADING STATE === */}
        {loading && (
          <div>
            {/* Progress loader */}
            <div className="bg-white rounded-2xl p-8 mb-8 border text-center" style={{ borderColor: 'var(--border)', boxShadow: 'var(--shadow-md)' }}>
              <div className="text-6xl mb-4 animate-float">{icon}</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{t.loadingInsights}</h2>
              <p className="text-gray-500 text-sm mb-6">{trivia}</p>
              {/* Progress bar */}
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Analyzing...</span>
                  <span>{Math.floor(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Skeleton cards */}
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        )}

        {/* === RESULTS === */}
        {!loading && (
          <>
            {displayedCards.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-700">{t.ipcHeader}</h2>
                {displayedCards.map((card, idx) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.06 }}
                    className="bs-result-card"
                  >
                    {/* Card header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bs-badge bs-badge-section">
                          § {card.section_number || 'N/A'}
                        </span>
                        {card.bail_applicable ? (
                          <span className="bs-badge bs-badge-bailable">
                            <MdCheckCircle size={12} />
                            {t.bailYes}
                          </span>
                        ) : (
                          <span className="bs-badge bs-badge-non-bailable">
                            <MdCancel size={12} />
                            {t.bailNo}
                          </span>
                        )}
                        {card.category && (
                          <span className="bs-badge" style={{ background: '#fef3c7', color: '#92400e' }}>
                            {card.category}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => toggleView(card.id)}
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors text-gray-500 hover:text-red-600"
                      >
                        {card.isCollapsed ? <FaChevronDown size={12} /> : <FaChevronUp size={12} />}
                      </button>
                    </div>

                    {/* Title row */}
                    <div className="mb-3">
                      <h3 className="font-bold text-gray-800 text-lg leading-tight">
                        {card.title || 'Unknown Offence'}
                      </h3>
                      {card.sub_section && (
                        <p className="text-sm text-gray-400 mt-0.5">{t.subSection}: {card.sub_section}</p>
                      )}
                    </div>

                    {/* Tags */}
                    {card.tags && card.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {card.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full"
                            style={{ background: '#f1f5f9', color: '#475569' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Expanded details */}
                    <AnimatePresence>
                      {!card.isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div
                            className="border-t pt-4 mt-2 grid sm:grid-cols-2 gap-4"
                            style={{ borderColor: 'var(--border)' }}
                          >
                            {/* Description */}
                            <div className="sm:col-span-2">
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{t.description}</p>
                              <p className="text-gray-700 text-sm leading-relaxed">{card.description || t.noDescription}</p>
                            </div>

                            {/* Punishment */}
                            <div className="bg-gray-50 rounded-xl p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <MdGavel className="text-red-600" />
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{t.punishment}</span>
                              </div>
                              <p className="text-gray-700 text-sm">{card.punishment || t.statute}</p>
                            </div>

                            {/* Bail info */}
                            {card.bail_applicable && (
                              <div className="bg-green-50 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <MdTimer className="text-green-600" />
                                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{t.bailType}</span>
                                </div>
                                <p className="text-gray-700 text-sm">{card.bail_type || t.notSpecified}</p>
                                {card.bail_time_limit && (
                                  <p className="text-sm text-green-700 font-medium mt-1">⏱ {card.bail_time_limit}</p>
                                )}
                              </div>
                            )}

                            {/* Source link */}
                            {card.source_link && (
                              <div className="sm:col-span-2">
                                <a
                                  href={card.source_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                >
                                  <FaExternalLinkAlt size={11} />
                                  {t.moreInfo}
                                </a>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {/* Load more */}
                {visibleCount < cards.length && (
                  <div className="flex justify-center py-6">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 5)}
                      className="bs-btn-primary px-10 py-3"
                    >
                      {t.loadMore} ({cards.length - visibleCount} {lang === 'en' ? 'remaining' : 'बाकी'})
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Not found */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-6">🔍</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-3">{t.notFound}</h2>
                <p className="text-gray-400 mb-8 max-w-md">
                  {lang === 'en'
                    ? 'Try using different keywords, or browse by category from the home page.'
                    : 'अलग कीवर्ड का प्रयास करें, या होम पेज से श्रेणी द्वारा ब्राउज़ करें।'}
                </p>
                <div className="flex gap-3">
                  <button onClick={() => router.push('/Home')} className="bs-btn-primary">
                    {t.backToHome}
                  </button>
                  <button onClick={() => router.push('/Home')} className="bs-btn-secondary">
                    {t.tryAgain}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Disclaimer */}
        <div className="mt-10 p-5 rounded-2xl border text-sm text-gray-500 text-center" style={{ background: '#fff9f9', borderColor: 'rgba(192,57,43,0.15)' }}>
          ⚠️ {lang === 'en'
            ? 'This information is for educational purposes only and not legal advice. Please consult a qualified advocate for your specific case.'
            : 'यह जानकारी केवल शैक्षिक उद्देश्यों के लिए है और कानूनी सलाह नहीं है। अपने मामले के लिए योग्य वकील से परामर्श करें।'}
        </div>
      </div>
    </div>
  );
}
