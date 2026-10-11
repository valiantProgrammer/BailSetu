'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Search, CheckCircle2, Clock, User, Shield, 
  Info, ArrowLeft, AlertCircle 
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';
import { LegalAidService } from '@/src/services/legalAidService';

function TrackApplicationContent() {
  const searchParams = useSearchParams();
  const initialAppNo = searchParams.get('appNo') || 'LA202600123';
  const { language, t } = useLanguage();

  const [inputAppNo, setInputAppNo] = useState(initialAppNo);
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialAppNo) {
      handleTrack(initialAppNo);
    }
  }, [initialAppNo]);

  const handleTrack = async (numToTrack) => {
    const target = numToTrack || inputAppNo;
    if (!target.trim()) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await LegalAidService.trackApplication(target);
      if (data) {
        setApplicationData(data);
      } else {
        setErrorMsg('No application found with this tracking ID.');
      }
    } catch (e) {
      setErrorMsg('Failed to track application.');
    } finally {
      setLoading(false);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleTrack();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* HEADER */}
          <div className="text-center space-y-1.5 mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F4B]">
              {t('trackTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B]">
              {t('trackSubtitle')}
            </p>
          </div>

          {/* APPLICATION NUMBER INPUT + TRACK BUTTON */}
          <form
            onSubmit={onFormSubmit}
            className="flex items-center bg-white rounded-xl shadow-md border border-[#CBD5E1] p-1.5 focus-within:ring-2 focus-within:ring-[#1E40AF] focus-within:border-[#1E40AF] transition-all mb-8"
          >
            <input
              type="text"
              value={inputAppNo}
              onChange={(e) => setInputAppNo(e.target.value)}
              placeholder={t('appNumberPlaceholder')}
              className="w-full text-xs sm:text-sm text-[#0B1F4B] placeholder:text-[#94A3B8] outline-none bg-transparent py-2 px-3 font-medium uppercase tracking-wider"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs transition-colors shrink-0"
            >
              {loading ? '...' : t('trackBtn')}
            </button>
          </form>

          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center mb-6">
              <AlertCircle className="w-4 h-4 mr-2" />
              {errorMsg}
            </div>
          )}

          {/* APPLICATION DETAILS CARD (Mockup 10 pixel-for-pixel) */}
          {applicationData && (
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 shadow-2xs space-y-6">
              
              {/* Header Strip with Application Number & In Progress Chip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F1F5F9]">
                <div>
                  <span className="text-xs text-[#64748B] block">{t('applicationNo')}</span>
                  <span className="text-lg sm:text-xl font-black text-[#0B1F4B] tracking-wide">
                    {applicationData.applicationNo}
                  </span>
                </div>

                <div className="inline-flex items-center px-3 py-1 bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] rounded-full text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] mr-1.5 animate-pulse" />
                  {language === 'hi' ? applicationData.statusHi : applicationData.status}
                </div>
              </div>

              {/* TIMELINE (Horizontal on desktop, Vertical on mobile) */}
              <div className="py-4">
                
                {/* DESKTOP TIMELINE */}
                <div className="hidden md:flex items-center justify-between relative">
                  <div className="absolute top-4 left-8 right-8 h-0.5 bg-slate-200 -z-0" />

                  {applicationData.steps.map((st) => {
                    const isDone = st.status === 'completed';
                    const isCurrent = st.status === 'current';
                    return (
                      <div key={st.id} className="flex flex-col items-center text-center relative z-10 w-44">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                            isDone
                              ? 'bg-[#16A34A] text-white shadow-xs'
                              : isCurrent
                              ? 'bg-[#1E40AF] text-white ring-4 ring-blue-100 shadow-xs'
                              : 'bg-white text-slate-300 border-2 border-slate-200'
                          }`}
                        >
                          {isDone ? '✓' : st.id}
                        </div>
                        <p className={`text-xs font-bold mt-2.5 ${isCurrent ? 'text-[#1E40AF]' : 'text-[#0B1F4B]'}`}>
                          {language === 'hi' ? st.nameHi : st.name}
                        </p>
                        <p className="text-[10px] text-[#94A3B8] mt-0.5">
                          {st.date}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* MOBILE VERTICAL TIMELINE */}
                <div className="flex md:hidden flex-col space-y-6 relative pl-6 border-l-2 border-slate-200 ml-3">
                  {applicationData.steps.map((st) => {
                    const isDone = st.status === 'completed';
                    const isCurrent = st.status === 'current';
                    return (
                      <div key={st.id} className="relative">
                        <div
                          className={`absolute -left-[33px] top-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                            isDone
                              ? 'bg-[#16A34A] text-white'
                              : isCurrent
                              ? 'bg-[#1E40AF] text-white ring-4 ring-blue-100'
                              : 'bg-white text-slate-300 border-2 border-slate-200'
                          }`}
                        >
                          {isDone ? '✓' : st.id}
                        </div>
                        <div>
                          <p className={`text-xs font-bold ${isCurrent ? 'text-[#1E40AF]' : 'text-[#0B1F4B]'}`}>
                            {language === 'hi' ? st.nameHi : st.name}
                          </p>
                          <p className="text-[11px] text-[#94A3B8]">
                            {st.date}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* INFORMATIONAL NOTE BOX */}
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-4 flex items-start space-x-3 text-xs text-[#1E40AF]">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">
                  {language === 'hi' ? applicationData.noteHi : applicationData.note}
                </p>
              </div>

              {/* Quick Case Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-[#F1F5F9]">
                <div>
                  <span className="text-[#94A3B8] block text-[11px]">Applicant</span>
                  <span className="font-semibold text-[#0B1F4B]">{applicationData.applicantName}</span>
                </div>
                <div>
                  <span className="text-[#94A3B8] block text-[11px]">Assigned Advocate</span>
                  <span className="font-semibold text-[#0B1F4B]">{applicationData.assignedAdvocate}</span>
                </div>
                <div>
                  <span className="text-[#94A3B8] block text-[11px]">Court Jurisdiction</span>
                  <span className="font-semibold text-[#0B1F4B]">{applicationData.district}, {applicationData.state}</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function TrackApplicationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading application tracker...</div>}>
      <TrackApplicationContent />
    </Suspense>
  );
}
