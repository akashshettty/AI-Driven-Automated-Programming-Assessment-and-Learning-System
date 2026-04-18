import React, { useState } from 'react';
import { AlertTriangle, Lightbulb, CheckCircle, ChevronDown, ChevronRight, Bug, Sparkles, Loader } from 'lucide-react';

const hintColors = ['var(--purple)', 'var(--cyan)', 'var(--green)'];
const hintLabels = ['Nudge', 'Clue', 'Strategy'];

const MentorPanel = ({ analysis, isAnalyzing }) => {
  const [expandedHint, setExpandedHint] = useState(null);

  if (isAnalyzing) {
    return (
      <div style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{
            width: 52, height: 52, margin: '0 auto',
            border: '2px solid rgba(6,182,212,0.2)',
            borderTopColor: 'var(--cyan)',
            borderRadius: '50%',
            animation: 'rotateSpin 0.9s linear infinite',
          }} />
        </div>
        <p style={{ color: 'var(--cyan)', fontWeight: 600, fontSize: '0.9rem' }}>Analyzing your code…</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.4rem' }}>AI mentor is reviewing your solution</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div style={{
          width: 64, height: 64, margin: '0 auto 1.25rem',
          background: 'rgba(139,92,246,0.07)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(139,92,246,0.15)',
        }}>
          <Sparkles size={28} color="var(--purple)" style={{ opacity: 0.7 }} />
        </div>
        <p style={{ fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>AI Mentor Ready</p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.4rem', lineHeight: 1.6 }}>
          Click <strong style={{ color: 'var(--cyan)' }}>Get Hint</strong> or press{' '}
          <kbd style={{
            background: 'var(--bg-tertiary)', border: '1px solid var(--border-accent)',
            borderRadius: 5, padding: '1px 5px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
          }}>Ctrl+Shift+H</kbd>
          {' '}to get AI mentorship.
        </p>
      </div>
    );
  }

  const { logicError, hints, testCases } = analysis;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', padding: '1.1rem' }}>

      {/* Logic Error */}
      {logicError && (
        <div className="error-card error-pulse animate-slide-in">
          <div className="flex items-center gap-2" style={{ color: 'var(--danger)', marginBottom: '0.6rem', fontWeight: 600, fontSize: '0.875rem' }}>
            <AlertTriangle size={16} />
            <span>Potential Logic Error</span>
            <span style={{
              marginLeft: 'auto',
              background: 'var(--danger)',
              color: '#fff',
              padding: '2px 8px',
              borderRadius: 99,
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}>
              {Math.round(logicError.confidence * 100)}% CONF
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>{logicError.message}</p>
          <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Line {logicError.line}
          </div>
        </div>
      )}

      {/* Hints */}
      {hints && hints.length > 0 && (
        <div className="animate-slide-in">
          <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
            <Lightbulb size={15} color="var(--warning)" />
            <span style={{ fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>
              Hints
            </span>
            <span className="badge badge-purple" style={{ marginLeft: 'auto' }}>{hints.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {hints.map((hint, index) => {
              const isOpen = expandedHint === index;
              const accentColor = hintColors[index % hintColors.length];
              return (
                <div key={index} className="hint-accordion">
                  <button
                    className={`hint-trigger ${isOpen ? 'open' : ''}`}
                    onClick={() => setExpandedHint(isOpen ? null : index)}
                    style={{ '--hint-color': accentColor }}
                  >
                    <div className="flex items-center gap-2">
                      <span style={{
                        width: 22, height: 22,
                        borderRadius: '50%',
                        background: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${accentColor} 40%, transparent)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.65rem', fontWeight: 700, color: accentColor,
                        flexShrink: 0,
                      }}>{index + 1}</span>
                      <span style={{ color: isOpen ? accentColor : 'var(--text-primary)', transition: 'color 0.2s' }}>
                        Level {index + 1}: {hint.type}
                      </span>
                    </div>
                    <ChevronDown size={14} style={{
                      color: isOpen ? accentColor : 'var(--text-muted)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s, color 0.2s',
                      flexShrink: 0,
                    }} />
                  </button>
                  {isOpen && (
                    <div className="hint-content">
                      {hint.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Test Cases */}
      {testCases && testCases.length > 0 && (
        <div className="animate-slide-in">
          <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
            <CheckCircle size={15} color="var(--cyan)" />
            <span style={{ fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>
              Suggested Tests
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {testCases.map((test, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.6rem 0.9rem',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--r-lg)',
                border: '1px solid var(--border)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
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
