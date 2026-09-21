import { useRef, useEffect, useState } from 'react';

const skills = [
  { name: 'Kotlin', level: 95 },
  { name: 'Android', level: 95 },
  { name: 'Compose', level: 88 },
  { name: 'Architecture', level: 90 },
  { name: 'Backend', level: 75 },
];

const floatingBadges = [
  { label: 'Kotlin', x: '-10%', y: '5%' },
  { label: 'Compose', x: '85%', y: '0%' },
  { label: 'Android', x: '90%', y: '30%' },
  { label: 'Ktor', x: '-15%', y: '55%' },
  { label: 'WebRTC', x: '88%', y: '65%' },
  { label: 'Firebase', x: '-8%', y: '85%' },
  { label: 'PostgreSQL', x: '80%', y: '90%' },
];

export default function TerminalCard() {
  const [typedLines, setTypedLines] = useState(0);
  const terminalRef = useRef(null);

  useEffect(() => {
    const totalLines = 4;
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setTypedLines(current);
      if (current >= totalLines) clearInterval(interval);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative" ref={terminalRef}>
      {/* Floating Badges */}
      {floatingBadges.map((badge, i) => (
        <div
          key={badge.label}
          className={`floating-badge absolute hidden lg:block px-3 py-1.5 bg-surface-elevated border border-border rounded-badge
                      font-mono text-xs text-text-secondary z-10
                      ${i % 2 === 0 ? 'animate-float' : i % 3 === 0 ? 'animate-float-delayed' : 'animate-float-slow'}`}
          style={{ left: badge.x, top: badge.y }}
        >
          {badge.label}
        </div>
      ))}

      {/* Terminal Window */}
      <div className="relative bg-surface-terminal border border-border rounded-card overflow-hidden shadow-card">
        {/* Title Bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-surface-card/50">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-text-muted">pritom@dev ~ terminal</span>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm space-y-4">
          {/* Command */}
          <div className={`transition-opacity duration-300 ${typedLines >= 1 ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-text-muted">$</span>{' '}
            <span className="text-text-primary">whoami</span>
          </div>

          {/* Output */}
          <div className={`space-y-1 transition-opacity duration-300 ${typedLines >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-brand">pritom@developer</p>
            <p className="text-text-primary font-semibold">Senior Android Engineer</p>
            <p className="text-text-secondary">6+ years experience</p>
          </div>

          {/* Skill Bars */}
          <div className={`space-y-3 pt-2 transition-opacity duration-500 ${typedLines >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            {skills.map((skill) => (
              <div key={skill.name} className="flex items-center gap-3">
                <span className="text-text-secondary w-28 text-xs">{skill.name}</span>
                <div className="flex-1 h-3 bg-surface-elevated rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-sm transition-all duration-1000 ease-out"
                    style={{
                      width: typedLines >= 3 ? `${skill.level}%` : '0%',
                      transitionDelay: '0.3s',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Status */}
          <div className={`pt-2 transition-opacity duration-300 ${typedLines >= 4 ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-text-muted">status: </span>
            <span className="text-brand">building...</span>
            <span className="animate-blink text-brand ml-0.5">▎</span>
          </div>
        </div>
      </div>
    </div>
  );
}
