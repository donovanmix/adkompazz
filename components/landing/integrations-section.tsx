"use client";

import { useEffect, useState, useRef } from "react";

const LOGO_BASE = "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons";

type Integration = { name: string; category: string; slug?: string };

const integrations: Integration[] = [
  // Content & Publishing
  { name: "Medium", category: "Content & Publishing", slug: "medium" },
  { name: "Substack", category: "Content & Publishing", slug: "substack" },
  { name: "LinkedIn Articles", category: "Content & Publishing", slug: "linkedin" },
  { name: "Podcasts", category: "Content & Publishing", slug: "apple-podcasts" },
  { name: "YouTube", category: "Content & Publishing", slug: "youtube" },
  // Business Listings
  { name: "Google Business Profile", category: "Business Listings", slug: "google" },
  { name: "Yellow Pages Malaysia", category: "Business Listings" },
  { name: "Malaysia Business Directory", category: "Business Listings" },
  { name: "Foursquare", category: "Business Listings", slug: "foursquare" },
  { name: "Yelp", category: "Business Listings", slug: "yelp" },
  // News & Media
  { name: "The Star", category: "News & Media" },
  { name: "Sin Chew", category: "News & Media" },
  { name: "Malay Mail", category: "News & Media" },
  { name: "Free Malaysia Today", category: "News & Media" },
  { name: "NST", category: "News & Media" },
  { name: "Bernama", category: "News & Media" },
  // Social Platforms
  { name: "Facebook", category: "Social Platforms", slug: "facebook" },
  { name: "Instagram", category: "Social Platforms", slug: "instagram" },
  { name: "LinkedIn", category: "Social Platforms", slug: "linkedin" },
  { name: "YouTube", category: "Social Platforms", slug: "youtube" },
  { name: "TikTok", category: "Social Platforms", slug: "tiktok" },
  { name: "Pinterest", category: "Social Platforms", slug: "pinterest" },
  { name: "X (Twitter)", category: "Social Platforms", slug: "x" },
  // Q&A & Forums
  { name: "Reddit", category: "Q&A & Forums", slug: "reddit" },
  { name: "Quora", category: "Q&A & Forums", slug: "quora" },
  { name: "Cari Forum", category: "Q&A & Forums" },
  { name: "Lowyat Forum", category: "Q&A & Forums" },
  // Wikipedia & Knowledge
  { name: "Wikipedia", category: "Wikipedia & Knowledge", slug: "wikipedia" },
  { name: "Wikidata", category: "Wikipedia & Knowledge", slug: "wikidata" },
  { name: "Google Knowledge Panel", category: "Wikipedia & Knowledge", slug: "google" },
];

function IntegrationCard({ integration }: { integration: Integration }) {
  const [failed, setFailed] = useState(false);
  const showLogo = integration.slug && !failed;

  return (
    <div className="shrink-0 flex items-center gap-4 px-8 py-6 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300 group">
      {showLogo ? (
        <img
          src={`${LOGO_BASE}/${integration.slug}/default.svg`}
          alt={`${integration.name} logo`}
          width={40}
          height={40}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-10 w-10 object-contain shrink-0"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-foreground/5 text-base font-display text-foreground/70"
        >
          {integration.name.charAt(0)}
        </span>
      )}
      <div>
        <div className="text-lg font-medium group-hover:translate-x-1 transition-transform whitespace-nowrap">
          {integration.name}
        </div>
        <div className="text-sm text-muted-foreground">{integration.category}</div>
      </div>
    </div>
  );
}

export function IntegrationsSection() {
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
    <section id="integrations" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Placements
            <span className="w-8 h-px bg-foreground/30" />
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Get cited where
            <br />
            your industry lives.
          </h2>
          <p className="text-xl text-muted-foreground">
            We publish your brand across the blogs, third-party sites, and trusted platforms that matter in your industry—and source the placements you don&apos;t already have.
          </p>
        </div>

      </div>
      
      {/* Full-width marquees outside container */}
      <div className="w-full mb-6">
        <div className="flex gap-6 marquee">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {integrations.map((integration) => (
                <IntegrationCard key={`${integration.name}-${setIndex}`} integration={integration} />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Reverse marquee */}
      <div className="w-full">
        <div className="flex gap-6 marquee-reverse">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-6 shrink-0">
              {[...integrations].reverse().map((integration) => (
                <IntegrationCard key={`${integration.name}-reverse-${setIndex}`} integration={integration} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
