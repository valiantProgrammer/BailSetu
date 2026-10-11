'use client';
import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaQuestionCircle, FaSearch } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FAQs = ({ language: propLang }) => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [language, setLanguage] = useState('en');
  const [searchQ, setSearchQ] = useState('');
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    const lang = propLang || localStorage.getItem('bailLang') || 'en';
    setLanguage(lang);
  }, [propLang]);

  useEffect(() => {
    fetch('/api/faqs', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(err => console.error('Failed to load FAQs:', err));
  }, []);

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  const filteredFaqs = faqs.filter(item => {
    if (!searchQ) return true;
    const q = (item.question?.[language] || '').toLowerCase();
    return q.includes(searchQ.toLowerCase());
  });

  return (
    <section
      id="faq"
      className="py-20 px-4"
      style={{ background: 'linear-gradient(135deg, #f8f9fc 0%, #eef2f7 100%)' }}
      ref={ref}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: 'var(--primary)' }}
          >
            {language === 'hi' ? 'सहायता' : 'Help Center'}
          </span>
          <h2 className="bs-section-title mb-3">
            {language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
          </h2>
          <p className="bs-section-subtitle mb-8">
            {language === 'hi'
              ? 'जमानत प्रक्रिया और BailSetu के बारे में सामान्य प्रश्नों के उत्तर'
              : 'Find answers to common questions about the bail process and using BailSetu'}
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder={language === 'hi' ? 'प्रश्न खोजें...' : 'Search FAQs...'}
              className="w-full pl-10 pr-4 py-3 bg-white border rounded-full text-sm outline-none transition-all"
              style={{
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow-sm)',
                fontFamily: 'var(--font-sans)',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(192,57,43,0.1)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.boxShadow = 'var(--shadow-sm)';
              }}
            />
          </div>
        </div>

        {/* FAQ list */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              <FaQuestionCircle className="mx-auto text-4xl mb-3 opacity-30" />
              <p>{language === 'hi' ? 'कोई प्रश्न नहीं मिला' : 'No FAQs found'}</p>
            </div>
          )}

          {filteredFaqs.map((item, index) => (
            <motion.div
              key={item._id || index}
              className="bs-faq-item"
              style={{ '--open': openIndex === index ? 1 : 0 }}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.08, duration: 0.5, type: 'spring', stiffness: 70 },
                },
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-start gap-4 px-6 py-5 text-left"
              >
                {/* Number */}
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                  style={{
                    background: openIndex === index ? 'var(--primary)' : 'rgba(192,57,43,0.08)',
                    color: openIndex === index ? 'white' : 'var(--primary)',
                  }}
                >
                  {index + 1}
                </div>

                <h3 className="flex-1 text-base font-semibold text-gray-800 leading-snug">
                  {item.question?.[language]}
                </h3>

                <FaChevronDown
                  size={14}
                  className="flex-shrink-0 mt-1 text-gray-400 transition-transform duration-300"
                  style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0)' }}
                />
              </button>

              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: openIndex === index ? 500 : 0 }}
              >
                <div className="px-6 pb-5 pl-[4.5rem]">
                  <p className="text-gray-600 leading-relaxed text-sm">{item.answer?.[language]}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
