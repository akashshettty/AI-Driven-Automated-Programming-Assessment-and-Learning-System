import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Code, Zap, Brain, BarChart3, MessageSquare, ArrowRight, Star, Users, CheckCircle, Github, Twitter } from 'lucide-react';

const features = [
  { icon: <Zap size={22} color="#06B6D4" />, title: 'Smart Hints', desc: 'Get progressive hints instead of direct answers. Learn to think like an engineer.', color: 'var(--cyan)' },
  { icon: <Brain size={22} color="#8B5CF6" />, title: 'AI Analysis', desc: 'Detect logic errors, memory leaks, and bugs instantly with AI-powered code review.', color: 'var(--purple)' },
  { icon: <BarChart3 size={22} color="#10B981" />, title: 'Complexity Checker', desc: 'Understand time & space complexity of your solution with detailed explanations.', color: 'var(--green)' },
  { icon: <MessageSquare size={22} color="#F59E0B" />, title: 'AI Chat Mentor', desc: 'Ask doubts while solving. Your personal AI mentor is always available.', color: '#F59E0B' },
];

const stats = [
  { value: '100+', label: 'Problems' },
  { value: 'AI', label: 'Powered Learning' },
  { value: 'Real‑time', label: 'Feedback' },
  { value: 'Interview', label: 'Ready Practice' },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', overflowY: 'auto', overflowX: 'hidden' }}>

      {/* ── Navbar ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        background: 'rgba(11,17,32,0.92)',
        borderBottom: '1px solid var(--border)',
        padding: '0 2rem', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Code size={22} color="var(--cyan)" style={{ filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.5))' }} />
          <span style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.03em' }}>
            Code<span style={{ background: 'var(--grad-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Mentor</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {[['Home', '/'], ['Problems', '/problems'], ['Features', '#features']].map(([label, href]) => (
            <Link key={label} to={href} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
              {label}
            </Link>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Log In</button>
          <button className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
            onClick={() => navigate('/problems')}>Sign Up Free</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center', position: 'relative' }}>
        {/* Background glow orbs */}
        <div style={{ position: 'absolute', top: '20%', left: '15%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', right: '15%', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', borderRadius: 99, background: 'var(--cyan-dim)', border: '1px solid rgba(6,182,212,0.25)', marginBottom: '1.5rem' }}>
          <Star size={12} color="var(--cyan)" fill="var(--cyan)" />
          <span style={{ fontSize: '0.75rem', color: 'var(--cyan)', fontWeight: 600, letterSpacing: '0.06em' }}>AI-POWERED CODING PLATFORM</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: '1.25rem', maxWidth: 780, margin: '0 auto 1.25rem' }}>
          Master Coding Interviews<br />
          <span style={{ background: 'var(--grad-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            with AI Assistance
          </span>
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: 580, margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
          Solve coding problems with instant hints, bug detection, analysis, AI chat, and personalized learning guidance.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '0.95rem', borderRadius: 'var(--r-xl)' }}
            onClick={() => navigate('/problems')}>
            Start Solving <ArrowRight size={16} style={{ marginLeft: 4 }} />
          </button>
          <button className="btn" style={{ padding: '0.75rem 2rem', fontSize: '0.95rem', borderRadius: 'var(--r-xl)' }}
            onClick={() => navigate('/problems')}>
            Explore Problems
          </button>
        </div>

        {/* Hero preview strip */}
        <div style={{ marginTop: '3.5rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[{ c: 'var(--green)', l: 'Easy', n: '64' }, { c: '#F59E0B', l: 'Medium', n: '28' }, { c: 'var(--danger)', l: 'Hard', n: '8' }].map(({ c, l, n }) => (
            <div key={l} style={{ padding: '0.4rem 1rem', borderRadius: 99, background: `color-mix(in srgb, ${c} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${c} 30%, transparent)`, fontSize: '0.8rem', color: c, fontWeight: 600 }}>
              {n} {l}
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '2rem 2rem', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(17,24,39,0.5)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
          {stats.map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, background: 'var(--grad-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', letterSpacing: '0.02em' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section id="features" style={{ padding: '5rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>
            Why CodeMentor?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 520, margin: '0 auto' }}>
            We don't just give problems. We give you an AI mentor that guides you through every step.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {features.map(({ icon, title, desc, color }) => (
            <div key={title} className="card" style={{
              borderRadius: 'var(--r-xl)', padding: '1.75rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 12px 40px color-mix(in srgb, ${color} 15%, transparent)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ width: 46, height: 46, borderRadius: 'var(--r-lg)', background: `color-mix(in srgb, ${color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                {icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '3rem 2rem', borderRadius: 'var(--r-2xl)', background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(139,92,246,0.08))', border: '1px solid rgba(6,182,212,0.15)' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem' }}>Ready to level up?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
            Start solving problems with your AI mentor today. It's completely free.
          </p>
          <button className="btn btn-primary" style={{ padding: '0.8rem 2.5rem', fontSize: '1rem', borderRadius: 'var(--r-xl)' }}
            onClick={() => navigate('/problems')}>
            Start Now — It's Free
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Code size={16} color="var(--cyan)" />
          <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Code<span style={{ color: 'var(--cyan)' }}>Mentor</span></span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
          {['About', 'Contact', 'Terms', 'Privacy'].map(l => (
            <span key={l} style={{ color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>© 2025 CodeMentor. Built with AI, for engineers.</p>
      </footer>
    </div>
  );
}
