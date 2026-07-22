'use client';

import React, { useState } from 'react';
import { WhatsAppModal } from './whatsapp-modal';

export function WhatsAppFloatingButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 h-14 bg-gradient-to-r from-teal-700 to-teal-700 hover:from-teal-800 hover:to-teal-800 text-white rounded-full shadow-lg flex items-center transition-all duration-300 hover:scale-105 z-50 overflow-hidden group"
        aria-label="Open WhatsApp contact form"
      >
        {/* Text Section */}
        <div className="flex items-center justify-center px-6 py-3 font-semibold text-sm">
          Get Free Quote
        </div>

        {/* Icon Section - Green Circle */}
        <div className="bg-green-500 w-14 h-14 flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors z-50 relative">
          <img
            src="https://thesvg.org/icons/whatsapp/default.svg"
            alt="WhatsApp"
            className="w-6 h-6 brightness-0 invert"
          />
        </div>
      </button>

      {/* Modal */}
      <WhatsAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
