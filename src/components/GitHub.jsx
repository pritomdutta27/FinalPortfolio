import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Star, GitFork, Terminal } from 'lucide-react';
import { GithubIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const repos = [
  {
    name: 'android-clean-architecture-compose',
    desc: 'Modular Android architecture starter featuring Jetpack Compose, Kotlin Coroutines Flow, Hilt DI, and Room Database.',
    language: 'Kotlin',
    stars: 128,
    forks: 34,
    link: 'https://github.com/pritomdutta27',
  },
  {
    name: 'webrtc-android-telecom-sample',
    desc: 'Production-ready WebRTC audio/video call integration with Android Telecom ConnectionService & CallKit behavior.',
    language: 'Kotlin',
    stars: 94,
    forks: 21,
    link: 'https://github.com/pritomdutta27',
  },
  {
    name: 'ktor-realtime-signaling-server',
    desc: 'Lightweight, high-concurrency WebSocket signaling service for WebRTC multi-peer negotiation written in pure Ktor.',
    language: 'Kotlin',
    stars: 76,
    forks: 18,
    link: 'https://github.com/pritomdutta27',
  },
];

// Simulated Git Contribution heatmap blocks (52 weeks x 7 days)
const heatmapWeeks = 36;
const days = 7;

function getContributionIntensity(w, d) {
  const seed = (w * 7 + d * 13) % 17;
  if (seed > 13) return 'bg-brand';
  if (seed > 8) return 'bg-brand/60';
  if (seed > 4) return 'bg-brand/30';
  if (seed > 1) return 'bg-brand/15';
  return 'bg-surface-elevated';
}

export default function GitHub() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)', normal: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
      if (ctx.conditions.reduceMotion) return;

      gsap.from('.github-reveal', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        y: 40, opacity: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, containerRef);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section-padding relative">
      <div className="section-container">
        <div className="github-reveal mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Open Source</p>
            <h2 className="section-heading">
              Building in <span className="text-brand">Public</span>
            </h2>
            <p className="section-subtitle mt-3">
              Explore my open-source Kotlin experiments, architecture blueprints, and real-time communication modules.
            </p>
          </div>

          <a
            href="https://github.com/pritomdutta27"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-fit"
          >
            <GithubIcon size={16} />
            Follow @pritomdutta27
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Heatmap Card */}
        <div className="github-reveal card-base p-6 md:p-8 mb-8 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-text-secondary">
              <Terminal size={14} className="text-brand" />
              <span>pritomdutta27 / contributions</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-sm bg-surface-elevated" />
              <span className="w-2.5 h-2.5 rounded-sm bg-brand/30" />
              <span className="w-2.5 h-2.5 rounded-sm bg-brand/60" />
              <span className="w-2.5 h-2.5 rounded-sm bg-brand" />
              <span>More</span>
            </div>
          </div>

          {/* Grid of squares */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1.5 min-w-[700px]">
              {Array.from({ length: heatmapWeeks }).map((_, w) => (
                <div key={w} className="flex flex-col gap-1.5">
                  {Array.from({ length: days }).map((_, d) => (
                    <div
                      key={d}
                      className={`w-3.5 h-3.5 rounded-sm transition-colors duration-200 hover:ring-1 hover:ring-brand ${getContributionIntensity(
                        w,
                        d
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-mono text-text-muted">
            <span>2,400+ commits across Kotlin, Java, and Distributed systems</span>
            <span className="text-brand">Active Contributor</span>
          </div>
        </div>

        {/* Pinned Repositories */}
        <div className="github-reveal grid md:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-base p-6 flex flex-col justify-between hover:border-brand hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-mono font-semibold text-sm text-text-primary group-hover:text-brand transition-colors line-clamp-1">
                    {repo.name}
                  </h3>
                  <ArrowUpRight size={16} className="text-text-muted group-hover:text-brand flex-shrink-0" />
                </div>
                <p className="font-body text-xs text-text-secondary leading-relaxed">
                  {repo.desc}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-border-subtle mt-4 text-xs font-mono text-text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand" />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={12} /> {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={12} /> {repo.forks}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
