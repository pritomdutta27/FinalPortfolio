import { ArrowUp, Terminal, Heart } from 'lucide-react';
import { GithubIcon, LinkedInIcon, TwitterXIcon } from './Icons';
import logoIcon from '../assets/logo-icon.png';

const footerNav = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Articles', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-border-subtle bg-surface-primary pt-16 pb-12 relative overflow-hidden">
      {/* Subtle bottom ambient gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brand/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border-subtle">
          {/* Brand & Persona (Cols 5) */}
          <div className="md:col-span-5 space-y-4 text-center md:text-left">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-flex items-center gap-2.5 group"
            >
              <img src={logoIcon} alt="Icon" className="w-6 h-6 object-contain" />
              <span className="font-heading font-extrabold text-xl text-text-primary tracking-tight group-hover:text-brand transition-colors">
                Pritom Dutta
              </span>
            </a>

            <p className="font-body text-xs text-text-secondary leading-relaxed max-w-sm">
              Senior Android Engineer & Mobile Systems Architect. 6+ years specializing in native Kotlin, Jetpack Compose, WebRTC real-time calling, and distributed backend systems.
            </p>

            <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-[11px] text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              <span>Available for Senior Roles & Architecture Consulting</span>
            </div>
          </div>

          {/* Quick Links (Cols 4) */}
          <div className="md:col-span-4 space-y-3 text-center md:text-left">
            <h5 className="font-mono text-xs text-brand uppercase tracking-wider">
              Navigation
            </h5>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
              {footerNav.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-body text-xs text-text-secondary hover:text-brand transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Socials & Back to Top (Cols 3) */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end justify-between space-y-4">
            <div className="space-y-2 text-center md:text-right">
              <h5 className="font-mono text-xs text-brand uppercase tracking-wider">
                Network
              </h5>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://github.com/pritomdutta27"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2.5 rounded-lg bg-surface-elevated text-text-secondary hover:text-brand border border-border transition-colors hover:border-brand"
                >
                  <GithubIcon size={16} />
                </a>

                <a
                  href="https://www.linkedin.com/in/pritomdutta"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-lg bg-surface-elevated text-text-secondary hover:text-brand border border-border transition-colors hover:border-brand"
                >
                  <LinkedInIcon size={16} />
                </a>

                <a
                  href="mailto:pritomdutta27@gmail.com"
                  aria-label="Email"
                  className="p-2.5 rounded-lg bg-surface-elevated text-text-secondary hover:text-brand border border-border transition-colors hover:border-brand"
                >
                  <Terminal size={16} />
                </a>

                <button
                  onClick={scrollToTop}
                  aria-label="Scroll to top"
                  className="p-2.5 rounded-lg bg-brand text-surface-primary hover:bg-brand-hover transition-all duration-300 hover:-translate-y-0.5 shadow-glow"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
            </div>

            <span className="font-mono text-[11px] text-text-muted">
              Dhaka, Bangladesh · UTC+6
            </span>
          </div>
        </div>

        {/* Sub-Footer Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-text-muted gap-4">
          <p>© {new Date().getFullYear()} Pritom Dutta. All rights reserved.</p>
          <p className="text-center sm:text-right text-text-secondary">
            Built with <span className="text-brand">Kotlin-thinking</span> and curiosity.
          </p>
        </div>
      </div>
    </footer>
  );
}
