'use client';

import React from 'react';
import Link from 'next/link';
import {
  Scale, BookOpen, Shield, HelpCircle, Mail, Phone, MapPin, ExternalLink
} from 'lucide-react';
import { FaLinkedinIn, FaFacebookF, FaYoutube, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { useLanguage } from '@/app/context/LanguageContext';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-[#E2E8F0] mt-16 text-[#334155]">
      {/* Top Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Col 1: Brand & Bio */}
          <div className="space-y-4 md:col-span-1">
            <BrandLogo size="normal" />
            <p className="text-xs text-[#64748B] leading-relaxed">
              {t('aboutDescription')}
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3 text-[#64748B] pt-2">
              <a href="#" className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-[#1E40AF] transition-colors" aria-label="Twitter">
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-[#1E40AF] transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a href="#" className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-[#1E40AF] transition-colors" aria-label="Facebook">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-[#1E40AF] transition-colors" aria-label="YouTube">
                <FaYoutube className="w-4 h-4" />
              </a>
              <a href="#" className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-[#1E40AF] transition-colors" aria-label="Instagram">
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#0B1F4B] tracking-wide uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#64748B]">
              <li>
                <Link href="/" className="hover:text-[#1E40AF] transition-colors">
                  {t('navHome')}
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[#1E40AF] transition-colors">
                  {t('navSearch')}
                </Link>
              </li>
              <li>
                <Link href="/advocates" className="hover:text-[#1E40AF] transition-colors">
                  {t('navAdvocates')}
                </Link>
              </li>
              <li>
                <Link href="/legal-aid" className="hover:text-[#1E40AF] transition-colors">
                  {t('navLegalAid')}
                </Link>
              </li>
              <li>
                <Link href="/track-application" className="hover:text-[#1E40AF] transition-colors">
                  {t('trackTitle')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Useful Legal Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#0B1F4B] tracking-wide uppercase">
              {t('usefulResources')}
            </h4>
            <ul className="space-y-2 text-xs text-[#64748B]">
              <li>
                <a
                  href="https://indiacode.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center hover:text-[#1E40AF] transition-colors"
                >
                  Indian Penal Code (IPC)
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://indiacode.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center hover:text-[#1E40AF] transition-colors"
                >
                  Bharatiya Nyaya Sanhita (BNS)
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://nalsa.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center hover:text-[#1E40AF] transition-colors"
                >
                  Legal Aid Services (NALSA)
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://main.sci.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center hover:text-[#1E40AF] transition-colors"
                >
                  Supreme Court Judgments
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Help */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#0B1F4B] tracking-wide uppercase">
              {t('contactUs')}
            </h4>
            <div className="space-y-2 text-xs text-[#64748B]">
              <p className="flex items-center">
                <Mail className="w-3.5 h-3.5 mr-2 text-[#1E40AF]" />
                support@bailsetu.in
              </p>
              <p className="flex items-center">
                <Phone className="w-3.5 h-3.5 mr-2 text-[#1E40AF]" />
                1800-11-2244 (Toll-Free Helpline)
              </p>
              <p className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-2 text-[#1E40AF]" />
                High Court Bar Library, Kolkata 700001
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-block bg-[#1E40AF] text-white font-medium px-4 py-1.5 rounded-lg text-xs hover:bg-[#1D4ED8] transition-colors"
                >
                  {t('contactUs')} Form
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer Bar */}
        <div className="mt-8 pt-6 border-t border-[#F1F5F9] text-center md:flex md:justify-between items-center text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} BailSETU. {t('tagline')}. Built for Indian Judicial Transparency.</p>
          <div className="mt-2 md:mt-0 flex justify-center space-x-4">
            <Link href="/about" className="hover:text-[#1E40AF]">About Us</Link>
            <Link href="/faq" className="hover:text-[#1E40AF]">FAQs</Link>
            <Link href="/TermsAndConditions" className="hover:text-[#1E40AF]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
