import React from 'react';
import { Plus, X, Play, CheckCircle, XCircle, FlaskConical } from 'lucide-react';

const TestCaseManager = ({ testCases, onTestCasesChange, onRunAll, isRunning }) => {
  const addTestCase = () => {
    onTestCasesChange([...testCases, { id: Date.now(), input: '', expectedOutput: '', actualOutput: null, passed: null }]);
  };
  const removeTestCase = (id) => onTestCasesChange(testCases.filter((tc) => tc.id !== id));
  const updateTestCase = (id, field, value) =>
    onTestCasesChange(testCases.map((tc) => (tc.id === id ? { ...tc, [field]: value } : tc)));

  const passedCount = testCases.filter((tc) => tc.passed === true).length;
  const failedCount = testCases.filter((tc) => tc.passed === false).length;

  return (
    <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '0.6rem 0.75rem' }}>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '0.6rem' }}>
        <div className="flex items-center gap-2">
          <FlaskConical size={13} color="var(--cyan)" />
          <span style={{ fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>
            Test Cases
          </span>
          {testCases.length > 0 && (
            <div className="flex items-center gap-1" style={{ marginLeft: '0.25rem' }}>
              {passedCount > 0 && <span className="badge badge-success">{passedCount} ✓</span>}
              {failedCount > 0 && <span className="badge badge-error">{failedCount} ✗</span>}
              {passedCount === 0 && failedCount === 0 && <span className="badge badge-cyan">{testCases.length}</span>}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onRunAll} disabled={isRunning || testCases.length === 0} className="btn"
            style={{ padding: '0.3rem 0.65rem', fontSize: '0.72rem', background: 'var(--grad-green)', border: 'none', color: '#fff', borderRadius: 'var(--r-md)' }}>
            {isRunning ? (
              <><span style={{ width:12,height:12,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block',animation:'rotateSpin 0.8s linear infinite' }} /> Running…</>
            ) : (
              <><Play size={12} fill="white" /> Run All</>
            )}
          </button>
          <button onClick={addTestCase} className="btn" style={{ padding: '0.3rem 0.65rem', fontSize: '0.72rem', borderRadius: 'var(--r-md)' }}>
            <Plus size={12} /> Add
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ maxHeight: '190px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {testCases.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            No test cases — click <strong style={{ color: 'var(--cyan)' }}>Add</strong> to create one.
          </div>
        ) : (
          testCases.map((tc, index) => (
            <div key={tc.id} className={`tc-item ${tc.passed === true ? 'pass' : tc.passed === false ? 'fail' : ''}`}>
              <div className="flex items-center justify-between" style={{ marginBottom: '0.4rem' }}>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>TC-{index + 1}</span>
                  {tc.passed === true  && <CheckCircle size={12} color="var(--green)" />}
                  {tc.passed === false && <XCircle size={12} color="var(--danger)" />}
                </div>
                <button onClick={() => removeTestCase(tc.id)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.15rem', borderRadius: 4 }}>
                  <X size={12} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                {[['input','Input','stdin…'],['expectedOutput','Expected','expected…']].map(([field,label,ph]) => (
                  <div key={field}>
                    <label style={{ fontSize:'0.67rem',color:'var(--text-muted)',display:'block',marginBottom:'0.2rem',textTransform:'uppercase',letterSpacing:'0.06em' }}>{label}</label>
                    <textarea value={tc[field]} onChange={(e) => updateTestCase(tc.id, field, e.target.value)} placeholder={ph}
                      style={{ width:'100%',minHeight:'34px',padding:'0.3rem 0.5rem',background:'rgba(6,10,22,0.9)',border:'1px solid var(--border-accent)',borderRadius:'var(--r-md)',color:'var(--text-primary)',fontFamily:'var(--font-mono)',fontSize:'0.72rem',resize:'vertical' }} />
                  </div>
                ))}
              </div>
              {tc.actualOutput !== null && (
                <div style={{ marginTop: '0.35rem' }}>
                  <label style={{ fontSize:'0.67rem',color:'var(--text-muted)',display:'block',marginBottom:'0.2rem',textTransform:'uppercase',letterSpacing:'0.06em' }}>Actual</label>
                  <div style={{ padding:'0.3rem 0.5rem',background:'rgba(6,10,22,0.9)',border:`1px solid ${tc.passed?'rgba(16,185,129,0.4)':'rgba(239,68,68,0.4)'}`,borderRadius:'var(--r-md)',fontFamily:'var(--font-mono)',fontSize:'0.72rem',whiteSpace:'pre-wrap',color:tc.passed?'var(--green)':'var(--danger)' }}>
                    {tc.actualOutput || '(empty)'}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestCaseManager;
