import React from 'react';
import { Activity, Clock, Zap, TrendingUp } from 'lucide-react';

const ComplexityBadge = ({ value, color }) => (
  <span style={{
    display: 'inline-block',
    padding: '0.25rem 0.8rem',
    borderRadius: 99,
    fontSize: '1.35rem',
    fontWeight: 800,
    fontFamily: 'var(--font-mono)',
    background: `color-mix(in srgb, ${color} 12%, transparent)`,
    border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
    color,
    letterSpacing: '0.01em',
  }}>
    {value}
  </span>
);

const ComplexityPanel = ({ complexity }) => {
  if (!complexity) {
    return (
      <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div style={{
          width: 60, height: 60, margin: '0 auto 1rem',
          background: 'rgba(6,182,212,0.06)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(6,182,212,0.12)',
        }}>
          <Activity size={26} color="var(--cyan)" style={{ opacity: 0.6 }} />
        </div>
        <p style={{ fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Complexity Analyzer</p>
        <p style={{ fontSize: '0.78rem', marginTop: '0.4rem', lineHeight: 1.65 }}>
          Click <strong style={{ color: 'var(--cyan)' }}>Get Hint</strong> to analyze time & space complexity.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

      {/* Time */}
      <div className="metric-card animate-slide-in">
        <div className="flex items-center gap-2" style={{ marginBottom: '0.6rem' }}>
          <Clock size={14} color="var(--cyan)" />
          <span style={{ fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
            Time Complexity
          </span>
        </div>
        <ComplexityBadge value={complexity.timeComplexity || 'N/A'} color="var(--cyan)" />
        {complexity.timeExplanation && (
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.6rem', lineHeight: 1.65 }}>
            {complexity.timeExplanation}
          </p>
        )}
      </div>

      {/* Space */}
      <div className="metric-card animate-slide-in" style={{ animationDelay: '0.06s' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '0.6rem' }}>
          <Zap size={14} color="var(--purple)" />
          <span style={{ fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
            Space Complexity
          </span>
        </div>
        <ComplexityBadge value={complexity.spaceComplexity || 'N/A'} color="var(--purple)" />
        {complexity.spaceExplanation && (
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.6rem', lineHeight: 1.65 }}>
            {complexity.spaceExplanation}
          </p>
        )}
      </div>

      {/* Quality Score */}
      {complexity.qualityScore !== undefined && (
        <div className="metric-card animate-slide-in" style={{ animationDelay: '0.12s' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
            <Activity size={14} color="var(--green)" />
            <span style={{ fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
              Code Quality
            </span>
            <span className="badge badge-success" style={{ marginLeft: 'auto' }}>
              {complexity.qualityScore}/10
            </span>
          </div>
          {/* Progress Bar */}
          <div style={{
            height: 6, borderRadius: 99,
            background: 'rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${(complexity.qualityScore / 10) * 100}%`,
              background: complexity.qualityScore >= 7 ? 'var(--grad-green)' :
                          complexity.qualityScore >= 4 ? 'linear-gradient(90deg,#F59E0B,#10B981)' :
                          'linear-gradient(90deg,#EF4444,#F59E0B)',
              borderRadius: 99,
              transition: 'width 0.6s ease',
              boxShadow: '0 0 8px var(--green-glow)',
            }} />
          </div>
        </div>
      )}

      {/* Suggestions */}
      {complexity.suggestions && complexity.suggestions.length > 0 && (
        <div className="metric-card animate-slide-in" style={{ animationDelay: '0.18s' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
            <TrendingUp size={14} color="var(--warning)" />
            <span style={{ fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
              Optimizations
            </span>
          </div>
          <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {complexity.suggestions.map((s, i) => (
              <li key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6,
              }}>
                <span style={{
                  width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                  background: 'rgba(245,158,11,0.12)',
                  border: '1px solid rgba(245,158,11,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.6rem', fontWeight: 700, color: 'var(--warning)',
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
