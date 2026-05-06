import React from 'react';
import { Plus, X, Play, CheckCircle, XCircle, FlaskConical } from 'lucide-react';

const TestCaseManager = ({ testCases, onTestCasesChange, onRunAll, isRunning }) => {
  const addTestCase = () =>
    onTestCasesChange([...testCases, { id: Date.now(), input: '', expectedOutput: '', actualOutput: null, passed: null }]);
  const removeTestCase = (id) => onTestCasesChange(testCases.filter(tc => tc.id !== id));
  const updateTestCase = (id, field, value) =>
    onTestCasesChange(testCases.map(tc => tc.id === id ? { ...tc, [field]: value } : tc));

  const passedCount = testCases.filter(tc => tc.passed === true).length;
  const failedCount = testCases.filter(tc => tc.passed === false).length;

  const spinner = (
    <span style={{
      width: 11, height: 11, flexShrink: 0,
      border: '1.5px solid rgba(0,0,0,0.25)',
      borderTopColor: '#000', borderRadius: '50%',
      display: 'inline-block',
      animation: 'rotateSpin 0.8s linear infinite',
    }} />
  );

  return (
    <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', padding: '0.6rem 0.9rem' }}>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '0.6rem' }}>
        <div className="flex items-center gap-2">
          <FlaskConical size={13} color="var(--text-muted)" />
          <span style={{ fontWeight: 700, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--text-muted)' }}>
            Test Cases
          </span>
          {testCases.length > 0 && (
            <div className="flex items-center gap-1" style={{ marginLeft: '0.2rem' }}>
              {passedCount > 0 && <span className="badge badge-success">{passedCount} ✓</span>}
              {failedCount > 0 && <span className="badge badge-error">{failedCount} ✗</span>}
              {passedCount === 0 && failedCount === 0 && <span className="badge badge-cyan">{testCases.length}</span>}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onRunAll} disabled={isRunning || testCases.length === 0}
            className="btn btn-primary" style={{ padding: '0.26rem 0.65rem', fontSize: '0.7rem' }}>
            {isRunning ? <>{spinner} Running…</> : <><Play size={10} fill="#000" /> Run All</>}
          </button>
          <button onClick={addTestCase} className="btn" style={{ padding: '0.26rem 0.65rem', fontSize: '0.7rem' }}>
            <Plus size={11} /> Add
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ maxHeight: '190px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {testCases.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '0.75rem 0', color: 'var(--text-muted)', fontSize: '0.77rem' }}>
            Click <strong style={{ color: '#fff' }}>Add</strong> to create a test case.
          </div>
        ) : testCases.map((tc, i) => (
          <div key={tc.id} className={`tc-item ${tc.passed === true ? 'pass' : tc.passed === false ? 'fail' : ''}`}>
            <div className="flex items-center justify-between" style={{ marginBottom: '0.4rem' }}>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>TC-{i + 1}</span>
                {tc.passed === true  && <CheckCircle size={11} color="var(--green)" />}
                {tc.passed === false && <XCircle size={11} color="var(--danger)" />}
              </div>
              <button onClick={() => removeTestCase(tc.id)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', padding: '0.15rem', borderRadius: 'var(--r-xs)',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                <X size={12} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
              {[['input', 'Input', 'stdin…'], ['expectedOutput', 'Expected', 'expected…']].map(([field, label, ph]) => (
                <div key={field}>
                  <label style={{ fontSize: '0.63rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.09em', fontWeight: 700 }}>
                    {label}
                  </label>
                  <textarea
                    value={tc[field]}
                    onChange={(e) => updateTestCase(tc.id, field, e.target.value)}
                    placeholder={ph}
                    style={{
                      width: '100%', minHeight: '34px',
                      padding: '0.3rem 0.5rem',
                      background: 'var(--bg-sunken)',
                      border: '1px solid var(--border-mid)',
                      borderRadius: 'var(--r-sm)',
                      color: '#fff', fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem', resize: 'vertical', outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--border-white)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-mid)'}
                  />
                </div>
              ))}
            </div>

            {tc.actualOutput !== null && (
              <div style={{ marginTop: '0.35rem' }}>
                <label style={{ fontSize: '0.63rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.09em', fontWeight: 700 }}>
                  Actual
                </label>
                <div style={{
                  padding: '0.3rem 0.5rem',
                  background: 'var(--bg-sunken)',
                  border: `1px solid ${tc.passed ? 'rgba(52,211,153,0.25)' : 'rgba(248,113,113,0.25)'}`,
                  borderRadius: 'var(--r-sm)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                  whiteSpace: 'pre-wrap',
                  color: tc.passed ? 'var(--green)' : 'var(--danger)',
                }}>
                  {tc.actualOutput || '(empty)'}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestCaseManager;
