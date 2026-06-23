import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code, Search, CheckCircle, Circle, ChevronRight } from 'lucide-react';
import { problems } from '../data/problems';

const diffStyle = {
  Easy:   { color: '#34D399', bg: 'rgba(52,211,153,0.08)' },
  Medium: { color: '#FBBF24', bg: 'rgba(251,191,36,0.08)' },
  Hard:   { color: '#F87171', bg: 'rgba(248,113,113,0.08)' },
};

const categories = ['All', 'Arrays', 'Stack', 'DP', 'HashMap'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

export default function ProblemsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('All');
  const [catFilter, setCatFilter] = useState('All');
  const [solved] = useState(new Set());

  const filtered = useMemo(() => problems.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchDiff = diffFilter === 'All' || p.difficulty === diffFilter;
    const matchCat  = catFilter  === 'All' || p.category  === catFilter;
    return matchSearch && matchDiff && matchCat;
  }), [search, diffFilter, catFilter]);

  const filterBtn = (label, active, onClick) => (
    <button key={label} onClick={onClick} style={{
      padding: '0.32rem 0.8rem',
      borderRadius: 'var(--r-sm)',
      fontSize: '0.75rem', fontWeight: 600,
      border: `1px solid ${active ? 'var(--border-white)' : 'var(--border)'}`,
      background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
      color: active ? '#fff' : 'var(--text-muted)',
      cursor: 'pointer', transition: 'all 0.15s',
    }}>
      {label}
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

      {/* Navbar */}
      <nav style={{
        height: 60, background: 'rgba(8,8,8,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', textDecoration: 'none' }}>
            <div style={{ width: 26, height: 26, borderRadius: 'var(--r-xs)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code size={13} color="#000" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff', letterSpacing: '-0.03em' }}>
              Code<span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>Mentor</span>
            </span>
          </Link>
          <span style={{ color: 'var(--border-mid)', fontSize: '1rem' }}>/</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500 }}>Problems</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn" style={{ padding: '0.32rem 0.9rem', fontSize: '0.77rem' }}>Log In</button>
          <button className="btn btn-primary" style={{ padding: '0.32rem 0.9rem', fontSize: '0.77rem' }}>Sign Up</button>
        </div>
      </nav>

      <div style={{ flex: 1, maxWidth: 1040, width: '100%', margin: '0 auto', padding: '2.5rem 1.5rem', boxSizing: 'border-box' }}>

        {/* Page heading */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.3rem' }}>Problem Set</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{filtered.length} of {problems.length} problems</p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 220, maxWidth: 340 }}>
            <Search size={12} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search problems..."
              style={{
                width: '100%', padding: '0.46rem 0.75rem 0.46rem 2.1rem',
                background: 'var(--bg-surface)', border: '1px solid var(--border-mid)',
                borderRadius: 'var(--r-md)', color: '#fff',
                fontSize: '0.82rem', fontFamily: 'var(--font-sans)',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--border-white)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-mid)'}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            {difficulties.map(d => filterBtn(d, diffFilter === d, () => setDiffFilter(d)))}
          </div>
          <div style={{ width: 1, height: 24, background: 'var(--border-mid)' }} />
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            {categories.map(c => filterBtn(c, catFilter === c, () => setCatFilter(c)))}
          </div>
        </div>

        {/* Table */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-xl)',
          overflow: 'hidden',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}>
          <div style={{ minWidth: 600 }}>
          {/* Header row */}
          <div style={{
            display: 'grid', gridTemplateColumns: '32px 52px 1fr 110px 110px 90px',
            padding: '0.55rem 1.25rem',
            borderBottom: '1px solid var(--border)',
            fontSize: '0.68rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            color: 'var(--text-muted)',
          }}>
            <span></span><span>#</span><span>Title</span>
            <span>Difficulty</span><span>Category</span><span>Acceptance</span>
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: '3.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              No problems match your filters.
            </div>
          ) : filtered.map((p, i) => (
            <div key={p.id}
              onClick={() => navigate(`/problems/${p.slug}`)}
              style={{
                display: 'grid', gridTemplateColumns: '32px 52px 1fr 110px 110px 90px',
                padding: '0.9rem 1.25rem',
                borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                cursor: 'pointer', alignItems: 'center',
                transition: 'background 0.12s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span>
                {solved.has(p.id)
                  ? <CheckCircle size={12} color="var(--green)" />
                  : <Circle size={12} color="var(--text-faint)" />}
              </span>
              <span style={{ fontSize: '0.77rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{p.id}</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                {p.title}
                <ChevronRight size={11} color="var(--text-muted)" />
              </span>
              <span style={{
                display: 'inline-block', width: 'fit-content',
                padding: '0.16rem 0.65rem', borderRadius: 'var(--r-xs)',
                fontSize: '0.7rem', fontWeight: 700,
                color: diffStyle[p.difficulty]?.color || '#fff',
                background: diffStyle[p.difficulty]?.bg || 'transparent',
              }}>{p.difficulty}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{p.category}</span>
              <span style={{ fontSize: '0.77rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{p.acceptance}</span>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
