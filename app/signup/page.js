'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import {
  FaEnvelope, FaLock, FaUser, FaUserTag, FaMapMarkerAlt,
  FaMapPin, FaPhone, FaBalanceScale, FaEye, FaEyeSlash,
  FaGoogle, FaGithub, FaArrowRight, FaCheck, FaShieldAlt,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Spinner from '../components/Spinner';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { label: 'Personal Info', icon: <FaUser /> },
  { label: 'Contact', icon: <FaPhone /> },
  { label: 'Security', icon: <FaShieldAlt /> },
];

const Page = () => {
  const router = useRouter();
  const [step, setStep] = useState(0); // multi-step form
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [condSatisfied, setCondSatisfied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      localStorage.setItem('user', JSON.stringify({
        userId: session.user.userId,
        username: session.user.name,
        emailAddress: session.user.email,
        image: session.user.image,
        provider: session.user.provider,
      }));
      setTimeout(() => router.replace('/Home'), 1500);
    }
  }, [session, router]);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const fullname = watch('fullname') || '';
  const password = watch('password');
  const username = fullname.trim().replace(/\s+/g, '_');

  const handleSendOtp = async () => {
    const emailAddress = watch('emailAddress');
    if (!emailAddress) return;
    setVerifyEmail(true);
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generated);
    try {
      await fetch('/api/verifyEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: emailAddress, otp: generated }),
      });
      setOtpSent(true);
      setShowOtpModal(true);
      setVerifyEmail(false);
    } catch {
      setOtpError('Failed to send OTP. Please try again.');
      setVerifyEmail(false);
    }
  };

  const verifyOtp = () => {
    if (enteredOtp === otp) {
      setOtpVerified(true);
      setShowOtpModal(false);
      setOtpError('');
    } else {
      setOtpError('Incorrect OTP. Please try again.');
    }
  };

  const onSubmit = async (data) => {
    if (!otpVerified) {
      setSubmitError('Please verify your email before signing up.');
      return;
    }
    setCondSatisfied(true);
    const payload = { username, ...data };
    try {
      const signup = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await signup.json();
      if (!signup.ok) throw new Error(result.error || 'Signup failed');

      try {
        const userRes = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailAddress: payload.emailAddress }),
        });
        const userInfo = await userRes.json();
        localStorage.setItem('user', JSON.stringify(userInfo));
      } catch {}

      router.replace('/Home');
    } catch (err) {
      setSubmitError(err.message);
      setCondSatisfied(false);
    }
  };

  if (condSatisfied) return <Spinner message="Creating your account..." />;

  const FormField = ({ label, error, children }) => (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">⚠ {error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      {/* Left brand strip */}
      <div
        className="hidden lg:flex flex-col items-center justify-center w-80 flex-shrink-0 text-center px-8"
        style={{ background: 'linear-gradient(180deg, #0d1b2a 0%, #1a2238 100%)' }}
      >
        <div className="relative mb-8">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'url(/justice_hero_bg.jpg)', backgroundSize: 'cover', borderRadius: 24 }}
          />
          <div className="relative p-6">
            <FaBalanceScale className="text-red-500 text-5xl mb-4 mx-auto animate-float" />
            <h1
              className="text-3xl font-black text-white mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              BAIL <span style={{ color: '#e74c3c' }}>सेतु</span>
            </h1>
            <p className="text-white/50 text-sm leading-relaxed">
              Join thousands of citizens using BAIL सेतु to understand their legal rights.
            </p>
          </div>
        </div>

        {[
          '⚖️ Free access to 1500+ IPC sections',
          '🔍 AI-powered bail analysis',
          '👨‍⚖️ Find verified advocates',
          '🌐 Hindi & English support',
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-white/60 text-sm mb-3">
            <span>{item}</span>
          </div>
        ))}

        <div
          className="mt-8 p-4 rounded-xl text-left"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-white/60 text-xs italic">"Bail is the rule, jail is the exception."</p>
          <p className="text-white/40 text-xs mt-1">— Supreme Court of India</p>
        </div>
      </div>

      {/* Main form */}
      <div className="flex-1 flex items-center justify-center py-12 px-6 overflow-y-auto">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-6 lg:hidden">
            <FaBalanceScale className="text-red-600 text-2xl" />
            <h1 className="text-2xl font-black" style={{ fontFamily: 'Playfair Display, serif' }}>
              BAIL <span className="text-red-600">सेतु</span>
            </h1>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
            Create Account
          </h2>
          <p className="text-gray-500 mb-6">
            Already have an account?{' '}
            <Link href="/signin" className="text-red-600 font-semibold hover:underline">Sign in</Link>
          </p>

          {/* OAuth */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { icon: <FaGoogle className="text-red-500" />, label: 'Google', provider: 'google' },
              { icon: <FaGithub className="text-gray-800" />, label: 'GitHub', provider: 'github' },
            ].map((p, i) => (
              <button
                key={i}
                onClick={() => signIn(p.provider, { redirect: false })}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border font-medium text-sm transition-all hover:bg-gray-50"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>

          <div className="relative flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">or register with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
            {/* Full Name */}
            <FormField label="Full Name *" error={errors.fullname?.message}>
              <div className="bs-input-group">
                <FaUser className="bs-input-icon" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  {...register('fullname', { required: 'Full name is required' })}
                  className="bs-input"
                />
              </div>
            </FormField>

            {/* Email + OTP */}
            <FormField label="Email Address *" error={errors.emailAddress?.message}>
              <div className="bs-input-group mb-2">
                <FaEnvelope className="bs-input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register('emailAddress', { required: 'Email is required' })}
                  className="bs-input"
                />
              </div>
              {otpVerified ? (
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                    <FaCheck className="text-white text-xs" />
                  </div>
                  Email verified successfully!
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={verifyEmail}
                  className="text-sm font-semibold text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
                >
                  {verifyEmail ? '⏳ Sending OTP...' : '→ Verify Email with OTP'}
                </button>
              )}
            </FormField>

            {/* Username (auto) */}
            <FormField label="Username (auto-generated)">
              <div className="bs-input-group">
                <FaUserTag className="bs-input-icon" />
                <input
                  type="text"
                  value={username}
                  readOnly
                  disabled
                  className="bs-input"
                  style={{ background: '#f1f5f9', cursor: 'not-allowed', color: '#94a3b8' }}
                />
              </div>
            </FormField>

            {/* Address */}
            <FormField label="Address (Optional)">
              <div className="bs-input-group">
                <FaMapMarkerAlt className="bs-input-icon" />
                <input type="text" {...register('address')} placeholder="Your address" className="bs-input" />
              </div>
            </FormField>

            {/* PIN + Phone in grid */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <FormField label="PIN Code (Optional)">
                <div className="bs-input-group">
                  <FaMapPin className="bs-input-icon" />
                  <input type="text" maxLength={6} {...register('pinNumber')} placeholder="6-digit PIN" className="bs-input" />
                </div>
              </FormField>
              <FormField label="Phone *" error={errors.phoneNumber?.message}>
                <div className="bs-input-group">
                  <FaPhone className="bs-input-icon" />
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Phone number"
                    {...register('phoneNumber', { required: 'Phone is required' })}
                    className="bs-input"
                  />
                </div>
              </FormField>
            </div>

            {/* Password */}
            <FormField label="Password *" error={errors.password?.message}>
              <div className="bs-input-group">
                <FaLock className="bs-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
                      message: 'Min 8 chars with upper, lower, and special character',
                    },
                  })}
                  placeholder="Strong password"
                  className="bs-input pr-12"
                />
                <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </FormField>

            {/* Confirm Password */}
            <FormField label="Confirm Password *" error={errors.confirmPassword?.message}>
              <div className="bs-input-group">
                <FaLock className="bs-input-icon" />
                <input
                  type={showPassword2 ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: v => v === password || 'Passwords do not match',
                  })}
                  placeholder="Re-enter password"
                  className="bs-input pr-12"
                />
                <button type="button" onClick={() => setShowPassword2(p => !p)} className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </FormField>

            {/* Terms */}
            <div className="flex items-start gap-3 mb-5">
              <input
                type="checkbox"
                id="agree"
                {...register('agree', { required: true })}
                className="mt-1 w-4 h-4 accent-red-600"
              />
              <label htmlFor="agree" className="text-sm text-gray-600 cursor-pointer">
                I agree to the{' '}
                <a href="/TermsAndConditions" className="text-red-600 hover:underline font-medium">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-red-600 hover:underline font-medium">Privacy Policy</a>
              </label>
            </div>
            {errors.agree && <p className="text-red-500 text-xs mb-4">⚠ You must agree to continue</p>}

            {/* Submit error */}
            {submitError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                ❌ {submitError}
              </div>
            )}

            <button type="submit" className="bs-btn-primary w-full py-4 text-base rounded-xl">
              Create Account <FaArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* OTP Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              key="modal"
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm border" style={{ borderColor: 'var(--border)' }}>
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📧</div>
                  <h2 className="text-xl font-bold text-gray-800">Verify Your Email</h2>
                  <p className="text-gray-500 text-sm mt-1">Enter the 6-digit OTP sent to your email</p>
                </div>

                <input
                  type="text"
                  value={enteredOtp}
                  onChange={e => setEnteredOtp(e.target.value)}
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  className="w-full text-center text-2xl font-bold tracking-widest border rounded-xl px-4 py-4 outline-none mb-3"
                  style={{ borderColor: 'var(--border)', fontFamily: 'var(--font-sans)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />

                {otpError && (
                  <p className="text-red-500 text-sm text-center mb-3">⚠ {otpError}</p>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowOtpModal(false)}
                    className="flex-1 py-3 rounded-xl border text-gray-600 font-medium text-sm transition-colors hover:bg-gray-50"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={verifyOtp}
                    className="flex-1 bs-btn-primary py-3 rounded-xl"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;