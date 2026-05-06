import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const diffStyle = {
  Easy:   { color: '#34D399', bg: 'rgba(52,211,153,0.08)' },
  Medium: { color: '#FBBF24', bg: 'rgba(251,191,36,0.08)' },
  Hard:   { color: '#F87171', bg: 'rgba(248,113,113,0.08)' },
};

const TABS = ['Description', 'Editorial', 'Solutions', 'Submissions'];

export default function ProblemDescription({ problem }) {
  const [tab, setTab] = useState('Description');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#1C1C1C', flexShrink: 0 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '0.65rem 1rem', background: 'transparent', border: 'none',
            color: tab === t ? '#fff' : 'var(--text-muted)',
            fontWeight: tab === t ? 600 : 400, fontSize: '0.82rem',
            cursor: 'pointer', position: 'relative', transition: 'color 0.2s',
            fontFamily: 'var(--font-sans)', letterSpacing: '0.01em',
          }}>
            {t}
            {tab === t && (
              <span style={{
                position: 'absolute', bottom: 0, left: '10%', width: '80%', height: '1.5px',
                background: '#fff', borderRadius: '2px 2px 0 0',
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1.75rem', background: '#1E1E1E' }}>
        {tab === 'Description' && (
          <div className="animate-fade-in">
            {/* Title */}
            <div style={{ marginBottom: '1.1rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.7rem', letterSpacing: '-0.025em', color: '#fff' }}>
                {problem.id}. {problem.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                <span style={{
                  padding: '0.18rem 0.65rem', borderRadius: 'var(--r-xs)', fontSize: '0.7rem', fontWeight: 700,
                  color: diffStyle[problem.difficulty]?.color, background: diffStyle[problem.difficulty]?.bg,
                }}>{problem.difficulty}</span>
                {problem.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '0.16rem 0.6rem', borderRadius: 'var(--r-xs)', fontSize: '0.7rem', fontWeight: 500,
                    background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)',
                    border: '1px solid var(--border)',
                  }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div style={{ fontSize: '0.875rem', lineHeight: 1.85, color: 'var(--text-secondary)', marginBottom: '1.75rem', whiteSpace: 'pre-line' }}>
              {problem.description.split('`').map((part, i) =>
                i % 2 === 0
                  ? <span key={i}>{part}</span>
                  : <code key={i} style={{
                      background: 'rgba(255,255,255,0.06)', color: '#fff',
                      padding: '0.1rem 0.45rem', borderRadius: 'var(--r-xs)',
                      fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                      border: '1px solid var(--border)',
                    }}>{part}</code>
              )}
            </div>

            {/* Examples */}
            {problem.examples.map((ex, i) => (
              <div key={i} style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 600, fontSize: '0.75rem', marginBottom: '0.5rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Example {i + 1}
                </div>
                <div style={{
                  background: '#111111', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 'var(--r-md)', padding: '0.9rem 1.1rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.8rem', lineHeight: 1.9,
                }}>
                  <div><span style={{ color: 'var(--text-muted)' }}>Input:  </span><span style={{ color: '#fff' }}>{ex.input}</span></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Output: </span><span style={{ color: 'var(--green)' }}>{ex.output}</span></div>
                  {ex.explanation && (
                    <div style={{ marginTop: '0.4rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Explanation: </span>
                      <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>{ex.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Constraints */}
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.75rem', marginBottom: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Constraints</div>
              <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {problem.constraints.map((c, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '0.55rem', fontSize: '0.82rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.5rem', flexShrink: 0 }}>■</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab !== 'Description' && (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--text-muted)' }}>
            <div style={{ width: 48, height: 48, margin: '0 auto 1rem', borderRadius: 'var(--r-lg)', background: 'var(--bg-elevated)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
              {tab === 'Editorial' ? '📝' : tab === 'Solutions' ? '💡' : '📋'}
            </div>
            <p style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.35rem' }}>{tab}</p>
            <p style={{ fontSize: '0.8rem' }}>Coming soon — solve the problem first!</p>
          </div>
        )}
      </div>
    </div>
  );
}
