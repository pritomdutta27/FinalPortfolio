import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, Calendar, Code2, Globe, CheckCircle2, Award, Terminal } from 'lucide-react';
import { GithubIcon, LinkedInIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const metaItems = [
  { icon: Calendar, label: '6+ Years', sub: 'Software Engineering' },
  { icon: Code2, label: 'Android', sub: 'Native & Compose Platform' },
  { icon: Globe, label: 'Kotlin', sub: 'Primary Systems Language' },
  { icon: MapPin, label: 'Dhaka, BD', sub: 'Available Worldwide (Remote)' },
];

const highlights = [
  'Architected enterprise-scale Android applications serving millions of transaction requests with sub-200ms confirmation.',
  'Pioneered carrier-grade WebRTC audio/video calling with deep Android Telecom ConnectionService integration.',
  'Modularized monolithic codebases into 15+ feature modules, reducing clean Gradle build durations by 45%.',
  'Led cross-functional mobile teams, enforcing strict Konsist architectural guardrails and 90%+ test coverage.',
];

export default function About() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { reduceMotion: '(prefers-reduced-motion: reduce)', normal: '(prefers-reduced-motion: no-preference)' },
      (ctx) => {
        const { reduceMotion } = ctx.conditions;
        if (reduceMotion) return;

        gsap.from('.about-heading', {
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        });

        gsap.from('.about-left', {
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
          x: -30, opacity: 0, duration: 0.8, ease: 'power3.out',
        });

        gsap.from('.about-right', {
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
          x: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
        });

        gsap.from('.about-meta', {
          scrollTrigger: { trigger: '.about-meta-grid', start: 'top 85%' },
          y: 20, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out',
        });
      },
      containerRef
    );
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="section-padding bg-surface-secondary/30 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="about-heading mb-16">
          <p className="eyebrow mb-4">About Pritom</p>
          <h2 className="section-heading mb-4">
            Engineering with architecture <span className="text-brand">in mind.</span>
          </h2>
          <p className="section-subtitle">
            Senior Android & Mobile Systems Architect with 6+ years of production experience building mission-critical software.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column — Portrait Card & Personal Snapshot */}
          <div className="lg:col-span-5 about-left space-y-6">
            <div className="card-base p-6 bg-surface-card border-brand/30 shadow-glow overflow-hidden relative group">
              <div className="flex flex-col sm:flex-row lg:flex-col gap-6 items-center">
                {/* Photo */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-2xl overflow-hidden border-2 border-brand/50 shadow-glow flex-shrink-0 relative bg-surface-primary">
                  <img
                    src="/images/pritom-portrait.jpg"
                    alt="Pritom Dutta"
                    className="w-full h-full object-cover object-center filter grayscale contrast-110 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-card/60 via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="space-y-3 text-center sm:text-left lg:text-center w-full">
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl text-text-primary">
                      Pritom Dutta
                    </h3>
                    <p className="font-body text-xs text-brand font-semibold tracking-wide">
                      Senior Android Engineer · Mobile Architect
                    </p>
                  </div>

                  <p className="font-body text-xs text-text-secondary leading-relaxed">
                    Based in Dhaka, Bangladesh. Designing and shipping resilient mobile products with Kotlin, Jetpack Compose, WebRTC, and Ktor.
                  </p>

                  <div className="pt-3 border-t border-border-subtle flex items-center justify-center sm:justify-start lg:justify-center gap-3">
                    <a
                      href="https://github.com/pritomdutta27"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-surface-elevated text-text-secondary hover:text-brand border border-border transition-colors"
                      aria-label="GitHub Profile"
                    >
                      <GithubIcon size={16} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/pritomdutta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-surface-elevated text-text-secondary hover:text-brand border border-border transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <LinkedInIcon size={16} />
                    </a>
                    <a
                      href="#contact"
                      className="text-xs font-mono px-3 py-2 rounded-lg bg-brand text-surface-primary font-bold hover:bg-brand-hover transition-colors"
                    >
                      Hire / Let's Talk
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick engineering badge */}
            <div className="card-base p-5 bg-surface-terminal border-border space-y-2 font-mono text-xs text-text-secondary">
              <div className="flex items-center gap-2 text-brand">
                <Terminal size={14} />
                <span className="font-bold">ENGINEERING_DNA</span>
              </div>
              <p className="text-[11px] leading-relaxed text-text-muted">
                Zero tolerance for thread-blocking operations. Clean Architecture, Unidirectional Data Flow, and deterministic automated testing.
              </p>
            </div>
          </div>

          {/* Right Column — Narrative & Track Record */}
          <div className="lg:col-span-7 about-right space-y-8">
            <div className="space-y-5">
              <p className="font-heading text-2xl md:text-3xl font-extrabold text-text-primary leading-snug">
                I don't just build screens.{' '}
                <span className="text-brand">I engineer scalable systems</span> that evolve gracefully with product demand.
              </p>

              <p className="font-body text-base text-text-secondary leading-relaxed">
                Over the past 6+ years, I have specialized in native Android software engineering, real-time communications, and distributed backend services. My background encompasses building complex mobile applications from greenfield architecture through high-concurrency production deployments.
              </p>

              <p className="font-body text-base text-text-muted leading-relaxed">
                Whether implementing low-latency WebRTC video signaling, handling system telephony via the Android Telecom API, or building tamper-proof offline POS transaction queues with SQLCipher, I ensure that every architectural boundary is clean, testable, and resilient against network failures.
              </p>
            </div>

            {/* Key Accomplishments Checklist */}
            <div className="space-y-3 pt-2">
              <h4 className="font-heading font-bold text-sm text-text-primary uppercase tracking-wider flex items-center gap-2">
                <Award size={16} className="text-brand" />
                Proven Engineering Highlights
              </h4>
              <div className="space-y-2.5">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs md:text-sm font-body text-text-secondary">
                    <CheckCircle2 size={16} className="text-brand flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="about-meta-grid grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {metaItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="about-meta card-base p-5 flex flex-col gap-3 group card-hover"
              >
                <Icon size={20} className="text-brand" />
                <div>
                  <p className="font-heading font-bold text-lg text-text-primary">{item.label}</p>
                  <p className="font-body text-xs text-text-muted">{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
