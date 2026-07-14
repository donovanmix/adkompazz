"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const pillars = [
  {
    title: "You own the strategy",
    description:
      "Your agency leads the Digital Marketing roadmap and the client relationship end to end.",
  },
  {
    title: "We seed the sources",
    description:
      "We execute the specialist off-site work across third-party platforms.",
  },
  {
    title: "Earned, not gamed",
    description:
      "Credible presence on Reddit, Wikipedia, and industry publications.",
  },
  {
    title: "Fully white-label",
    description:
      "From white-label reporting to a dedicated representative, we work behind the scenes so your brand stays front and center.",
  },
];

const sources = [
  "Reddit",
  "Wikipedia",
  "Industry publications",
  "Earned media",
  "Communities",
  "Digital PR",
];

export function DevelopersSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section id="developers" ref={sectionRef} className="relative pt-24 lg:pt-32 pb-12 lg:pb-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              White-label AI SEO for Digital Marketing Agencies
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8 text-balance">
              You service your client.
              <br />
              <span className="text-muted-foreground">We help you plant the AI Seed.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-xl">
              We execute the off-site work that helps your clients become more
              discoverable across popular LLMs in Singapore and Malaysia (ChatGPT,
              Gemini, AI Overview, Claude, and more).
            </p>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-xl">
              Your agency owns the strategy and client relationship. We deliver the
              specialist execution behind the scenes.
            </p>

            <Button
              asChild
              size="lg"
              className="group h-14 px-8 text-base rounded-full bg-foreground hover:bg-foreground/90 text-background"
            >
              <a
                href="https://sil6mv0dctb.typeform.com/to/gl0depE6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Partner Call
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          {/* Right: Pillars + sources */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="grid sm:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
              {pillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className={`bg-background p-8 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 75 + 300}ms` }}
                >
                  <h3 className="font-medium mb-2 text-base">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-sm font-mono text-muted-foreground mb-4">
                Where we seed
              </p>
              <div className="flex flex-wrap gap-3">
                {sources.map((source, index) => (
                  <span
                    key={source}
                    className={`px-4 py-2 text-sm border border-foreground/15 rounded-full text-foreground/80 transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 50 + 500}ms` }}
                  >
                    {source}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
