import React from 'react';
import { Activity, Clock, Zap, TrendingUp } from 'lucide-react';

const Badge = ({ value, label }) => (
  <div style={{ marginBottom: '0.6rem' }}>
    <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>{label}</div>
    <span style={{
      display: 'inline-block',
      padding: '0.28rem 0.85rem',
      borderRadius: 'var(--r-sm)',
      fontSize: '1.05rem', fontWeight: 800,
      fontFamily: 'var(--font-mono)',
      background: 'var(--bg-sunken)',
      border: '1px solid var(--border-mid)',
      color: '#fff',
      letterSpacing: '0.01em',
    }}>{value}</span>
  </div>
);

const ComplexityPanel = ({ complexity }) => {
  if (!complexity) {
    return (
      <div style={{ padding: '3rem 1.75rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div style={{
          width: 52, height: 52, margin: '0 auto 1.25rem',
          background: 'var(--bg-elevated)', borderRadius: 'var(--r-lg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid var(--border-mid)',
        }}>
          <Activity size={22} color="var(--text-muted)" />
        </div>
        <p style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.4rem' }}>Complexity Analyzer</p>
        <p style={{ fontSize: '0.78rem', lineHeight: 1.7 }}>
          Click <strong style={{ color: '#fff' }}>Get Hint</strong> to analyze time & space complexity.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>

      {/* Time */}
      <div className="metric-card animate-slide-in">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
          <Clock size={13} color="var(--text-muted)" />
          <span style={{ fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-muted)' }}>Time Complexity</span>
        </div>
        <Badge value={complexity.timeComplexity || 'N/A'} label="" />
        {complexity.timeExplanation && (
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '0.35rem' }}>{complexity.timeExplanation}</p>
        )}
      </div>

      {/* Space */}
      <div className="metric-card animate-slide-in" style={{ animationDelay: '0.06s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
          <Zap size={13} color="var(--text-muted)" />
          <span style={{ fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-muted)' }}>Space Complexity</span>
        </div>
        <Badge value={complexity.spaceComplexity || 'N/A'} label="" />
        {complexity.spaceExplanation && (
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '0.35rem' }}>{complexity.spaceExplanation}</p>
        )}
      </div>

      {/* Quality */}
      {complexity.qualityScore !== undefined && (
        <div className="metric-card animate-slide-in" style={{ animationDelay: '0.12s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
            <Activity size={13} color="var(--text-muted)" />
            <span style={{ fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-muted)' }}>Code Quality</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.78rem', fontWeight: 800, color: '#fff' }}>{complexity.qualityScore}/10</span>
          </div>
          <div style={{ height: 3, borderRadius: 99, background: 'var(--border-mid)', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${(complexity.qualityScore / 10) * 100}%`,
              background: complexity.qualityScore >= 7 ? 'var(--green)' : complexity.qualityScore >= 4 ? 'var(--warning)' : 'var(--danger)',
              borderRadius: 99, transition: 'width 0.6s ease',
            }} />
          </div>
        </div>
      )}

      {/* Suggestions */}
      {complexity.suggestions?.length > 0 && (
        <div className="metric-card animate-slide-in" style={{ animationDelay: '0.18s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
            <TrendingUp size={13} color="var(--text-muted)" />
            <span style={{ fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-muted)' }}>Optimizations</span>
          </div>
          <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {complexity.suggestions.map((s, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                <span style={{
                  width: 16, height: 16, borderRadius: 'var(--r-xs)', flexShrink: 0, marginTop: 2,
                  background: 'var(--bg-sunken)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.57rem', fontWeight: 800, color: 'var(--text-muted)',
                }}>{i + 1}</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ComplexityPanel;
