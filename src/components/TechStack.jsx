import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Search, Smartphone, Layers, Server, Database, Cloud, Radio, Check, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categories = [
  { id: 'all', label: 'All Technologies', icon: Sparkles },
  { id: 'mobile', label: 'Mobile & Native', icon: Smartphone },
  { id: 'architecture', label: 'Architecture', icon: Layers },
  { id: 'backend', label: 'Backend & APIs', icon: Server },
  { id: 'data', label: 'Data & Storage', icon: Database },
  { id: 'infrastructure', label: 'Infrastructure', icon: Cloud },
  { id: 'realtime', label: 'Real-Time & Telecom', icon: Radio },
];

const technologies = [
  // Mobile
  { name: 'Kotlin', category: 'mobile', level: 'Primary Language', years: '6+ Yrs', desc: 'Coroutines, Flow, functional constructs, DSLs, multiplatform foundation.', highlight: true },
  { name: 'Android SDK', category: 'mobile', level: 'Core Platform', years: '6+ Yrs', desc: 'Deep lifecycle, Services, Telecom Framework, NDK, IPC, and performance profiling.', highlight: true },
  { name: 'Jetpack Compose', category: 'mobile', level: 'Primary UI Toolkit', years: '4+ Yrs', desc: 'Modern declarative UI, custom layouts, animations, composition optimization.', highlight: true },
  { name: 'Java', category: 'mobile', level: 'Enterprise Heritage', years: '6+ Yrs', desc: 'Concurrency, legacy Android migration, JVM memory management.', highlight: false },
  { name: 'Swift / iOS', category: 'mobile', level: 'Cross-Platform Interop', years: '3+ Yrs', desc: 'SwiftUI, CallKit, PushKit, bridging native iOS audio/video call pipelines.', highlight: false },
  { name: 'Flutter', category: 'mobile', level: 'Multiplatform', years: '3+ Yrs', desc: 'Dart reactive widgets, platform channels, rapid multi-target prototyping.', highlight: false },
  { name: 'XML Layouts', category: 'mobile', level: 'Legacy Systems', years: '6+ Yrs', desc: 'ConstraintLayout, custom View hierarchy profiling, ViewBinding.', highlight: false },

  // Architecture
  { name: 'Clean Architecture', category: 'architecture', level: 'Standard Architecture', years: '6+ Yrs', desc: 'Strict separation of Presentation, Domain use cases, and Data repositories.', highlight: true },
  { name: 'MVI & MVVM', category: 'architecture', level: 'State Paradigms', years: '5+ Yrs', desc: 'Unidirectional Data Flow (UDF), immutable StateFlow, single-event channels.', highlight: true },
  { name: 'Modularization', category: 'architecture', level: 'Build Performance', years: '5+ Yrs', desc: 'Feature modularization, internal API contracts, parallel Gradle build graphs.', highlight: true },
  { name: 'Dependency Injection (Hilt)', category: 'architecture', level: 'IoC Container', years: '5+ Yrs', desc: 'Dagger/Hilt scoped components, test mock injection, viewmodel factories.', highlight: false },
  { name: 'SOLID & Design Patterns', category: 'architecture', level: 'Engineering Law', years: '6+ Yrs', desc: 'Strategy, Observer, Factory, Repository, Adapter, and Builder patterns.', highlight: false },

  // Backend
  { name: 'Ktor', category: 'backend', level: 'Primary Microservices', years: '4+ Yrs', desc: 'Asynchronous Kotlin coroutine-native HTTP and WebSocket microservices.', highlight: true },
  { name: 'Spring Boot', category: 'backend', level: 'Enterprise API', years: '3+ Yrs', desc: 'Robust RESTful endpoints, JPA/Hibernate, Spring Security authentication.', highlight: false },
  { name: 'REST & HTTP/2', category: 'backend', level: 'Network Protocol', years: '6+ Yrs', desc: 'Idempotent endpoints, HTTP/2 multiplexing, OkHttp interceptor pipelines.', highlight: false },
  { name: 'WebSocket & Socket.IO', category: 'backend', level: 'Bidirectional Stream', years: '5+ Yrs', desc: 'Real-time signaling, room management, user presence, typing telemetry.', highlight: true },
  { name: 'Node.js', category: 'backend', level: 'Tooling & Backend', years: '4+ Yrs', desc: 'Event-driven signaling services, scripts, and microservice integration.', highlight: false },

  // Data
  { name: 'Room Database', category: 'data', level: 'Android Persistence', years: '6+ Yrs', desc: 'Type-safe SQLite abstraction, Flow reactive queries, encrypted migrations.', highlight: true },
  { name: 'PostgreSQL', category: 'data', level: 'Relational DB', years: '5+ Yrs', desc: 'Complex relational schemas, ACID transactions, indexing, jsonb structures.', highlight: false },
  { name: 'Firebase & Firestore', category: 'data', level: 'Cloud Suite', years: '6+ Yrs', desc: 'FCM push notifications, remote config, analytics, Crashlytics telemetry.', highlight: false },
  { name: 'Supabase', category: 'data', level: 'BaaS', years: '3+ Yrs', desc: 'Row-level security, auth triggers, real-time Postgres subscriptions.', highlight: false },
  { name: 'Redis', category: 'data', level: 'In-Memory Cache', years: '3+ Yrs', desc: 'Session tokens, real-time rate limiting, pub/sub signaling channels.', highlight: false },

  // Infrastructure
  { name: 'Docker', category: 'infrastructure', level: 'Containerization', years: '4+ Yrs', desc: 'Multi-stage Dockerfiles for backend microservices and reproducible CI agents.', highlight: false },
  { name: 'GitHub Actions', category: 'infrastructure', level: 'CI/CD Automation', years: '5+ Yrs', desc: 'Automated test runners, Lint, Detekt, Play Store release track publishing.', highlight: true },
  { name: 'Nginx', category: 'infrastructure', level: 'Reverse Proxy', years: '4+ Yrs', desc: 'SSL termination, WebSocket load balancing, rate limiting, and caching.', highlight: false },
  { name: 'Cloud Services (GCP/AWS)', category: 'infrastructure', level: 'Cloud Compute', years: '4+ Yrs', desc: 'Container deployment, Object Storage, TURN servers, serverless functions.', highlight: false },

  // Real-Time
  { name: 'WebRTC', category: 'realtime', level: 'Flagship Specialization', years: '5+ Yrs', desc: 'Low-latency P2P and SFU video/audio calling, ICE renegotiation, VP8/H.264 codecs.', highlight: true },
  { name: 'Android Telecom API', category: 'realtime', level: 'System Telephony', years: '4+ Yrs', desc: 'Native ConnectionService lockscreen calling, audio focus, system dialer parity.', highlight: true },
  { name: 'STUN / TURN (coturn)', category: 'realtime', level: 'NAT Traversal', years: '4+ Yrs', desc: 'Relayed media packet traversal across restrictive carrier firewalls and NATs.', highlight: false },
  { name: 'FCM & PushKit', category: 'realtime', level: 'Push Notification', years: '6+ Yrs', desc: 'High-priority VoIP wakeups, silent data payloads, background call launches.', highlight: false },
  { name: 'CallKit (iOS)', category: 'realtime', level: 'iOS Telephony', years: '3+ Yrs', desc: 'System incoming call UI integration and VoIP background push execution on iOS.', highlight: false },
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);

  const filteredTech = technologies.filter((tech) => {
    const matchesCategory = activeCategory === 'all' || tech.category === activeCategory;
    const matchesSearch =
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.level.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)', normal: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
      if (ctx.conditions.reduceMotion) return;

      gsap.from('.tech-heading', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      });
    }, containerRef);
  }, { scope: containerRef });

  return (
    <section id="skills" ref={containerRef} className="section-padding bg-surface-secondary/20 relative">
      <div className="section-container">
        {/* Header */}
        <div className="tech-heading mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Engineering Capabilities</p>
            <h2 className="section-heading mb-4">
              My Technical <span className="text-brand">Stack & Systems</span>
            </h2>
            <p className="section-subtitle">
              Comprehensive toolset across native mobile engineering, distributed architectures, real-time protocols, and DevOps automation.
            </p>
          </div>

          {/* Live Search Bar */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search tech e.g. WebRTC, Compose..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-card border border-border rounded-xl text-xs font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-button text-xs font-mono transition-all duration-300 ${
                  isActive
                    ? 'bg-brand text-surface-primary font-semibold shadow-glow'
                    : 'bg-surface-elevated text-text-secondary hover:text-brand hover:border-brand border border-border'
                }`}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter Results Count */}
        <div className="flex items-center justify-between text-xs font-mono text-text-muted mb-6">
          <span>Displaying {filteredTech.length} technologies</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-brand hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Technologies Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTech.map((tech) => (
            <div
              key={tech.name}
              className={`card-base p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 ${
                tech.highlight
                  ? 'border-brand/40 bg-surface-card hover:border-brand hover:shadow-glow'
                  : 'border-border bg-surface-card hover:border-brand/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-surface-elevated text-brand border border-brand/20">
                    {tech.level}
                  </span>
                  <span className="font-mono text-xs text-text-muted">
                    {tech.years}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-text-primary group-hover:text-brand transition-colors flex items-center gap-2 mb-2">
                  {tech.name}
                  {tech.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-green" />
                  )}
                </h3>

                <p className="font-body text-xs text-text-secondary leading-relaxed">
                  {tech.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span className="uppercase tracking-wider">{tech.category}</span>
                <span className="text-brand flex items-center gap-1">
                  <Check size={12} /> Production
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
