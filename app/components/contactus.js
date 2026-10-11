'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaPhone, FaGavel, FaExternalLinkAlt } from 'react-icons/fa';
import { MdPrivacyTip, MdPolicy } from 'react-icons/md';

const ContactUs = ({ language = 'en', email }) => {
  const router = useRouter();

  const quickLinks = [
    { icon: <FaGavel size={14} />, en: 'FAQs', hi: 'प्रश्न', href: '#faq' },
    { icon: <MdPrivacyTip size={14} />, en: 'Privacy Policy', hi: 'गोपनीयता नीति', href: '#' },
    { icon: <MdPolicy size={14} />, en: 'Terms of Service', hi: 'सेवा की शर्तें', href: '/TermsAndConditions' },
  ];

  const legalLinks = [
    { label: 'Indian Penal Code (IPC)', href: 'https://indiankanoon.org/doc/1569253/' },
    { label: 'Bharatiya Nyaya Sanhita (BNS)', href: 'https://www.indiacode.nic.in/' },
    { label: 'Supreme Court of India', href: 'https://main.sci.gov.in/' },
    { label: 'Legal Aid Services', href: 'https://nalsa.gov.in/' },
  ];

  return (
    <footer id="contact" className="bs-footer">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="text-white text-2xl font-black mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              BAIL <span style={{ color: '#e74c3c' }}>सेतु</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              {language === 'en'
                ? 'India\'s comprehensive bail law platform — empowering citizens with legal knowledge.'
                : 'भारत का व्यापक जमानत कानून मंच — नागरिकों को कानूनी ज्ञान से सशक्त बना रहे हैं।'}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:suvidhan.bail@gmail.com"
                className="flex items-center gap-2 text-white/60 hover:text-red-400 transition-colors text-sm"
              >
                <FaEnvelope size={13} />
                suvidhan.bail@gmail.com
              </a>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <FaPhone size={13} />
                +91 0000000000
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">
              {language === 'en' ? 'Quick Links' : 'त्वरित लिंक'}
            </h4>
            <div className="space-y-2">
              {quickLinks.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  className="bs-footer-link flex items-center gap-2"
                >
                  <span className="text-red-500/60">{l.icon}</span>
                  {language === 'en' ? l.en : l.hi}
                </a>
              ))}
              {email === 'suvidhan.bail@gmail.com' && (
                <button
                  onClick={() => router.push('/adminPanel')}
                  className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm transition-colors"
                >
                  🛡️ {language === 'en' ? 'Admin Panel' : 'प्रशासन पैनल'}
                </button>
              )}
            </div>
          </div>

          {/* Legal Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">
              {language === 'en' ? 'Legal Resources' : 'कानूनी संसाधन'}
            </h4>
            <div className="space-y-2">
              {legalLinks.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bs-footer-link flex items-center gap-2 group"
                >
                  <FaExternalLinkAlt size={10} className="text-white/20 group-hover:text-red-400 transition-colors" />
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">
              {language === 'en' ? 'Disclaimer' : 'अस्वीकरण'}
            </h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-white/50 leading-relaxed">
              {language === 'en'
                ? '⚠️ This platform provides legal information for educational purposes only. It does not constitute legal advice. Please consult a qualified advocate for your specific case.'
                : '⚠️ यह मंच केवल शैक्षिक उद्देश्यों के लिए कानूनी जानकारी प्रदान करता है। यह कानूनी सलाह नहीं है। अपने मामले के लिए योग्य वकील से परामर्श करें।'}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} BAIL सेतु —{' '}
            {language === 'en' ? 'All rights reserved.' : 'सर्वाधिकार सुरक्षित।'}
          </p>
          <p className="text-white/30 text-xs">
            {language === 'en' ? 'Made with ❤️ to promote legal awareness in India' : '❤️ के साथ भारत में कानूनी जागरूकता बढ़ाने के लिए बनाया गया'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ContactUs;
