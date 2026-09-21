import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const experiences = [
  {
    period: '2023 — Present',
    role: 'Senior Android Engineer & System Architect',
    company: 'Enterprise Mobile Solutions',
    type: 'Full-time · High Scale Systems',
    description: 'Spearheading core Android architecture, WebRTC video/audio calling engines, and fintech transaction workflows for millions of active requests.',
    highlights: [
      'Architected offline-first POS mobile experience with biometric security & sub-200ms transaction confirmation.',
      'Reduced memory footprint by 32% and achieved steady 120 FPS UI across Compose rendering pipelines.',
      'Designed a multi-module architecture with 15+ feature modules, cutting clean build times by 45%.',
    ],
    tech: ['Kotlin', 'Jetpack Compose', 'WebRTC', 'Telecom API', 'Coroutines', 'Ktor', 'Hilt'],
  },
  {
    period: '2021 — 2023',
    role: 'Senior Mobile Engineer (Android / Full-Stack)',
    company: 'Fintech & Communications Tech',
    type: 'Full-time · Product Scale',
    description: 'Engineered real-time chat & VoIP teleconsultation platform connecting certified practitioners and users securely.',
    highlights: [
      'Built resilient STUN/TURN ICE candidate renegotiation handling 4G to Wi-Fi network handoffs with zero call drops.',
      'Implemented custom Android Telecom ConnectionService for native lockscreen incoming call integration.',
      'Led backend microservices in Ktor and Spring for real-time WebSocket signaling and user presence.',
    ],
    tech: ['Android', 'Java/Kotlin', 'WebSockets', 'Socket.IO', 'Spring Boot', 'PostgreSQL', 'Docker'],
  },
  {
    period: '2019 — 2021',
    role: 'Software Engineer (Android & Mobile)',
    company: 'Digital Innovation Labs',
    type: 'Full-time · Native Apps',
    description: 'Developed native Android apps with complex animations, custom view rendering, and secure RESTful cloud sync.',
    highlights: [
      'Migrated legacy Java codebase to Kotlin with clean MVVM architecture and Room database persistence.',
      'Integrated payment gateways (Stripe, bKash, SSLCommerz) with robust retry idempotent payloads.',
      'Established CI/CD deployment pipelines on GitHub Actions to automate linting, tests, and Play Store tracks.',
    ],
    tech: ['Kotlin', 'Android SDK', 'Room', 'Retrofit', 'Firebase', 'GitHub Actions', 'REST APIs'],
  },
];

export default function Experience() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)', normal: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
      if (ctx.conditions.reduceMotion) return;

      gsap.from('.exp-heading', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      });

      gsap.from('.exp-item', {
        scrollTrigger: { trigger: '.exp-timeline', start: 'top 75%' },
        y: 40, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out',
      });
    }, containerRef);
  }, { scope: containerRef });

  return (
    <section id="experience" ref={containerRef} className="section-padding bg-surface-secondary/20 relative">
      <div className="section-container">
        <div className="exp-heading mb-16">
          <p className="eyebrow mb-4">Career Journey</p>
          <h2 className="section-heading mb-4">
            6+ Years of <span className="text-brand">Engineering Impact</span>
          </h2>
          <p className="section-subtitle">
            Track record of designing, building, and scaling mission-critical mobile and distributed products.
          </p>
        </div>

        <div className="exp-timeline relative border-l border-border-default ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
          {experiences.map((exp, idx) => (
            <div key={idx} className="exp-item relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-surface-primary border-2 border-brand group-hover:bg-brand transition-colors duration-300 shadow-glow" />

              <div className="card-base p-6 md:p-8 space-y-4 hover:border-brand/60 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-text-primary group-hover:text-brand transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-body text-brand/90 font-medium">
                      {exp.company} <span className="text-text-muted">· {exp.type}</span>
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted bg-surface-elevated px-3 py-1 rounded border border-border-subtle w-fit">
                    <Calendar size={13} className="text-brand" />
                    {exp.period}
                  </div>
                </div>

                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-2 pt-2">
                  {exp.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-sm font-body text-text-secondary">
                      <CheckCircle2 size={16} className="text-brand flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border-subtle">
                  {exp.tech.map((t) => (
                    <span key={t} className="tech-chip text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
