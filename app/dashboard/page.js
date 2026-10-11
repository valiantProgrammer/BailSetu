'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, User, Clock, Bookmark, FileText, 
  Users, Settings, LogOut, ArrowRight, ChevronRight, 
  Trash2, Search, ExternalLink 
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import StatusBadge from '../components/ui/StatusBadge';
import { useLanguage } from '../context/LanguageContext';
import { MOCK_USER } from '@/src/data/mockData';

export default function UserDashboardPage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [user, setUser] = useState(MOCK_USER);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'profile', label: 'My Profile', icon: User, href: '#' },
    { id: 'searches', label: 'Recent Searches', icon: Clock, href: '/saved' },
    { id: 'saved', label: 'Saved Sections', icon: Bookmark, href: '/saved' },
    { id: 'applications', label: 'My Legal Aid Applications', icon: FileText, href: '/track-application' },
    { id: 'advocates', label: 'Find Advocates', icon: Users, href: '/advocates' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
  ];

  const handleDeleteSaved = (id) => {
    setUser({
      ...user,
      savedSections: user.savedSections.filter((item) => item.id !== id),
      stats: { ...user.stats, savedSections: Math.max(user.stats.savedSections - 1, 0) },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* DESKTOP LEFT SIDEBAR */}
            <aside className="hidden lg:block lg:col-span-3 bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-2xs">
              <div className="flex items-center space-x-3 pb-4 mb-3 border-b border-[#F1F5F9] px-2">
                <div className="w-10 h-10 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-black text-sm">
                  {user.avatar}
                </div>
                <div>
                  <p className="font-bold text-sm text-[#0B1F4B]">{user.name}</p>
                  <p className="text-[11px] text-[#64748B]">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveNav(item.id);
                        if (item.href !== '#') router.push(item.href);
                      }}
                      className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-[#EFF6FF] text-[#1E40AF]'
                          : 'text-[#475569] hover:bg-slate-50 hover:text-[#0B1F4B]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mr-2.5 ${isActive ? 'text-[#1E40AF]' : 'text-[#64748B]'}`} />
                      {item.label}
                    </button>
                  );
                })}

                <div className="pt-2 border-t border-[#F1F5F9] mt-2">
                  <Link
                    href="/signin"
                    className="w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-2.5 text-[#DC2626]" />
                    {t('logout')}
                  </Link>
                </div>
              </nav>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* GREETING HEADER */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs">
                <h1 className="text-xl sm:text-2xl font-black text-[#0B1F4B]">
                  {t('helloUser')}
                </h1>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                  {t('dashboardSub')}
                </p>

                {/* 4 STAT CARDS (Mockup pixel-for-pixel) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
                  
                  {/* Searches */}
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 text-center">
                    <p className="text-2xl sm:text-3xl font-black text-[#1E40AF]">
                      {user.stats.searches}
                    </p>
                    <p className="text-xs font-semibold text-[#64748B] mt-1">
                      {t('searchesStat')}
                    </p>
                  </div>

                  {/* Saved Sections */}
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 text-center">
                    <p className="text-2xl sm:text-3xl font-black text-[#16A34A]">
                      {user.stats.savedSections}
                    </p>
                    <p className="text-xs font-semibold text-[#64748B] mt-1">
                      {t('savedStat')}
                    </p>
                  </div>

                  {/* Applications */}
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 text-center">
                    <p className="text-2xl sm:text-3xl font-black text-[#9333EA]">
                      {user.stats.applications}
                    </p>
                    <p className="text-xs font-semibold text-[#64748B] mt-1">
                      {t('appsStat')}
                    </p>
                  </div>

                  {/* Messages */}
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 text-center">
                    <p className="text-2xl sm:text-3xl font-black text-[#DC2626]">
                      {user.stats.messages}
                    </p>
                    <p className="text-xs font-semibold text-[#64748B] mt-1">
                      {t('msgStat')}
                    </p>
                  </div>

                </div>
              </div>

              {/* MOBILE NAVIGATION MENU LIST (Shown on mobile screens) */}
              <div className="block lg:hidden bg-white rounded-xl border border-[#E2E8F0] divide-y divide-[#F1F5F9] shadow-2xs">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-center justify-between p-3.5 text-xs font-medium text-[#334155] hover:bg-slate-50"
                    >
                      <div className="flex items-center">
                        <Icon className="w-4 h-4 mr-3 text-[#64748B]" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  );
                })}
                <Link
                  href="/signin"
                  className="flex items-center justify-between p-3.5 text-xs font-medium text-[#DC2626] hover:bg-[#FEF2F2]"
                >
                  <div className="flex items-center">
                    <LogOut className="w-4 h-4 mr-3 text-[#DC2626]" />
                    <span>{t('logout')}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-300" />
                </Link>
              </div>

              {/* RECENT SEARCHES LIST */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-[#0B1F4B]">
                    {t('recentSearchesTitle')}
                  </h3>
                  <Link
                    href="/saved"
                    className="text-xs font-semibold text-[#1E40AF] hover:underline flex items-center"
                  >
                    {t('viewAll')} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>

                <div className="divide-y divide-[#F1F5F9]">
                  {user.recentSearches.map((item) => (
                    <div
                      key={item.id}
                      className="py-3 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-3">
                        <Search className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <Link
                          href={item.path}
                          className="font-medium text-[#0B1F4B] hover:text-[#1E40AF] hover:underline"
                        >
                          {item.query}
                        </Link>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-[11px] text-[#64748B]">
                          {language === 'hi' ? item.timeHi : item.time}
                        </span>
                        <span className="text-[10px] font-semibold bg-slate-100 text-[#475569] px-2 py-0.5 rounded-md">
                          {item.section}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SAVED SECTIONS LIST */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-[#0B1F4B]">
                    {t('savedSectionsTitle')}
                  </h3>
                  <Link
                    href="/saved"
                    className="text-xs font-semibold text-[#1E40AF] hover:underline flex items-center"
                  >
                    {t('viewAll')} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>

                <div className="divide-y divide-[#F1F5F9]">
                  {user.savedSections.map((item) => (
                    <div
                      key={item.id}
                      className="py-3 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-3">
                        <Bookmark className="w-3.5 h-3.5 text-[#F97316] fill-[#F97316]" />
                        <Link
                          href={`/section/${item.id}`}
                          className="font-bold text-[#0B1F4B] hover:text-[#1E40AF] hover:underline"
                        >
                          {item.code}
                        </Link>
                      </div>

                      <div className="flex items-center space-x-3">
                        {item.bailable ? (
                          <StatusBadge type="bailable" />
                        ) : (
                          <StatusBadge type="non-bailable" />
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteSaved(item.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors"
                          aria-label="Remove saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
