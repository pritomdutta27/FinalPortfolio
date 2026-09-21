const techItems = [
  'ANDROID', 'KOTLIN', 'JETPACK COMPOSE', 'CLEAN ARCHITECTURE', 'WEBRTC',
  'FIREBASE', 'KTOR', 'SPRING', 'POSTGRESQL', 'PAYMENT SYSTEMS',
  'SWIFT', 'FLUTTER', 'DOCKER', 'MVVM', 'MVI', 'REST APIs',
];

export default function TechStrip() {
  const items = [...techItems, ...techItems];

  return (
    <div className="relative overflow-hidden border-y border-border-subtle bg-surface-secondary/50 py-5">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-primary to-transparent z-10" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-primary to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-4 mx-6 font-mono text-xs tracking-widest text-text-muted"
          >
            {item}
            <span className="text-brand/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
