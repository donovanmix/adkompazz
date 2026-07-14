'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

interface DeliveryCalendarProps {
  selectedDate: Date | null;
  onSelect: (date: Date | null) => void;
  onClose: () => void;
}

function DeliveryCalendar({ selectedDate, onSelect, onClose }: DeliveryCalendarProps) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    selectedDate ? new Date(selectedDate) : new Date()
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isSameDay = (a: Date | null, b: Date | null) =>
    !!a && !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDayOfWeek }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="w-[340px] sm:w-[400px] p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month - 1, 1))}
          className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-bold text-emerald-700">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => setViewDate(new Date(year, month + 1, 1))}
          className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAY_LABELS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} />;
          }
          const cellDate = new Date(year, month, day);
          const isToday = isSameDay(cellDate, today);
          const isSelected = isSameDay(cellDate, selectedDate);
          return (
            <button
              key={day}
              type="button"
              onClick={() => {
                onSelect(cellDate);
                onClose();
              }}
              className={`h-11 rounded-lg text-sm flex items-center justify-center border transition-colors ${
                isSelected
                  ? 'bg-emerald-500 border-emerald-500 text-white font-semibold'
                  : isToday
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-800 font-semibold'
                    : 'bg-gray-50/80 border-gray-100 text-gray-700 hover:bg-emerald-50 hover:border-emerald-100'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={() => {
            onSelect(null);
            onClose();
          }}
          className="text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => {
            setViewDate(new Date());
            onSelect(new Date());
            onClose();
          }}
          className="text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          Today
        </button>
      </div>
    </div>
  );
}

export function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    countryCode: '+60',
    contactNumber: '',
    moq: '',
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };
  const [calendarOpen, setCalendarOpen] = useState(false);

  const formatDate = (date: Date | null) =>
    date
      ? `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
      : '';

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
    const message = `Hello, I would like to get a quote.\n\nCompany Name: ${formData.companyName}\nName: ${formData.name}\nEmail: ${formData.email}\nContact Number: ${formData.countryCode} ${formData.contactNumber}\nServices: ${selectedServices.join(', ')}\nMOQ: ${formData.moq}\nTarget Delivery Date: ${formatDate(targetDate)}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
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
                        className="border-gray-200"
                      />
                    </div>
                  </div>
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
                      className="w-full h-9 flex items-center justify-between rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm text-left hover:border-emerald-300 transition-colors"
                    >
                      <span
                        className={
                          selectedServices.length > 0
                            ? 'text-gray-900 truncate'
                            : 'text-gray-400'
                        }
                      >
                        {selectedServices.length > 0
                          ? selectedServices.join(', ')
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
                    className="w-[var(--radix-popover-trigger-width)] p-2 rounded-xl shadow-xl"
                    align="start"
                  >
                    <div className="space-y-1.5">
                      {SERVICE_OPTIONS.map((service, index) => {
                        const isSelected = selectedServices.includes(service);
                        const letter = String.fromCharCode(65 + index);
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
              </div>

              {/* MOQ */}
              <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2">
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
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      id="targetDate"
                      className="w-full h-9 flex items-center justify-between rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm text-left hover:border-emerald-300 transition-colors"
                    >
                      <span className={targetDate ? 'text-gray-900' : 'text-gray-400'}>
                        {targetDate ? formatDate(targetDate) : 'Select date (optional)'}
                      </span>
                      <svg
                        className="w-5 h-5 text-emerald-500 pointer-events-none"
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
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-xl shadow-xl" align="start">
                    <DeliveryCalendar
                      selectedDate={targetDate}
                      onSelect={setTargetDate}
                      onClose={() => setCalendarOpen(false)}
                    />
                  </PopoverContent>
                </Popover>
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
