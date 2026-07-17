'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const countryCodeFlags: Record<string, { iso: string; code: string; label: string }> = {
  '+1': { iso: 'us', code: '+1', label: 'US' },
  '+44': { iso: 'gb', code: '+44', label: 'UK' },
  '+60': { iso: 'my', code: '+60', label: 'MY' },
  '+65': { iso: 'sg', code: '+65', label: 'SG' },
  '+86': { iso: 'cn', code: '+86', label: 'CN' },
  '+81': { iso: 'jp', code: '+81', label: 'JP' },
  '+91': { iso: 'in', code: '+91', label: 'IN' },
  '+33': { iso: 'fr', code: '+33', label: 'FR' },
  '+49': { iso: 'de', code: '+49', label: 'DE' },
  '+39': { iso: 'it', code: '+39', label: 'IT' },
};

function FlagImage({ iso, className }: { iso: string; className?: string }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${iso}.png`}
      alt=""
      width={20}
      height={15}
      className={className || 'inline-block h-[15px] w-5 rounded-[2px] object-cover'}
    />
  );
}

const SERVICE_OPTIONS = [
  'Reddit Community Seeding',
  'Wikipedia Content Management',
  'Digital PR & Third-Party Publishing',
  'AI Visibility Audit',
  'Other',
];

export function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    countryCode: '+60',
    contactNumber: '',
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [otherText, setOtherText] = useState('');

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
    setErrors((prev) => {
      if (!prev.services) return prev;
      const next = { ...prev };
      delete next.services;
      return next;
    });
  };

  const displayServices = selectedServices.map((s) =>
    s === 'Other' && otherText.trim() ? `Other: ${otherText.trim()}` : s
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }
    if (selectedServices.length === 0) {
      newErrors.services = 'Select at least one service';
    } else if (selectedServices.includes('Other') && !otherText.trim()) {
      newErrors.services = 'Please type your answer for Other';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToWhatsApp = () => {
    if (!validateForm()) return;

    const message = `Hello, I would like to get a quote.\n\nCompany Name: ${formData.companyName}\nName: ${formData.name}\nEmail: ${formData.email}\nContact Number: ${formData.countryCode} ${formData.contactNumber}\nServices: ${displayServices.join(', ')}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/60103746325?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[70vw] p-0 gap-0 rounded-xl max-h-[95vh] overflow-y-auto !max-w-none" style={{ maxWidth: "100vw" }}>
        <DialogHeader className="sr-only">
          <h2>Get Your Free Quote</h2>
        </DialogHeader>

        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side - WhatsApp Info */}
          <div className="w-full md:w-[300px] bg-emerald-50 flex-col items-center justify-center p-6 md:p-8 text-emerald-900 md:rounded-l-xl rounded-t-xl flex">

            <div className="mb-4 w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center">
              <img
                src="https://thesvg.org/icons/whatsapp/default.svg"
                alt="WhatsApp"
                className="w-10 h-10 brightness-0 invert"
              />
            </div>
            <h3 className="text-xl font-bold mb-3 text-center">
              Get Your Free Quote
            </h3>
            <p className="text-sm text-center text-emerald-700 mb-4">
              Share your details and we will WhatsApp you within 1 working day.
            </p>
            <div className="text-xs text-emerald-600 space-y-2">
              <p>MOQ from 100 units.</p>
              <p>Lead time 3-7 working days after artwork confirmation.</p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 p-6 md:p-8 lg:p-10 md:rounded-r-xl rounded-b-xl bg-white relative">
            <div className="mt-6 md:mt-4 space-y-3 md:space-y-4">
              {/* Company Name and Name */}
              <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2">
                <div>
                  <Label
                    htmlFor="companyName"
                    className="text-xs font-semibold text-gray-600 uppercase mb-2 block"
                  >
                    Company Name
                  </Label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <Input
                      id="companyName"
                      name="companyName"
                      placeholder="e.g. ABC Sdn Bhd"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.companyName}
                      className={`pl-10 border-2 bg-white ${errors.companyName ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500'}`}
                    />
                  </div>
                  {errors.companyName && (
                    <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="name"
                    className="text-xs font-semibold text-gray-600 uppercase mb-2 block"
                  >
                    Name
                  </Label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g. Jason Lim"
                      value={formData.name}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.name}
                      className={`pl-10 ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>
              </div>

              {/* Email and Contact Number */}
              <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2">
                <div>
                  <Label
                    htmlFor="email"
                    className="text-xs font-semibold text-gray-600 uppercase mb-2 block"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="e.g. jason@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.email}
                      className={`pl-10 ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="contactNumber"
                    className="text-xs font-semibold text-gray-600 uppercase mb-2 block"
                  >
                    Contact Number
                  </Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.countryCode}
                      onValueChange={(value) =>
                        handleSelectChange('countryCode', value)
                      }
                    >
                      <SelectTrigger className="w-24 shrink-0 border-gray-200 flex items-center justify-between px-2">
                        <span className="flex items-center gap-1">
                          <FlagImage iso={countryCodeFlags[formData.countryCode]?.iso || 'us'} />
                          <span>{countryCodeFlags[formData.countryCode]?.code || '+1'}</span>
                        </span>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(countryCodeFlags).map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <span className="flex items-center gap-2">
                              <FlagImage iso={country.iso} />
                              <span>{country.code}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <Input
                        id="contactNumber"
                        name="contactNumber"
                        placeholder="Invalid number. e.g. 12-345 6789"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        aria-invalid={!!errors.contactNumber}
                        className={errors.contactNumber ? 'border-red-400' : 'border-gray-200'}
                      />
                    </div>
                  </div>
                  {errors.contactNumber && (
                    <p className="text-xs text-red-500 mt-1">{errors.contactNumber}</p>
                  )}
                </div>
              </div>

              {/* Services multi-select */}
              <div>
                <Label className="text-xs font-semibold text-gray-600 uppercase mb-1 block">
                  What service(s) are you looking at from us ?
                </Label>
                <p className="text-xs text-gray-400 mb-2">
                  Choose as many as you like
                </p>
                <Popover open={servicesOpen} onOpenChange={setServicesOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      aria-invalid={!!errors.services}
                      className={`w-full h-9 flex items-center justify-between rounded-md border bg-transparent px-3 py-1 text-sm text-left transition-colors ${errors.services ? 'border-red-400 hover:border-red-500' : 'border-gray-200 hover:border-emerald-300'}`}
                    >
                      <span
                        className={
                          selectedServices.length > 0
                            ? 'text-gray-900 truncate'
                            : 'text-gray-400'
                        }
                      >
                        {displayServices.length > 0
                          ? displayServices.join(', ')
                          : 'Select service(s)'}
                      </span>
                      <svg
                        className="w-4 h-4 text-gray-400 shrink-0 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-2 rounded-xl shadow-xl"
                    align="start"
                  >
                    <div className="space-y-1.5">
                      {SERVICE_OPTIONS.map((service, index) => {
                        const isSelected = selectedServices.includes(service);
                        const letter = String.fromCharCode(65 + index);
                        const isOther = service === 'Other';

                        if (isOther && isSelected) {
                          return (
                            <div
                              key={service}
                              className="w-full flex items-center gap-2 rounded-lg border-2 border-emerald-500 bg-white px-2 py-1.5"
                            >
                              <button
                                type="button"
                                onClick={() => toggleService(service)}
                                aria-label="Deselect Other"
                                className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold border border-emerald-300 bg-white text-emerald-700 hover:bg-emerald-50 transition-colors"
                              >
                                {letter}
                              </button>
                              <input
                                type="text"
                                value={otherText}
                                onChange={(e) => {
                                  setOtherText(e.target.value);
                                  setErrors((prev) => {
                                    if (!prev.services) return prev;
                                    const next = { ...prev };
                                    delete next.services;
                                    return next;
                                  });
                                }}
                                onKeyDown={(e) => {
                                  if (
                                    e.key === 'Enter' &&
                                    !e.nativeEvent.isComposing &&
                                    e.keyCode !== 229
                                  ) {
                                    e.preventDefault();
                                    setServicesOpen(false);
                                  }
                                }}
                                placeholder="Type your answer"
                                autoFocus
                                className="flex-1 min-w-0 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => setServicesOpen(false)}
                                aria-label="Confirm answer"
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </button>
                            </div>
                          );
                        }

                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            aria-pressed={isSelected}
                            className={`w-full flex items-center gap-3 rounded-lg border-2 px-3 py-2 text-left text-sm transition-colors ${
                              isSelected
                                ? 'border-emerald-500 bg-white text-emerald-700 font-medium'
                                : 'border-transparent bg-emerald-50/60 text-emerald-800 hover:bg-emerald-50'
                            }`}
                          >
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold ${
                                isSelected
                                  ? 'bg-emerald-600 text-white'
                                  : 'border border-emerald-300 bg-white text-emerald-700'
                              }`}
                            >
                              {letter}
                            </span>
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
                {errors.services && (
                  <p className="text-xs text-red-500 mt-1">{errors.services}</p>
                )}
              </div>

              {/* Continue to WhatsApp Button */}
              <Button
                onClick={handleContinueToWhatsApp}
                className="w-full mt-4 md:mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 md:py-4 rounded-full text-sm md:text-base flex items-center justify-center gap-2"
              >
                <img
                  src="https://thesvg.org/icons/whatsapp/default.svg"
                  alt="WhatsApp"
                  className="w-5 h-5 brightness-0 invert"
                />
                Continue to WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
