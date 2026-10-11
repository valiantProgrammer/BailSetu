'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Search, Star, MapPin, Briefcase, Globe, 
  Phone, Mail, X, CheckCircle, ShieldCheck 
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';
import { AdvocateService } from '@/src/services/advocateService';

export default function FindAdvocatesPage() {
  const { language, t } = useLanguage();

  const [city, setCity] = useState('Kolkata');
  const [practiceArea, setPracticeArea] = useState('All Practice Areas');
  const [advLanguage, setAdvLanguage] = useState('English, Hindi');
  const [advocates, setAdvocates] = useState([]);
  const [selectedAdvocate, setSelectedAdvocate] = useState(null);
  const [contactSuccess, setContactSuccess] = useState(false);

  useEffect(() => {
    loadAdvocates();
  }, []);

  const loadAdvocates = async () => {
    const data = await AdvocateService.getAdvocates({
      city: city === 'All Cities' ? '' : city,
      practiceArea: practiceArea === 'All Practice Areas' ? '' : practiceArea,
    });
    setAdvocates(data);
  };

  const handleFilterSearch = (e) => {
    e.preventDefault();
    loadAdvocates();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F4B]">
              {t('findAdvocatesTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              {t('findAdvocatesSubtitle')}
            </p>
          </div>

          {/* FILTERS BAR (Mockup pixel-for-pixel) */}
          <form
            onSubmit={handleFilterSearch}
            className="bg-white rounded-xl border border-[#E2E8F0] p-3 sm:p-4 shadow-2xs mb-8 flex flex-col md:flex-row gap-3 items-center"
          >
            {/* City Dropdown */}
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                <MapPin className="w-4 h-4" />
              </div>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium text-[#0B1F4B] bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                <option value="Kolkata">Kolkata</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="All Cities">All Cities</option>
              </select>
            </div>

            {/* Practice Areas Dropdown */}
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                <Briefcase className="w-4 h-4" />
              </div>
              <select
                value={practiceArea}
                onChange={(e) => setPracticeArea(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium text-[#0B1F4B] bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                <option value="All Practice Areas">All Practice Areas</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Bail Matters">Bail Matters</option>
                <option value="High Court Advocate">High Court Advocate</option>
              </select>
            </div>

            {/* Languages Dropdown */}
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#94A3B8]">
                <Globe className="w-4 h-4" />
              </div>
              <select
                value={advLanguage}
                onChange={(e) => setAdvLanguage(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium text-[#0B1F4B] bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                <option value="English, Hindi">English, Hindi</option>
                <option value="Bengali">Bengali</option>
                <option value="All Languages">All Languages</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2.5 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs transition-colors shrink-0"
            >
              {t('searchAdvocates')}
            </button>
          </form>

          {/* ADVOCATE CARDS GRID (3 per row on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advocates.map((adv) => (
              <div
                key={adv.id}
                className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top: Photo & Info */}
                  <div className="flex items-center space-x-3.5 mb-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100 shrink-0">
                      <Image
                        src={adv.photo}
                        alt={adv.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-[#0B1F4B]">
                        {language === 'hi' ? adv.nameHi : adv.name}
                      </h3>
                      <p className="text-xs text-[#64748B]">
                        {language === 'hi' ? adv.specialisationHi : adv.specialisation}
                      </p>
                      <div className="flex items-center space-x-1 mt-0.5">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-[#0B1F4B]">
                          {adv.rating.toFixed(1)}
                        </span>
                        <span className="text-[11px] text-[#64748B]">
                          ({adv.reviewsCount} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details List */}
                  <div className="space-y-1.5 py-3 border-t border-[#F1F5F9] text-xs text-[#64748B]">
                    <div className="flex items-center">
                      <Briefcase className="w-3.5 h-3.5 mr-2 text-[#94A3B8] shrink-0" />
                      <span>{language === 'hi' ? adv.experienceHi : adv.experience}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-2 text-[#94A3B8] shrink-0" />
                      <span>{language === 'hi' ? adv.locationHi : adv.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-3.5 h-3.5 mr-2 text-[#94A3B8] shrink-0" />
                      <span>{language === 'hi' ? adv.languagesHi : adv.languages}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-4 mt-2 border-t border-[#F1F5F9]">
                  <button
                    type="button"
                    onClick={() => setSelectedAdvocate(adv)}
                    className="py-2 px-3 text-xs font-bold text-[#1E40AF] bg-white border border-[#1E40AF] hover:bg-[#EFF6FF] rounded-lg transition-colors text-center"
                  >
                    {t('viewProfile')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAdvocate(adv);
                      setContactSuccess(false);
                    }}
                    className="py-2 px-3 text-xs font-bold text-white bg-[#1E40AF] hover:bg-[#1D4ED8] rounded-lg shadow-xs transition-colors text-center"
                  >
                    {t('contact')}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* ADVOCATE PROFILE / CONTACT MODAL */}
      {selectedAdvocate && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedAdvocate(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4 mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100">
                <Image
                  src={selectedAdvocate.photo}
                  alt={selectedAdvocate.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0B1F4B]">
                  {selectedAdvocate.name}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {selectedAdvocate.specialisation}
                </p>
                <div className="flex items-center space-x-1 mt-1 text-xs">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-bold">{selectedAdvocate.rating}</span>
                  <span className="text-slate-400">({selectedAdvocate.reviewsCount} verified reviews)</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
              {selectedAdvocate.bio}
            </p>

            <div className="space-y-2 text-xs mb-6">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Practice Courts</span>
                <span className="font-semibold text-[#0B1F4B]">{selectedAdvocate.courts}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Estimated Consultation</span>
                <span className="font-semibold text-[#16A34A]">{selectedAdvocate.feeRange}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Official Email</span>
                <span className="font-semibold text-[#1E40AF]">{selectedAdvocate.email}</span>
              </div>
            </div>

            {contactSuccess ? (
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-center text-xs text-green-800 font-semibold flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-1.5 text-green-600" />
                Contact Request Sent! Advocate will call you at your registered number.
              </div>
            ) : (
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setContactSuccess(true)}
                  className="flex-1 py-2.5 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center"
                >
                  <Phone className="w-3.5 h-3.5 mr-1.5" />
                  Request Callback
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAdvocate(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
