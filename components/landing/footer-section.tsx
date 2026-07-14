"use client";

import { AnimatedWave } from "./animated-wave";

const footerLinks = {
  Services: [
    { name: "Reddit Presence Management", href: "#features" },
    { name: "Wikipedia Presence Support", href: "#features" },
    { name: "Industry Content Placement", href: "#features" },
    { name: "Digital PR", href: "#features" },
    { name: "Citation Intelligence Audits", href: "#features" },
  ],
  Partners: [
    { name: "For Digital Marketing Agencies", href: "#developers" },
    { name: "White-Label Delivery", href: "#developers" },
    { name: "Referral Partnerships", href: "#developers" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Contact", href: "#footer" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Acceptable Use", href: "#" },
  ],
};

export function FooterSection() {
  return (
    <footer id="footer" className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-2 mb-4">
                <span className="text-2xl font-display">Adkompas Digital</span>
              </a>

              <p className="text-sm font-mono text-muted-foreground mb-6">
                AI SEO Agency
              </p>

              <div className="mb-8 max-w-sm">
                <h3 className="text-sm font-medium mb-3">Office Address</h3>
                <address className="text-muted-foreground leading-relaxed not-italic">
                  G1-1-1, Kuchai Business Park
                  <br />
                  Jalan Kuchai Lama
                  <br />
                  Off Jalan 1/127
                  <br />
                  Kuchai Lama
                  <br />
                  58200 Kuala Lumpur
                </address>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-foreground text-background rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 Adkompas Digital. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              AI SEO Agency
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
