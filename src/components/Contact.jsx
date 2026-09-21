import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail, Copy, Check, Send, FileText, MessageSquare, Clock, MapPin, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedInIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', projectType: 'Mobile Architecture', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef(null);

  const email = 'pritomdutta27@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // open mailto with filled details
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        `[${formData.projectType}] Project Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Hi Pritom,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      )}`;
    }, 800);
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ reduceMotion: '(prefers-reduced-motion: reduce)', normal: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
      if (ctx.conditions.reduceMotion) return;

      gsap.from('.contact-header', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      });

      gsap.from('.contact-content', {
        scrollTrigger: { trigger: '.contact-grid', start: 'top 75%' },
        y: 30, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
      });
    }, containerRef);
  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="contact-header mb-14">
          <p className="eyebrow mb-4">Start a Conversation</p>
          <h2 className="section-heading mb-4">
            Have a difficult engineering problem?{' '}
            <span className="text-brand">Let's build together.</span>
          </h2>
          <p className="section-subtitle">
            Let's build something reliable, scalable, and genuinely useful. Available for senior mobile roles, architecture design, and real-time VoIP consultations.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="contact-grid grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column — Direct Contact Details & Actions */}
          <div className="lg:col-span-5 contact-content space-y-6">
            <div className="card-base p-6 md:p-8 bg-surface-card border-brand/30 shadow-glow space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand border border-brand/20 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-brand animate-pulse-green" />
                  Available for Senior Roles
                </div>

                <h3 className="font-heading font-bold text-2xl text-text-primary">
                  Direct Outreach
                </h3>

                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  I typically respond within 24 hours. Whether you need an architecture review, guidance on WebRTC pipelines, or a lead mobile engineer.
                </p>
              </div>

              {/* Direct Email Bar */}
              <div className="p-3 bg-surface-primary rounded-xl border border-border space-y-2">
                <span className="font-mono text-[11px] text-text-muted uppercase tracking-wider">Email Address</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs md:text-sm text-text-primary truncate">{email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-card text-text-secondary hover:text-brand border border-border text-xs font-mono transition-colors flex-shrink-0"
                  >
                    {copied ? <Check size={12} className="text-brand" /> : <Copy size={12} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Location & Timezone Details */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs text-text-muted">
                <div className="p-3 rounded-lg bg-surface-secondary/70 border border-border-subtle space-y-1">
                  <div className="flex items-center gap-1.5 text-text-primary">
                    <MapPin size={13} className="text-brand" />
                    <span>Location</span>
                  </div>
                  <p className="text-[11px] text-text-secondary">Dhaka, Bangladesh</p>
                </div>

                <div className="p-3 rounded-lg bg-surface-secondary/70 border border-border-subtle space-y-1">
                  <div className="flex items-center gap-1.5 text-text-primary">
                    <Clock size={13} className="text-brand" />
                    <span>Timezone</span>
                  </div>
                  <p className="text-[11px] text-text-secondary">UTC+6 (Global Remote)</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2 border-t border-border-subtle">
                <a
                  href={`mailto:${email}?subject=Project%20Inquiry%20-%20Pritom%20Dutta`}
                  className="w-full btn-primary justify-center text-xs"
                >
                  <Send size={14} />
                  Start a Conversation
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://github.com/pritomdutta27"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary justify-center text-xs"
                  >
                    <GithubIcon size={14} />
                    View GitHub ↗
                  </a>

                  <a
                    href="mailto:pritomdutta27@gmail.com?subject=Resume%20Request%20-%20Pritom%20Dutta"
                    className="btn-secondary justify-center text-xs"
                  >
                    <FileText size={14} />
                    Download Resume
                  </a>
                </div>
              </div>
            </div>

            {/* Social profiles bar */}
            <div className="card-base p-4 bg-surface-secondary/40 border-border flex items-center justify-between">
              <span className="font-mono text-xs text-text-muted">Connect on Socials:</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/pritomdutta27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-surface-elevated text-text-secondary hover:text-brand border border-border transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={15} />
                </a>
                <a
                  href="https://www.linkedin.com/in/pritomdutta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-surface-elevated text-text-secondary hover:text-brand border border-border transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedInIcon size={15} />
                </a>
                <a
                  href={`mailto:${email}`}
                  className="p-2 rounded-lg bg-surface-elevated text-text-secondary hover:text-brand border border-border transition-colors"
                  aria-label="Email"
                >
                  <Mail size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column — Interactive Message & Inquiry Form */}
          <div className="lg:col-span-7 contact-content">
            <div className="card-base p-6 md:p-8 bg-surface-card border-border">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-subtle">
                <div className="flex items-center gap-2 font-mono text-xs text-brand">
                  <MessageSquare size={16} />
                  <span>Send Direct Message</span>
                </div>
                <span className="font-mono text-[11px] text-text-muted">Instant Dispatch</span>
              </div>

              {submitted ? (
                <div className="p-8 text-center space-y-4 bg-surface-terminal rounded-xl border border-brand/40 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-brand/20 text-brand flex items-center justify-center mx-auto shadow-glow">
                    <Check size={24} />
                  </div>
                  <h4 className="font-heading font-bold text-xl text-text-primary">
                    Message Prepared!
                  </h4>
                  <p className="font-body text-xs md:text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                    Opening your default email client with your message details. Alternatively, email directly to <span className="text-brand">{email}</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary text-xs mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-text-secondary">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Henderson"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-xs font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-text-secondary">Your Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-surface-elevated border border-border rounded-lg text-xs font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-text-secondary">Inquiry Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Mobile Architecture', 'WebRTC / VoIP', 'Full-time Role', 'Fintech / POS'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`p-2 text-center rounded-lg font-mono text-[11px] transition-colors border ${
                            formData.projectType === type
                              ? 'bg-brand/20 border-brand text-brand font-semibold'
                              : 'bg-surface-elevated border-border text-text-muted hover:text-text-primary'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-text-secondary">Project Details or Role Overview *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your technical challenge, platform goals, or engineering timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-lg text-xs font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full btn-primary justify-center text-xs py-3"
                  >
                    <Send size={14} />
                    Send Inquiry to Pritom
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
