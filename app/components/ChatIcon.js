'use client';
import React, { useState } from 'react';
import { MdOutlineMarkUnreadChatAlt, MdClose } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const ChatIcon = () => {
  const router = useRouter();
  const [tooltip, setTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip bubble */}
      {tooltip && (
        <div
          className="bg-white border rounded-xl px-4 py-2 text-sm font-medium text-gray-700 shadow-lg animate-slideInRight"
          style={{ borderColor: 'var(--border)', boxShadow: 'var(--shadow-lg)' }}
        >
          💬 Chat with Community
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => router.push('/messages')}
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        className="bs-chat-fab"
        aria-label="Open community chat"
      >
        <MdOutlineMarkUnreadChatAlt className="text-white text-2xl" />
      </button>
    </div>
  );
};

export default ChatIcon;
