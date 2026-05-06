import React from 'react';
import { CheckCircle, XCircle, Clock, Cpu, TrendingUp, Sparkles, X } from 'lucide-react';

export default function SubmitModal({ result, onClose, onGetFeedback }) {
  if (!result) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 0.2s ease-out',
    }}>
      <div style={{
        width: '100%', maxWidth: 460,
        background: 'var(--bg-surface)',
        border: `1px solid ${result.passed ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}`,
        borderRadius: 'var(--r-2xl)',
        padding: '2rem',
        boxShadow: 'var(--shadow-lg)',
        animation: 'slideUp 0.25s ease-out',
        position: 'relative',
      }}>

        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'var(--text-muted)', borderRadius: 'var(--r-xs)',
          padding: '0.25rem', transition: 'color 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
          <X size={16} />
        </button>

        {result.passed ? (
          <>
            {/* Success */}
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{
                width: 64, height: 64, margin: '0 auto 1.1rem',
                borderRadius: 'var(--r-xl)',
                background: 'rgba(52,211,153,0.08)',
                border: '1px solid rgba(52,211,153,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CheckCircle size={30} color="var(--green)" />
              </div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '0.3rem' }}>Accepted</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>All test cases passed — great work!</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem', marginBottom: '1.75rem' }}>
              {[
                { icon: <Clock size={13} color="var(--text-muted)" />, label: 'Runtime', value: result.runtime || '~60ms', sub: result.runtimePct || 'Beats 72%' },
                { icon: <Cpu size={13} color="var(--text-muted)" />, label: 'Memory', value: result.memory || '~42MB', sub: result.memoryPct || 'Beats 65%' },
                { icon: <TrendingUp size={13} color="var(--green)" />, label: 'Score', value: result.score || '100', sub: 'Points' },
              ].map(({ icon, label, value, sub }) => (
                <div key={label} style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-lg)', padding: '0.85rem', textAlign: 'center',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.4rem' }}>{icon}</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>{value}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem', fontWeight: 500 }}>{sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>Continue</button>
            </div>
          </>
        ) : (
          <>
            {/* Failure */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: 60, height: 60, margin: '0 auto 1.1rem',
                borderRadius: 'var(--r-xl)',
                background: 'rgba(248,113,113,0.08)',
                border: '1px solid rgba(248,113,113,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <XCircle size={28} color="var(--danger)" />
              </div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '0.3rem' }}>Wrong Answer</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                {result.passedCount} / {result.total} test cases passed
              </p>
            </div>

            {result.failedCase && (
              <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--danger)', marginBottom: '0.65rem' }}>
                  Failed Test Case
                </div>
                {[['Input', result.failedCase.input], ['Expected', result.failedCase.expected], ['Got', result.failedCase.got]].map(([label, val]) => (
                  <div key={label} style={{ marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{label}: </span>
                    <code style={{
                      fontSize: '0.8rem', fontFamily: 'var(--font-mono)',
                      color: label === 'Got' ? 'var(--danger)' : label === 'Expected' ? 'var(--green)' : '#fff',
                    }}>{val}</code>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button className="btn" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>Try Again</button>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', gap: '0.4rem' }}
                onClick={() => { onGetFeedback(); onClose(); }}>
                <Sparkles size={13} /> AI Feedback
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
