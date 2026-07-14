'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
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

export function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    countryCode: '+1',
    contactNumber: '',
    printingService: '',
    moq: '',
    targetDate: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinueToWhatsApp = () => {
    const message = `Hello, I would like to get a quote.\n\nCompany Name: ${formData.companyName}\nName: ${formData.name}\nEmail: ${formData.email}\nContact Number: ${formData.countryCode} ${formData.contactNumber}\nPrinting Service: ${formData.printingService}\nMOQ: ${formData.moq}\nTarget Delivery Date: ${formData.targetDate}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 rounded-xl">
        <DialogHeader className="sr-only">
          <h2>Get Your Free Quote</h2>
        </DialogHeader>

        <div className="flex h-full">
          {/* Left Side - WhatsApp Info */}
          <div className="hidden md:flex md:w-1/3 bg-emerald-50 flex-col items-center justify-center p-8 text-emerald-900 rounded-l-xl">
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
          <div className="flex-1 p-8 md:rounded-r-xl rounded-xl bg-white">
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-gray-300 hover:text-gray-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mt-4 space-y-5">
              {/* Company Name and Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="pl-10 border-2 border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 bg-white"
                    />
                  </div>
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
                      className="pl-10 border-gray-200"
                    />
                  </div>
                </div>
              </div>

              {/* Email and Contact Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      className="pl-10 border-gray-200"
                    />
                  </div>
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
                      <SelectTrigger className="w-28 border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+1">🇺🇸 +1</SelectItem>
                        <SelectItem value="+44">🇬🇧 +44</SelectItem>
                        <SelectItem value="+60">🇲🇾 +60</SelectItem>
                        <SelectItem value="+65">🇸🇬 +65</SelectItem>
                        <SelectItem value="+86">🇨🇳 +86</SelectItem>
                        <SelectItem value="+81">🇯🇵 +81</SelectItem>
                        <SelectItem value="+91">🇮🇳 +91</SelectItem>
                        <SelectItem value="+33">🇫🇷 +33</SelectItem>
                        <SelectItem value="+49">🇩🇪 +49</SelectItem>
                        <SelectItem value="+39">🇮🇹 +39</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                      <Input
                        id="contactNumber"
                        name="contactNumber"
                        placeholder="e.g. 12-345 6789"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="border-gray-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Printing Service and MOQ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="printingService"
                    className="text-xs font-semibold text-gray-600 uppercase mb-2 block"
                  >
                    Printing Service
                  </Label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none z-10"
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
                    <Select
                      value={formData.printingService}
                      onValueChange={(value) =>
                        handleSelectChange('printingService', value)
                      }
                    >
                      <SelectTrigger className="border-gray-200 pl-10">
                        <SelectValue placeholder="Select printing service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="offset-printing">
                          Offset Printing
                        </SelectItem>
                        <SelectItem value="digital-printing">
                          Digital Printing
                        </SelectItem>
                        <SelectItem value="screen-printing">
                          Screen Printing
                        </SelectItem>
                        <SelectItem value="flexography">Flexography</SelectItem>
                        <SelectItem value="gravure">Gravure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="moq"
                    className="text-xs font-semibold text-gray-600 uppercase mb-2 block"
                  >
                    MOQ
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none z-10 text-base font-bold flex items-center justify-center">#</span>
                    <Select
                      value={formData.moq}
                      onValueChange={(value) => handleSelectChange('moq', value)}
                    >
                      <SelectTrigger className="border-gray-200 pl-10">
                        <SelectValue placeholder="Select quantity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100-500">100 - 500 units</SelectItem>
                        <SelectItem value="500-1000">500 - 1,000 units</SelectItem>
                        <SelectItem value="1000-5000">
                          1,000 - 5,000 units
                        </SelectItem>
                        <SelectItem value="5000+">5,000+ units</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Target Delivery Date */}
              <div>
                <Label
                  htmlFor="targetDate"
                  className="text-xs font-semibold text-gray-600 uppercase mb-2 block"
                >
                  Target Delivery Date
                </Label>
                <div className="relative">
                  <Input
                    id="targetDate"
                    name="targetDate"
                    type="date"
                    value={formData.targetDate}
                    onChange={handleInputChange}
                    className="pl-10 border-gray-200"
                  />
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Continue to WhatsApp Button */}
              <Button
                onClick={handleContinueToWhatsApp}
                className="w-full mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-full text-base flex items-center justify-center gap-2"
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
