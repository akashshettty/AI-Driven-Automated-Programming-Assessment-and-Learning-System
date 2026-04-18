import React from 'react';
import { Terminal, CheckCircle, XCircle, Clock, Keyboard } from 'lucide-react';

const OutputPanel = ({ output, isRunning, userInput, onInputChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* stdin */}
      <div style={{
        padding: '0.65rem 0.85rem',
        background: 'rgba(11,17,32,0.6)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '0.4rem' }}>
          <Keyboard size={13} color="var(--cyan)" />
          <span style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>
            stdin
          </span>
        </div>
        <textarea
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={"Enter input for your program…\nMultiple lines supported"}
          style={{
            width: '100%',
            minHeight: '52px',
            maxHeight: '100px',
            padding: '0.45rem 0.65rem',
            background: 'rgba(6,10,22,0.9)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--r-md)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            resize: 'vertical',
            lineHeight: 1.6,
          }}
        />
      </div>

      {/* Output Area */}
      <div style={{ flex: 1, overflow: 'auto', padding: '0.6rem' }}>

        {isRunning && (
          <div className="animate-slide-in" style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.85rem 1rem',
            background: 'rgba(16,185,129,0.06)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: 'var(--r-lg)',
          }}>
            <span style={{
              width: 16, height: 16, flexShrink: 0,
              border: '2px solid rgba(16,185,129,0.3)',
              borderTopColor: 'var(--green)',
              borderRadius: '50%',
              animation: 'rotateSpin 0.8s linear infinite',
              display: 'inline-block',
            }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--green)', fontWeight: 500 }}>Executing code…</span>
          </div>
        )}

        {!isRunning && !output && (
          <div style={{
            padding: '1.5rem',
            textAlign: 'center',
            color: 'var(--text-muted)',
          }}>
            <div style={{
              width: 44, height: 44, margin: '0 auto 0.75rem',
              background: 'rgba(6,182,212,0.06)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(6,182,212,0.12)',
            }}>
              <Terminal size={20} color="var(--text-muted)" />
            </div>
            <p style={{ fontSize: '0.8rem' }}>Click <strong style={{ color: 'var(--green)' }}>Run Code</strong> to see output</p>
          </div>
        )}

        {!isRunning && output && (
          <div className="animate-slide-in" style={{
            background: 'var(--bg-tertiary)',
            border: `1px solid ${output.success ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.3)'}`,
            borderRadius: 'var(--r-xl)',
            overflow: 'hidden',
            ...(output.success ? {} : { animation: 'glowPulseRed 2s ease-in-out 2' }),
          }}>
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.6rem 1rem',
              background: output.success ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)',
              borderBottom: `1px solid ${output.success ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}`,
            }}>
              <div className="flex items-center gap-2">
                <Terminal size={14} color={output.success ? 'var(--green)' : 'var(--danger)'} />
                <span style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Output</span>
              </div>
              <span className={`badge ${output.success ? 'badge-success' : 'badge-error'}`}>
                {output.success ? (
                  <><CheckCircle size={10} /> Success</>
                ) : (
                  <><XCircle size={10} /> Failed</>
                )}
              </span>
            </div>

            <div style={{ padding: '0.75rem' }}>
              {/* stdout */}
              {output.output && output.output.trim().length > 0 && (
                <div className="terminal-block" style={{ marginBottom: output.error && output.error.trim() ? '0.5rem' : 0 }}>
                  {output.output}
                </div>
              )}

              {/* stderr */}
              {output.error && output.error.trim().length > 0 && (
                <div className="terminal-block error-output">
                  {output.error}
                </div>
              )}

              {/* Exit code */}
              {output.exitCode !== undefined && (
                <div style={{
                  marginTop: '0.5rem',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'var(--font-mono)',
                }}>
                  <Clock size={10} />
                  Exit code: {output.exitCode}
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
