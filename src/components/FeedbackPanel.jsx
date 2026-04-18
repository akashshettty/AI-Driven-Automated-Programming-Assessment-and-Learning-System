import React from 'react';
import { Sparkles, CheckCircle, XCircle, AlertTriangle, Lightbulb } from 'lucide-react';

export default function FeedbackPanel({ feedback, submitResult }) {
  // feedback: AI text, submitResult: { passed, failedCase }
  if (!feedback && !submitResult) {
    return (
      <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div style={{
          width: 60, height: 60, margin: '0 auto 1rem',
          background: 'rgba(16,185,129,0.06)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(16,185,129,0.12)',
        }}>
          <Sparkles size={26} color="var(--green)" style={{ opacity: 0.7 }} />
        </div>
        <p style={{ fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>AI Feedback</p>
        <p style={{ fontSize: '0.78rem', marginTop: '0.4rem', lineHeight: 1.65 }}>
          Submit your solution and the AI mentor will<br />explain what went wrong and how to fix it.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

      {/* Submit result summary */}
      {submitResult && (
        <div style={{
          background: submitResult.passed ? 'var(--green-dim)' : 'var(--danger-dim)',
          border: `1px solid ${submitResult.passed ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
          borderRadius: 'var(--r-xl)', padding: '1rem',
          display: 'flex', alignItems: 'center', gap: '0.65rem',
        }}>
          {submitResult.passed
            ? <CheckCircle size={20} color="var(--green)" />
            : <XCircle size={20} color="var(--danger)" />}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: submitResult.passed ? 'var(--green)' : 'var(--danger)' }}>
              {submitResult.passed ? '✓ All tests passed!' : '✗ Wrong Answer'}
            </div>
            {!submitResult.passed && submitResult.passedCount !== undefined && (
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {submitResult.passedCount} / {submitResult.total} test cases passed
              </div>
            )}
          </div>
        </div>
      )}

      {/* Failed test case */}
      {submitResult && !submitResult.passed && submitResult.failedCase && (
        <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '0.9rem 1rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--danger)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertTriangle size={11} /> Failed Case
          </div>
          {[['Input', submitResult.failedCase.input], ['Expected', submitResult.failedCase.expected], ['Your Output', submitResult.failedCase.got]].map(([label, val]) => (
            <div key={label} style={{ marginBottom: '0.35rem', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
              <span style={{ color: 'var(--text-muted)', marginRight: '0.4rem' }}>{label}:</span>
              <span style={{ color: label === 'Your Output' ? 'var(--danger)' : label === 'Expected' ? 'var(--green)' : 'var(--text-primary)' }}>{val}</span>
            </div>
          ))}
        </div>
      )}

      {/* AI Feedback text */}
      {feedback && (
        <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '1rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--purple)', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Lightbulb size={11} /> AI Mentor Feedback
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{feedback}</p>
        </div>
      )}

      {/* Success tips */}
      {submitResult?.passed && (
        <div style={{ background: 'var(--green-dim)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 'var(--r-xl)', padding: '1rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--green)', marginBottom: '0.5rem' }}>
            💡 What's Next?
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            Great solution! Check the Complexity tab to see your time and space analysis. Try solving the next problem or optimize your current solution.
          </p>
        </div>
      )}
    </div>
  );
}
