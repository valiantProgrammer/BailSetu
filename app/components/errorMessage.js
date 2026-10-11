'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ErrorMessage({ message, onDismiss }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => { setVisible(false); onDismiss?.(); }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -60, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-5 right-5 z-[2000] flex items-center gap-3 px-5 py-4 rounded-2xl text-white"
          style={{
            background: 'linear-gradient(135deg, #dc2626, #ef4444)',
            boxShadow: '0 10px 40px rgba(220,38,38,0.4)',
            minWidth: 260,
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <motion.svg
              width="18" height="18"
              viewBox="0 0 24 24"
              fill="none" stroke="white"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <motion.path
                d="M18 6L6 18M6 6l12 12"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.2, duration: 0.4, ease: 'easeInOut' }}
              />
            </motion.svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{message}</p>
            <p className="text-white/70 text-xs mt-0.5">Please try again</p>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-white/60 hover:text-white transition-colors text-lg font-light"
          >
            ×
          </button>
          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-white/40"
            style={{ bottom: 0, left: 0, right: 0, borderRadius: '0 0 16px 16px' }}
            initial={{ scaleX: 1, transformOrigin: 'left' }}
            animate={{ scaleX: 0, transformOrigin: 'left' }}
            transition={{ duration: 4, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
