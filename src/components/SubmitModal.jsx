import React from 'react';
import { CheckCircle, XCircle, Trophy, Clock, Cpu, TrendingUp, Sparkles, X } from 'lucide-react';

export default function SubmitModal({ result, onClose, onGetFeedback }) {
  if (!result) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 0.2s ease-out',
    }}>
      <div style={{
        width: '100%', maxWidth: 480,
        background: 'var(--bg-card)',
        border: `1px solid ${result.passed ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
        borderRadius: 'var(--r-2xl)',
        padding: '2rem',
        boxShadow: result.passed ? '0 0 60px rgba(16,185,129,0.15)' : '0 0 60px rgba(239,68,68,0.12)',
        animation: 'slideUp 0.3s ease-out',
        position: 'relative',
      }}>
        {/* Close */}
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', borderRadius: 'var(--r-sm)', padding: '0.25rem' }}>
          <X size={16} />
        </button>

        {result.passed ? (
          /* ── SUCCESS ── */
          <>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: 72, height: 72, margin: '0 auto 1rem',
                borderRadius: '50%', background: 'var(--green-dim)',
                border: '2px solid rgba(16,185,129,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'glowPulseGreen 2s ease-in-out infinite',
              }}>
                <CheckCircle size={36} color="var(--green)" />
              </div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--green)', marginBottom: '0.3rem' }}>Accepted!</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>All test cases passed. Great job!</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { icon: <Clock size={16} color="var(--cyan)" />, label: 'Runtime', value: result.runtime || '~60ms', sub: result.runtimePct || 'Beats 72%' },
                { icon: <Cpu size={16} color="var(--purple)" />, label: 'Memory', value: result.memory || '~42MB', sub: result.memoryPct || 'Beats 65%' },
                { icon: <TrendingUp size={16} color="var(--green)" />, label: 'Score', value: result.score || '100', sub: 'Points' },
              ].map(({ icon, label, value, sub }) => (
                <div key={label} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '0.85rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.4rem' }}>{icon}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{value}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>Continue</button>
            </div>
          </>
        ) : (
          /* ── FAILURE ── */
          <>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div style={{
                width: 64, height: 64, margin: '0 auto 1rem',
                borderRadius: '50%', background: 'var(--danger-dim)',
                border: '2px solid rgba(239,68,68,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <XCircle size={32} color="var(--danger)" />
              </div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--danger)', marginBottom: '0.3rem' }}>Wrong Answer</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                {result.passedCount} / {result.total} test cases passed
              </p>
            </div>

            {/* Failed testcase */}
            {result.failedCase && (
              <div style={{ background: 'var(--danger-dim)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 'var(--r-xl)', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--danger)', marginBottom: '0.75rem' }}>Failed Test Case</div>
                {[['Input', result.failedCase.input], ['Expected', result.failedCase.expected], ['Got', result.failedCase.got]].map(([label, val]) => (
                  <div key={label} style={{ marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{label}: </span>
                    <code style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: label === 'Got' ? 'var(--danger)' : label === 'Expected' ? 'var(--green)' : 'var(--text-primary)' }}>{val}</code>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button className="btn" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>Try Again</button>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', gap: '0.4rem' }} onClick={() => { onGetFeedback(); onClose(); }}>
                <Sparkles size={14} /> AI Feedback
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
