'use client';
import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const translations = {
  en: {
    eyebrow: 'Bail Guidelines',
    title: "Do's & Don'ts",
    subtitle: 'Essential guidelines to follow during the bail process',
    doTitle: "What to DO",
    dontTitle: "What NOT to Do",
    dos: [
      { text: 'Consult a qualified lawyer immediately after arrest', icon: '👨‍⚖️' },
      { text: 'Gather and preserve all relevant documents and evidence', icon: '📄' },
      { text: 'Be truthful and transparent in court proceedings', icon: '⚖️' },
      { text: 'Inform your family and trusted contacts right away', icon: '👨‍👩‍👧' },
      { text: 'Follow all bail conditions set by the court strictly', icon: '📋' },
      { text: 'Keep all court date reminders and attend on time', icon: '📅' },
    ],
    donts: [
      { text: "Don't miss any court dates or hearings", icon: '❌' },
      { text: "Don't contact the complainant or witnesses", icon: '🚫' },
      { text: "Don't leave the country without court permission", icon: '✈️' },
      { text: "Don't tamper with evidence or destroy documents", icon: '📁' },
      { text: "Don't commit any further offence while on bail", icon: '⚠️' },
      { text: "Don't ignore your lawyer's advice or instructions", icon: '👂' },
    ],
  },
  hi: {
    eyebrow: 'जमानत दिशानिर्देश',
    title: 'क्या करें और क्या नहीं करें',
    subtitle: 'जमानत प्रक्रिया के दौरान पालन करने के लिए आवश्यक दिशानिर्देश',
    doTitle: 'क्या करें',
    dontTitle: 'क्या नहीं करें',
    dos: [
      { text: 'गिरफ्तारी के तुरंत बाद योग्य वकील से संपर्क करें', icon: '👨‍⚖️' },
      { text: 'सभी संबंधित दस्तावेज़ और साक्ष्य एकत्र करें', icon: '📄' },
      { text: 'कोर्ट में सच्चाई और पारदर्शिता बनाए रखें', icon: '⚖️' },
      { text: 'परिवार और विश्वसनीय लोगों को तुरंत सूचित करें', icon: '👨‍👩‍👧' },
      { text: 'कोर्ट द्वारा निर्धारित सभी जमानत शर्तों का पालन करें', icon: '📋' },
      { text: 'सभी कोर्ट तारीखों पर समय पर उपस्थित रहें', icon: '📅' },
    ],
    donts: [
      { text: 'कोर्ट की किसी भी तारीख या सुनवाई को न चूकें', icon: '❌' },
      { text: 'शिकायतकर्ता या गवाहों से संपर्क न करें', icon: '🚫' },
      { text: 'कोर्ट की अनुमति के बिना देश न छोड़ें', icon: '✈️' },
      { text: 'सबूतों के साथ छेड़छाड़ न करें', icon: '📁' },
      { text: 'जमानत पर रहते हुए कोई और अपराध न करें', icon: '⚠️' },
      { text: 'वकील की सलाह और निर्देशों को नजरअंदाज न करें', icon: '👂' },
    ],
  },
};

const DoAndDonts = ({ language: propLang }) => {
  const [language, setLanguage] = useState('en');
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    const lang = propLang || localStorage.getItem('bailLang') || 'en';
    setLanguage(lang);
  }, [propLang]);

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const t = translations[language] || translations.en;

  return (
    <section
      id="dos-donts"
      className="py-20 px-4"
      style={{ background: '#f8f9fc' }}
      ref={ref}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: 'var(--primary)' }}
          >
            {t.eyebrow}
          </span>
          <h2 className="bs-section-title mb-3">{t.title}</h2>
          <p className="bs-section-subtitle">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* DO Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{ visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } } }}
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: '#16a34a30', boxShadow: '0 4px 20px rgba(22,163,74,0.1)' }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-6 py-4"
              style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <FaThumbsUp className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-white">{t.doTitle}</h3>
            </div>

            {/* Items */}
            <div className="bg-white p-6 space-y-4">
              {t.dos.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200"
                  style={{ background: '#f0fdf4' }}
                  whileHover={{ x: 4, backgroundColor: '#dcfce7' }}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#16a34a' }}>
                    <FaCheck className="text-white text-xs" />
                  </div>
                  <div className="flex items-start gap-2">
                    <span>{item.icon}</span>
                    <span className="text-gray-700 text-sm leading-relaxed">{item.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* DON'T Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            variants={{ visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.1 } } }}
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: '#dc262630', boxShadow: '0 4px 20px rgba(220,38,38,0.1)' }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-6 py-4"
              style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <FaThumbsDown className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-white">{t.dontTitle}</h3>
            </div>

            {/* Items */}
            <div className="bg-white p-6 space-y-4">
              {t.donts.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200"
                  style={{ background: '#fff5f5' }}
                  whileHover={{ x: 4, backgroundColor: '#fee2e2' }}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#dc2626' }}>
                    <FaTimes className="text-white text-xs" />
                  </div>
                  <div className="flex items-start gap-2">
                    <span>{item.icon}</span>
                    <span className="text-gray-700 text-sm leading-relaxed">{item.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DoAndDonts;
