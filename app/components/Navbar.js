'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaUserEdit, FaKey, FaChevronDown, FaChevronUp, FaSearch, FaComments, FaGavel } from 'react-icons/fa';
import { MdPeople, MdDashboard } from 'react-icons/md';
import { RiLogoutBoxLine, RiArbitrageLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const Navbar = ({
  userInitiate,
  username,
  emailAddress,
  address,
  phoneNumber,
  scrollToInputRef,
  language,
  setLanguage,
  onAction,
}) => {
  const [fullname, setFullname] = useState('');
  const [profileVisible, setProfileVisible] = useState(false);
  const [sectionDropdownVisible, setSectionDropdownVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);
  const sectionDropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fullNameFromUsername = (username || '')
      .split('_')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
    setFullname(fullNameFromUsername);
  }, [username]);

  // Scroll detection for navbar style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLanguage = (nextLang) => {
    localStorage.setItem('bailLang', nextLang);
    setLanguage(nextLang);
    window.location.reload();
  };

  const handleInputSectionClick = () => {
    setSectionDropdownVisible(false);
    setMobileOpen(false);
    if (scrollToInputRef?.current) {
      scrollToInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      scrollToInputRef.current.focus();
    }
  };

  const handleNavTo = (path, action) => {
    setSectionDropdownVisible(false);
    setMobileOpen(false);
    if (action) onAction?.(action);
    router.push(path);
  };

  const toggleProfile = () => setProfileVisible(v => !v);
  const toggleSectionDropdown = () => setSectionDropdownVisible(v => !v);

  const handleLogout = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('bailLang');
    await signOut({ callbackUrl: '/' });
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (profileRef.current && !profileRef.current.contains(ev.target)) {
        setProfileVisible(false);
      }
      if (sectionDropdownRef.current && !sectionDropdownRef.current.contains(ev.target)) {
        setSectionDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { labelEn: 'Home', labelHi: 'होम', href: '#home' },
    { labelEn: 'Timelines', labelHi: 'समयरेखा', href: '#timelines' },
    { labelEn: "Do's & Don'ts", labelHi: 'क्या करें', href: '#dos-donts' },
    { labelEn: 'FAQs', labelHi: 'प्रश्न', href: '#faq' },
    { labelEn: 'Contact', labelHi: 'संपर्क', href: '#contact' },
  ];

  const serviceLinks = [
    {
      icon: <FaSearch size={14} />,
      labelEn: 'IPC Sections', labelHi: 'IPC धाराएं',
      action: () => handleInputSectionClick(),
    },
    {
      icon: <MdPeople size={14} />,
      labelEn: 'Find Advocates', labelHi: 'वकील खोजें',
      action: () => handleNavTo('/AdvocateFinder', 'advocateClick'),
    },
    {
      icon: <FaComments size={14} />,
      labelEn: 'Community Messages', labelHi: 'सामुदायिक संदेश',
      action: () => handleNavTo('/messages', 'messageClick'),
    },
    {
      icon: <FaGavel size={14} />,
      labelEn: 'Arbitrator Search', labelHi: 'मध्यस्थकर्ता खोज',
      action: () => handleNavTo('/ArbitrationFinder', 'arbitratorClick'),
    },
  ];

  return (
    <header>
      <nav
        className="bs-navbar"
        style={scrolled ? { boxShadow: '0 4px 30px rgba(0,0,0,0.4)' } : {}}
      >
        <div className="container h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#home" className="bs-nav-logo flex-shrink-0">
            BAIL <span className="accent">सेतु</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((l, i) => (
              <a key={i} href={l.href} className="bs-nav-link">
                {language === 'en' ? l.labelEn : l.labelHi}
              </a>
            ))}

            {/* Services dropdown */}
            <div className="relative" ref={sectionDropdownRef}>
              <button
                onClick={toggleSectionDropdown}
                className="bs-nav-link flex items-center gap-1.5"
              >
                {language === 'en' ? 'Services' : 'सेवाएँ'}
                {sectionDropdownVisible ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
              </button>

              {sectionDropdownVisible && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-gray-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-slideDown z-50">
                  {serviceLinks.map((s, i) => (
                    <button
                      key={i}
                      onClick={s.action}
                      className="w-full flex items-center gap-3 px-4 py-3 text-white/75 hover:text-white hover:bg-white/10 transition-all duration-150 text-sm text-left border-b border-white/5 last:border-0"
                    >
                      <span className="text-red-400">{s.icon}</span>
                      {language === 'en' ? s.labelEn : s.labelHi}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side: lang toggle + avatar */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="hidden sm:flex items-center bg-white/10 rounded-full p-0.5 border border-white/20">
              {['en', 'hi'].map(l => (
                <button
                  key={l}
                  onClick={() => toggleLanguage(l)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                    language === l
                      ? 'bg-red-600 text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {l === 'en' ? 'EN' : 'हि'}
                </button>
              ))}
            </div>

            {/* Avatar */}
            <div className="relative" ref={profileRef}>
              <button className="bs-avatar-btn" onClick={toggleProfile}>
                {userInitiate}
              </button>

              {/* Profile dropdown */}
              {profileVisible && (
                <div className="bs-profile-dropdown animate-scale-in">
                  {/* Header */}
                  <div className="bs-profile-header">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white text-lg font-bold border-2 border-white/30">
                        {userInitiate}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{fullname}</p>
                        <p className="text-white/60 text-xs mt-0.5 truncate max-w-[180px]">{emailAddress}</p>
                      </div>
                    </div>
                  </div>

                  {/* User details */}
                  <div className="px-5 py-3 border-b border-gray-100">
                    {[
                      { label: language === 'en' ? 'Username' : 'उपयोगकर्ता', value: username },
                      { label: language === 'en' ? 'Phone' : 'फोन', value: phoneNumber },
                      { label: language === 'en' ? 'Address' : 'पता', value: address || (language === 'en' ? 'Not set' : 'निर्धारित नहीं') },
                    ].map((d, i) => (
                      <div key={i} className="flex gap-2 text-sm py-1.5 text-gray-600">
                        <span className="font-medium text-gray-800 w-20 flex-shrink-0">{d.label}:</span>
                        <span className="truncate">{d.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="px-5 py-3 space-y-1">
                    {[
                      { icon: <FaUserEdit />, labelEn: 'Edit Profile', labelHi: 'प्रोफ़ाइल संपादित करें', action: 'edit-profile' },
                      { icon: <FaKey />, labelEn: 'Change Password', labelHi: 'पासवर्ड बदलें', action: 'change-password' },
                    ].map((a, i) => (
                      <button
                        key={i}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all text-sm"
                        onClick={() => { setProfileVisible(false); onAction?.(a.action); }}
                      >
                        <span className="text-gray-400">{a.icon}</span>
                        {language === 'en' ? a.labelEn : a.labelHi}
                      </button>
                    ))}
                    <button
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all text-sm font-medium"
                      onClick={() => { setProfileVisible(false); onAction?.('logout'); handleLogout(); }}
                    >
                      <RiLogoutBoxLine />
                      {language === 'en' ? 'Sign Out' : 'साइन आउट'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block w-6 h-0.5 bg-white rounded-full transition-all duration-300"
                  style={{
                    transform: mobileOpen
                      ? i === 0 ? 'translateY(8px) rotate(45deg)'
                        : i === 1 ? 'scaleX(0)'
                          : 'translateY(-8px) rotate(-45deg)'
                      : 'none',
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 animate-slideDown">
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((l, i) => (
                <a key={i} href={l.href} className="bs-nav-link py-2.5" onClick={() => setMobileOpen(false)}>
                  {language === 'en' ? l.labelEn : l.labelHi}
                </a>
              ))}
              <div className="border-t border-white/10 pt-3 mt-2">
                <p className="text-white/40 text-xs mb-2 px-3">{language === 'en' ? 'Services' : 'सेवाएँ'}</p>
                {serviceLinks.map((s, i) => (
                  <button key={i} onClick={s.action} className="bs-nav-link py-2.5 flex items-center gap-3 w-full">
                    <span className="text-red-400">{s.icon}</span>
                    {language === 'en' ? s.labelEn : s.labelHi}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 pt-3 border-t border-white/10 mt-2">
                {['en', 'hi'].map(l => (
                  <button
                    key={l}
                    onClick={() => toggleLanguage(l)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      language === l ? 'bg-red-600 text-white' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {l === 'en' ? 'English' : 'हिन्दी'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
