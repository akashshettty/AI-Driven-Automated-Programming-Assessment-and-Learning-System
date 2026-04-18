import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const difficultyColor = { Easy: 'var(--green)', Medium: '#F59E0B', Hard: 'var(--danger)' };
const difficultyBg   = { Easy: 'rgba(16,185,129,0.12)', Medium: 'rgba(245,158,11,0.12)', Hard: 'rgba(239,68,68,0.12)' };

const TABS = ['Description', 'Editorial', 'Solutions', 'Submissions'];

export default function ProblemDescription({ problem }) {
  const [tab, setTab] = useState('Description');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'rgba(11,17,32,0.7)', flexShrink: 0 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '0.65rem 1.1rem', background: 'transparent', border: 'none',
            color: tab === t ? 'var(--text-primary)' : 'var(--text-muted)',
            fontWeight: tab === t ? 600 : 400, fontSize: '0.82rem',
            cursor: 'pointer', position: 'relative', transition: 'color 0.2s',
            fontFamily: 'var(--font-sans)',
          }}>
            {t}
            {tab === t && (
              <span style={{
                position: 'absolute', bottom: 0, left: '10%', width: '80%', height: 2,
                background: 'var(--grad-cyan)', borderRadius: '2px 2px 0 0',
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>

        {tab === 'Description' && (
          <div className="animate-fade-in">
            {/* Title + Difficulty */}
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>
                {problem.id}. {problem.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span style={{
                  padding: '0.2rem 0.75rem', borderRadius: 99, fontSize: '0.75rem', fontWeight: 700,
                  color: difficultyColor[problem.difficulty], background: difficultyBg[problem.difficulty],
                }}>
                  {problem.difficulty}
                </span>
                {problem.tags.map(tag => (
                  <span key={tag} style={{ padding: '0.18rem 0.6rem', borderRadius: 99, fontSize: '0.7rem', fontWeight: 500, background: 'rgba(139,92,246,0.1)', color: 'var(--purple)', border: '1px solid rgba(139,92,246,0.2)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>
              {problem.description.split('`').map((part, i) =>
                i % 2 === 0
                  ? <span key={i}>{part}</span>
                  : <code key={i} style={{ background: 'rgba(6,182,212,0.1)', color: 'var(--cyan)', padding: '0.1rem 0.4rem', borderRadius: 5, fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>{part}</code>
              )}
            </div>

            {/* Examples */}
            {problem.examples.map((ex, i) => (
              <div key={i} style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  Example {i + 1}:
                </div>
                <div style={{
                  background: 'rgba(6,10,22,0.8)', border: '1px solid var(--border-accent)',
                  borderRadius: 'var(--r-lg)', padding: '0.85rem 1rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.8rem', lineHeight: 1.8,
                }}>
                  <div><span style={{ color: 'var(--text-muted)' }}>Input:  </span><span style={{ color: 'var(--text-primary)' }}>{ex.input}</span></div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Output: </span><span style={{ color: 'var(--green)' }}>{ex.output}</span></div>
                  {ex.explanation && (
                    <div style={{ marginTop: '0.35rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Explanation: </span>
                      <span style={{ color: 'var(--text-secondary)' }}>{ex.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Constraints */}
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.6rem' }}>Constraints:</div>
              <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {problem.constraints.map((c, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--cyan)', fontSize: '0.6rem', flexShrink: 0 }}>●</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab !== 'Description' && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <div style={{ width: 52, height: 52, margin: '0 auto 1rem', borderRadius: '50%', background: 'rgba(6,182,212,0.06)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              {tab === 'Editorial' ? '📝' : tab === 'Solutions' ? '💡' : '📋'}
            </div>
            <p style={{ fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>{tab}</p>
            <p style={{ fontSize: '0.8rem' }}>Coming soon — solve the problem first!</p>
          </div>
        )}
      </div>
    </div>
  );
}
