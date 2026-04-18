import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code, Search, CheckCircle, Circle, ChevronRight, ArrowLeft } from 'lucide-react';
import { problems } from '../data/problems';

const difficultyColor = { Easy: 'var(--green)', Medium: '#F59E0B', Hard: 'var(--danger)' };
const difficultyBg = { Easy: 'rgba(16,185,129,0.1)', Medium: 'rgba(245,158,11,0.1)', Hard: 'rgba(239,68,68,0.1)' };

const categories = ['All', 'Arrays', 'Stack', 'DP', 'HashMap'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

export default function ProblemsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('All');
  const [catFilter, setCatFilter] = useState('All');
  const [solved] = useState(new Set()); // placeholder

  const filtered = useMemo(() => {
    return problems.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
      const matchDiff = diffFilter === 'All' || p.difficulty === diffFilter;
      const matchCat = catFilter === 'All' || p.category === catFilter;
      return matchSearch && matchDiff && matchCat;
    });
  }, [search, diffFilter, catFilter]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', display: 'flex', flexDirection: 'column' }}>

      {/* Navbar */}
      <nav style={{
        height: 58, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        background: 'rgba(11,17,32,0.95)',
        borderBottom: '1px solid var(--border)',
        padding: '0 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <Code size={20} color="var(--cyan)" />
            <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
              Code<span style={{ color: 'var(--cyan)' }}>Mentor</span>
            </span>
          </Link>
          <span style={{ color: 'var(--border-accent)', fontSize: '0.8rem' }}>/</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Problems</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn" style={{ padding: '0.35rem 0.9rem', fontSize: '0.78rem' }}>Log In</button>
          <button className="btn btn-primary" style={{ padding: '0.35rem 0.9rem', fontSize: '0.78rem' }}>Sign Up</button>
        </div>
      </nav>

      <div style={{ flex: 1, maxWidth: 1000, width: '100%', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.35rem' }}>Problem Set</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Showing {filtered.length} of {problems.length} problems
          </p>
        </div>

        {/* Search + Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search problems..."
              style={{
                width: '100%', padding: '0.55rem 0.75rem 0.55rem 2.25rem',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)', color: 'var(--text-primary)',
                fontSize: '0.85rem', fontFamily: 'var(--font-sans)',
                outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--cyan)'; e.target.style.boxShadow = '0 0 0 3px var(--cyan-dim)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Difficulty toggles */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {difficulties.map(d => (
              <button key={d} onClick={() => setDiffFilter(d)} style={{
                padding: '0.4rem 0.85rem', borderRadius: 99, fontSize: '0.78rem', fontWeight: 600,
                border: `1px solid ${diffFilter === d ? (d === 'All' ? 'var(--cyan)' : difficultyColor[d] || 'var(--cyan)') : 'var(--border)'}`,
                background: diffFilter === d ? (d === 'All' ? 'var(--cyan-dim)' : difficultyBg[d] || 'var(--cyan-dim)') : 'transparent',
                color: diffFilter === d ? (d === 'All' ? 'var(--cyan)' : difficultyColor[d] || 'var(--cyan)') : 'var(--text-muted)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
                {d}
              </button>
            ))}
          </div>

          {/* Category toggles */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {categories.map(c => (
              <button key={c} onClick={() => setCatFilter(c)} style={{
                padding: '0.4rem 0.85rem', borderRadius: 99, fontSize: '0.78rem', fontWeight: 600,
                border: `1px solid ${catFilter === c ? 'var(--purple)' : 'var(--border)'}`,
                background: catFilter === c ? 'var(--purple-dim)' : 'transparent',
                color: catFilter === c ? 'var(--purple)' : 'var(--text-muted)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', overflow: 'hidden' }}>
          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '40px 50px 1fr 100px 110px 90px',
            padding: '0.6rem 1.25rem',
            background: 'rgba(11,17,32,0.6)',
            borderBottom: '1px solid var(--border)',
            fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)',
          }}>
            <span></span>
            <span>#</span>
            <span>Title</span>
            <span>Difficulty</span>
            <span>Category</span>
            <span>Acceptance</span>
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              No problems match your filters.
            </div>
          ) : (
            filtered.map((p, i) => (
              <div
                key={p.id}
                onClick={() => navigate(`/problems/${p.slug}`)}
                style={{
                  display: 'grid', gridTemplateColumns: '40px 50px 1fr 100px 110px 90px',
                  padding: '0.9rem 1.25rem',
                  borderBottom: i < filtered.length - 1 ? '1px solid rgba(31,41,55,0.5)' : 'none',
                  cursor: 'pointer', alignItems: 'center',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(6,182,212,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Status */}
                <span>
                  {solved.has(p.id)
                    ? <CheckCircle size={14} color="var(--green)" />
                    : <Circle size={14} color="var(--border-accent)" />}
                </span>
                {/* ID */}
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{p.id}</span>
                {/* Title */}
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {p.title}
                  <ChevronRight size={12} color="var(--text-muted)" />
                </span>
                {/* Difficulty */}
                <span style={{
                  display: 'inline-flex', width: 'fit-content',
                  padding: '0.2rem 0.7rem', borderRadius: 99, fontSize: '0.72rem', fontWeight: 700,
                  color: difficultyColor[p.difficulty], background: difficultyBg[p.difficulty],
                }}>
                  {p.difficulty}
                </span>
                {/* Category */}
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{p.category}</span>
                {/* Acceptance */}
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{p.acceptance}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
