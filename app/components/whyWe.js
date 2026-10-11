'use client';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaBalanceScale, FaUsers, FaLightbulb } from 'react-icons/fa';

const translations = {
  en: {
    eyebrow: 'Our Mission',
    heading: 'Why We Built This',
    paragraph: 'Many people — especially those from marginalized communities — lack access to clear, timely, and affordable legal information. Misunderstanding bail laws can lead to unnecessary jail time, financial burden, or legal delays.',
    highlight: 'BAIL सेतु bridges this gap',
    end: 'by providing accurate, easy-to-understand legal tools for every Indian citizen.',
    reasons: [
      'Free access to 1500+ IPC & BNS sections',
      'AI-powered bail eligibility analysis',
      'Clear Hindi & English explanations',
      'Verified legal advocate directory',
    ],
  },
  hi: {
    eyebrow: 'हमारा उद्देश्य',
    heading: 'हमने इसे क्यों बनाया',
    paragraph: 'कई लोगों को — विशेष रूप से हाशिए पर रहने वाले समुदायों से — स्पष्ट, समय पर और सस्ती कानूनी जानकारी तक पहुंच नहीं होती है। जमानत कानूनों की गलत समझ से अनावश्यक जेल, वित्तीय बोझ या कानूनी देरी हो सकती है।',
    highlight: 'BAIL सेतु इस अंतर को भरता है',
    end: 'सभी भारतीय नागरिकों के लिए सटीक और समझने में आसान कानूनी उपकरण प्रदान करके।',
    reasons: [
      'IPC और BNS की 1500+ धाराओं तक निःशुल्क पहुंच',
      'AI-संचालित जमानत पात्रता विश्लेषण',
      'हिंदी और अंग्रेजी में स्पष्ट व्याख्या',
      'सत्यापित कानूनी वकील निर्देशिका',
    ],
  },
};

const values = [
  { icon: <FaBalanceScale />, en: 'Justice for All', hi: 'सबके लिए न्याय', en_d: 'Every citizen deserves equal access to legal information.', hi_d: 'प्रत्येक नागरिक को कानूनी जानकारी तक समान पहुंच का अधिकार है।' },
  { icon: <FaUsers />, en: 'Community First', hi: 'समुदाय पहले', en_d: 'Built for marginalized communities who need it most.', hi_d: 'उन हाशिए के समुदायों के लिए बनाया गया जिन्हें इसकी सबसे अधिक आवश्यकता है।' },
  { icon: <FaLightbulb />, en: 'Empowerment', hi: 'सशक्तिकरण', en_d: 'Knowledge is power — and everyone deserves it.', hi_d: 'ज्ञान शक्ति है — और हर कोई इसका हकदार है।' },
];

const WhyWe = ({ language: propLang }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const lang = propLang || localStorage.getItem('bailLang') || 'en';
    setLanguage(lang);
  }, [propLang]);

  const t = translations[language] || translations.en;

  return (
    <section
      id="about"
      className="py-20 px-4"
      style={{ background: 'linear-gradient(135deg, #1a2238 0%, #2c3e50 100%)' }}
    >
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: '#e74c3c' }}
          >
            {t.eyebrow}
          </span>
          <h2
            className="text-4xl font-black text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {t.heading}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.paragraph}{' '}
            <span className="text-white font-semibold">{t.highlight}</span>{' '}
            {t.end}
          </p>
        </div>

        {/* Values cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {values.map((v, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 border transition-all duration-300 group"
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.borderColor = 'rgba(192,57,43,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mb-4"
                style={{ background: 'rgba(192,57,43,0.3)' }}
              >
                {v.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                {language === 'en' ? v.en : v.hi}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {language === 'en' ? v.en_d : v.hi_d}
              </p>
            </div>
          ))}
        </div>

        {/* Checklist */}
        <div className="max-w-lg mx-auto">
          <div
            className="rounded-2xl p-8 border"
            style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <h3 className="text-white font-bold text-lg mb-5 text-center">
              {language === 'en' ? 'What makes us different' : 'हम अलग क्यों हैं'}
            </h3>
            <div className="space-y-3">
              {t.reasons.map((r, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: '#e74c3c' }}
                  >
                    <FaCheck className="text-white text-xs" />
                  </div>
                  <span className="text-white/80 text-sm">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWe;
