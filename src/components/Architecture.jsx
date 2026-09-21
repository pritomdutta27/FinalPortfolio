import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Layers,
  Cpu,
  Database,
  Radio,
  Play,
  CheckCircle2,
  Terminal,
  Activity,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Workflow
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const architectureModes = [
  {
    id: 'clean-arch',
    title: 'Clean Architecture (Core Mobile)',
    subtitle: 'Standard 4-tier separation of concerns with Unidirectional Data Flow',
    nodes: [
      {
        id: 'presentation',
        layer: 'UI & Presentation',
        tech: 'Jetpack Compose · SwiftUI · XML',
        role: 'Renders immutable state snapshots and captures user interactions as typed intents.',
        inputs: 'StateFlow<ScreenUiState>',
        outputs: 'UserIntent / UI Events',
        dispatcher: 'Main.immediate (120 FPS)',
        testing: 'Compose Test Rule & Screenshot Tests',
      },
      {
        id: 'viewmodel',
        layer: 'ViewModel State Machine',
        tech: 'StateFlow · SharedFlow · SavedStateHandle',
        role: 'Processes UI intents, invokes domain use cases, and maps results to UI state.',
        inputs: 'UserIntent',
        outputs: 'StateFlow<UiState> & Channel<SideEffect>',
        dispatcher: 'viewModelScope (SupervisorJob)',
        testing: 'Turbine Flow Testing & MockK',
      },
      {
        id: 'domain',
        layer: 'Domain Use Cases',
        tech: 'Pure Kotlin · Zero Framework Deps',
        role: 'Encapsulates isolated business rules. Independent of UI, Android OS, and database drivers.',
        inputs: 'UseCaseParams',
        outputs: 'Flow<Result<DomainEntity>>',
        dispatcher: 'Dispatchers.Default / IO',
        testing: 'Instant JVM Unit Tests (100% testable)',
      },
      {
        id: 'data',
        layer: 'Repository & Data Sources',
        tech: 'Room DB · SQLCipher · Retrofit · Ktor',
        role: 'Single source of truth. Handles offline persistence, caching, and network synchronization.',
        inputs: 'Repository Queries / DTOs',
        outputs: 'Flow<DomainModel>',
        dispatcher: 'Dispatchers.IO',
        testing: 'Room In-Memory Database & Fake APIs',
      },
    ],
  },
  {
    id: 'webrtc-flow',
    title: 'Real-Time VoIP & WebRTC Pipeline',
    subtitle: 'Sub-65ms peer-to-peer audio/video calling with system telephony parity',
    nodes: [
      {
        id: 'telecom',
        layer: 'Android Telecom Framework',
        tech: 'ConnectionService · PhoneAccountHandle',
        role: 'Binds system telephony to show native incoming call UI on locked screen with full audio focus priority.',
        inputs: 'High-Priority VoIP Push (FCM)',
        outputs: 'System Connection Object',
        dispatcher: 'Telecom Thread',
        testing: 'TelecomManager Mock Tests',
      },
      {
        id: 'signaling',
        layer: 'Signaling & Negotiation',
        tech: 'Ktor WebSocket · Socket.IO · STUN/TURN',
        role: 'Exchanges SDP offers, answers, and ICE candidates with low-latency coturn traversal.',
        inputs: 'SDP & ICE Candidates',
        outputs: 'Active PeerConnection State',
        dispatcher: 'Dispatchers.IO',
        testing: 'WebSocket Signaling Reconnect Suite',
      },
      {
        id: 'media-engine',
        layer: 'WebRTC Media Pipeline',
        tech: 'VP8 / H.264 · AudioTrack · VideoTrack',
        role: 'Hardware-accelerated encoding, packetization, and adaptive bitrate jitter buffering.',
        inputs: 'Camera / Microphone Stream',
        outputs: 'RTP Media Packets over UDP',
        dispatcher: 'Dedicated Native WebRTC Worker',
        testing: 'Packet Loss & Jitter Simulations',
      },
      {
        id: 'surface',
        layer: 'Hardware Surface View',
        tech: 'SurfaceViewRenderer · EglBase Context',
        role: 'Low-latency GPU texture rendering directly to screen buffer at steady 60 FPS.',
        inputs: 'Remote Video Track Frames',
        outputs: 'Hardware Surface Display',
        dispatcher: 'OpenGL ES Render Thread',
        testing: 'Frame Drop & Memory Leak Profiling',
      },
    ],
  },
  {
    id: 'fintech-pos',
    title: 'Offline-First Fintech & POS Transaction Engine',
    subtitle: 'Tamper-resistant cryptographic payment queue with guaranteed reconciliation',
    nodes: [
      {
        id: 'biometrics',
        layer: 'Biometric & PIN Verification',
        tech: 'BiometricPrompt · CryptoObject',
        role: 'Authenticates merchant credentials against AndroidKeyStore secure hardware element.',
        inputs: 'Fingerprint / FaceAuth Token',
        outputs: 'Unlocked Cipher Instance',
        dispatcher: 'Main / Security Thread',
        testing: 'Biometric Callback Mock Suite',
      },
      {
        id: 'crypto-signer',
        layer: 'Hardware KeyStore Signer',
        tech: 'ECDSA SHA-256 · StrongBox / TEE',
        role: 'Digitally signs transaction ISO-8583 payload with private key that never leaves hardware.',
        inputs: 'Raw Transaction Bytes',
        outputs: 'Signed Cryptographic Signature',
        dispatcher: 'Dispatchers.Default',
        testing: 'Signature Verification Unit Tests',
      },
      {
        id: 'encrypted-queue',
        layer: 'Encrypted Offline Queue',
        tech: 'SQLCipher · Room · SQLite 256-bit',
        role: 'Atomically writes pending transactions to encrypted database with deterministic UUIDs.',
        inputs: 'Signed Transaction Payload',
        outputs: 'Pending Local Ledger Record',
        dispatcher: 'Dispatchers.IO',
        testing: 'Database Crash Recovery Tests',
      },
      {
        id: 'reconciliation',
        layer: 'Idempotent Sync Engine',
        tech: 'WorkManager · Exponential Backoff',
        role: 'Batches and commits transactions to payment gateway API immediately upon network recovery.',
        inputs: 'Network Available Signal',
        outputs: 'Idempotent 200 OK Cloud Receipt',
        dispatcher: 'WorkManager Background Queue',
        testing: 'Double-Spend & Network Flaky Mocks',
      },
    ],
  },
];

export default function Architecture() {
  const [activeModeIndex, setActiveModeIndex] = useState(0);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [simActiveNode, setSimActiveNode] = useState(null);
  const containerRef = useRef(null);

  const currentMode = architectureModes[activeModeIndex];
  const activeNode = currentMode.nodes[selectedNodeIndex] || currentMode.nodes[0];

  const handleSimulate = () => {
    if (simulating) return;
    setSimulating(true);
    let step = 0;

    const interval = setInterval(() => {
      setSimActiveNode(step);
      setSelectedNodeIndex(step);
      step++;
      if (step >= currentMode.nodes.length) {
        clearInterval(interval);
        setTimeout(() => {
          setSimulating(false);
          setSimActiveNode(null);
        }, 800);
      }
    }, 650);
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)', normal: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
      if (ctx.conditions.reduceMotion) return;

      gsap.from('.arch-header-el', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      });

      gsap.from('.arch-diagram-wrap', {
        scrollTrigger: { trigger: '.arch-diagram-wrap', start: 'top 75%' },
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      });
    }, containerRef);
  }, { scope: containerRef });

  return (
    <section id="architecture" ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background blueprint grid styling */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `linear-gradient(#26312C 1px, transparent 1px), linear-gradient(to right, #26312C 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="arch-header-el mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Architecture Blueprint</p>
            <h2 className="section-heading mb-4">
              I think in systems, <span className="text-brand">not just screens.</span>
            </h2>
            <p className="section-subtitle">
              Interactive architectural topology showing data flow contracts, thread dispatchers, and isolation boundaries.
            </p>
          </div>

          {/* Simulation Trigger Button */}
          <button
            onClick={handleSimulate}
            disabled={simulating}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-button font-mono text-xs font-semibold transition-all duration-300 ${
              simulating
                ? 'bg-brand/20 text-brand border border-brand animate-pulse'
                : 'bg-brand text-surface-primary hover:bg-brand-hover shadow-glow hover:-translate-y-0.5'
            }`}
          >
            <Play size={14} className={simulating ? 'animate-spin' : ''} />
            {simulating ? 'Simulating Event Pipeline...' : '▶ Simulate Event Stream'}
          </button>
        </div>

        {/* Architecture Topology Switcher Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {architectureModes.map((mode, idx) => (
            <button
              key={mode.id}
              onClick={() => {
                setActiveModeIndex(idx);
                setSelectedNodeIndex(0);
              }}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs transition-all duration-300 flex items-center gap-2 border ${
                activeModeIndex === idx
                  ? 'bg-surface-elevated text-brand border-brand shadow-glow font-bold'
                  : 'bg-surface-card text-text-secondary border-border hover:border-border-active'
              }`}
            >
              <Workflow size={14} className={activeModeIndex === idx ? 'text-brand' : 'text-text-muted'} />
              <span>{mode.title}</span>
            </button>
          ))}
        </div>

        {/* Blueprint Topology Canvas */}
        <div className="arch-diagram-wrap card-base p-6 md:p-10 bg-surface-card border-border relative shadow-card">
          {/* Blueprint header banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-border-subtle gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-brand uppercase tracking-wider mb-1">
                <Activity size={14} />
                <span>Active Topology: {currentMode.title}</span>
              </div>
              <p className="font-body text-xs text-text-muted">
                {currentMode.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-brand" /> Active Node
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-border" /> Contract Boundary
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Node Sequence / Flow Pipeline */}
            <div className="lg:col-span-7 space-y-4">
              {currentMode.nodes.map((node, nIdx) => {
                const isSelected = selectedNodeIndex === nIdx;
                const isSimActive = simActiveNode === nIdx;

                return (
                  <div key={node.id} className="relative">
                    {/* Architectural Node Block */}
                    <div
                      onClick={() => setSelectedNodeIndex(nIdx)}
                      className={`cursor-pointer card-base p-5 transition-all duration-300 relative border ${
                        isSimActive
                          ? 'border-brand bg-brand/15 shadow-glow-lg scale-[1.02]'
                          : isSelected
                          ? 'border-brand bg-surface-elevated shadow-glow'
                          : 'border-border bg-surface-primary hover:border-border-active hover:bg-surface-elevated/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2.5 rounded-xl transition-colors ${
                              isSelected || isSimActive
                                ? 'bg-brand text-surface-primary font-bold'
                                : 'bg-surface-elevated text-text-muted border border-border-subtle'
                            }`}
                          >
                            <span className="font-mono text-xs">0{nIdx + 1}</span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4
                                className={`font-heading font-bold text-base md:text-lg transition-colors ${
                                  isSelected || isSimActive ? 'text-brand' : 'text-text-primary'
                                }`}
                              >
                                {node.layer}
                              </h4>
                              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-elevated text-text-muted border border-border-subtle">
                                {node.tech.split('·')[0]}
                              </span>
                            </div>

                            <p className="font-body text-xs text-text-secondary line-clamp-2 leading-relaxed">
                              {node.role}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end flex-shrink-0 text-right font-mono text-[11px]">
                          <span className={isSelected || isSimActive ? 'text-brand font-semibold' : 'text-text-muted'}>
                            {isSelected ? 'Inspecting' : 'Inspect'}
                          </span>
                          <span className="text-text-muted text-[10px]">{node.dispatcher.split(' ')[0]}</span>
                        </div>
                      </div>

                      {/* Micro IO signature line */}
                      <div className="mt-3 pt-3 border-t border-border-subtle/70 flex items-center justify-between text-[10px] font-mono text-text-muted">
                        <span className="truncate max-w-[48%]">In: <span className="text-text-secondary">{node.inputs}</span></span>
                        <span className="truncate max-w-[48%] text-right">Out: <span className="text-brand">{node.outputs}</span></span>
                      </div>
                    </div>

                    {/* Animated Connection Arrow Between Nodes */}
                    {nIdx < currentMode.nodes.length - 1 && (
                      <div className="flex items-center justify-center my-1 relative">
                        <div className="w-0.5 h-6 bg-border relative">
                          {/* Animated signal dot */}
                          <div
                            className={`absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                              simulating ? 'bg-brand shadow-glow animate-ping' : 'bg-brand/50'
                            }`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Technical Inspector Stage for Selected Layer */}
            <div className="lg:col-span-5 space-y-5">
              <div className="card-base p-6 bg-surface-elevated border-brand/40 shadow-glow relative overflow-hidden space-y-5">
                <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs text-brand">
                    <Terminal size={15} />
                    <span>Layer 0{selectedNodeIndex + 1} Contract Inspector</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-brand animate-pulse-green" />
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-2xl text-text-primary">
                    {activeNode.layer}
                  </h3>
                  <p className="font-mono text-xs text-brand font-semibold mt-1">
                    {activeNode.tech}
                  </p>
                  <p className="font-body text-xs md:text-sm text-text-secondary mt-3 leading-relaxed">
                    {activeNode.role}
                  </p>
                </div>

                {/* Contract Input / Output details */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-surface-primary border border-border-subtle space-y-1">
                    <span className="text-[10px] text-text-muted uppercase tracking-wider block">Input Signature:</span>
                    <p className="text-text-primary text-xs font-bold">{activeNode.inputs}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-primary border border-brand/30 space-y-1">
                    <span className="text-[10px] text-text-muted uppercase tracking-wider block">Output Contract:</span>
                    <p className="text-brand text-xs font-bold">{activeNode.outputs}</p>
                  </div>
                </div>

                {/* Dispatcher and Testing specifics */}
                <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-[11px]">
                  <div className="p-3 rounded-lg bg-surface-terminal border border-border-subtle space-y-1">
                    <span className="text-text-muted flex items-center gap-1">
                      <Zap size={12} className="text-brand" /> Dispatcher
                    </span>
                    <p className="text-text-primary font-semibold text-[11px] leading-tight">{activeNode.dispatcher}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-terminal border border-border-subtle space-y-1">
                    <span className="text-text-muted flex items-center gap-1">
                      <ShieldCheck size={12} className="text-brand" /> Testing Model
                    </span>
                    <p className="text-text-primary font-semibold text-[11px] leading-tight">{activeNode.testing}</p>
                  </div>
                </div>

                {/* Architecture Invariants */}
                <div className="pt-3 border-t border-border-subtle/80 flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>Inversion of Control</span>
                  <span className="text-brand">Strict UDF Compliance ✓</span>
                </div>
              </div>

              {/* Guiding Principles Card */}
              <div className="card-base p-5 bg-surface-primary border-border space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-text-primary font-bold text-xs uppercase tracking-wider">
                  <Lock size={13} className="text-brand" />
                  <span>Architecture Boundary Rule</span>
                </div>
                <p className="text-text-secondary text-xs leading-relaxed font-body">
                  Higher layers depend on lower layer contracts; lower layers have zero knowledge of higher layers. Dependencies always flow inward toward pure business logic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
