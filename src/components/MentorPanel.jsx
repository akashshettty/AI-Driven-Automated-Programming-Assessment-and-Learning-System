import React, { useState } from 'react';
import { AlertTriangle, Lightbulb, CheckCircle, ChevronDown, Sparkles } from 'lucide-react';

const MentorPanel = ({ analysis, isAnalyzing }) => {
  const [expandedHint, setExpandedHint] = useState(null);

  if (isAnalyzing) {
    return (
      <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{
          width: 36, height: 36, margin: '0 auto 1.25rem',
          border: '1.5px solid var(--border-mid)',
          borderTopColor: '#fff',
          borderRadius: '50%',
          animation: 'rotateSpin 0.9s linear infinite',
        }} />
        <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.35rem' }}>Analyzing your code…</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>AI mentor is reviewing your solution</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div style={{ padding: '3rem 1.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div style={{
          width: 52, height: 52, margin: '0 auto 1.25rem',
          background: 'var(--bg-elevated)',
          borderRadius: 'var(--r-lg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid var(--border-mid)',
        }}>
          <Sparkles size={22} color="var(--text-muted)" />
        </div>
        <p style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.45rem' }}>AI Mentor Ready</p>
        <p style={{ fontSize: '0.8rem', lineHeight: 1.7 }}>
          Click <strong style={{ color: '#fff' }}>Get Hint</strong> to get AI mentorship on your current code.
        </p>
      </div>
    );
  }

  const { logicError, hints, testCases } = analysis;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: '1rem' }}>

      {/* Logic Error */}
      {logicError && (
        <div className="error-card animate-slide-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)', marginBottom: '0.6rem', fontWeight: 600, fontSize: '0.82rem' }}>
            <AlertTriangle size={14} />
            <span>Potential Logic Error</span>
            <span style={{
              marginLeft: 'auto', background: 'var(--danger)', color: '#fff',
              padding: '1px 7px', borderRadius: 'var(--r-xs)',
              fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.05em',
            }}>
              {Math.round(logicError.confidence * 100)}%
            </span>
          </div>
          <p style={{ fontSize: '0.84rem', color: '#fff', lineHeight: 1.7 }}>{logicError.message}</p>
          <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Line {logicError.line}</div>
        </div>
      )}

      {/* Hints */}
      {hints?.length > 0 && (
        <div className="animate-slide-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
            <Lightbulb size={13} color="var(--warning)" />
            <span style={{ fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-muted)' }}>Hints</span>
            <span className="badge badge-cyan" style={{ marginLeft: 'auto' }}>{hints.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {hints.map((hint, idx) => {
              const isOpen = expandedHint === idx;
              return (
                <div key={idx} className="hint-accordion">
                  <button className={`hint-trigger ${isOpen ? 'open' : ''}`} onClick={() => setExpandedHint(isOpen ? null : idx)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        width: 20, height: 20, borderRadius: 'var(--r-xs)', flexShrink: 0,
                        background: isOpen ? 'rgba(255,255,255,0.1)' : 'var(--bg-elevated)',
                        border: `1px solid ${isOpen ? 'var(--border-bright)' : 'var(--border)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.6rem', fontWeight: 700,
                        color: isOpen ? '#fff' : 'var(--text-muted)',
                        transition: 'all 0.2s',
                      }}>{idx + 1}</span>
                      <span style={{ color: isOpen ? '#fff' : 'var(--text-secondary)', transition: 'color 0.2s', fontSize: '0.82rem' }}>
                        Level {idx + 1}: {hint.type}
                      </span>
                    </div>
                    <ChevronDown size={12} style={{
                      color: isOpen ? '#fff' : 'var(--text-muted)',
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s, color 0.2s', flexShrink: 0,
                    }} />
                  </button>
                  {isOpen && <div className="hint-content">{hint.content}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Test Cases */}
      {testCases?.length > 0 && (
        <div className="animate-slide-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
            <CheckCircle size={13} color="var(--green)" />
            <span style={{ fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-muted)' }}>Suggested Tests</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {testCases.map((test, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.5rem 0.85rem', background: 'var(--bg-elevated)',
                borderRadius: 'var(--r-sm)', border: '1px solid var(--border)',
                fontSize: '0.78rem', fontFamily: 'var(--font-mono)',
              }}>
                <span style={{ color: 'var(--text-secondary)' }}>Input: {test.input}</span>
                <span className={`badge ${test.pass ? 'badge-success' : 'badge-error'}`}>
                  {test.pass ? '✓ Pass' : '✗ Fail'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorPanel;
