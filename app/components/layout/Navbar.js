'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Menu, X, ArrowLeft, User, Bookmark, Search, 
  Scale, FileText, Settings, LogOut, ChevronDown, Check
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Close menus on path change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  const isInnerPage = pathname !== '/' && pathname !== '';

  const navLinks = [
    { label: t('navHome'), href: '/' },
    { label: t('navSearch'), href: '/search' },
    { label: t('navAdvocates'), href: '/advocates' },
    { label: t('navLegalAid'), href: '/legal-aid' },
    { label: t('navResources'), href: '/faq' },
    { label: t('navAbout'), href: '/about' },
  ];

  const isActive = (href) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* MOBILE LEFT: Hamburger or Back Arrow */}
          <div className="flex md:hidden items-center">
            {isInnerPage ? (
              <button
                onClick={() => router.back()}
                className="p-2 -ml-2 text-[#0B1F4B] hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-[#0B1F4B]" />
              </button>
            ) : (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 text-[#0B1F4B] hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#0B1F4B]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#0B1F4B]" />
                )}
              </button>
            )}
          </div>

          {/* LOGO: Centered on mobile, Left on desktop */}
          <div className="flex items-center justify-center md:justify-start flex-1 md:flex-initial">
            <BrandLogo size="normal" />
          </div>

          {/* DESKTOP CENTER/NAV */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-6 ml-6">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-5 px-2 text-sm font-semibold transition-colors duration-200 ${
                    active
                      ? 'text-[#0B1F4B]'
                      : 'text-[#64748B] hover:text-[#0B1F4B]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1E40AF] rounded-t-sm" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS: Language switch + User Avatar / Auth */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Language Toggle Pill: EN | हिंदी */}
            <div className="flex items-center bg-[#F1F5F9] p-0.5 rounded-full border border-[#E2E8F0] text-xs font-semibold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-[#1E40AF] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#0B1F4B]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded-full transition-all font-medium ${
                  language === 'hi'
                    ? 'bg-[#1E40AF] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#0B1F4B]'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Desktop User Avatar / Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 p-1 pl-2 pr-1 rounded-full hover:bg-slate-100 transition-colors border border-transparent focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  R
                </div>
                <span className="hidden sm:inline-block text-sm font-medium text-[#0B1F4B]">
                  Rupayan
                </span>
                <ChevronDown className="hidden sm:inline-block w-3.5 h-3.5 text-[#64748B]" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E2E8F0] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-[#F1F5F9]">
                    <p className="text-xs text-[#64748B]">Signed in as</p>
                    <p className="text-sm font-semibold text-[#0B1F4B]">Rupayan Ghosh</p>
                  </div>
                  
                  <Link
                    href="/dashboard"
                    className="flex items-center px-4 py-2 text-sm text-[#334155] hover:bg-[#F8FAFC] hover:text-[#1E40AF]"
                  >
                    <User className="w-4 h-4 mr-2.5 text-[#64748B]" />
                    Dashboard
                  </Link>
                  <Link
                    href="/saved"
                    className="flex items-center px-4 py-2 text-sm text-[#334155] hover:bg-[#F8FAFC] hover:text-[#1E40AF]"
                  >
                    <Bookmark className="w-4 h-4 mr-2.5 text-[#64748B]" />
                    Saved Sections
                  </Link>
                  <Link
                    href="/track-application"
                    className="flex items-center px-4 py-2 text-sm text-[#334155] hover:bg-[#F8FAFC] hover:text-[#1E40AF]"
                  >
                    <FileText className="w-4 h-4 mr-2.5 text-[#64748B]" />
                    Track Application
                  </Link>
                  <Link
                    href="/signin"
                    className="flex items-center px-4 py-2 text-sm text-[#334155] hover:bg-[#F8FAFC] hover:text-[#1E40AF]"
                  >
                    <Settings className="w-4 h-4 mr-2.5 text-[#64748B]" />
                    Switch Account / Login
                  </Link>
                  <div className="border-t border-[#F1F5F9] my-1" />
                  <Link
                    href="/signin"
                    className="flex items-center px-4 py-2 text-sm text-[#DC2626] hover:bg-[#FEF2F2]"
                  >
                    <LogOut className="w-4 h-4 mr-2.5 text-[#DC2626]" />
                    {t('logout')}
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E2E8F0] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-sm">
                R
              </div>
              <div>
                <p className="text-sm font-bold text-[#0B1F4B]">Rupayan Ghosh</p>
                <p className="text-xs text-[#64748B]">rupayan@example.com</p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-[#1E40AF] bg-[#EFF6FF] px-2.5 py-1 rounded-md"
            >
              Dashboard
            </Link>
          </div>

          <div className="space-y-1 pt-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                    active
                      ? 'bg-[#EFF6FF] text-[#1E40AF] font-bold'
                      : 'text-[#334155] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#F1F5F9] space-y-1">
            <Link
              href="/saved"
              className="flex items-center px-3 py-2 text-sm text-[#334155] hover:bg-slate-50 rounded-lg"
            >
              <Bookmark className="w-4 h-4 mr-2.5 text-[#64748B]" />
              Saved Sections
            </Link>
            <Link
              href="/track-application"
              className="flex items-center px-3 py-2 text-sm text-[#334155] hover:bg-slate-50 rounded-lg"
            >
              <FileText className="w-4 h-4 mr-2.5 text-[#64748B]" />
              Track Application
            </Link>
            <Link
              href="/signin"
              className="flex items-center px-3 py-2 text-sm text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg"
            >
              <LogOut className="w-4 h-4 mr-2.5 text-[#DC2626]" />
              {t('logout')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
