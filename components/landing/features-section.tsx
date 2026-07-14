"use client";

import { useRef } from "react";
import {
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
} from "motion/react";

type GraphicProps = {
  active: boolean;
};

type Service = {
  number: string;
  title: string;
  description: string;
  Graphic: React.ComponentType<GraphicProps>;
};

const services: Service[] = [
  {
    number: "01",
    title: "Reddit Community Seeding",
    description:
      "Build a credible presence inside the conversations shaping your category. We research relevant communities, identify genuine opportunities, and develop useful participation without bots, spam, or manufactured engagement.",
    Graphic: RedditGraphic,
  },
  {
    number: "02",
    title: "Wikipedia Presence Support",
    description:
      "Understand your brand’s eligibility, improve its supporting source landscape, and manage factual corrections or contribution requests through transparent, policy-conscious processes.",
    Graphic: WikipediaGraphic,
  },
  {
    number: "03",
    title: "Digital PR & Third-Party Publishing",
    description:
      "Turn your expertise, data, and company stories into credible coverage across industry publications, newsletters, podcasts, communities, and earned media.",
    Graphic: PublishingGraphic,
  },
  {
    number: "04",
    title: "Human-Led Brand Protection",
    description:
      "Every campaign is researched, reviewed, and continuously optimised by specialists. No automation-first shortcuts, fake engagement, mass posting, or tactics that put your reputation at risk.",
    Graphic: ProtectionGraphic,
  },
];

export function FeaturesSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="features"
        className="bg-[#faf9f7] px-6 py-24 text-black md:px-12 lg:px-16"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-24 max-w-5xl">
            <div className="mb-10 flex items-center gap-4 font-mono text-sm uppercase tracking-wider text-neutral-600">
              <span className="h-px w-12 bg-neutral-400" />
              Capabilities
            </div>

            <h2 className="text-[clamp(3rem,6vw,6.5rem)] font-normal leading-[0.95] tracking-[-0.055em]">
              Presence where AI looks.
              <br />
              <span className="text-neutral-500">
                Proof where people trust.
              </span>
            </h2>

            <p className="mt-10 max-w-3xl text-xl leading-relaxed text-neutral-600">
              Human-led citation seeding across Reddit, Wikipedia, trusted
              publications, and earned media—built to extend your AEO and GEO
              strategy beyond your own website.
            </p>
          </div>

          <div className="border-t border-neutral-300">
            {services.map((service) => (
              <ServiceRow key={service.number} {...service} />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

function ServiceRow({ number, title, description, Graphic }: Service) {
  const rowRef = useRef<HTMLElement>(null);
  const isInView = useInView(rowRef, {
    amount: 0.45,
    margin: "0px 0px -10% 0px",
  });
  const reduceMotion = useReducedMotion();

  const active = isInView && !reduceMotion;

  return (
    <motion.article
      ref={rowRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid min-h-[380px] border-b border-neutral-300 py-16 md:grid-cols-[80px_minmax(0,1fr)_260px] md:items-center md:gap-10"
    >
      <div className="mb-6 font-mono text-sm text-neutral-600 md:mb-0 md:self-start">
        {number}
      </div>

      <div className="max-w-2xl">
        <h3 className="text-4xl font-normal tracking-[-0.04em] md:text-5xl">
          {title}
        </h3>

        <p className="mt-7 text-lg leading-8 text-neutral-600 md:text-xl">
          {description}
        </p>
      </div>

      <div
        className="mt-12 flex min-h-48 items-center justify-center md:mt-0"
        aria-hidden="true"
      >
        <Graphic active={active} />
      </div>
    </motion.article>
  );
}

/* 01 — Conversation lines */

function RedditGraphic({ active }: GraphicProps) {
  const widths = [58, 88, 112, 136, 156];

  return (
    <svg viewBox="0 0 220 180" className="h-44 w-52">
      <rect
        x="25"
        y="22"
        width="170"
        height="135"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      {widths.map((width, index) => (
        <motion.rect
          key={width}
          x="45"
          y={45 + index * 20}
          height="8"
          rx="3"
          fill="currentColor"
          animate={
            active
              ? {
                  width: [
                    Math.max(30, width * 0.45),
                    width,
                    Math.max(40, width * 0.72),
                  ],
                  opacity: [0.35, 1, 0.6],
                }
              : { width, opacity: 0.55 }
          }
          transition={{
            duration: 2.5,
            delay: index * 0.14,
            repeat: active ? Infinity : 0,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.circle
        cx="110"
        cy="169"
        r="4"
        fill="currentColor"
        animate={active ? { scale: [1, 1.6, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: active ? Infinity : 0 }}
      />
    </svg>
  );
}

/* 02 — Sources orbiting a central entity */

function WikipediaGraphic({ active }: GraphicProps) {
  const nodes = [
    [110, 25],
    [160, 48],
    [175, 90],
    [145, 138],
    [75, 138],
    [45, 90],
    [60, 48],
  ];

  return (
    <svg viewBox="0 0 220 180" className="h-44 w-52 overflow-visible">
      <circle
        cx="110"
        cy="90"
        r="52"
        fill="none"
        stroke="#b7b7b7"
        strokeWidth="1.5"
      />

      <motion.g
        style={{ transformOrigin: "110px 90px" }}
        animate={active ? { rotate: 360 } : { rotate: 0 }}
        transition={{
          duration: 18,
          repeat: active ? Infinity : 0,
          ease: "linear",
        }}
      >
        {nodes.map(([x, y], index) => (
          <g key={index}>
            <line
              x1="110"
              y1="90"
              x2={x}
              y2={y}
              stroke="#b7b7b7"
              strokeWidth="1"
            />
            <circle
              cx={x}
              cy={y}
              r="9"
              fill="#faf9f7"
              stroke="currentColor"
              strokeWidth="2"
            />
          </g>
        ))}
      </motion.g>

      <motion.circle
        cx="110"
        cy="90"
        r="20"
        fill="currentColor"
        animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
        transition={{
          duration: 2.4,
          repeat: active ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* 03 — Brand signal moving to a publisher */

function PublishingGraphic({ active }: GraphicProps) {
  return (
    <svg viewBox="0 0 240 180" className="h-44 w-56">
      <circle
        cx="60"
        cy="42"
        r="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="34"
        y="62"
        width="52"
        height="66"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        cx="180"
        cy="42"
        r="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="154"
        y="62"
        width="52"
        height="66"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <text
        x="60"
        y="101"
        textAnchor="middle"
        fontSize="18"
        fill="currentColor"
      >
        B
      </text>

      <text
        x="180"
        y="101"
        textAnchor="middle"
        fontSize="18"
        fill="currentColor"
      >
        P
      </text>

      <line
        x1="87"
        y1="94"
        x2="153"
        y2="94"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="5 7"
      />

      <motion.circle
        cy="94"
        r="5"
        fill="currentColor"
        animate={
          active
            ? { cx: [92, 148, 92], opacity: [0.35, 1, 0.35] }
            : { cx: 120, opacity: 0.5 }
        }
        transition={{
          duration: 2.8,
          repeat: active ? Infinity : 0,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* 04 — Protective scan */

function ProtectionGraphic({ active }: GraphicProps) {
  return (
    <svg viewBox="0 0 220 190" className="h-48 w-52 overflow-visible">
      <motion.circle
        cx="110"
        cy="90"
        r="55"
        fill="none"
        stroke="#a3a3a3"
        strokeWidth="1.5"
        animate={
          active
            ? {
                scale: [0.7, 1.18],
                opacity: [0.65, 0],
              }
            : { scale: 0.8, opacity: 0 }
        }
        transition={{
          duration: 2.4,
          repeat: active ? Infinity : 0,
          ease: "easeOut",
        }}
        style={{ transformOrigin: "110px 90px" }}
      />

      <path
        d="M110 20 165 42v43c0 40-21 66-55 83-34-17-55-43-55-83V42l55-22Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />

      <path
        d="M80 55 110 42l30 13v31c0 24-11 42-30 54-19-12-30-30-30-54V55Z"
        fill="#dedede"
      />

      <rect x="91" y="85" width="38" height="32" rx="4" fill="currentColor" />

      <path
        d="M98 85V73c0-8 5-14 12-14s12 6 12 14v12"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <circle cx="110" cy="100" r="4" fill="#faf9f7" />
      <rect x="108" y="103" width="4" height="7" fill="#faf9f7" />
    </svg>
  );
}
