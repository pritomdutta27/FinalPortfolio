import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const metrics = [
  {
    num: '6+',
    label: 'Years of Experience',
    detail: 'Specialized in native Android, Kotlin & high-performance mobile systems.',
  },
  {
    num: '20+',
    label: 'Production Apps Shipped',
    detail: 'Healthcare, Fintech, Real-time VoIP, Messaging & Enterprise systems.',
  },
  {
    num: '99.9%',
    label: 'Real-Time Reliability',
    detail: 'Zero-drop WebRTC renegotiations across 4G/Wi-Fi transitions.',
  },
  {
    num: '<200ms',
    label: 'Payment Latency',
    detail: 'Optimized cryptographic transaction pipeline with offline sync.',
  },
];

export default function Metrics() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)', normal: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
      if (ctx.conditions.reduceMotion) return;

      gsap.from('.metric-card', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, containerRef);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 border-y border-border-subtle bg-surface-secondary/40 relative">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="metric-card card-base p-6 md:p-8 flex flex-col justify-between group hover:border-brand/60"
            >
              <div>
                <p className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-brand tracking-tight mb-2">
                  {m.num}
                </p>
                <h4 className="font-heading font-bold text-base md:text-lg text-text-primary mb-2">
                  {m.label}
                </h4>
              </div>
              <p className="font-body text-xs md:text-sm text-text-muted leading-relaxed">
                {m.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
