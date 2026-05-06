import React from 'react';
import { Sparkles, CheckCircle, XCircle, AlertTriangle, Lightbulb } from 'lucide-react';

export default function FeedbackPanel({ feedback, submitResult }) {
  if (!feedback && !submitResult) {
    return (
      <div style={{ padding: '3rem 1.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div style={{
          width: 52, height: 52, margin: '0 auto 1.25rem',
          background: 'var(--bg-elevated)', borderRadius: 'var(--r-lg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid var(--border-mid)',
        }}>
          <Sparkles size={22} color="var(--text-muted)" />
        </div>
        <p style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.4rem' }}>AI Feedback</p>
        <p style={{ fontSize: '0.78rem', lineHeight: 1.7 }}>
          Submit your solution — the AI mentor will explain what went wrong and how to fix it.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

      {/* Result summary */}
      {submitResult && (
        <div style={{
          background: submitResult.passed ? 'rgba(52,211,153,0.06)' : 'rgba(248,113,113,0.06)',
          border: `1px solid ${submitResult.passed ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}`,
          borderRadius: 'var(--r-lg)', padding: '0.9rem 1rem',
          display: 'flex', alignItems: 'center', gap: '0.65rem',
        }}>
          {submitResult.passed
            ? <CheckCircle size={18} color="var(--green)" />
            : <XCircle size={18} color="var(--danger)" />}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.875rem', color: submitResult.passed ? 'var(--green)' : 'var(--danger)' }}>
              {submitResult.passed ? 'All tests passed!' : 'Wrong Answer'}
            </div>
            {!submitResult.passed && (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.18rem' }}>
                {submitResult.passedCount} / {submitResult.total} test cases passed
              </div>
            )}
          </div>
        </div>
      )}

      {/* Failed case */}
      {submitResult && !submitResult.passed && submitResult.failedCase && (
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '0.9rem 1rem' }}>
          <div style={{ fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--danger)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <AlertTriangle size={10} /> Failed Case
          </div>
          {[['Input', submitResult.failedCase.input], ['Expected', submitResult.failedCase.expected], ['Your Output', submitResult.failedCase.got]].map(([label, val]) => (
            <div key={label} style={{ marginBottom: '0.35rem', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--text-muted)', marginRight: '0.4rem' }}>{label}:</span>
              <span style={{ color: label === 'Your Output' ? 'var(--danger)' : label === 'Expected' ? 'var(--green)' : '#fff' }}>{val}</span>
            </div>
          ))}
        </div>
      )}

      {/* AI Feedback */}
      {feedback && (
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', borderRadius: 'var(--r-lg)', padding: '1rem' }}>
          <div style={{ fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-secondary)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Lightbulb size={10} color="var(--warning)" /> AI Mentor Feedback
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{feedback}</p>
        </div>
      )}

      {/* Success next steps */}
      {submitResult?.passed && (
        <div style={{ background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.15)', borderRadius: 'var(--r-lg)', padding: '1rem' }}>
          <div style={{ fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--green)', marginBottom: '0.5rem' }}>
            What's Next?
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Check the Complexity tab for your time & space analysis. Then try the next problem or optimize your current solution.
          </p>
        </div>
      )}
    </div>
  );
}
