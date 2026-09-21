import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Clock, BookOpen, X, Sparkles, Terminal, Share2, Check, Bookmark, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categories = ['All Articles', 'Jetpack Compose', 'Architecture', 'Real-Time & VoIP', 'Fintech', 'System Design'];

const articles = [
  {
    id: 'compose-internals',
    category: 'Jetpack Compose',
    filterCategory: 'Jetpack Compose',
    title: 'Deconstructing Compose Internals: The Slot Table & Smart Recomposition',
    snippet: 'An in-depth exploration of the Gap Buffer memory model in the Compose compiler, skipping unnecessary phase evaluations, and optimizing runtime stability.',
    readTime: '8 min read',
    date: 'Sep 2026',
    codeFile: 'SlotTable.kt',
    featured: true,
    takeaways: [
      'How the Compose compiler inserts Composer.startRestartGroup() tokens around recomposition scopes.',
      'Understanding why @Stable and @Immutable annotations prevent cascading recomposition passes.',
      'DerivedStateOf vs Remember(key): eliminating allocation overhead in high-frequency animations.',
    ],
    fullArticle: {
      intro: 'Jetpack Compose has transformed Android UI development from imperative view hierarchies into declarative functional programming. However, without understanding the internal Gap Buffer slot table and compiler stability rules, developers frequently suffer from frame drops and excessive recomposition.',
      codeSnippet: `// Compose Compiler Stability Optimization
@Immutable
data class CallParticipantState(
    val id: String,
    val name: String,
    val isSpeaking: Boolean,
    val videoSurfaceId: Int
)

@Composable
fun VideoTile(
    state: CallParticipantState,
    onMuteToggle: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    // Composer verifies state reference equality and SKIPS recomposition if unchanged
    Box(modifier = modifier.clip(RoundedCornerShape(12.dp))) {
        SurfaceRenderer(surfaceId = state.videoSurfaceId)
        if (state.isSpeaking) {
            AudioGlowIndicator()
        }
    }
}`,
      analysis: 'By annotating state data classes with @Immutable, the Compose compiler guarantees to the runtime that properties will not change after instantiation without creating a new copy. This allows the Composer to perform a fast pointer comparison and skip executing the entire composable body.',
      conclusion: 'Optimizing Compose is rarely about rewriting UI layouts; it is about respecting data immutability and preventing allocation inside measure and layout passes.',
    },
  },
  {
    id: 'webrtc-telecom',
    category: 'Real-Time & VoIP',
    filterCategory: 'Real-Time & VoIP',
    title: 'Architecting Resilient WebRTC Pipelines with Android Telecom ConnectionService',
    snippet: 'Bridging low-latency WebRTC peer connections with system-level Android telephony to achieve native lock-screen ringing, audio focus management, and call priority.',
    readTime: '11 min read',
    date: 'Aug 2026',
    codeFile: 'TelecomConnection.kt',
    featured: true,
    takeaways: [
      'Binding custom ConnectionService to the Android Telecom framework for carrier-grade call behavior.',
      'Handling AudioFocus ducking and audio device routing (Bluetooth SCO, earpiece, speakerphone).',
      'Zero-drop ICE candidate renegotiation across volatile 4G-to-Wi-Fi carrier network handoffs.',
    ],
    fullArticle: {
      intro: 'Most VoIP apps fail because Android kills background processes or drops audio focus when cellular calls arrive. The only enterprise-grade solution is integrating Android Telecom ConnectionService to treat custom VoIP calls as first-class system phone calls.',
      codeSnippet: `// System Telecom Integration for VoIP
class VoipConnectionService : ConnectionService() {
    override fun onCreateIncomingConnection(
        connectionManagerPhoneAccount: PhoneAccountHandle?,
        request: ConnectionRequest?
    ): Connection {
        val connection = VoipCallConnection(applicationContext).apply {
            setInitializing()
            connectionCapabilities = Connection.CAPABILITY_SUPPORT_HOLD or Connection.CAPABILITY_MUTE
            setAddress(request?.address, TelecomManager.PRESENTATION_ALLOWED)
            setRinging()
        }
        return connection
    }
}`,
      analysis: 'When registered as a PhoneAccount with TelecomManager, Android displays the native incoming call UI even when the user device is locked or low on battery, providing a seamless calling experience matching native cellular telephony.',
      conclusion: 'Pairing WebRTC with Telecom API is essential for healthcare and enterprise communication platforms that require 99.9% incoming call delivery.',
    },
  },
  {
    id: 'clean-architecture-multimodule',
    category: 'Architecture',
    filterCategory: 'Architecture',
    title: 'Scaling to 20+ Modules: Android Clean Architecture Without Build Friction',
    snippet: 'Separating public API contracts from internal implementation modules to maximize Gradle compilation avoidance and keep CI build durations under 3 minutes.',
    readTime: '10 min read',
    date: 'Jul 2026',
    codeFile: 'ModuleGraph.gradle.kts',
    featured: false,
    takeaways: [
      'Strict API vs Implementation Gradle configurations to prevent transitive classpath leaks.',
      'Inverting dependencies between domain business rules and hardware or network adapters.',
      'Enforcing architecture fitness rules across the team using automated Konsist tests.',
    ],
    fullArticle: {
      intro: 'Monolithic Android projects inevitably slow down as team sizes grow. Incremental build times creep past 10 minutes, and unintended dependencies between screens create circular references.',
      codeSnippet: `// Feature Module Dependency Contract (build.gradle.kts)
plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.kotlin.android)
}

dependencies {
    // Depend on domain API interfaces, NEVER on concrete feature implementations
    implementation(projects.core.domain)
    implementation(projects.core.model)
    implementation(projects.core.designsystem)
    
    testImplementation(projects.core.testing)
}`,
      analysis: 'By separating every feature into a :feature:api and :feature:impl pair, Gradle can compile modules in parallel, and changes inside an implementation module never trigger recompilation of downstream consumer modules.',
      conclusion: 'Architecture modularization is the single highest-ROI investment for scaling an engineering team without sacrificing developer velocity.',
    },
  },
  {
    id: 'coroutines-flow',
    category: 'Architecture',
    filterCategory: 'Architecture',
    title: 'Advanced Kotlin Coroutines & Cold Flow in High-Concurrency Systems',
    snippet: 'Production guide for structured concurrency, cancellation propagation, backpressure buffering, and deterministic testing with Turbine.',
    readTime: '7 min read',
    date: 'Jun 2026',
    codeFile: 'FlowDispatcher.kt',
    featured: false,
    takeaways: [
      'Why SupervisorJob is mandatory in ViewModel lifecycle scopes to isolate child coroutine crashes.',
      'Managing hot StateFlow vs SharedFlow replay buffers for UI events vs state.',
      'Deterministic testing of complex asynchronous flow streams using Turbine and TestScope.',
    ],
    fullArticle: {
      intro: 'Coroutines make asynchronous code read like sequential code, but improper dispatcher usage and unhandled cancellation exceptions can silently introduce memory leaks and deadlocks.',
      codeSnippet: `// High-Performance Event Stream Processing
class RealtimeTelemetryCollector @Inject constructor(
    private val socketApi: SocketApi
) {
    val telemetryStream: Flow<TelemetryEvent> = socketApi.events
        .buffer(capacity = 64, onBufferOverflow = BufferOverflow.DROP_OLDEST)
        .flowOn(Dispatchers.IO)
        .distinctUntilChanged()
}`,
      analysis: 'Using buffer with BufferOverflow.DROP_OLDEST ensures that high-frequency real-time frames do not back up memory or freeze the consumer thread during network latency spikes.',
      conclusion: 'Structured concurrency guarantees that no coroutine outlives its parent lifecycle scope, eliminating phantom network requests.',
    },
  },
  {
    id: 'pos-offline-first',
    category: 'Fintech',
    filterCategory: 'Fintech',
    title: 'Offline-First Cryptographic POS Architecture with SQLCipher & Hardware KeyStore',
    snippet: 'Designing tamper-evident transaction queues that sign financial payloads offline and guarantee idempotent cloud reconciliation with zero double-spending.',
    readTime: '9 min read',
    date: 'May 2026',
    codeFile: 'CryptoKeystore.kt',
    featured: false,
    takeaways: [
      'Hardware-backed asymmetric key generation inside the Android KeyStore Secure Element.',
      'Idempotent cryptographic UUID generation and transaction batch syncing.',
      'SQLCipher encrypted database migrations without user downtime or data corruption.',
    ],
    fullArticle: {
      intro: 'Retail environments regularly experience power and connectivity dropouts. Payment terminals must be able to record, sign, and queue transactions securely offline without risking financial discrepancies.',
      codeSnippet: `// Hardware-Backed Payload Signature
class KeystoreSigner @Inject constructor() {
    fun signPayload(payload: ByteArray): String {
        val keyStore = KeyStore.getInstance("AndroidKeyStore").apply { load(null) }
        val privateKey = keyStore.getKey("pos_signing_key", null) as PrivateKey
        val signature = Signature.getInstance("SHA256withECDSA").apply {
            initSign(privateKey)
            update(payload)
        }
        return Base64.encodeToString(signature.sign(), Base64.NO_WRAP)
    }
}`,
      analysis: 'Private keys never leave the hardware-backed Secure Element (TEE/StrongBox), ensuring that even if an attacker acquires root access on the terminal, financial signatures cannot be forged.',
      conclusion: 'Security in offline fintech is not about trust; it is about cryptographic proof and idempotent cloud reconciliation.',
    },
  },
  {
    id: 'design-patterns-mobile',
    category: 'System Design',
    filterCategory: 'System Design',
    title: 'Pragmatic Design Patterns in Modern Mobile: Beyond the Textbook',
    snippet: 'When to choose Strategy over polymorphic inheritance, how MVI handles navigation effects cleanly, and building hardware peripheral adapters.',
    readTime: '6 min read',
    date: 'Apr 2026',
    codeFile: 'PatternContracts.kt',
    featured: false,
    takeaways: [
      'Single-event Channels for one-off UI side effects like Snackbars and navigation.',
      'Factory pattern for dynamic hardware peripherals (EMV readers, thermal printers).',
      'Repository pattern as a caching single source of truth for offline-first apps.',
    ],
    fullArticle: {
      intro: 'Design patterns are not academic dogma; they are battle-tested strategies for isolating parts of a codebase that change frequently from parts that must remain rock-solid.',
      codeSnippet: `// Dynamic Hardware Driver Adapter Pattern
interface PrinterDriver {
    suspend fun printReceipt(receipt: Receipt): PrintResult
}

class SunmiThermalPrinter @Inject constructor(context: Context) : PrinterDriver {
    override suspend fun printReceipt(receipt: Receipt): PrintResult {
        // Sunmi hardware ESC/POS commands
        return PrintResult.Success
    }
}`,
      analysis: 'Adapters allow business logic to issue high-level commands like printReceipt without knowing whether the underlying hardware is a Sunmi terminal, a Pax terminal, or a network thermal printer.',
      conclusion: 'Good software engineering minimizes the ripple effect of external vendor changes.',
    },
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All Articles');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const containerRef = useRef(null);

  const filteredArticles = articles.filter(
    (art) => activeCategory === 'All Articles' || art.filterCategory === activeCategory
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)', normal: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
      if (ctx.conditions.reduceMotion) return;

      gsap.from('.blog-heading', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      });

      gsap.from('.article-card', {
        scrollTrigger: { trigger: '.articles-grid', start: 'top 75%' },
        y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      });
    }, containerRef);
  }, { scope: containerRef });

  return (
    <section id="blog" ref={containerRef} className="section-padding relative">
      <div className="section-container">
        {/* Section Heading */}
        <div className="blog-heading mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Engineering Notebook</p>
            <h2 className="section-heading mb-4">
              Things I'm <span className="text-brand">Learning & Writing</span>
            </h2>
            <p className="section-subtitle">
              Deep dives into Android system design, Jetpack Compose runtime internals, WebRTC telecommunications, and high-concurrency mobile engineering.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-text-muted bg-surface-card px-4 py-2.5 rounded-lg border border-border">
              <BookOpen size={14} className="text-brand" />
              <span>{articles.length} Technical Articles</span>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-button text-xs font-mono transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-brand text-surface-primary font-semibold shadow-glow'
                  : 'bg-surface-elevated text-text-secondary hover:text-brand hover:border-brand border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="articles-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="article-card card-base p-6 md:p-7 flex flex-col justify-between hover:border-brand hover:shadow-glow hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Meta header */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-surface-elevated text-brand border border-brand/20 font-medium">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
                    <Clock size={12} className="text-brand/80" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-lg md:text-xl text-text-primary group-hover:text-brand transition-colors leading-snug">
                  {art.title}
                </h3>

                {/* Snippet */}
                <p className="font-body text-xs md:text-sm text-text-secondary leading-relaxed">
                  {art.snippet}
                </p>

                {/* Key Takeaways summary */}
                <div className="pt-2 space-y-1.5 border-t border-border-subtle/80">
                  {art.takeaways.slice(0, 2).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] font-mono text-text-muted">
                      <span className="text-brand font-bold">›</span>
                      <span className="line-clamp-1">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-5 border-t border-border-subtle mt-6 text-xs font-mono">
                <div className="flex items-center gap-2 text-text-muted">
                  <Terminal size={12} className="text-brand" />
                  <span>{art.codeFile}</span>
                </div>

                <span className="inline-flex items-center gap-1 text-text-secondary group-hover:text-brand transition-colors font-semibold">
                  Read Article <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter / RSS Box */}
        <div className="mt-16 card-base p-6 md:p-8 bg-surface-card border-brand/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-xs text-brand uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Engineering Publication</span>
            </div>
            <h4 className="font-heading font-bold text-xl text-text-primary">
              Enjoy technical deep-dives on Android & distributed architecture?
            </h4>
            <p className="font-body text-xs text-text-secondary">
              Published semi-regularly. Focused on real-world engineering, performance benchmarks, and clean architecture.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="https://github.com/pritomdutta27"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs w-full md:w-auto whitespace-nowrap"
            >
              Follow on GitHub ↗
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-surface-primary/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto card-base p-6 md:p-10 bg-surface-card border-brand shadow-glow-lg">
            {/* Close button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 text-text-muted hover:text-text-primary rounded-lg bg-surface-elevated border border-border transition-colors"
            >
              <X size={20} />
            </button>

            <div className="space-y-6">
              {/* Article Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-brand/10 text-brand border border-brand/30">
                    {selectedArticle.category}
                  </span>
                  <span className="font-mono text-xs text-text-muted">
                    {selectedArticle.readTime} · {selectedArticle.date}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-text-primary mt-2 leading-tight">
                  {selectedArticle.title}
                </h3>

                <p className="font-mono text-xs text-text-muted mt-2">
                  By Pritom Dutta · Senior Android Engineer
                </p>
              </div>

              {/* Introduction */}
              <div className="p-4 rounded-xl bg-surface-secondary/80 border border-border-subtle">
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  {selectedArticle.fullArticle.intro}
                </p>
              </div>

              {/* Code Demonstration Window */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs text-text-muted">
                  <span className="flex items-center gap-2">
                    <Terminal size={14} className="text-brand" />
                    <span>{selectedArticle.codeFile}</span>
                  </span>
                  <span className="text-brand">Production Implementation</span>
                </div>

                <div className="bg-surface-terminal rounded-xl border border-border overflow-hidden font-mono text-xs">
                  <div className="px-4 py-2.5 bg-surface-elevated border-b border-border-subtle flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="text-[11px] text-text-muted">Kotlin 2.0 DSL</span>
                  </div>

                  <pre className="p-5 overflow-x-auto text-[12px] leading-relaxed text-text-primary">
                    <code>{selectedArticle.fullArticle.codeSnippet}</code>
                  </pre>
                </div>
              </div>

              {/* Architectural Analysis */}
              <div className="space-y-2">
                <h4 className="font-heading font-bold text-sm text-text-primary flex items-center gap-2">
                  <FileText size={16} className="text-brand" />
                  Architectural Analysis & Tradeoffs
                </h4>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  {selectedArticle.fullArticle.analysis}
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="space-y-3 p-4 rounded-xl bg-surface-terminal border border-brand/20">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-brand flex items-center gap-2">
                  <Sparkles size={14} />
                  Core Engineering Takeaways
                </h4>
                <div className="space-y-2">
                  {selectedArticle.takeaways.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-mono text-text-secondary">
                      <Check size={14} className="text-brand flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Conclusion */}
              <p className="font-body text-xs text-text-muted italic border-l-2 border-brand pl-3">
                "{selectedArticle.fullArticle.conclusion}"
              </p>

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-text-secondary hover:text-brand transition-colors"
                >
                  {copiedLink ? <Check size={14} className="text-brand" /> : <Share2 size={14} />}
                  {copiedLink ? 'Link Copied!' : 'Share Article'}
                </button>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="btn-primary text-xs"
                >
                  Close Article Reader
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
