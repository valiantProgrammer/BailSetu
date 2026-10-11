'use client';
import React from 'react';

function Spinner({ message = 'Loading...' }) {
  return (
    <div className="bs-page-loader">
      {/* Animated scales of justice */}
      <div className="relative mb-8">
        <div className="text-7xl animate-float select-none">⚖️</div>
        <div className="absolute -inset-4 bg-red-600 opacity-10 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Brand */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bs-loader-ring w-20 h-20" />
        <div className="ml-4">
          <h2 className="text-white font-bold text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            BAIL <span style={{ color: '#e74c3c' }}>सेतु</span>
          </h2>
          <p className="text-white/50 text-sm mt-1">{message}</p>
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-2">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export default Spinner;