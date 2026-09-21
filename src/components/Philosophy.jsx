import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Layers, Zap, TrendingUp, Wrench, CheckCircle, Terminal, ArrowRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pillars = [
  {
    num: '01',
    id: 'architecture',
    title: 'Architecture',
    shortDesc: 'Clean Architecture, modularization, SOLID principles, and dependency inversion.',
    mantra: 'Software boundaries must outlive the third-party libraries inside them.',
    icon: Layers,
    rules: [
      {
        title: 'Zero Framework Leaks in Domain',
        detail: 'The core domain layer relies strictly on pure Kotlin. No Android SDK, no UI components, no database drivers. Pure, instant JVM testing.',
      },
      {
        title: 'Strict Unidirectional Data Flow',
        detail: 'UI state is an immutable single source of truth rendered via Jetpack Compose. User actions are explicit typed Intents.',
      },
      {
        title: 'Feature Modularization by Contract',
        detail: 'Feature modules expose only public API interfaces. Implementation details remain internal to avoid circular dependencies.',
      },
    ],
    metric: {
      value: '95%',
      label: 'JVM Unit Test Coverage on Domain Rules',
    },
    codeSnippet: `// Pure Domain Use Case — Zero Android Dependencies
class ExecuteTransactionUseCase @Inject constructor(
    private val paymentRepository: PaymentRepository,
    private val securityManager: SecurityManager
) {
    suspend operator fun invoke(request: TransactionRequest): Result<TransactionReceipt> {
        val verified = securityManager.verifyBiometricSignature(request.token)
        if (!verified) return Result.failure(SecurityException("Untrusted signature"))
        return paymentRepository.process(request)
    }
}`,
  },
  {
    num: '02',
    id: 'performance',
    title: 'Performance',
    shortDesc: 'Efficient UI rendering, asynchronous coroutines, memory optimization, and profiling.',
    mantra: 'A delayed frame is a broken experience. Maintain 120 FPS UI frame stability.',
    icon: Zap,
    rules: [
      {
        title: 'Zero Allocation in Draw Phases',
        detail: 'Prevent allocations inside Compose draw and layout passes. Leverage remember, derivedStateOf, and immutable stable keys.',
      },
      {
        title: 'Structured Asynchronous Concurrency',
        detail: 'Offload all disk I/O, crypto, and network workloads to Dispatchers.IO. Dispatchers.Main.immediate reserved solely for frame updates.',
      },
      {
        title: 'Baseline Profiles & AOT Optimization',
        detail: 'Generate macrobenchmark baseline profiles to pre-compile critical user journeys, reducing cold startup time by over 40%.',
      },
    ],
    metric: {
      value: '120 FPS',
      label: 'Main-Thread Frame Stability Target',
    },
    codeSnippet: `// Compose Recomposition Optimization with Derived State
@Composable
fun CallParticipantGrid(participants: List<Participant>, isCallActive: Boolean) {
    // Only recomputes when active list actually changes, zero recomposition jank
    val activeSpeakers by remember(participants) {
        derivedStateOf { participants.filter { it.isSpeaking } }
    }
    LazyVerticalGrid(columns = GridCells.Fixed(2)) {
        items(activeSpeakers, key = { it.id }) { speaker ->
            SpeakerVideoTile(speaker = speaker)
        }
    }
}`,
  },
  {
    num: '03',
    id: 'scalability',
    title: 'Scalability',
    shortDesc: 'Design systems that grow from a prototype into a high-scale platform without fundamental rewrites.',
    mantra: 'Engineer for horizontal expansion from day one, not as an afterthought.',
    icon: TrendingUp,
    rules: [
      {
        title: 'Decoupled Network & Transport Protocols',
        detail: 'WebRTC, WebSockets, and REST clients conform to uniform communication interfaces, enabling transport swap with zero UI churn.',
      },
      {
        title: 'Idempotent Sync Pipelines',
        detail: 'Every offline transaction and state event carries deterministic UUIDs and Lamport timestamps, preventing duplicate cloud commits.',
      },
      {
        title: 'Graceful Degradation Under Network Strain',
        detail: 'Adaptive WebRTC bitrates dynamically switch VP8 resolutions and frame-rates when packet loss exceeds threshold.',
      },
    ],
    metric: {
      value: '500K+',
      label: 'Monthly Concurrent Operations Supported',
    },
    codeSnippet: `// Resilient Protocol-Agnostic Messaging Service
interface RealtimeTransport {
    fun connect(): Flow<ConnectionState>
    suspend fun send(payload: TransportPayload): TransportResult
}

class ResilientTransportManager @Inject constructor(
    private val webRtcTransport: WebRtcTransport,
    private val fallbackSocket: SocketIoTransport
) : RealtimeTransport {
    // Graceful fallback from P2P WebRTC data channel to WebSocket relay
}`,
  },
  {
    num: '04',
    id: 'dx',
    title: 'Developer Experience',
    shortDesc: 'Reusable components, automated CI/CD, documentation, testing, and consistent engineering.',
    mantra: 'Fast builds and deterministic test suites empower teams to ship with unwavering confidence.',
    icon: Wrench,
    rules: [
      {
        title: 'Automated Multi-Stage CI/CD',
        detail: 'GitHub Actions running parallel ktlint checks, Detekt static analysis, Compose compiler metrics, and unit tests on every PR.',
      },
      {
        title: 'Comprehensive Design System Tokens',
        detail: 'Atomic Compose design system with unified typography, spacing, and theme attributes to eliminate styling guesswork.',
      },
      {
        title: 'Strict Architecture Guardrails',
        detail: 'Enforce dependency rules via Konsist tests to prevent developers from accidentally importing Data layer classes into Presentation.',
      },
    ],
    metric: {
      value: '-45%',
      label: 'Clean Build Duration via Modularization',
    },
    codeSnippet: `// Konsist Architecture Guardrail Test
class ArchitectureFitnessTest {
    @Test
    fun \`domain layer must not depend on android framework\`() {
        Konsist.scopeFromPackage("..domain..")
            .files
            .assertFalse { file ->
                file.imports.any { it.name.startsWith("android.") }
            }
    }
}`,
  },
];

export default function Philosophy() {
  const [activePillar, setActivePillar] = useState(0);
  const containerRef = useRef(null);

  const current = pillars[activePillar];

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)', normal: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
      if (ctx.conditions.reduceMotion) return;

      gsap.from('.philo-heading', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      });

      gsap.from('.philo-tab', {
        scrollTrigger: { trigger: '.philo-tabs', start: 'top 80%' },
        y: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
      });
    }, containerRef);
  }, { scope: containerRef });

  return (
    <section id="philosophy" ref={containerRef} className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <div className="philo-heading mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Engineering Standards</p>
            <h2 className="section-heading mb-4">
              How I <span className="text-brand">Engineer Systems</span>
            </h2>
            <p className="section-subtitle">
              The four technical pillars that govern how I write, test, profile, and ship production software.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-text-muted bg-surface-card px-4 py-2 rounded-lg border border-border">
            <ShieldCheck size={14} className="text-brand" />
            <span>Tested in Production</span>
          </div>
        </div>

        {/* 4 Interactive Cards Grid */}
        <div className="philo-tabs grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isActive = activePillar === idx;

            return (
              <div
                key={pillar.num}
                onClick={() => setActivePillar(idx)}
                className={`philo-tab card-base p-6 cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
                  isActive
                    ? 'border-brand bg-surface-elevated shadow-glow -translate-y-1'
                    : 'hover:border-border-active hover:-translate-y-0.5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-mono text-xs font-bold ${isActive ? 'text-brand' : 'text-text-muted'}`}>
                      {pillar.num}
                    </span>
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-brand/20 text-brand' : 'bg-surface-secondary text-text-muted group-hover:text-brand transition-colors'}`}>
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className={`font-heading font-bold text-xl mb-2 transition-colors ${isActive ? 'text-brand' : 'text-text-primary'}`}>
                    {pillar.title}
                  </h3>

                  <p className="font-body text-xs text-text-secondary leading-relaxed">
                    {pillar.shortDesc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between font-mono text-[11px]">
                  <span className={isActive ? 'text-brand' : 'text-text-muted'}>
                    {isActive ? 'Active Inspector' : 'Explore Pillar'}
                  </span>
                  <ArrowRight size={12} className={`transition-transform ${isActive ? 'translate-x-1 text-brand' : 'text-text-muted'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Pillar Deep-Dive Inspection Stage */}
        <div className="card-base p-6 md:p-10 bg-surface-card border-brand/50 shadow-glow-lg relative overflow-hidden animate-in fade-in duration-300">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* Left: Philosophy Mantra & Concrete Rules */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2 font-mono text-xs text-brand uppercase tracking-wider">
                  <span>Pillar {current.num}</span>
                  <span>·</span>
                  <span>{current.title} Deep-Dive</span>
                </div>
                <h4 className="font-heading font-extrabold text-xl md:text-2xl text-text-primary leading-snug">
                  "{current.mantra}"
                </h4>
              </div>

              {/* Concrete Engineering Rules */}
              <div className="space-y-4">
                <p className="font-mono text-xs text-text-muted uppercase tracking-wider">Non-Negotiable Engineering Rules</p>
                <div className="space-y-3">
                  {current.rules.map((rule, rIdx) => (
                    <div key={rIdx} className="p-4 rounded-xl bg-surface-secondary/70 border border-border-subtle space-y-1">
                      <div className="flex items-center gap-2 text-text-primary font-heading font-semibold text-sm">
                        <CheckCircle size={15} className="text-brand flex-shrink-0" />
                        <span>{rule.title}</span>
                      </div>
                      <p className="font-body text-xs text-text-secondary pl-5 leading-relaxed">
                        {rule.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Metric Badge */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-terminal border border-brand/30">
                <span className="font-heading font-extrabold text-3xl text-brand">{current.metric.value}</span>
                <span className="font-body text-xs text-text-secondary leading-snug">{current.metric.label}</span>
              </div>
            </div>

            {/* Right: Code Demonstration / Pattern Blueprint */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-text-muted">
                <span className="flex items-center gap-2">
                  <Terminal size={14} className="text-brand" />
                  <span>production_blueprint.kt</span>
                </span>
                <span className="text-brand">Kotlin 2.0</span>
              </div>

              <div className="bg-surface-terminal rounded-xl border border-border overflow-hidden font-mono text-xs text-text-secondary">
                {/* Code Window Bar */}
                <div className="px-4 py-2.5 bg-surface-elevated border-b border-border-subtle flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[11px] text-text-muted">Domain / Architecture Layer</span>
                </div>

                <pre className="p-5 overflow-x-auto text-[12px] leading-relaxed text-text-primary">
                  <code>{current.codeSnippet}</code>
                </pre>
              </div>

              <p className="font-mono text-[11px] text-text-muted text-right">
                Immutable state · Clean Architecture · Scalable boundaries
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
