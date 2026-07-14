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
          <div className="hidden md:flex md:w-1/3 bg-emerald-500 flex-col items-center justify-center p-6 text-white rounded-l-xl">
            <div className="mb-4 w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-emerald-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.347l-.356.201-3.682-.967.984 3.231-.203.365a9.858 9.858 0 001.427 5.645c.996 1.532 2.651 2.78 4.531 3.472a9.884 9.884 0 005.516.436l.375-.058 3.496.966-.835-3.033.147-.355a9.878 9.878 0 00.772-5.204c-.29-2.773-1.934-5.153-4.365-6.421a9.893 9.893 0 00-5.279-.727z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">
              Get Your Free Quote
            </h3>
            <p className="text-sm text-center text-emerald-100">
              Share your details and we will WhatsApp you within 1 working day.
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 p-6 md:rounded-r-xl rounded-xl">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mt-2 space-y-4">
              {/* Company Name and Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="companyName"
                    className="text-xs font-semibold text-gray-700 uppercase mb-2 block"
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
                      className="pl-10 border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="name"
                    className="text-xs font-semibold text-gray-700 uppercase mb-2 block"
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
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Email and Contact Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="email"
                    className="text-xs font-semibold text-gray-700 uppercase mb-2 block"
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
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="contactNumber"
                    className="text-xs font-semibold text-gray-700 uppercase mb-2 block"
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
                      <SelectTrigger className="w-24">
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
                    className="text-xs font-semibold text-gray-700 uppercase mb-2 block"
                  >
                    Printing Service
                  </Label>
                  <Select
                    value={formData.printingService}
                    onValueChange={(value) =>
                      handleSelectChange('printingService', value)
                    }
                  >
                    <SelectTrigger className="border-gray-300">
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

                <div>
                  <Label
                    htmlFor="moq"
                    className="text-xs font-semibold text-gray-700 uppercase mb-2 block"
                  >
                    MOQ
                  </Label>
                  <Select
                    value={formData.moq}
                    onValueChange={(value) => handleSelectChange('moq', value)}
                  >
                    <SelectTrigger className="border-gray-300">
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

              {/* Target Delivery Date */}
              <div>
                <Label
                  htmlFor="targetDate"
                  className="text-xs font-semibold text-gray-700 uppercase mb-2 block"
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
                    className="pl-10"
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none"
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
                className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-full"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.347l-.356.201-3.682-.967.984 3.231-.203.365a9.858 9.858 0 001.427 5.645c.996 1.532 2.651 2.78 4.531 3.472a9.884 9.884 0 005.516.436l.375-.058 3.496.966-.835-3.033.147-.355a9.878 9.878 0 00.772-5.204c-.29-2.773-1.934-5.153-4.365-6.421a9.893 9.893 0 00-5.279-.727z" />
                </svg>
                Continue to WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
