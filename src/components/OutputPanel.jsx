import React from 'react';
import { Terminal, CheckCircle, XCircle, Clock } from 'lucide-react';

const OutputPanel = ({ output, isRunning, userInput, onInputChange, compact }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* stdin — non-compact mode only */}
      {!compact && (
        <div style={{ padding: '0.65rem 0.85rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.66rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>stdin</div>
          <textarea
            value={userInput}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter input for your program…"
            style={{
              width: '100%', minHeight: '52px', maxHeight: '100px',
              padding: '0.45rem 0.65rem',
              background: 'var(--bg-sunken)', border: '1px solid var(--border-mid)',
              borderRadius: 'var(--r-md)', color: '#fff',
              fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
              resize: 'vertical', outline: 'none',
            }}
          />
        </div>
      )}

      <div style={{ flex: 1, overflow: 'auto', padding: '0.6rem' }}>

        {/* Running */}
        {isRunning && (
          <div className="animate-slide-in" style={{
            display: 'flex', alignItems: 'center', gap: '0.65rem',
            padding: '0.75rem 1rem',
            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
          }}>
            <span style={{
              width: 14, height: 14, flexShrink: 0,
              border: '1.5px solid var(--border-mid)',
              borderTopColor: '#fff', borderRadius: '50%',
              display: 'inline-block',
              animation: 'rotateSpin 0.8s linear infinite',
            }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Executing code…</span>
          </div>
        )}

        {/* Empty */}
        {!isRunning && !output && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div style={{
              width: 40, height: 40, margin: '0 auto 0.75rem',
              background: 'var(--bg-elevated)', borderRadius: 'var(--r-md)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--border)',
            }}>
              <Terminal size={17} color="var(--text-muted)" />
            </div>
            <p style={{ fontSize: '0.8rem' }}>Click <strong style={{ color: '#fff' }}>Run</strong> to see output</p>
          </div>
        )}

        {/* Output */}
        {!isRunning && output && (
          <div className="animate-slide-in" style={{
            background: 'var(--bg-elevated)',
            border: `1px solid ${output.success ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}`,
            borderRadius: 'var(--r-lg)', overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.5rem 0.9rem',
              background: output.success ? 'rgba(52,211,153,0.05)' : 'rgba(248,113,113,0.05)',
              borderBottom: `1px solid ${output.success ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)'}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Terminal size={12} color={output.success ? 'var(--green)' : 'var(--danger)'} />
                <span style={{ fontWeight: 600, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Output</span>
              </div>
              <span className={`badge ${output.success ? 'badge-success' : 'badge-error'}`}>
                {output.success ? <><CheckCircle size={9} /> Success</> : <><XCircle size={9} /> Failed</>}
              </span>
            </div>

            <div style={{ padding: '0.65rem' }}>
              {output.output?.trim() && (
                <div className="terminal-block" style={{ marginBottom: output.error?.trim() ? '0.4rem' : 0 }}>
                  {output.output}
                </div>
              )}
              {output.error?.trim() && (
                <div className="terminal-block error-output">{output.error}</div>
              )}
              {output.exitCode !== undefined && (
                <div style={{ marginTop: '0.4rem', fontSize: '0.67rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-mono)' }}>
                  <Clock size={9} /> Exit code: {output.exitCode}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
