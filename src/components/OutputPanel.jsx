import React from 'react';
import { Terminal, Clock } from 'lucide-react';

const OutputPanel = ({ runResults, activeTestcase, isRunning }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

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
        {!isRunning && !runResults && (
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
        {!isRunning && runResults && runResults[activeTestcase] && (
          <div className="animate-slide-in" style={{
            display: 'flex', flexDirection: 'column', gap: '0.5rem',
          }}>
            {(() => {
               const res = runResults[activeTestcase];
               let titleColor = 'var(--text-muted)';
               if (res.status === 'Accepted') titleColor = 'var(--green)';
               else if (res.status === 'Wrong Answer' || res.status === 'Error') titleColor = 'var(--danger)';

               return (
                 <>
                   <h2 style={{ color: titleColor, fontSize: '1.25rem', fontWeight: 600, margin: '0.2rem 0 0.8rem 0' }}>
                     {res.status}
                   </h2>
                   
                   {/* If there's an execution error, show it */}
                   {res.error?.trim() && (
                     <div className="terminal-block error-output" style={{ marginBottom: '1rem' }}>
                       {res.error}
                     </div>
                   )}

                   {/* Detail blocks */}
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                     <div>
                       <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: 600 }}>Input</div>
                       <div style={{
                          padding: '0.65rem 0.85rem', background: 'var(--bg-sunken)', border: '1px solid var(--border-mid)',
                          borderRadius: 'var(--r-md)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#fff',
                          whiteSpace: 'pre-wrap'
                       }}>
                         {res.inputUsed}
                       </div>
                     </div>

                     <div>
                       <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: 600 }}>Output</div>
                       <div style={{
                          padding: '0.65rem 0.85rem', background: 'var(--bg-sunken)', border: '1px solid var(--border-mid)',
                          borderRadius: 'var(--r-md)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: res.status === 'Wrong Answer' ? 'var(--danger)' : '#fff',
                          whiteSpace: 'pre-wrap'
                       }}>
                         {res.output || ' '}
                       </div>
                     </div>

                     {res.expectedOutput && (
                       <div>
                         <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: 600 }}>Expected</div>
                         <div style={{
                            padding: '0.65rem 0.85rem', background: 'var(--bg-sunken)', border: '1px solid var(--border-mid)',
                            borderRadius: 'var(--r-md)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--green)',
                            whiteSpace: 'pre-wrap'
                         }}>
                           {res.expectedOutput}
                         </div>
                       </div>
                     )}
                   </div>
                   
                   {res.exitCode !== undefined && (
                     <div style={{ marginTop: '0.7rem', fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-mono)' }}>
                       <Clock size={10} /> Exit code: {res.exitCode}
                     </div>
                   )}
                 </>
               )
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
