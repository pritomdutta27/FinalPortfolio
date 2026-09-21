import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Terminal as TerminalIcon, Sparkles, Code2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import TechStrip from './TechStrip';

gsap.registerPlugin(useGSAP);

const skills = [
  { name: 'Kotlin', level: 95 },
  { name: 'Android / Compose', level: 94 },
  { name: 'Clean Architecture', level: 92 },
  { name: 'WebRTC / Telecom', level: 88 },
];

const floatingBadges = [
  { label: 'Kotlin', pos: 'top-4 -left-4', delay: '0s' },
  { label: 'Jetpack Compose', pos: 'top-10 -right-6', delay: '1s' },
  { label: 'WebRTC VoIP', pos: 'bottom-28 -left-6', delay: '2s' },
  { label: 'Clean Architecture', pos: 'bottom-8 -right-4', delay: '1.5s' },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState('photo'); // 'photo' or 'terminal'
  const containerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { reduceMotion } = context.conditions;
        const dur = reduceMotion ? 0 : 0.8;
        const stag = reduceMotion ? 0 : 0.1;

        const tl = gsap.timeline({ defaults: { duration: dur, ease: 'power3.out' } });

        tl.from('.hero-eyebrow', { y: 30, opacity: 0 })
          .from('.hero-heading', { y: 40, opacity: 0 }, '-=0.5')
          .from('.hero-subtext', { y: 30, opacity: 0 }, '-=0.5')
          .from('.hero-description', { y: 25, opacity: 0 }, '-=0.4')
          .from('.hero-cta', { y: 20, opacity: 0, stagger: stag }, '-=0.3')
          .from('.hero-visual-card', { y: 40, opacity: 0, scale: 0.95 }, '-=0.5')
          .from('.floating-badge', {
            y: 20,
            opacity: 0,
            scale: 0.8,
            stagger: { each: 0.08, from: 'random' },
          }, '-=0.3');
      },
      containerRef
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen flex flex-col justify-center pt-24 md:pt-28 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-brand/4 rounded-full blur-[130px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column — Editorial Intro */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-5">
              <div className="hero-eyebrow flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse-green" />
                <span className="eyebrow">Hello, I'm Pritom Dutta</span>
              </div>

              <h1 className="hero-heading font-heading font-extrabold text-display text-text-primary text-balance">
                I build scalable mobile experiences{' '}
                <span className="text-brand">&</span> software systems.
              </h1>

              <p className="hero-subtext font-body text-hero-sub text-text-secondary max-w-xl leading-relaxed">
                Senior Android Engineer specializing in <span className="text-text-primary font-medium">Kotlin</span>, modern <span className="text-text-primary font-medium">Android architecture</span>, <span className="text-text-primary font-medium">real-time WebRTC communication</span>, payment integrations, and distributed backend systems.
              </p>

              <p className="hero-description font-body text-sm md:text-base text-text-muted max-w-lg leading-relaxed">
                I design and engineer production-grade applications with a relentless focus on clean architecture, 120 FPS performance, developer experience, and maintainability.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="hero-cta btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Selected Work
                <ArrowRight size={16} />
              </a>

              <a
                href="#contact"
                className="hero-cta btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Let's Talk
              </a>

              <a
                href="https://github.com/pritomdutta27"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta inline-flex items-center gap-2 text-text-secondary hover:text-brand transition-colors font-mono text-xs px-3 py-2 rounded-lg bg-surface-card border border-border"
              >
                <GithubIcon size={14} />
                GitHub ↗
              </a>
            </div>

            {/* Quick trust metrics row */}
            <div className="hero-cta pt-4 flex flex-wrap items-center gap-6 border-t border-border-subtle/80 text-xs font-mono text-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="text-brand font-bold">6+</span> Years Experience
              </span>
              <span className="text-border">|</span>
              <span className="flex items-center gap-1.5">
                <span className="text-brand font-bold">20+</span> Shipped Apps
              </span>
              <span className="text-border">|</span>
              <span className="flex items-center gap-1.5">
                <span className="text-brand font-bold">99.9%</span> Real-Time Reliability
              </span>
            </div>
          </div>

          {/* Right Column — Pritom's Portrait & Interactive Developer Hub */}
          <div className="lg:col-span-5 relative hero-visual-card">
            {/* Floating Tech Badges */}
            {floatingBadges.map((b) => (
              <div
                key={b.label}
                className={`floating-badge absolute hidden sm:block ${b.pos} z-20 px-3 py-1.5 bg-surface-elevated/95 backdrop-blur-md border border-brand/30 rounded-badge font-mono text-xs text-text-primary shadow-glow pointer-events-none animate-float`}
                style={{ animationDelay: b.delay }}
              >
                <span className="text-brand mr-1.5">#</span>
                {b.label}
              </div>
            ))}

            {/* Main Visual Container */}
            <div className="relative card-base overflow-hidden border border-brand/40 shadow-glow-lg bg-surface-card">
              {/* Top View Mode Switcher */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-surface-elevated/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="ml-2 font-mono text-xs text-text-muted">pritom@architect ~ hero</span>
                </div>

                {/* Tab switch between portrait and live terminal */}
                <div className="flex items-center gap-1 bg-surface-primary p-0.5 rounded-lg border border-border">
                  <button
                    onClick={() => setActiveTab('photo')}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      activeTab === 'photo'
                        ? 'bg-brand text-surface-primary font-bold'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    Portrait
                  </button>
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                      activeTab === 'terminal'
                        ? 'bg-brand text-surface-primary font-bold'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    Terminal
                  </button>
                </div>
              </div>

              {/* View 1: Studio Portrait with Developer Overlays */}
              {activeTab === 'photo' && (
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden group bg-surface-primary">
                  <img
                    src="/images/pritom-portrait.jpg"
                    alt="Pritom Dutta — Senior Android Engineer"
                    className="w-full h-full object-cover object-center filter grayscale contrast-110 transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-primary via-surface-primary/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-surface-primary/30 via-transparent to-surface-primary/30" />

                  {/* Availability Badge Overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-primary/80 backdrop-blur-md border border-brand/40 text-xs font-mono text-brand">
                      <span className="w-2 h-2 rounded-full bg-brand animate-pulse-green" />
                      Available for Roles & Consulting
                    </span>
                  </div>

                  {/* Bottom Portrait Card Info */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-xl bg-surface-card/90 backdrop-blur-md border border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading font-bold text-lg text-text-primary">
                          Pritom Dutta
                        </h3>
                        <p className="font-body text-xs text-brand font-medium">
                          Senior Android & Mobile Systems Architect
                        </p>
                      </div>
                      <span className="font-mono text-xs text-text-muted bg-surface-primary px-2.5 py-1 rounded border border-border">
                        Dhaka, BD
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border-subtle text-[11px] font-mono text-text-muted">
                      <span>Native Kotlin & Compose</span>
                      <span className="text-brand">6+ Years</span>
                    </div>
                  </div>
                </div>
              )}

              {/* View 2: Live Interactive Terminal */}
              {activeTab === 'terminal' && (
                <div className="p-6 font-mono text-sm space-y-4 bg-surface-terminal aspect-[4/5] sm:aspect-[3/4] flex flex-col justify-between overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <span className="text-text-muted">$</span>{' '}
                      <span className="text-text-primary">whoami --verbose</span>
                    </div>

                    <div className="space-y-1 pl-2 border-l-2 border-brand/40">
                      <p className="text-brand font-bold">pritom@developer</p>
                      <p className="text-text-primary font-semibold">Senior Android Engineer · Mobile Architect</p>
                      <p className="text-text-secondary text-xs">Specialized in Kotlin, WebRTC, Compose, and Clean Architecture</p>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <p className="text-xs text-text-muted uppercase tracking-wider">Core Competencies:</p>
                      {skills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between text-xs text-text-secondary">
                            <span>{skill.name}</span>
                            <span className="text-brand font-mono">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-surface-elevated rounded-sm overflow-hidden">
                            <div
                              className="h-full bg-brand rounded-sm"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs">
                    <div>
                      <span className="text-text-muted">status: </span>
                      <span className="text-brand font-semibold">ready_to_deploy</span>
                      <span className="animate-blink text-brand ml-0.5">▎</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('photo')}
                      className="text-xs text-text-secondary hover:text-brand underline"
                    >
                      View Photo →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Tech Strip */}
      <div className="mt-16 md:mt-24">
        <TechStrip />
      </div>
    </section>
  );
}
