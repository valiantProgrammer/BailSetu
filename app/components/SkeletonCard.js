import React from 'react';

function SkeletonCard() {
  return (
    <div className="bs-result-card animate-pulse">
      {/* Header badges row */}
      <div className="flex items-center gap-2 mb-4">
        <div className="skeleton h-6 w-24 rounded-full" />
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-16 rounded-full ml-auto" />
      </div>

      {/* Title */}
      <div className="skeleton h-5 w-3/4 rounded-md mb-2" />
      <div className="skeleton h-4 w-1/2 rounded-md mb-4" />

      {/* Description lines */}
      <div className="space-y-2 mb-4">
        <div className="skeleton h-3.5 w-full rounded-md" />
        <div className="skeleton h-3.5 w-5/6 rounded-md" />
        <div className="skeleton h-3.5 w-4/6 rounded-md" />
      </div>

      {/* Bottom row */}
      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        <div className="skeleton h-8 w-28 rounded-lg" />
        <div className="skeleton h-8 w-24 rounded-lg" />
        <div className="skeleton h-8 w-8 rounded-full ml-auto" />
      </div>
    </div>
  );
}

export function SkeletonPageLoader() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', paddingTop: 80 }}>
      {/* Search bar skeleton */}
      <div className="px-4 py-8" style={{ background: 'white', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="skeleton h-14 rounded-2xl w-full" />
        </div>
      </div>
      {/* Result cards */}
      <div className="container py-8">
        <div className="skeleton h-8 w-48 rounded-lg mb-6" />
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;