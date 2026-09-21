import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, ExternalLink, X, CheckCircle, Sparkles, Layers, Cpu, Shield, Activity } from 'lucide-react';
import { GithubIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categories = ['All', 'Real-Time & VoIP', 'Fintech', 'Architecture'];

const projectsData = [
  {
    id: 'spark-chat',
    category: 'REAL-TIME COMMUNICATION',
    filterCategory: 'Real-Time & VoIP',
    name: 'Spark Chat',
    headline: 'High-Concurrency Mobile Messaging & Low-Latency Video Calling',
    description: 'A production-grade chat and communication platform featuring real-time messaging, push notifications, peer-to-peer calling, scalable architecture, and a modern Android Compose UI.',
    tech: ['Kotlin', 'Jetpack Compose', 'WebRTC', 'Firebase', 'Socket.IO', 'Clean Architecture'],
    archTags: ['MVI Architecture', 'STUN/TURN Traversal', 'Offline SQLite Cache', 'Adaptive Bitrate'],
    image: '/images/spark-chat.jpg',
    featured: true,
    stats: [
      { label: 'Latency', value: '< 65ms' },
      { label: 'Video FPS', value: '60 FPS' },
      { label: 'Uptime', value: '99.98%' },
    ],
    github: 'https://github.com/pritomdutta27',
    demo: 'https://github.com/pritomdutta27',
    caseStudy: {
      problem: 'Mobile networks regularly transition between 4G and Wi-Fi, causing dropped WebRTC peer connections and socket disconnection storms in standard chat apps.',
      solution: 'Designed an idempotent ICE candidate renegotiation queue and client-side heartbeat monitor. Integrated Android Telecom ConnectionService to treat app calls with native OS audio priority.',
      architecture: [
        'Presentation: Jetpack Compose with unidirectional MVI state stream.',
        'Signaling: Ktor WebSocket server with exponential backoff reconnection.',
        'Media Engine: WebRTC hardware-accelerated VP8/H.264 video codec pipelines.',
        'Persistence: Room Database with encrypted room migration for offline access.',
      ],
      metrics: 'Delivered sub-65ms message delivery across mobile networks with zero socket reconnect memory leaks.',
    },
  },
  {
    id: 'medico',
    category: 'HEALTHCARE · REAL-TIME COMMUNICATION',
    filterCategory: 'Real-Time & VoIP',
    name: 'Medico Telehealth',
    headline: 'HIPAA-Compliant Doctor Consultation & Native Telephony Integration',
    description: 'A healthcare communication platform connecting licensed physicians and patients through encrypted real-time video calls, schedule management, and instant prescription telemetry.',
    tech: ['Kotlin', 'Jetpack Compose', 'WebRTC', 'Socket.IO', 'Telecom API', 'Firebase'],
    archTags: ['Android Telecom API', 'End-to-End Encryption', 'StateFlow ViewModels', 'Modular DI'],
    image: '/images/medico.jpg',
    featured: true,
    stats: [
      { label: 'Call Reliability', value: '99.9%' },
      { label: 'Compliance', value: 'HIPAA' },
      { label: 'Active Doctors', value: '1,500+' },
    ],
    github: 'https://github.com/pritomdutta27',
    demo: 'https://github.com/pritomdutta27',
    caseStudy: {
      problem: 'Physicians missed incoming calls when phones were locked or when other apps were in foreground, causing missed patient appointments.',
      solution: 'Implemented deep Android Telecom API and CallKit integration, enabling system-level full-screen incoming call notifications that wake locked screens safely.',
      architecture: [
        'Call Manager: Custom ConnectionService binding system telephony.',
        'End-to-End Security: AES-256 GCM encrypted media channels.',
        'Scheduling: Bidirectional calendar synchronization with Room & WorkManager.',
        'Real-time Queue: Priority queue routing incoming urgent patient alerts.',
      ],
      metrics: 'Reduced missed consultation rates by 78% within first quarter of production deployment.',
    },
  },
  {
    id: 'payment-pos',
    category: 'FINTECH · PAYMENT',
    filterCategory: 'Fintech',
    name: 'Payment & POS Systems',
    headline: 'Offline-First Smart POS & Encrypted Transaction Engine',
    description: 'Mobile point-of-sale and payment experiences involving payment gateways, ISO-8583 transaction workflows, EMV card readers, QR payments, and secure financial reconciliation.',
    tech: ['Android', 'Kotlin', 'Payment Gateway', 'REST APIs', 'Security', 'POS'],
    archTags: ['SQLCipher', 'Biometric Prompt', 'ISO-8583 Protocol', 'Tamper Detection'],
    image: '/images/payment-pos.jpg',
    featured: false,
    stats: [
      { label: 'Txn Latency', value: '< 200ms' },
      { label: 'Offline Sync', value: '100% Reliable' },
      { label: 'Encryption', value: 'Hardware KeyStore' },
    ],
    github: 'https://github.com/pritomdutta27',
    demo: 'https://github.com/pritomdutta27',
    caseStudy: {
      problem: 'Retail terminals suffer sudden connectivity dropouts in basements and markets, requiring fraud-proof offline transaction storage without double-spending.',
      solution: 'Created an offline-first transactional queue backed by SQLCipher encrypted database and Android Keystore hardware-backed cryptographic signing.',
      architecture: [
        'Hardware Abstraction: Unified SDK drivers for thermal printers & card chips.',
        'Security: Root and tamper detection preventing binary modification.',
        'Reconciliation: Idempotent batch syncing engine triggered upon network recovery.',
      ],
      metrics: 'Zero transaction loss across 500,000+ monthly retail checkout operations.',
    },
  },
  {
    id: 'architecture-lab',
    category: 'ENGINEERING · OPEN SOURCE',
    filterCategory: 'Architecture',
    name: 'Developer Architecture Lab',
    headline: 'Production-Grade Android Architectural Blueprints & Benchmarks',
    description: 'A collection of production-inspired implementations exploring Clean Architecture, multi-module dependency graphs, system design, networking concurrency, baseline profiles, and frame-rate optimization.',
    tech: ['Kotlin', 'Coroutines', 'Flow', 'Compose', 'Hilt', 'Room', 'Modularization'],
    archTags: ['15-Module Gradle', 'Baseline Profiles', 'Turbine Testing', 'Macrobenchmark'],
    image: '/images/architecture-lab.jpg',
    featured: false,
    stats: [
      { label: 'Frame Rate', value: '120 FPS' },
      { label: 'Build Time', value: '-45%' },
      { label: 'Modules', value: '15' },
    ],
    github: 'https://github.com/pritomdutta27',
    demo: 'https://github.com/pritomdutta27',
    caseStudy: {
      problem: 'Monolithic Android codebases lead to 15+ minute build times, fragile circular dependencies, and frame jank during navigation.',
      solution: 'Formulated a modular architecture template separating API modules from Implementation modules with strict Gradle dependency rules and Baseline Profile compilation.',
      architecture: [
        'Module Hierarchy: Feature modules depend on Domain API, not other Features.',
        'Performance: Macrobenchmark tests validating cold startup times.',
        'Testing: Turbine + MockK unit test templates with 90%+ code coverage.',
      ],
      metrics: 'Decreased clean build duration by 45% and eliminated 100% of main thread jank frames.',
    },
  },
];

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const containerRef = useRef(null);

  const filteredProjects = projectsData.filter(
    (p) => selectedFilter === 'All' || p.filterCategory === selectedFilter
  );

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)', normal: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
      if (ctx.conditions.reduceMotion) return;

      gsap.from('.projects-heading', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      });

      gsap.from('.project-filter-btn', {
        scrollTrigger: { trigger: '.project-filters', start: 'top 85%' },
        y: 20, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out',
      });
    }, containerRef);
  }, { scope: containerRef });

  return (
    <section id="projects" ref={containerRef} className="section-padding bg-surface-secondary/30 relative">
      <div className="section-container">
        {/* Section Heading */}
        <div className="projects-heading mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Featured Work</p>
            <h2 className="section-heading mb-4">
              Selected <span className="text-brand">Engineering Projects</span>
            </h2>
            <p className="section-subtitle">
              Production-grade mobile architectures, real-time communications, and fintech platforms built with Kotlin and modern paradigms.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-text-muted bg-surface-card px-4 py-2 rounded-lg border border-border">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse-green" />
            <span>4 Flagship Systems</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="project-filters flex flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`project-filter-btn px-4 py-2 rounded-button text-xs font-mono transition-all duration-300 ${
                selectedFilter === cat
                  ? 'bg-brand text-surface-primary font-semibold shadow-glow'
                  : 'bg-surface-elevated text-text-secondary hover:text-brand hover:border-brand border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asymmetric Project Layout */}
        <div className="space-y-10">
          {filteredProjects.map((project, index) => {
            const isFeatured = project.featured;

            return (
              <div
                key={project.id}
                className={`card-base overflow-hidden border border-border group transition-all duration-500 hover:border-brand/70 hover:shadow-glow-lg ${
                  isFeatured ? 'bg-surface-card' : 'bg-surface-secondary/60'
                }`}
              >
                <div className={`grid ${isFeatured ? 'lg:grid-cols-12' : 'lg:grid-cols-12'} gap-0 items-stretch`}>
                  {/* Visual Side */}
                  <div
                    className={`${
                      isFeatured
                        ? index % 2 === 0
                          ? 'lg:col-span-7 lg:order-1'
                          : 'lg:col-span-7 lg:order-2'
                        : 'lg:col-span-5'
                    } relative aspect-[16/10] md:aspect-[16/9] lg:aspect-auto overflow-hidden bg-surface-primary cursor-pointer`}
                    onClick={() => setActiveModalProject(project)}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent opacity-80" />

                    {/* Overlay badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="font-mono text-xs px-3 py-1 rounded bg-surface-primary/90 text-brand border border-brand/30 backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover hint */}
                    <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-button bg-brand text-surface-primary font-semibold shadow-glow">
                        Deep Dive Case Study <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div
                    className={`${
                      isFeatured
                        ? index % 2 === 0
                          ? 'lg:col-span-5 lg:order-2'
                          : 'lg:col-span-5 lg:order-1'
                        : 'lg:col-span-7'
                    } p-6 md:p-8 lg:p-10 flex flex-col justify-between space-y-6`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs tracking-widest text-text-muted">
                          SYSTEM 0{index + 1}
                        </span>
                        <div className="flex items-center gap-2">
                          {project.archTags.slice(0, 2).map((t) => (
                            <span key={t} className="hidden sm:inline-block font-mono text-[11px] text-text-muted px-2 py-0.5 rounded bg-surface-elevated border border-border-subtle">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3
                        onClick={() => setActiveModalProject(project)}
                        className="font-heading font-extrabold text-2xl md:text-3xl text-text-primary group-hover:text-brand transition-colors cursor-pointer flex items-center justify-between"
                      >
                        {project.name}
                        <ArrowUpRight size={22} className="text-text-muted group-hover:text-brand transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </h3>

                      <p className="font-heading text-sm text-brand/90 font-medium">
                        {project.headline}
                      </p>

                      <p className="font-body text-sm text-text-secondary leading-relaxed">
                        {project.description}
                      </p>

                      {/* Stat Metrics row */}
                      <div className="grid grid-cols-3 gap-3 py-3 border-y border-border-subtle">
                        {project.stats.map((s) => (
                          <div key={s.label}>
                            <p className="font-heading font-bold text-base md:text-lg text-brand">{s.value}</p>
                            <p className="font-mono text-[11px] text-text-muted">{s.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Architecture Badges */}
                      <div className="space-y-2">
                        <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider">Architecture Patterns</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.archTags.map((tag) => (
                            <span key={tag} className="font-mono text-xs px-2.5 py-1 rounded bg-surface-elevated text-text-secondary border border-border">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tech Chips */}
                      <div className="space-y-2 pt-1">
                        <p className="font-mono text-[11px] text-text-muted uppercase tracking-wider">Tech Stack</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((t) => (
                            <span key={t} className="tech-chip text-xs">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border-subtle">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-surface-primary font-heading font-semibold text-xs rounded-button hover:bg-brand-hover transition-colors"
                      >
                        <ExternalLink size={14} /> Case Study
                      </button>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-brand transition-colors"
                      >
                        <GithubIcon size={14} /> Architecture Code ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Deep-Dive Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-surface-primary/80 backdrop-blur-md">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto card-base p-6 md:p-8 bg-surface-card border-brand shadow-glow-lg animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 text-text-muted hover:text-text-primary rounded-lg bg-surface-elevated border border-border transition-colors"
            >
              <X size={20} />
            </button>

            <div className="space-y-6">
              {/* Header */}
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-brand">
                  {activeModalProject.category}
                </span>
                <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-text-primary mt-1">
                  {activeModalProject.name} — Technical Case Study
                </h3>
                <p className="font-body text-sm text-brand/90 mt-1">
                  {activeModalProject.headline}
                </p>
              </div>

              {/* Problem Statement */}
              <div className="p-4 rounded-xl bg-surface-elevated border border-border-subtle space-y-2">
                <div className="flex items-center gap-2 text-text-primary font-heading font-semibold text-sm">
                  <Shield size={16} className="text-brand" />
                  Engineering Challenge
                </div>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  {activeModalProject.caseStudy.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="p-4 rounded-xl bg-surface-elevated border border-brand/30 space-y-2">
                <div className="flex items-center gap-2 text-text-primary font-heading font-semibold text-sm">
                  <Sparkles size={16} className="text-brand" />
                  Architectural Solution
                </div>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  {activeModalProject.caseStudy.solution}
                </p>
              </div>

              {/* Architecture Blueprint Breakdown */}
              <div className="space-y-3">
                <h4 className="font-heading font-bold text-sm text-text-primary flex items-center gap-2">
                  <Layers size={16} className="text-brand" />
                  Layered Architecture Breakdown
                </h4>
                <div className="space-y-2">
                  {activeModalProject.caseStudy.architecture.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm font-mono text-text-secondary bg-surface-terminal p-3 rounded-lg border border-border-subtle">
                      <span className="text-brand font-bold">0{idx + 1}.</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results & Metrics */}
              <div className="p-4 rounded-xl bg-surface-terminal border border-border space-y-2">
                <div className="flex items-center gap-2 text-text-primary font-heading font-semibold text-sm">
                  <Activity size={16} className="text-brand" />
                  Verified Production Metrics
                </div>
                <p className="font-body text-sm text-brand font-medium">
                  {activeModalProject.caseStudy.metrics}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                <a
                  href={activeModalProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs"
                >
                  <GithubIcon size={14} /> View Repository ↗
                </a>

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="btn-secondary text-xs"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
