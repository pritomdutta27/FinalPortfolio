import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Metrics from './components/Metrics';
import Projects from './components/Projects';
import Architecture from './components/Architecture';
import Philosophy from './components/Philosophy';
import TechStack from './components/TechStack';
import Patterns from './components/Patterns';
import Experience from './components/Experience';
import GitHub from './components/GitHub';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-surface-primary text-text-primary selection:bg-brand/30 selection:text-text-primary relative selection:text-white">
      {/* Dynamic Cursor Glow (subtle ambient spotlight) */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 opacity-60 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(93, 208, 139, 0.06), transparent 80%)`,
        }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Metrics />
        <Projects />
        <Architecture />
        <Philosophy />
        <TechStack />
        <Patterns />
        <Experience />
        <GitHub />
        <Blog />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
