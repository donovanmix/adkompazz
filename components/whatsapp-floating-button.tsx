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
        className="fixed bottom-6 right-6 h-14 bg-gradient-to-r from-teal-700 to-teal-700 hover:from-teal-800 hover:to-teal-800 text-white rounded-full shadow-lg flex items-center transition-all duration-300 hover:scale-105 z-40 overflow-hidden group"
        aria-label="Open WhatsApp contact form"
      >
        {/* Text Section */}
        <div className="flex items-center justify-center px-6 py-3 font-semibold text-sm">
          Get Free Quote
        </div>

        {/* Icon Section - Green Circle */}
        <div className="bg-green-500 w-14 h-14 flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.347l-.356.201-3.682-.967.984 3.231-.203.365a9.858 9.858 0 001.427 5.645c.996 1.532 2.651 2.78 4.531 3.472a9.884 9.884 0 005.516.436l.375-.058 3.496.966-.835-3.033.147-.355a9.878 9.878 0 00.772-5.204c-.29-2.773-1.934-5.153-4.365-6.421a9.893 9.893 0 00-5.279-.727z" />
          </svg>
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
