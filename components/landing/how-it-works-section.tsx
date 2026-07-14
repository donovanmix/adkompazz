"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "I",
    title: "Audit & attribution",
    description:
      "We start with an AI visibility audit across ChatGPT, Perplexity, Google AI Overviews, Claude, and Gemini — or work from the reports your GEO agency provides — and set an attribution baseline with GA4 and CRM data.",
    report: {
      label: "AI Visibility Audit",
      period: "Baseline · Month 0",
      // Share of AI Voice — your brand vs. competitors
      shareOfVoice: 8,
      coverageRate: 18,
      // Visibility trend across the last 6 months
      bars: [10, 12, 11, 14, 13, 16],
      // Brand coverage rate per AI engine
      engines: [
        { name: "ChatGPT", value: 6 },
        { name: "Perplexity", value: 4 },
        { name: "Google AIO", value: 14 },
        { name: "Gemini", value: 5 },
        { name: "Copilot", value: 3 },
      ],
    },
  },
  {
    number: "II",
    title: "Outreach execution",
    description:
      "We secure placements in editorial listicles, software review pages, YouTube overviews, and analysis content from publications your buyers already trust — every placement contextually relevant to your category positioning.",
    report: {
      label: "Placement Tracker",
      period: "Live · Month 2",
      shareOfVoice: 21,
      coverageRate: 46,
      bars: [16, 18, 22, 28, 31, 38],
      engines: [
        { name: "ChatGPT", value: 42 },
        { name: "Perplexity", value: 35 },
        { name: "Google AIO", value: 48 },
        { name: "Gemini", value: 31 },
        { name: "Copilot", value: 22 },
      ],
    },
  },
  {
    number: "III",
    title: "Track & report",
    description:
      "We deliver monthly reporting on citation count, prompt-level visibility, competitive share of voice, and lagging indicators like signups and pipeline influenced — then adjust outreach based on observed citation behavior.",
    report: {
      label: "Monthly Citation Report",
      period: "Month 6",
      shareOfVoice: 34,
      coverageRate: 78,
      bars: [16, 24, 31, 45, 62, 78],
      engines: [
        { name: "ChatGPT", value: 72 },
        { name: "Perplexity", value: 64 },
        { name: "Google AIO", value: 81 },
        { name: "Gemini", value: 58 },
        { name: "Copilot", value: 49 },
      ],
    },
  },
];

const chartMonths = ["M1", "M2", "M3", "M4", "M5", "M6"];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-foreground text-background overflow-hidden"
    >
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`
        }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-background/50 mb-6">
            <span className="w-8 h-px bg-background/30" />
            Process
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Three steps.
            <br />
            <span className="text-background/50">Cited everywhere.</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Steps */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full text-left py-8 border-b border-background/10 transition-all duration-500 group ${
                  activeStep === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-3xl text-background/30">{step.number}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl lg:text-3xl font-display mb-3 group-hover:translate-x-2 transition-transform duration-300">
                      {step.title}
                    </h3>
                    <p className="text-background/60 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Progress indicator */}
                    {activeStep === index && (
                      <div className="mt-4 h-px bg-background/20 overflow-hidden">
                        <div 
                          className="h-full bg-background w-0"
                          style={{
                            animation: 'progress 5s linear forwards'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Report display */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="border border-background/10 overflow-hidden">
              {/* Window header */}
              <div className="px-6 py-4 border-b border-background/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-background/20" />
                  <div className="w-3 h-3 rounded-full bg-background/20" />
                  <div className="w-3 h-3 rounded-full bg-background/20" />
                </div>
                <span className="text-xs font-mono text-background/40">otterly.report</span>
              </div>

              {/* Report content */}
              <div key={activeStep} className="p-8 min-h-[420px] report-reveal">
                {/* Title */}
                <div className="mb-6">
                  <h4 className="font-display text-xl text-background">
                    {steps[activeStep].report.label}
                  </h4>
                  <p className="text-xs font-mono text-background/40 mt-1">
                    {steps[activeStep].report.period} · across all major AI engines
                  </p>
                </div>

                {/* Share of AI Voice + coverage */}
                <div className="flex items-center gap-6 mb-8">
                  {/* Donut */}
                  {(() => {
                    const sov = steps[activeStep].report.shareOfVoice;
                    const r = 34;
                    const circ = 2 * Math.PI * r;
                    return (
                      <div className="relative w-28 h-28 shrink-0">
                        <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                          <circle cx="40" cy="40" r={r} fill="none" stroke="currentColor" strokeWidth="8" className="text-background/10" />
                          <circle
                            cx="40"
                            cy="40"
                            r={r}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeLinecap="round"
                            className="text-green-400 report-donut"
                            strokeDasharray={circ}
                            style={{ ["--dash-offset" as string]: `${circ * (1 - sov / 100)}` }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-display text-2xl text-background">{sov}%</span>
                        </div>
                      </div>
                    );
                  })()}
                  <div className="flex-1">
                    <div className="text-sm text-background">Share of AI Voice</div>
                    <div className="text-xs text-background/40 mt-1 mb-4 leading-snug">Your citations vs. competitors</div>
                    <div className="text-sm text-background">
                      {steps[activeStep].report.coverageRate}% <span className="text-background/40">brand coverage</span>
                    </div>
                    <div className="mt-2 h-2 bg-background/10 overflow-hidden">
                      <div
                        className="h-full bg-background/60 report-track"
                        style={{ width: `${steps[activeStep].report.coverageRate}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Visibility trend bars */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-background/50">Visibility trend</span>
                    <span className="text-xs font-mono text-background/30">6-month</span>
                  </div>
                  <div className="flex items-end gap-2 h-24">
                    {steps[activeStep].report.bars.map((value, barIndex) => {
                      const maxBar = Math.max(...steps[activeStep].report.bars);
                      const heightPct = 15 + (value / maxBar) * 85;
                      return (
                        <div key={barIndex} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
                          <div
                            className="w-full bg-green-400/80 report-bar"
                            style={{
                              height: `${heightPct}%`,
                              animationDelay: `${barIndex * 90}ms`,
                            }}
                          />
                          <span className="text-[10px] font-mono text-background/30">{chartMonths[barIndex]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Brand coverage by engine */}
                <div>
                  <span className="text-xs font-mono text-background/50 block mb-3">Brand coverage by engine</span>
                  <div className="space-y-3">
                    {steps[activeStep].report.engines.map((engine, engineIndex) => (
                      <div key={engine.name} className="flex items-center gap-3">
                        <span className="text-xs text-background/60 w-20 shrink-0">{engine.name}</span>
                        <div className="flex-1 h-2 bg-background/10 overflow-hidden">
                          <div
                            className="h-full bg-background/60 report-track"
                            style={{
                              width: `${engine.value}%`,
                              animationDelay: `${engineIndex * 90}ms`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-mono text-background/50 w-10 text-right">{engine.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="px-6 py-4 border-t border-background/10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-background/40">Live data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }

        .report-reveal {
          opacity: 0;
          transform: translateY(8px);
          animation: reportReveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes reportReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .report-bar {
          transform-origin: bottom;
          animation: barGrow 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes barGrow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }

        .report-track {
          transform-origin: left;
          animation: trackGrow 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes trackGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .report-donut {
          stroke-dashoffset: var(--dash-offset);
          animation: donutFill 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes donutFill {
          from { stroke-dashoffset: var(--circ, 214); }
          to { stroke-dashoffset: var(--dash-offset); }
        }
      `}</style>
    </section>
  );
}
