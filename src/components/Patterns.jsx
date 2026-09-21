import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  GitBranch,
  Box,
  RefreshCw,
  Network,
  Workflow,
  Factory,
  Sliders,
  Layers,
  Terminal,
  ArrowRight,
  CheckCircle2,
  Search,
  Copy,
  Check,
  Cpu,
  Link,
  Shield,
  FileCode,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categories = [
  { id: 'all', label: 'All Patterns (12)' },
  { id: 'architectural', label: 'Architectural & Mobile (3)' },
  { id: 'behavioral', label: 'Behavioral & Concurrency (4)' },
  { id: 'creational', label: 'Creational (3)' },
  { id: 'structural', label: 'Structural (2)' },
];

const patterns = [
  {
    id: 'strategy',
    num: '01',
    name: 'Strategy Pattern',
    category: 'behavioral',
    tag: 'Behavioral',
    oneLiner: 'Encapsulate interchangeable algorithms behind stable domain interfaces.',
    icon: GitBranch,
    whereUsed: 'Payment Gateways (bKash / Stripe) & Video Codec Selector (VP8 / H.264 / AV1)',
    explanation: 'Enables runtime switching of payment processors and video encoders based on device capabilities, carrier bandwidth, and user preference without modifying client consumption code.',
    benefit: 'Open/Closed Principle: Add new payment methods without touching business logic.',
    tabs: {
      contract: `// Strategy Interface Contract
interface PaymentGatewayStrategy {
    suspend fun executePayment(amount: BigDecimal, token: String): Result<PaymentReceipt>
}`,
      impl: `// Concrete Strategy Implementations
class BkashPaymentStrategy @Inject constructor(private val bkashApi: BkashApi) : PaymentGatewayStrategy {
    override suspend fun executePayment(amount: BigDecimal, token: String): Result<PaymentReceipt> {
        return runCatching { bkashApi.chargeWallet(amount, token) }
    }
}

class StripePaymentStrategy @Inject constructor(private val stripeClient: StripeClient) : PaymentGatewayStrategy {
    override suspend fun executePayment(amount: BigDecimal, token: String): Result<PaymentReceipt> {
        return runCatching { stripeClient.confirmPayment(amount, token) }
    }
}`,
      usage: `// Client Context Resolution
class PaymentProcessor @Inject constructor(
    private val strategies: Map<PaymentMethod, @JvmSuppressWildcards PaymentGatewayStrategy>
) {
    suspend fun process(method: PaymentMethod, amount: BigDecimal, token: String): Result<PaymentReceipt> {
        val strategy = strategies[method] ?: error("Unsupported payment method: $method")
        return strategy.executePayment(amount, token)
    }
}`,
    },
  },
  {
    id: 'repository',
    num: '02',
    name: 'Repository Pattern',
    category: 'architectural',
    tag: 'Architectural / Data',
    oneLiner: 'Single source of truth decoupling business logic from local and remote data stores.',
    icon: Box,
    whereUsed: 'Spark Chat Offline Sync & Medico Telehealth Patient Profiles',
    explanation: 'Exposes clean Kotlin Flow streams to domain consumers while abstracting Room database persistence, remote WebSocket synchronization, memory caching, and optimistic UI updates.',
    benefit: 'Deterministic offline-first user experience with zero cache inconsistencies.',
    tabs: {
      contract: `// Repository Interface
interface ChatRepository {
    fun observeMessages(conversationId: String): Flow<List<Message>>
    suspend fun sendMessage(msg: Message): Result<Unit>
}`,
      impl: `// Repository Implementation with Flow & SQLite
class ChatRepositoryImpl @Inject constructor(
    private val localDao: MessageDao,
    private val remoteApi: ChatSocketApi
) : ChatRepository {
    override fun observeMessages(conversationId: String): Flow<List<Message>> {
        return localDao.getMessagesFlow(conversationId) // Database is single source of truth
    }

    override suspend fun sendMessage(msg: Message): Result<Unit> = runCatching {
        localDao.insertPending(msg) // 1. Immediate optimistic UI write
        remoteApi.transmit(msg)     // 2. Cloud WebSocket sync
        localDao.markAsSent(msg.id) // 3. Acknowledgment
    }
}`,
      usage: `// Domain Use Case Consuming Repository
class ObserveConversationUseCase @Inject constructor(
    private val chatRepo: ChatRepository
) {
    operator fun invoke(conversationId: String): Flow<List<Message>> =
        chatRepo.observeMessages(conversationId).flowOn(Dispatchers.IO)
}`,
    },
  },
  {
    id: 'mvi_state',
    num: '03',
    name: 'State / MVI Pattern',
    category: 'architectural',
    tag: 'Architectural / UI',
    oneLiner: 'Model UI state as immutable snapshots driven by unidirectional user intents.',
    icon: RefreshCw,
    whereUsed: 'Jetpack Compose Screen ViewModels across all portfolio projects',
    explanation: 'Guarantees deterministic rendering. The UI cannot alter state directly; it dispatches immutable intents into a reducer StateFlow pipeline, while one-off side effects use Channels.',
    benefit: 'Eliminates race conditions and invalid intermediate UI states.',
    tabs: {
      contract: `// Immutable State & Intent Models
sealed interface CallUiState {
    object Idle : CallUiState
    data class Ringing(val caller: Contact) : CallUiState
    data class Connected(val durationSeconds: Long, val isMuted: Boolean) : CallUiState
}

sealed interface CallIntent {
    object Answer : CallIntent
    object HangUp : CallIntent
    data class ToggleMute(val muted: Boolean) : CallIntent
}`,
      impl: `// ViewModel Reducer Implementation
class CallViewModel @Inject constructor(
    private val webrtcEngine: WebRtcEngine
) : ViewModel() {
    private val _uiState = MutableStateFlow<CallUiState>(CallUiState.Idle)
    val uiState: StateFlow<CallUiState> = _uiState.asStateFlow()

    fun handleIntent(intent: CallIntent) {
        when (intent) {
            is CallIntent.Answer -> webrtcEngine.acceptCall()
            is CallIntent.HangUp -> webrtcEngine.endCall()
            is CallIntent.ToggleMute -> webrtcEngine.setMuted(intent.muted)
        }
    }
}`,
      usage: `// Jetpack Compose Screen
@Composable
fun CallScreen(viewModel: CallViewModel = hiltViewModel()) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()

    when (val s = state) {
        is CallUiState.Ringing -> RingingView(caller = s.caller, onAnswer = { viewModel.handleIntent(CallIntent.Answer) })
        is CallUiState.Connected -> ActiveCallView(duration = s.durationSeconds, onHangUp = { viewModel.handleIntent(CallIntent.HangUp) })
        is CallUiState.Idle -> IdleView()
    }
}`,
    },
  },
  {
    id: 'observer',
    num: '04',
    name: 'Observer / Reactive Flow',
    category: 'behavioral',
    tag: 'Behavioral / Concurrency',
    oneLiner: 'Distribute asynchronous real-time events without tight subscriber coupling.',
    icon: Network,
    whereUsed: 'WebRTC Signaling, Android Telecom Audio Focus & Network Connectivity',
    explanation: 'Uses Kotlin SharedFlow and StateFlow to broadcast real-time call states, network interface transitions (4G to Wi-Fi), and incoming socket frames to multiple active observers.',
    benefit: 'Backpressure support with buffer overflow policies, avoiding UI thread freezing.',
    tabs: {
      contract: `// Reactive Observer Subject
interface NetworkMonitor {
    val networkState: SharedFlow<NetworkState>
}`,
      impl: `// SharedFlow Implementation
class NetworkMonitorImpl @Inject constructor(
    private val connectivityManager: ConnectivityManager
) : NetworkMonitor {
    private val _networkState = MutableSharedFlow<NetworkState>(
        replay = 1,
        onBufferOverflow = BufferOverflow.DROP_OLDEST
    )
    override val networkState: SharedFlow<NetworkState> = _networkState.asSharedFlow()

    fun onNetworkChanged(available: Boolean, isWifi: Boolean) {
        _networkState.tryEmit(NetworkState(available, isWifi))
    }
}`,
      usage: `// Subscriber Observer
class WebRtcClient @Inject constructor(private val networkMonitor: NetworkMonitor) {
    fun startObserving(scope: CoroutineScope) {
        networkMonitor.networkState
            .onEach { state -> if (!state.isAvailable) triggerIceRenegotiation() }
            .launchIn(scope)
    }
}`,
    },
  },
  {
    id: 'usecase',
    num: '05',
    name: 'Clean Use Case / Interactor',
    category: 'architectural',
    tag: 'Architectural / Domain',
    oneLiner: 'Single-responsibility business logic encapsulating pure domain operations.',
    icon: Cpu,
    whereUsed: 'ExecuteCallUseCase, AuthorizePaymentUseCase, SyncLedgerUseCase',
    explanation: 'Each use case implements operator fun invoke() and represents exactly one atomic business operation with zero Android SDK dependencies.',
    benefit: 'Instant JVM unit tests without needing emulators or Robolectric.',
    tabs: {
      contract: `// Pure Domain Use Case Blueprint
class AuthorizePaymentUseCase @Inject constructor(
    private val paymentRepo: PaymentRepository,
    private val securityManager: SecurityManager
) {
    suspend operator fun invoke(request: PaymentRequest): Result<Receipt> {
        val isValid = securityManager.verifyBiometricToken(request.authToken)
        if (!isValid) return Result.failure(SecurityException("Untrusted token"))
        return paymentRepo.submitTransaction(request)
    }
}`,
      impl: `// Pure Domain Entity
data class PaymentRequest(
    val amount: BigDecimal,
    val currency: String,
    val terminalId: String,
    val authToken: String
)`,
      usage: `// ViewModel Invoking Domain Use Case
viewModelScope.launch {
    authorizePaymentUseCase(request)
        .onSuccess { receipt -> _uiState.update { it.copy(receipt = receipt) } }
        .onFailure { error -> _sideEffect.send(ShowError(error.message)) }
}`,
    },
  },
  {
    id: 'chain',
    num: '06',
    name: 'Chain of Responsibility',
    category: 'behavioral',
    tag: 'Behavioral',
    oneLiner: 'Pass request payloads along a chain of handlers for automated auth & retries.',
    icon: Link,
    whereUsed: 'OkHttp Interceptor Chain, Token Refresh & Idempotency Header Injection',
    explanation: 'Pipelines HTTP requests through a chain of interceptors: AuthTokenInterceptor -> CryptographicSigningInterceptor -> RetryWithBackoffInterceptor.',
    benefit: 'Zero duplicated token refresh or header logic across API endpoints.',
    tabs: {
      contract: `// Interceptor Chain Handler
class AuthTokenInterceptor @Inject constructor(
    private val tokenManager: TokenManager
) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val original = chain.request()
        val token = tokenManager.getValidAccessToken()
        val authenticatedRequest = original.newBuilder()
            .header("Authorization", "Bearer $token")
            .build()
        return chain.proceed(authenticatedRequest)
    }
}`,
      impl: `// Idempotency Key Interceptor
class IdempotencyInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request().newBuilder()
            .header("X-Idempotency-Key", UUID.randomUUID().toString())
            .build()
        return chain.proceed(request)
    }
}`,
      usage: `// OkHttpClient Assembly
val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(authTokenInterceptor)
    .addInterceptor(idempotencyInterceptor)
    .addInterceptor(loggingInterceptor)
    .build()`,
    },
  },
  {
    id: 'di',
    num: '07',
    name: 'Dependency Injection (Hilt)',
    category: 'creational',
    tag: 'Creational / Structural',
    oneLiner: 'Invert control of object graphs across 15+ Gradle feature modules.',
    icon: Workflow,
    whereUsed: 'Hilt Scoped Components across Core, Domain, Data, and Feature modules',
    explanation: 'Declares modular dependency bindings so that feature modules compile against domain interfaces while Dagger/Hilt injects concrete implementations at runtime.',
    benefit: 'Eliminates tight coupling and makes every class instantly mockable in test suites.',
    tabs: {
      contract: `// Inversion of Control Module
@Module
@InstallIn(SingletonComponent::class)
abstract class MessagingModule {
    @Binds
    @Singleton
    abstract fun bindSignalingClient(impl: KtorWebSocketSignaling): SignalingClient
}`,
      impl: `// Constructor Injection in Use Case
class InitiateCallUseCase @Inject constructor(
    private val signalingClient: SignalingClient,
    private val telecomBridge: TelecomBridge
) {
    suspend operator fun invoke(callId: String) = signalingClient.sendOffer(callId)
}`,
      usage: `// ViewModel Injection
@HiltViewModel
class ChatViewModel @Inject constructor(
    private val initiateCallUseCase: InitiateCallUseCase
) : ViewModel()`,
    },
  },
  {
    id: 'factory',
    num: '08',
    name: 'Factory Method',
    category: 'creational',
    tag: 'Creational',
    oneLiner: 'Dynamically instantiate hardware peripheral drivers based on device models.',
    icon: Factory,
    whereUsed: 'POS Peripherals (Sunmi Thermal Printer, Pax Smartcard, Ingenico NFC)',
    explanation: 'Inspects Build.MODEL and device firmware at runtime to manufacture the correct driver instance without bloating business layers with vendor-specific SDK checks.',
    benefit: 'Adding a new hardware terminal requires zero modifications to retail checkout logic.',
    tabs: {
      contract: `// Driver Interface
interface ThermalPrinterDriver {
    suspend fun printReceipt(receipt: Receipt): PrintResult
}`,
      impl: `// Factory Instantiation
object PosDeviceFactory {
    fun createPrinter(deviceModel: String, context: Context): ThermalPrinterDriver {
        return when {
            deviceModel.startsWith("SUNMI") -> SunmiPrinterDriver(context)
            deviceModel.startsWith("PAX")   -> PaxPrinterDriver(context)
            else                            -> GenericEscPosPrinterDriver()
        }
    }
}`,
      usage: `// Client Usage
val printer = PosDeviceFactory.createPrinter(Build.MODEL, context)
printer.printReceipt(transactionReceipt)`,
    },
  },
  {
    id: 'builder',
    num: '09',
    name: 'Builder Pattern',
    category: 'creational',
    tag: 'Creational',
    oneLiner: 'Construct multi-attribute cryptographic requests and WebRTC constraints step by step.',
    icon: Sliders,
    whereUsed: 'ISO-8583 Financial Transaction Packets & WebRTC Peer Constraints',
    explanation: 'Prevents telescoping constructors and enforces strict validation checks (e.g., non-zero amounts, currency codes, terminal IDs) before finalizing immutable payloads.',
    benefit: 'Compile-time and runtime validation preventing malformed financial packets.',
    tabs: {
      contract: `// Immutable Payload with Builder
class TransactionPayload private constructor(val builder: Builder) {
    val amount: BigDecimal = builder.amount
    val terminalId: String = builder.terminalId
    val currency: String = builder.currency

    class Builder {
        var amount: BigDecimal = BigDecimal.ZERO; private set
        var terminalId: String = ""; private set
        var currency: String = "BDT"; private set

        fun setAmount(amt: BigDecimal) = apply { this.amount = amt }
        fun setTerminal(id: String) = apply { this.terminalId = id }
        fun setCurrency(cur: String) = apply { this.currency = cur }

        fun build(): TransactionPayload {
            require(amount > BigDecimal.ZERO) { "Amount must be strictly positive" }
            require(terminalId.isNotBlank()) { "Terminal ID required" }
            return TransactionPayload(this)
        }
    }
}`,
      impl: `// Builder Instantiation
val payload = TransactionPayload.Builder()
    .setTerminal("TERM_0091")
    .setAmount(BigDecimal("4500.00"))
    .setCurrency("BDT")
    .build()`,
      usage: `// Secure Submission
paymentEngine.dispatchPayload(payload)`,
    },
  },
  {
    id: 'adapter',
    num: '10',
    name: 'Adapter & Facade',
    category: 'structural',
    tag: 'Structural',
    oneLiner: 'Bridge incompatible vendor APIs and telephony SDKs behind clean suspendable contracts.',
    icon: Layers,
    whereUsed: 'Android Telecom ConnectionService & BiometricPrompt Wrapper',
    explanation: 'Converts legacy asynchronous callback APIs (like BiometricPrompt.AuthenticationCallback) into clean Kotlin coroutine suspend functions using suspendCancellableCoroutine.',
    benefit: 'Removes nested callback hell, making legacy Android APIs behave as modern coroutines.',
    tabs: {
      contract: `// Suspendable Domain Facade
interface BiometricAuthenticator {
    suspend fun authenticate(promptTitle: String): BiometricResult
}`,
      impl: `// Coroutine Adapter
class BiometricAuthAdapter @Inject constructor(
    private val activity: FragmentActivity
) : BiometricAuthenticator {
    override suspend fun authenticate(promptTitle: String): BiometricResult =
        suspendCancellableCoroutine { continuation ->
            val prompt = BiometricPrompt(activity, object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                    continuation.resume(BiometricResult.Success)
                }
                override fun onAuthenticationError(code: Int, err: CharSequence) {
                    continuation.resume(BiometricResult.Failed(err.toString()))
                }
            })
            prompt.authenticate(buildPromptInfo(promptTitle))
        }
}`,
      usage: `// Seamless Coroutine Call in ViewModel
viewModelScope.launch {
    when (val result = biometricAuth.authenticate("Confirm Payment")) {
        is BiometricResult.Success -> proceedWithTransaction()
        is BiometricResult.Failed  -> showError(result.reason)
    }
}`,
    },
  },
  {
    id: 'decorator',
    num: '11',
    name: 'Decorator / Wrapper',
    category: 'structural',
    tag: 'Structural',
    oneLiner: 'Dynamically add telemetry metrics and payload encryption without altering base classes.',
    icon: Shield,
    whereUsed: 'Encrypted Media Channels & Real-Time Telemetry Event Loggers',
    explanation: 'Wraps base transport streams with transparent AES-256 GCM encryption and performance timing metrics without changing the calling client API.',
    benefit: 'Cross-cutting concerns (encryption, logging) stay isolated from core transport logic.',
    tabs: {
      contract: `// Base Component Contract
interface DataStream {
    suspend fun write(data: ByteArray): Int
    suspend fun read(): ByteArray
}`,
      impl: `// Encrypted Decorator Wrapper
class EncryptedDataStreamDecorator(
    private val wrapped: DataStream,
    private val cipherEngine: CipherEngine
) : DataStream {
    override suspend fun write(data: ByteArray): Int {
        val encrypted = cipherEngine.encrypt(data)
        return wrapped.write(encrypted)
    }

    override suspend fun read(): ByteArray {
        val raw = wrapped.read()
        return cipherEngine.decrypt(raw)
    }
}`,
      usage: `// Layering Decorators
val rawSocketStream = SocketDataStream()
val secureStream = EncryptedDataStreamDecorator(rawSocketStream, aesGcmCipher)
secureStream.write("{\"callId\":\"xyz\"}".toByteArray())`,
    },
  },
  {
    id: 'command',
    num: '12',
    name: 'Command Pattern',
    category: 'behavioral',
    tag: 'Behavioral',
    oneLiner: 'Encapsulate offline requests as persistent command objects for atomic rollback & replay.',
    icon: FileCode,
    whereUsed: 'POS Transaction Replay Queue & WebRTC ICE Candidate Buffer',
    explanation: 'Packages actions into serializable command objects that can be saved to SQLite, re-queued during network outages, and executed sequentially with atomic rollback.',
    benefit: 'Guaranteed eventual consistency and resilient disaster recovery during crashes.',
    tabs: {
      contract: `// Command Contract
interface TransactionCommand {
    val commandId: String
    suspend fun execute(): Boolean
    suspend fun undo(): Boolean
}`,
      impl: `// Concrete Charge Command
class ChargeCustomerCommand(
    override val commandId: String,
    private val paymentGateway: PaymentGateway,
    private val amount: BigDecimal
) : TransactionCommand {
    override suspend fun execute(): Boolean = paymentGateway.charge(amount)
    override suspend fun undo(): Boolean = paymentGateway.refund(amount)
}`,
      usage: `// Persistent Command Invoker Queue
class OfflineCommandQueue @Inject constructor(private val localLedger: LedgerDao) {
    suspend fun processQueue() {
        val pending = localLedger.getPendingCommands()
        pending.forEach { cmd ->
            val success = cmd.execute()
            if (success) localLedger.markCompleted(cmd.commandId)
        }
    }
}`,
    },
  },
];

export default function Patterns() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatternIndex, setSelectedPatternIndex] = useState(0);
  const [activeCodeTab, setActiveCodeTab] = useState('contract'); // 'contract' | 'impl' | 'usage'
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

  const filteredPatterns = patterns.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.oneLiner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.whereUsed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const active = filteredPatterns[selectedPatternIndex] || filteredPatterns[0] || patterns[0];

  const handleCopyCode = () => {
    const code = active.tabs[activeCodeTab] || active.tabs.contract;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)', normal: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
      if (ctx.conditions.reduceMotion) return;

      gsap.from('.patterns-heading-el', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      });

      gsap.from('.pattern-card-item', {
        scrollTrigger: { trigger: '.patterns-cards-grid', start: 'top 75%' },
        y: 25, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power3.out',
      });
    }, containerRef);
  }, { scope: containerRef });

  return (
    <section id="patterns" ref={containerRef} className="section-padding bg-surface-secondary/20 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="patterns-heading-el mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Architecture & Patterns</p>
            <h2 className="section-heading mb-4">
              Software <span className="text-brand">Design Patterns Lab</span>
            </h2>
            <p className="section-subtitle">
              12 battle-tested architectural, structural, creational, and behavioral patterns applied across production mobile codebases.
            </p>
          </div>

          {/* Live Search Input */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Filter pattern e.g. MVI, Chain, Builder..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedPatternIndex(0);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-card border border-border rounded-xl text-xs font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedPatternIndex(0);
              }}
              className={`px-4 py-2 rounded-button text-xs font-mono transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-brand text-surface-primary font-semibold shadow-glow'
                  : 'bg-surface-elevated text-text-secondary hover:text-brand hover:border-brand border border-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Patterns Selection Grid (12 Items) */}
        <div className="patterns-cards-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 mb-10">
          {filteredPatterns.map((p, idx) => {
            const Icon = p.icon;
            const isSelected = active.id === p.id;

            return (
              <div
                key={p.id}
                onClick={() => setSelectedPatternIndex(idx)}
                className={`pattern-card-item card-base p-4 cursor-pointer transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'border-brand bg-surface-elevated shadow-glow -translate-y-1'
                    : 'hover:border-border-active hover:-translate-y-0.5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono text-xs text-brand font-bold">
                      {p.num}
                    </span>
                    <div
                      className={`p-1.5 rounded-lg ${
                        isSelected
                          ? 'bg-brand/20 text-brand'
                          : 'bg-surface-secondary text-text-muted group-hover:text-brand transition-colors'
                      }`}
                    >
                      <Icon size={15} />
                    </div>
                  </div>

                  <h3
                    className={`font-heading font-bold text-sm md:text-base mb-1 transition-colors ${
                      isSelected ? 'text-brand' : 'text-text-primary'
                    }`}
                  >
                    {p.name}
                  </h3>

                  <p className="font-body text-[11px] text-text-secondary line-clamp-2 leading-relaxed">
                    {p.oneLiner}
                  </p>
                </div>

                <div className="pt-2.5 mt-2.5 border-t border-border-subtle flex items-center justify-between font-mono text-[10px]">
                  <span className="text-text-muted uppercase text-[9px]">{p.tag.split('/')[0]}</span>
                  <span className={`inline-flex items-center gap-0.5 ${isSelected ? 'text-brand font-bold' : 'text-text-muted'}`}>
                    {isSelected ? 'Viewing' : 'Inspect'} <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Pattern Interactive IDE & Architecture Inspector */}
        <div className="card-base p-6 md:p-10 bg-surface-card border-brand/50 shadow-glow-lg relative overflow-hidden animate-in fade-in duration-300">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column — Architectural Explanation & Real Production Application */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-brand uppercase tracking-wider mb-1">
                  <span>Pattern {active.num}</span>
                  <span>·</span>
                  <span>{active.tag}</span>
                </div>

                <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-text-primary">
                  {active.name}
                </h3>

                <p className="font-heading text-sm text-brand/90 font-medium mt-2 leading-relaxed">
                  "{active.oneLiner}"
                </p>
              </div>

              {/* Where Used in Production */}
              <div className="p-4 rounded-xl bg-surface-secondary border border-border-subtle space-y-2">
                <div className="flex items-center gap-2 text-text-primary font-heading font-semibold text-xs uppercase tracking-wider">
                  <CheckCircle2 size={15} className="text-brand flex-shrink-0" />
                  Production Application in Portfolio
                </div>
                <p className="font-mono text-xs text-text-primary leading-relaxed">
                  {active.whereUsed}
                </p>
              </div>

              {/* Engineering Rationale */}
              <div className="space-y-2">
                <h5 className="font-mono text-xs text-text-muted uppercase tracking-wider">
                  Architectural Rationale & Tradeoffs
                </h5>
                <p className="font-body text-xs md:text-sm text-text-secondary leading-relaxed">
                  {active.explanation}
                </p>
              </div>

              {/* Production Benefit */}
              <div className="p-3.5 rounded-xl bg-surface-terminal border border-brand/20 flex items-start gap-2.5">
                <Sparkles size={16} className="text-brand flex-shrink-0 mt-0.5" />
                <p className="font-mono text-xs text-text-secondary leading-relaxed">
                  <strong className="text-brand">Production ROI:</strong> {active.benefit}
                </p>
              </div>
            </div>

            {/* Right Column — Interactive Kotlin Code Viewer with Tab Switcher */}
            <div className="lg:col-span-7 space-y-3">
              {/* Window Bar with Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 bg-surface-elevated p-1 rounded-lg border border-border">
                  <button
                    onClick={() => setActiveCodeTab('contract')}
                    className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                      activeCodeTab === 'contract'
                        ? 'bg-brand text-surface-primary font-bold'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    Contract Interface
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('impl')}
                    className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                      activeCodeTab === 'impl'
                        ? 'bg-brand text-surface-primary font-bold'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    Implementation
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('usage')}
                    className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                      activeCodeTab === 'usage'
                        ? 'bg-brand text-surface-primary font-bold'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    Client Usage
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-secondary text-text-secondary hover:text-brand border border-border text-xs font-mono transition-colors self-start sm:self-auto"
                >
                  {copied ? <Check size={13} className="text-brand" /> : <Copy size={13} />}
                  {copied ? 'Copied Snippet' : 'Copy Kotlin'}
                </button>
              </div>

              {/* Code Terminal Box */}
              <div className="bg-surface-terminal rounded-xl border border-border overflow-hidden font-mono text-xs shadow-card">
                <div className="px-4 py-2.5 bg-surface-elevated border-b border-border-subtle flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-2 text-[11px] text-text-muted">{active.id}_{activeCodeTab}.kt</span>
                  </div>
                  <span className="text-[10px] text-brand">Kotlin 2.0 / Coroutines</span>
                </div>

                <pre className="p-5 overflow-x-auto text-[12px] leading-relaxed text-text-primary max-h-[380px]">
                  <code>{active.tabs[activeCodeTab] || active.tabs.contract}</code>
                </pre>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-text-muted pt-1">
                <span>Domain Boundary · Inversion of Control</span>
                <span className="text-brand">Production Verified ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
