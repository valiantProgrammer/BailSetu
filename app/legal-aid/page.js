'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle, ArrowRight, ArrowLeft, Upload, FileText, 
  ShieldCheck, AlertCircle 
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';
import { LegalAidService } from '@/src/services/legalAidService';

export default function ApplyLegalAidPage() {
  const router = useRouter();
  const { language, t } = useLanguage();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: 'Rupayan Ghosh',
    mobileNumber: '9876543210',
    email: 'rupayan@example.com',
    address: '124, College Street',
    state: 'West Bengal',
    district: 'Kolkata',
    pincode: '700073',
    offenceSection: 'IPC Section 379 (Theft allegation)',
    policeStation: 'Bowbazar Police Station',
    arrestStatus: 'Notice Issued',
    incomeCategory: 'Below ₹3,00,000 per annum (Eligible for Legal Aid)',
    idProofUploaded: true,
    firUploaded: true,
    agreedDeclaration: true,
  });

  const [submittedApp, setSubmittedApp] = useState(null);
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile Number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'PIN Code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!validateStep1()) return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await LegalAidService.submitApplication(formData);
    setSubmittedApp(result);
  };

  const stepsList = [
    { num: 1, title: t('step1') },
    { num: 2, title: t('step2') },
    { num: 3, title: t('step3') },
    { num: 4, title: t('step4') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* HEADER */}
          <div className="text-center space-y-1.5 mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F4B]">
              {t('applyLegalAidTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B]">
              {t('applyLegalAidSubtitle')}
            </p>
          </div>

          {/* 4-STEP STEPPER (Mockup pixel-for-pixel) */}
          <div className="mb-8">
            <div className="flex items-center justify-between relative">
              {/* Horizontal Connecting Line */}
              <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />
              
              {stepsList.map((s) => {
                const isCompleted = step > s.num;
                const isCurrent = step === s.num;
                return (
                  <div key={s.num} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                        isCompleted
                          ? 'bg-[#1E40AF] text-white'
                          : isCurrent
                          ? 'bg-[#1E40AF] text-white ring-4 ring-blue-100'
                          : 'bg-white text-slate-400 border border-slate-300'
                      }`}
                    >
                      {isCompleted ? '✓' : s.num}
                    </div>
                    <span
                      className={`text-[11px] font-semibold mt-2 hidden sm:block ${
                        isCurrent ? 'text-[#1E40AF]' : 'text-[#64748B]'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MAIN FORM CARD */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 shadow-2xs">
            {submittedApp ? (
              /* SUBMISSION SUCCESS CARD */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-[#0B1F4B]">
                  Application Submitted Successfully!
                </h3>
                <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
                  Your legal aid request has been received by the State Legal Services Authority.
                </p>

                <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-4 rounded-xl max-w-sm mx-auto my-4 text-center">
                  <p className="text-xs text-[#1E40AF] font-bold">Your Tracking Number</p>
                  <p className="text-2xl font-black text-[#0B1F4B] mt-1 tracking-wider">
                    {submittedApp.applicationNo}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <Link
                    href={`/track-application?appNo=${submittedApp.applicationNo}`}
                    className="px-6 py-2.5 bg-[#1E40AF] text-white text-xs font-bold rounded-lg hover:bg-[#1D4ED8] transition-colors"
                  >
                    Track Status Now
                  </Link>
                  <Link
                    href="/"
                    className="px-6 py-2.5 bg-slate-100 text-[#475569] text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Return Home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* STEP 1: Applicant Details */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#0B1F4B] border-b pb-2">
                      {t('step1')}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0B1F4B] mb-1">
                          {t('fullName')} *
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Enter your full name"
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
                        />
                        {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0B1F4B] mb-1">
                          {t('mobileNumber')} *
                        </label>
                        <input
                          type="text"
                          value={formData.mobileNumber}
                          onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                          placeholder="Enter mobile number"
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
                        />
                        {errors.mobileNumber && <p className="text-[11px] text-red-600 mt-1">{errors.mobileNumber}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F4B] mb-1">
                        {t('emailOptional')}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F4B] mb-1">
                        {t('address')} *
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Enter your address"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
                      />
                      {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#0B1F4B] mb-1">
                          {t('state')} *
                        </label>
                        <select
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
                        >
                          <option value="West Bengal">West Bengal</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0B1F4B] mb-1">
                          {t('district')} *
                        </label>
                        <select
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
                        >
                          <option value="Kolkata">Kolkata</option>
                          <option value="Howrah">Howrah</option>
                          <option value="North 24 Parganas">North 24 Parganas</option>
                          <option value="South 24 Parganas">South 24 Parganas</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#0B1F4B] mb-1">
                          {t('pincode')} *
                        </label>
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          placeholder="e.g. 700001"
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
                        />
                        {errors.pincode && <p className="text-[11px] text-red-600 mt-1">{errors.pincode}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Case Details */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#0B1F4B] border-b pb-2">
                      {t('step2')}
                    </h3>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F4B] mb-1">
                        Offence / Section Alleged *
                      </label>
                      <input
                        type="text"
                        value={formData.offenceSection}
                        onChange={(e) => setFormData({ ...formData, offenceSection: e.target.value })}
                        placeholder="e.g. IPC Section 379, Theft"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F4B] mb-1">
                        Police Station Jurisdiction *
                      </label>
                      <input
                        type="text"
                        value={formData.policeStation}
                        onChange={(e) => setFormData({ ...formData, policeStation: e.target.value })}
                        placeholder="e.g. Park Street Police Station"
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F4B] mb-1">
                        Current Arrest / Legal Status *
                      </label>
                      <select
                        value={formData.arrestStatus}
                        onChange={(e) => setFormData({ ...formData, arrestStatus: e.target.value })}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
                      >
                        <option value="Notice Issued">Notice Issued (CrPC 41A / BNSS 35)</option>
                        <option value="Anticipating Arrest">Anticipating Arrest (Need Anticipatory Bail)</option>
                        <option value="In Police Custody">In Police / Judicial Custody</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F4B] mb-1">
                        Household Annual Income *
                      </label>
                      <select
                        value={formData.incomeCategory}
                        onChange={(e) => setFormData({ ...formData, incomeCategory: e.target.value })}
                        className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
                      >
                        <option value="Below ₹3,00,000 per annum">Below ₹3,00,000 per annum (Eligible under Legal Services Authorities Act)</option>
                        <option value="Woman / Child / Senior Citizen">Woman / Child / Senior Citizen (Statutory Free Eligibility)</option>
                        <option value="Custody Undertrial">Undertrial in Judicial Custody</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 3: Documents */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#0B1F4B] border-b pb-2">
                      {t('step3')} - Identity & Case Documents
                    </h3>

                    {/* Document Upload 1 */}
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-[#1E40AF] transition-colors cursor-pointer bg-slate-50/50">
                      <Upload className="w-8 h-8 text-[#1E40AF] mx-auto mb-2" />
                      <p className="text-xs font-bold text-[#0B1F4B]">Upload Identity Proof (Aadhaar / Voter ID / Ration Card)</p>
                      <p className="text-[11px] text-[#64748B] mt-1">PDF, JPG, PNG up to 5MB</p>
                      <span className="inline-block mt-3 px-3 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-700">
                        Choose File (aadhaar_card_rupayan.pdf)
                      </span>
                    </div>

                    {/* Document Upload 2 */}
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-[#1E40AF] transition-colors cursor-pointer bg-slate-50/50">
                      <FileText className="w-8 h-8 text-[#1E40AF] mx-auto mb-2" />
                      <p className="text-xs font-bold text-[#0B1F4B]">Upload FIR Copy / Police Notice (If available)</p>
                      <p className="text-[11px] text-[#64748B] mt-1">Optional, helps expedite review</p>
                      <span className="inline-block mt-3 px-3 py-1 bg-white border border-slate-300 rounded-md text-xs font-medium text-slate-700">
                        Choose File (police_notice_section41.pdf)
                      </span>
                    </div>
                  </div>
                )}

                {/* STEP 4: Review & Submit */}
                {step === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#0B1F4B] border-b pb-2">
                      {t('step4')}
                    </h3>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Applicant:</span>
                        <span className="font-bold text-[#0B1F4B]">{formData.fullName} ({formData.mobileNumber})</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Location:</span>
                        <span className="font-bold text-[#0B1F4B]">{formData.district}, {formData.state}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Case Offence:</span>
                        <span className="font-bold text-[#0B1F4B]">{formData.offenceSection}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Legal Aid Scheme:</span>
                        <span className="font-bold text-green-700">State Legal Services Authority (NALSA)</span>
                      </div>
                    </div>

                    <label className="flex items-start space-x-2 text-xs text-[#475569] cursor-pointer pt-2">
                      <input
                        type="checkbox"
                        checked={formData.agreedDeclaration}
                        onChange={(e) => setFormData({ ...formData, agreedDeclaration: e.target.checked })}
                        className="mt-0.5 rounded text-[#1E40AF]"
                      />
                      <span>
                        I hereby declare that the information provided above is true and accurate to the best of my knowledge, and I request pro-bono legal counsel under Section 12 of the Legal Services Authorities Act.
                      </span>
                    </label>
                  </div>
                )}

                {/* BOTTOM ACTION BUTTONS */}
                <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#475569] text-xs font-bold rounded-lg transition-colors flex items-center"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                      {t('back')}
                    </button>
                  ) : <div />}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2.5 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center ml-auto"
                    >
                      {t('next')}
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!formData.agreedDeclaration}
                      className="px-7 py-2.5 bg-[#1E40AF] hover:bg-[#1D4ED8] disabled:bg-slate-300 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center ml-auto"
                    >
                      {t('submit')}
                    </button>
                  )}
                </div>

              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
