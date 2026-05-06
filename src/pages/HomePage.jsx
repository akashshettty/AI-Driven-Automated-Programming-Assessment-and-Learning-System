import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Code, Zap, Brain, BarChart3, MessageSquare, ArrowRight, Star } from 'lucide-react';

const features = [
  { icon: <Zap size={18} />, title: 'Smart Hints', desc: 'Get progressive, Socratic hints — not direct answers. Build the thinking patterns of top engineers.' },
  { icon: <Brain size={18} />, title: 'AI Code Review', desc: 'Detect logic errors, memory leaks, and edge cases instantly with deep AI-powered analysis.' },
  { icon: <BarChart3 size={18} />, title: 'Complexity Analysis', desc: 'Understand the exact time & space complexity of your code with clear, detailed breakdowns.' },
  { icon: <MessageSquare size={18} />, title: 'AI Chat Mentor', desc: 'Ask doubts, get explanations, and reason through approaches with your always-on AI mentor.' },
];

const stats = [
  { value: '100+', label: 'Problems' },
  { value: 'AI', label: 'Powered Learning' },
  { value: 'Real-time', label: 'Feedback' },
  { value: 'Interview', label: 'Ready Practice' },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', overflowY: 'auto', overflowX: 'hidden' }}>

      {/* ── Navbar ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(8,8,8,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 2.5rem', height: 62,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <div style={{
            width: 28, height: 28, borderRadius: 'var(--r-sm)',
            background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Code size={14} color="#000" strokeWidth={2.5} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', letterSpacing: '-0.03em' }}>
            Code<span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>Mentor</span>
          </span>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {[['Home', '/'], ['Problems', '/problems'], ['Features', '#features']].map(([label, href]) => (
            <Link key={label} to={href} style={{
              color: 'var(--text-secondary)', textDecoration: 'none',
              fontSize: '0.85rem', fontWeight: 500, transition: 'color 0.2s',
              letterSpacing: '0.01em',
            }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
          <button className="btn" style={{ padding: '0.38rem 1rem', fontSize: '0.8rem' }}>Log In</button>
          <button className="btn btn-primary" style={{ padding: '0.38rem 1rem', fontSize: '0.8rem' }}
            onClick={() => navigate('/problems')}>Sign Up Free</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: '8rem 2rem 6rem', textAlign: 'center', position: 'relative' }}>
        {/* Subtle spotlight */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 300, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }} />

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
          padding: '0.3rem 1rem', borderRadius: 99,
          border: '1px solid var(--border-mid)',
          background: 'rgba(255,255,255,0.03)',
          marginBottom: '2rem',
        }}>
          <Star size={10} color="#fff" fill="#fff" />
          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            AI-Powered Coding Platform
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
          fontWeight: 900, lineHeight: 1.1,
          letterSpacing: '-0.04em',
          color: '#fff',
          marginBottom: '1.35rem',
          maxWidth: 820, margin: '0 auto 1.35rem',
        }}>
          Master Coding Interviews<br />
          <span style={{ color: 'var(--text-secondary)', fontWeight: 300 }}>with AI Assistance</span>
        </h1>

        <p style={{
          fontSize: '1rem', color: 'var(--text-secondary)',
          maxWidth: 500, margin: '0 auto 2.75rem',
          lineHeight: 1.85, fontWeight: 400,
        }}>
          Solve coding problems with instant hints, bug detection, complexity analysis, and personalized AI mentorship.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <button className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '0.9rem', borderRadius: 'var(--r-lg)' }}
            onClick={() => navigate('/problems')}>
            Start Solving <ArrowRight size={15} />
          </button>
          <button className="btn" style={{ padding: '0.75rem 2rem', fontSize: '0.9rem', borderRadius: 'var(--r-lg)' }}
            onClick={() => navigate('/problems')}>
            Explore Problems
          </button>
        </div>

        {/* Difficulty chips */}
        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: '64 Easy', color: 'var(--green)', bg: 'var(--green-dim)', border: 'rgba(52,211,153,0.2)' },
            { label: '28 Medium', color: 'var(--warning)', bg: 'var(--warning-dim)', border: 'rgba(251,191,36,0.2)' },
            { label: '8 Hard', color: 'var(--danger)', bg: 'var(--danger-dim)', border: 'rgba(248,113,113,0.2)' },
          ].map(({ label, color, bg, border }) => (
            <span key={label} style={{
              padding: '0.28rem 0.85rem',
              borderRadius: 99,
              background: bg,
              border: `1px solid ${border}`,
              fontSize: '0.75rem', color, fontWeight: 600,
            }}>{label}</span>
          ))}
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-surface)',
        padding: '0',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        }}>
          {stats.map(({ value, label }, i) => (
            <div key={label} style={{
              padding: '1.75rem 1rem', textAlign: 'center',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', letterSpacing: '0.03em' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section id="features" style={{ padding: '6rem 2rem', maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Features
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.035em', color: '#fff', marginBottom: '0.75rem' }}>
            Why CodeMentor?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
            We don't just give you problems. We give you a personal AI mentor for every step of your journey.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', overflow: 'hidden' }}>
          {features.map(({ icon, title, desc }, i) => (
            <div key={title} style={{
              padding: '2rem 1.75rem',
              background: 'var(--bg-card)',
              borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
              borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
              transition: 'background 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}>
              <div style={{
                width: 38, height: 38, borderRadius: 'var(--r-sm)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-mid)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)',
                marginBottom: '1.25rem',
              }}>
                {icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.55rem', color: '#fff', letterSpacing: '-0.01em' }}>{title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: '0 2rem 6rem' }}>
        <div style={{
          maxWidth: 720, margin: '0 auto',
          padding: '3.5rem 2.5rem',
          borderRadius: 'var(--r-2xl)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-mid)',
          textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Inner glow */}
          <div style={{
            position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
            width: 400, height: 150, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, transparent 70%)',
          }} />
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Get Started
          </p>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '0.85rem' }}>
            Ready to level up?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: 400, margin: '0 auto 2rem' }}>
            Start solving with your AI mentor today.<br />Completely free to get started.
          </p>
          <button className="btn btn-primary" style={{ padding: '0.8rem 2.25rem', fontSize: '0.9rem', borderRadius: 'var(--r-lg)' }}
            onClick={() => navigate('/problems')}>
            Start Now — It's Free
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-surface)', padding: '2.5rem' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <div style={{ width: 22, height: 22, borderRadius: 'var(--r-xs)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code size={12} color="#000" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fff' }}>CodeMentor</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['About', 'Contact', 'Terms', 'Privacy'].map(l => (
              <span key={l} style={{ color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>{l}</span>
            ))}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>© 2025 CodeMentor</p>
        </div>
      </footer>
    </div>
  );
}
