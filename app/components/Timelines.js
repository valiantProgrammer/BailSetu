'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowRight, FaExternalLinkAlt, FaClock } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const timelineData = {
  en: [
    {
      title: 'First Hearing',
      subtitle: 'Initial Appearance',
      image: '/firstHearing.jpg',
      shortText: 'Typically within 24 hours of arrest',
      badge: '24 hours',
      badgeColor: '#16a34a',
      fullText:
        "The First Hearing is the accused's initial court appearance after arrest. As per Article 22(2) of the Constitution of India and Section 57 of the Criminal Procedure Code (CrPC), the arrested person must be presented before a Magistrate within 24 hours of arrest.",
      source: 'https://indiankanoon.org/doc/1218094/',
    },
    {
      title: 'Regular Bail',
      subtitle: 'Post-Arrest Application',
      image: '/regularBail.jpg',
      shortText: 'Usually decided within 7–15 days',
      badge: '7–15 days',
      badgeColor: '#2563eb',
      fullText:
        'A regular bail is applied for after a person is arrested and is in custody. The court generally decides such bail within 7–15 days depending on the gravity of the offense and judicial workload.',
      source: 'https://indiankanoon.org/doc/1161476/',
    },
    {
      title: 'Anticipatory Bail',
      subtitle: 'Pre-Arrest Protection',
      image: '/anticipatoryBail.jpg',
      shortText: 'Can be filed before arrest',
      badge: 'Pre-Arrest',
      badgeColor: '#9333ea',
      fullText:
        'Anticipatory Bail is a provision under Section 438 of CrPC, which allows a person to seek bail in anticipation of arrest for a non-bailable offense, before actual arrest.',
      source: 'https://indiankanoon.org/doc/1487551/',
    },
  ],
  hi: [
    {
      title: 'पहली सुनवाई',
      subtitle: 'प्रारंभिक उपस्थिति',
      image: '/firstHearing.jpg',
      shortText: 'गिरफ्तारी के 24 घंटे के भीतर',
      badge: '24 घंटे',
      badgeColor: '#16a34a',
      fullText:
        'पहली सुनवाई गिरफ्तारी के बाद आरोपी की प्रारंभिक अदालत उपस्थिति होती है। भारत के संविधान के अनुच्छेद 22(2) और CrPC की धारा 57 के अनुसार, गिरफ्तार व्यक्ति को 24 घंटे के भीतर मजिस्ट्रेट के सामने पेश किया जाना चाहिए।',
      source: 'https://indiankanoon.org/doc/1218094/',
    },
    {
      title: 'नियमित जमानत',
      subtitle: 'गिरफ्तारी के बाद आवेदन',
      image: '/regularBail.jpg',
      shortText: 'आमतौर पर 7–15 दिनों में तय',
      badge: '7–15 दिन',
      badgeColor: '#2563eb',
      fullText:
        'नियमित जमानत तब दायर की जाती है जब कोई व्यक्ति गिरफ्तार होता है और हिरासत में होता है। अदालत आमतौर पर अपराध की गंभीरता के आधार पर 7–15 दिनों में निर्णय लेती है।',
      source: 'https://indiankanoon.org/doc/1161476/',
    },
    {
      title: 'अग्रिम जमानत',
      subtitle: 'गिरफ्तारी से पहले सुरक्षा',
      image: '/anticipatoryBail.jpg',
      shortText: 'गिरफ्तारी से पहले दायर की जा सकती है',
      badge: 'गिरफ्तारी से पहले',
      badgeColor: '#9333ea',
      fullText:
        'अग्रिम जमानत CrPC की धारा 438 के तहत एक प्रावधान है, जो किसी व्यक्ति को गैर-जमानती अपराध में गिरफ्तारी की आशंका के आधार पर जमानत प्राप्त करने की अनुमति देता है।',
      source: 'https://indiankanoon.org/doc/1487551/',
    },
  ],
};

const Timelines = ({ language: propLang }) => {
  const [expanded, setExpanded] = useState([]);
  const [language, setLanguage] = useState('en');
  const [inViewStates, setInViewStates] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    const lang = propLang || localStorage.getItem('bailLang') || 'en';
    setLanguage(lang);
    setExpanded(Array(timelineData[lang] || timelineData.en).fill(false));
    setInViewStates(Array((timelineData[lang] || timelineData.en).length).fill(false));
  }, [propLang]);

  useEffect(() => {
    const observers = [];
    refs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInViewStates(prev => {
              const next = [...prev];
              next[index] = true;
              return next;
            });
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const toggleCard = (index) => {
    setExpanded(prev => prev.map((val, i) => (i === index ? !val : val)));
  };

  const data = timelineData[language] || timelineData.en;

  return (
    <section
      id="timelines"
      className="py-20 px-4"
      style={{ background: 'white' }}
    >
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold uppercase tracking-widest mb-3 block"
            style={{ color: 'var(--primary)' }}
          >
            {language === 'hi' ? 'प्रक्रिया को समझें' : 'Understand the Process'}
          </span>
          <h2 className="bs-section-title mb-3">
            {language === 'hi' ? 'जमानत की समयरेखा' : 'Bail Timelines Explained'}
          </h2>
          <p className="bs-section-subtitle">
            {language === 'hi'
              ? 'जमानत प्रक्रिया के प्रत्येक चरण को स्पष्ट रूप से समझें'
              : 'Understand each stage of the bail process with clear explanations and legal references'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <motion.div
              ref={el => (refs.current[index] = el)}
              key={index}
              className="bs-timeline-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inViewStates[index] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,34,56,0.6) 0%, transparent 60%)' }} />
                {/* Time badge */}
                <div
                  className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-bold"
                  style={{ background: item.badgeColor }}
                >
                  <FaClock size={10} />
                  {item.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    {item.subtitle}
                  </span>
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{item.shortText}</p>

                <AnimatePresence mode="wait">
                  {expanded[index] && (
                    <motion.div
                      key="expanded"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 border-t border-gray-100 pt-4">
                        {item.fullText}
                      </p>
                      <a
                        href={item.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <FaExternalLinkAlt size={12} />
                        {language === 'hi' ? 'स्रोत देखें' : 'View Legal Source'}
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => toggleCard(index)}
                  className="mt-4 w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{
                    background: expanded[index] ? 'rgba(192,57,43,0.06)' : '#f8f9fc',
                    color: expanded[index] ? 'var(--primary)' : 'var(--text-secondary)',
                    border: `1px solid ${expanded[index] ? 'rgba(192,57,43,0.2)' : 'var(--border)'}`,
                  }}
                >
                  <span>
                    {language === 'hi'
                      ? expanded[index] ? 'कम पढ़ें' : 'और पढ़ें'
                      : expanded[index] ? 'Read less' : 'Read more'}
                  </span>
                  <FaArrowRight
                    size={12}
                    style={{
                      transform: expanded[index] ? 'rotate(90deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timelines;
