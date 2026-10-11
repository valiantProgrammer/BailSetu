'use client';

import React, { useState } from 'react';
import { 
  Target, Eye, Heart, Mail, Phone, MapPin, 
  Send, CheckCircle, ExternalLink 
} from 'lucide-react';
import { FaLinkedinIn, FaFacebookF, FaYoutube, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';

export default function AboutContactPage() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* ABOUT SECTION */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-10 shadow-2xs space-y-6">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F4B]">
              {t('aboutTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-3xl">
              {t('aboutDescription')}
            </p>

            {/* THREE CORE VALUE CARDS (Mockup pixel-for-pixel) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              
              {/* Mission */}
              <div className="p-5 rounded-xl border border-orange-200 bg-orange-50/40 text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-[#EA580C] flex items-center justify-center mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#0B1F4B]">{t('ourMission')}</h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  {t('ourMissionText')}
                </p>
              </div>

              {/* Vision */}
              <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/40 text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1E40AF] flex items-center justify-center mb-3">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#0B1F4B]">{t('ourVision')}</h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  {t('ourVisionText')}
                </p>
              </div>

              {/* Values */}
              <div className="p-5 rounded-xl border border-purple-200 bg-purple-50/40 text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-[#7E22CE] flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#0B1F4B]">{t('ourValues')}</h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  {t('ourValuesText')}
                </p>
              </div>

            </div>
          </div>

          {/* CONTACT US FORM CARD */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-10 shadow-2xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Contact Details */}
              <div className="lg:col-span-5 space-y-4">
                <h2 className="text-xl font-black text-[#0B1F4B]">
                  {t('contactUs')}
                </h2>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Have questions, feedback or need assistance navigating legal resources? Reach out to our dedicated support team.
                </p>

                <div className="space-y-3 pt-3 text-xs text-[#475569]">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-[#1E40AF]" />
                    <span>support@bailsetu.in</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-[#1E40AF]" />
                    <span>+91 1800-11-2244 (Toll-free)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-[#1E40AF]" />
                    <span>High Court Bar Library, Kolkata, West Bengal 700001</span>
                  </div>
                </div>

                {/* Social icons */}
                <div className="flex items-center space-x-3 pt-4 text-[#64748B]">
                  <a href="#" className="p-2 rounded-lg bg-slate-50 hover:text-[#1E40AF] transition-colors" aria-label="Twitter">
                    <FaXTwitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-2 rounded-lg bg-slate-50 hover:text-[#1E40AF] transition-colors" aria-label="LinkedIn">
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-2 rounded-lg bg-slate-50 hover:text-[#1E40AF] transition-colors" aria-label="Facebook">
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-2 rounded-lg bg-slate-50 hover:text-[#1E40AF] transition-colors" aria-label="YouTube">
                    <FaYoutube className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-2 rounded-lg bg-slate-50 hover:text-[#1E40AF] transition-colors" aria-label="Instagram">
                    <FaInstagram className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Form Fields */}
              <div className="lg:col-span-7">
                {submitted ? (
                  <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center space-y-2">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
                    <h4 className="font-bold text-sm text-green-900">Message Received!</h4>
                    <p className="text-xs text-green-700">Thank you for reaching out. We will respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F4B] mb-1">
                        {t('name')} *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F4B] mb-1">
                        {t('email')} *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F4B] mb-1">
                        {t('message')} *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Type your message..."
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg outline-none focus:ring-2 focus:ring-[#1E40AF]"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t('sendMessage')}</span>
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>

          {/* USEFUL RESOURCES STRIP */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-2xs">
            <h3 className="font-bold text-sm text-[#0B1F4B] mb-4">
              {t('usefulResources')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <a
                href="https://indiacode.nic.in"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 flex items-center justify-between text-[#1E40AF] font-medium"
              >
                <span>Indian Penal Code (IPC)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href="https://indiacode.nic.in"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 flex items-center justify-between text-[#1E40AF] font-medium"
              >
                <span>Bharatiya Nyaya Sanhita</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href="https://nalsa.gov.in"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 flex items-center justify-between text-[#1E40AF] font-medium"
              >
                <span>Legal Aid Services</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href="https://main.sci.gov.in"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 flex items-center justify-between text-[#1E40AF] font-medium"
              >
                <span>Supreme Court Judgments</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
