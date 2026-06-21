import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Code, Play, Sparkles, RotateCcw, Send, Zap, MessageSquare, Activity, ChevronLeft, ChevronRight } from 'lucide-react';

// ── Matte charcoal palette — scoped to problem page only ─────────────
const C = {
  bg:         '#181818',   // matte charcoal — page root
  header:     '#141414',   // top bar — darkest element
  panel:      '#1E1E1E',   // left description / right AI panels
  editor:     '#1A1A1A',   // Monaco editor background
  elevated:   '#252525',   // cards, hover states, metric rows
  sunken:     '#111111',   // inputs, textareas, code blocks
  border:     'rgba(255,255,255,0.06)',
  borderMid:  'rgba(255,255,255,0.10)',
  borderBright:'rgba(255,255,255,0.20)',
  tab:        '#1C1C1C',   // tab bar background
};

import { getProblemBySlug, problems } from '../data/problems';
import CodeEditor from '../components/CodeEditor';
import MentorPanel from '../components/MentorPanel';
import OutputPanel from '../components/OutputPanel';
import ChatPanel from '../components/ChatPanel';
import ComplexityPanel from '../components/ComplexityPanel';
import ProblemDescription from '../components/ProblemDescription';
import FeedbackPanel from '../components/FeedbackPanel';
import SubmitModal from '../components/SubmitModal';
import LanguageSelector from '../components/LanguageSelector';

const LANG_MONACO = { cpp: 'cpp', java: 'java', python: 'python', javascript: 'javascript' };
const LANG_EXT    = { cpp: 'cpp', java: 'java', python: 'py', javascript: 'js' };

// ─── Helpers ────────────────────────────────────────────────────────────────
const parseInputVars = (raw) => {
  const vars = {};
  (raw || '').split('\n').forEach(line => {
    const m = line.match(/^\s*(\w+)\s*=\s*(.+)$/);
    if (m) {
      const key = m[1].trim();
      const value = m[2].trim();
      try {
        // Try to parse as JSON (handling simple python-style single quotes)
        vars[key] = JSON.parse(value.replace(/'/g, '"'));
      } catch {
        vars[key] = value.replace(/^["'](.*)["']$/, '$1');
      }
    }
  });
  return vars;
};

const validateResult = (problemSlug, actual, expected, inputVars) => {
  try {
    const actualStr = (actual || '').trim();
    const expectedStr = (expected || '').trim();
    
    // If exact string match, return true immediately
    if (actualStr === expectedStr) return true;

    const actualParsed = JSON.parse(actualStr);
    
    if (problemSlug === 'two-sum') {
      if (!Array.isArray(actualParsed) || actualParsed.length !== 2) return false;
      const nums = inputVars.nums;
      const target = Number(inputVars.target);
      const [i, j] = actualParsed;
      // Basic sanity check on indices
      if (i < 0 || j < 0 || i >= nums.length || j >= nums.length || i === j) return false;
      return nums[i] + nums[j] === target;
    }
    
    // For others, try JSON comparison (handles [0,1] vs [0, 1])
    const expectedParsed = JSON.parse(expectedStr);
    
    // Handle array order if problem allows (e.g. Two Sum indices can be in any order)
    // But Two Sum is handled above. For others, usually order matters or is specified.
    return JSON.stringify(actualParsed) === JSON.stringify(expectedParsed);
  } catch {
    return (actual || '').trim() === (expected || '').trim();
  }
};

export default function ProblemDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const problem = getProblemBySlug(slug);

  const [language, setLanguage]       = useState('cpp');
  const [code, setCode]               = useState('');
  const [analysis, setAnalysis]       = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [output, setOutput]           = useState(null);
  const [isRunning, setIsRunning]     = useState(false);
  const [userInput, setUserInput]     = useState('');
  const [activeTab, setActiveTab]     = useState('analysis');
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [complexity, setComplexity]   = useState(null);
  const [tcTab, setTcTab]             = useState('testcase');
  const [activeTestcase, setActiveTestcase] = useState(0);
  const [submitResult, setSubmitResult] = useState(null);
  const [showModal, setShowModal]     = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiFeedback, setAiFeedback]   = useState(null);

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[language] || '');
      setAnalysis(null); setOutput(null); setComplexity(null);
      setSubmitResult(null); setAiFeedback(null);
    }
  }, [problem, language]);

  useEffect(() => {
    if (problem?.testcases?.length > 0)
      setUserInput(problem.testcases[activeTestcase]?.input || '');
  }, [problem, activeTestcase]);

  if (!problem) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', background: 'var(--bg-base)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Problem not found.</p>
        <button className="btn btn-primary" onClick={() => navigate('/problems')}>Back to Problems</button>
      </div>
    );
  }

  const currentIdx  = problems.findIndex(p => p.slug === slug);
  const prevProblem = currentIdx > 0 ? problems[currentIdx - 1] : null;
  const nextProblem = currentIdx < problems.length - 1 ? problems[currentIdx + 1] : null;

  const handleGetHint = async () => {
    setIsAnalyzing(true); setAnalysis(null); setComplexity(null); setActiveTab('analysis');
    try {
      const res = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setAnalysis(data);
      if (data.complexity) setComplexity(data.complexity);
    } catch {
      setAnalysis({ logicError: null, hints: problem.hints, testCases: [] });
    } finally { setIsAnalyzing(false); }
  };

  const handleRunCode = async () => {
    setIsRunning(true); setOutput(null); setTcTab('result');
    try {
      const res = await fetch('http://localhost:3000/api/execute', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, input: userInput, language, problemSlug: slug }),
      });
      setOutput(await res.json());
    } catch {
      setOutput({ success: false, output: '', error: 'Failed to connect to backend.', exitCode: -1 });
    } finally { setIsRunning(false); }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const allTests = [...problem.testcases, ...problem.hiddenTests];
    let passedCount = 0, failedCase = null;
    for (const tc of allTests) {
      try {
        const res = await fetch('http://localhost:3000/api/execute', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, input: tc.input, language, problemSlug: slug }),
        });
        const result = await res.json();
        const actual = (result.output || '').trim();
        const expected = (tc.expectedOutput || '').trim();
        const inputVars = parseInputVars(tc.input);

        if (validateResult(slug, actual, expected, inputVars)) {
          passedCount++;
        } else if (!failedCase) {
          failedCase = { input: tc.input, expected, got: actual };
        }
      } catch (err) {
        console.error('Submission error:', err);
        failedCase = failedCase || { input: tc.input, expected: tc.expectedOutput, got: 'Error: Backend unavailable' };
      }
    }
    const passed = passedCount === allTests.length;
    setSubmitResult({
      passed, passedCount, total: allTests.length, failedCase,
      runtime: `${40 + Math.floor(Math.random() * 60)}ms`,
      memory: `${38 + Math.floor(Math.random() * 10)}MB`,
      runtimePct: `Beats ${50 + Math.floor(Math.random() * 45)}%`,
      memoryPct: `Beats ${50 + Math.floor(Math.random() * 45)}%`,
      score: passed ? 100 : Math.round((passedCount / allTests.length) * 100),
    });
    setShowModal(true); setIsSubmitting(false); setActiveTab('feedback'); setAiFeedback(null);
  };

  const handleSendMessage = async (message) => {
    setChatMessages(prev => [...prev, { id: Date.now(), role: 'user', content: message }]);
    setIsChatLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, message, history: chatMessages }),
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: data.reply }]);
    } catch {
      setChatMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: 'Unable to reach AI. Check if backend is running.' }]);
    } finally { setIsChatLoading(false); }
  };

  const handleGetFeedback = async () => {
    setActiveTab('feedback');
    if (submitResult?.failedCase) {
      try {
        const res = await fetch('http://localhost:3000/api/chat', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            message: `I submitted my solution and it failed. Input: ${submitResult.failedCase.input}, Expected: ${submitResult.failedCase.expected}, My output: ${submitResult.failedCase.got}. Please explain what's wrong and give me a hint to fix it, without giving the full answer.`,
            history: [],
          }),
        });
        const data = await res.json();
        setAiFeedback(data.reply);
      } catch {
        setAiFeedback('Unable to fetch AI feedback. Please make sure the backend is running.');
      }
    }
  };

  const aiTabs = [
    { id: 'analysis',   icon: <Zap size={12} />,          label: 'Analysis' },
    { id: 'chat',       icon: <MessageSquare size={12} />, label: 'Chat' },
    { id: 'complexity', icon: <Activity size={12} />,      label: 'Complexity' },
    { id: 'feedback',   icon: <Sparkles size={12} />,      label: 'Feedback' },
  ];

  const spinner = (size = 12, color = 'rgba(255,255,255,0.4)') => (
    <span style={{
      width: size, height: size, flexShrink: 0,
      border: `1.5px solid ${color}`,
      borderTopColor: '#fff',
      borderRadius: '50%',
      display: 'inline-block',
      animation: 'rotateSpin 0.8s linear infinite',
    }} />
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: C.bg, overflow: 'hidden' }}>

      {/* ── Top Bar ── */}
      <header style={{
        height: 52, flexShrink: 0,
        background: C.header,
        borderBottom: `1px solid ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1rem', gap: '0.75rem',
      }}>

        {/* Left: Logo + breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', textDecoration: 'none' }}>
            <div style={{ width: 22, height: 22, borderRadius: 'var(--r-xs)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code size={12} color="#000" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '0.875rem', color: '#fff', letterSpacing: '-0.025em' }}>
              Code<span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>Mentor</span>
            </span>
          </Link>
          <span style={{ color: 'var(--border-mid)', fontSize: '0.9rem' }}>/</span>
          <Link to="/problems" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.77rem', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>Problems</Link>
          <span style={{ color: 'var(--border-mid)', fontSize: '0.9rem' }}>/</span>
          <span style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', fontWeight: 500, maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {problem.title}
          </span>
        </div>

        {/* Center: Prev / Next */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button className="btn" style={{ padding: '0.25rem 0.45rem' }}
            disabled={!prevProblem} onClick={() => prevProblem && navigate(`/problems/${prevProblem.slug}`)}>
            <ChevronLeft size={13} />
          </button>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', minWidth: 38, textAlign: 'center' }}>
            {currentIdx + 1}/{problems.length}
          </span>
          <button className="btn" style={{ padding: '0.25rem 0.45rem' }}
            disabled={!nextProblem} onClick={() => nextProblem && navigate(`/problems/${nextProblem.slug}`)}>
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          <LanguageSelector value={language} onChange={setLanguage} />

          <button className="btn" style={{ padding: '0.3rem 0.65rem', fontSize: '0.73rem' }}
            onClick={() => { setCode(problem.starterCode[language]); setAnalysis(null); setOutput(null); }}>
            <RotateCcw size={11} /> Reset
          </button>

          <button className="btn btn-run" onClick={handleRunCode} disabled={isRunning}
            style={{ padding: '0.32rem 0.85rem', fontSize: '0.76rem', minWidth: 84 }}>
            {isRunning ? <>{spinner(11)} Running…</> : <><Play size={11} fill="white" /> Run</>}
          </button>

          <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}
            style={{ padding: '0.32rem 0.85rem', fontSize: '0.76rem', minWidth: 88 }}>
            {isSubmitting ? <>{spinner(11, 'rgba(0,0,0,0.3)')} Submitting…</> : <><Send size={11} /> Submit</>}
          </button>

          <button className="btn" style={{ padding: '0.32rem 0.85rem', fontSize: '0.76rem', minWidth: 92 }}
            onClick={handleGetHint} disabled={isAnalyzing}>
            {isAnalyzing ? <>{spinner(11)} Analyzing…</> : <><Sparkles size={11} /> Get Hint</>}
          </button>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* LEFT: Problem */}
        <div style={{ width: '40%', minWidth: 340, maxWidth: 520, borderRight: `1px solid ${C.border}`, background: C.panel, display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
          <ProblemDescription problem={problem} />
        </div>

        {/* RIGHT: Editor + AI */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

          <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

            {/* Editor column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: `1px solid ${C.border}`, background: C.editor, overflow: 'hidden', minWidth: 0 }}>
              {/* Editor chrome */}
              <div style={{
                height: 36, display: 'flex', alignItems: 'center',
                padding: '0 0.85rem', background: C.panel,
                borderBottom: `1px solid ${C.border}`, flexShrink: 0, gap: '0.5rem',
              }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {['#2A2A2A', '#333333', '#3A3A3A'].map((c, i) => (
                    <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c, border: '1px solid rgba(255,255,255,0.06)' }} />
                  ))}
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginLeft: '0.25rem' }}>
                  solution.{LANG_EXT[language]}
                </span>
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <CodeEditor code={code} onChange={setCode} monacoLanguage={LANG_MONACO[language]} />
              </div>
            </div>

            {/* AI Panel */}
            <div style={{ width: 360, display: 'flex', flexDirection: 'column', background: C.panel, flexShrink: 0 }}>
              <div className="tab-nav" style={{ background: C.tab, borderBottom: `1px solid ${C.border}` }}>
                {aiTabs.map(t => (
                  <button key={t.id} className={`tab-btn ${activeTab === t.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(t.id)} style={{ fontSize: '0.7rem', padding: '0.6rem 0.25rem' }}>
                    {t.icon}<span>{t.label}</span>
                  </button>
                ))}
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {activeTab === 'analysis'   && <MentorPanel analysis={analysis} isAnalyzing={isAnalyzing} />}
                {activeTab === 'chat'       && <ChatPanel code={code} messages={chatMessages} onSendMessage={handleSendMessage} isLoading={isChatLoading} />}
                {activeTab === 'complexity' && <ComplexityPanel complexity={complexity} />}
                {activeTab === 'feedback'   && <FeedbackPanel feedback={aiFeedback} submitResult={submitResult} />}
              </div>
            </div>
          </div>

          {/* ── Testcase Panel ── */}
          <div style={{ height: 210, borderTop: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', background: C.panel, flexShrink: 0 }}>
            {/* TC Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${C.border}`, background: C.tab, flexShrink: 0 }}>
              {['testcase', 'result'].map(t => (
                <button key={t} onClick={() => setTcTab(t)} style={{
                  padding: '0.5rem 1rem', background: 'transparent', border: 'none',
                  color: tcTab === t ? '#fff' : 'var(--text-muted)',
                  fontWeight: tcTab === t ? 600 : 400, fontSize: '0.77rem',
                  cursor: 'pointer', fontFamily: 'var(--font-sans)',
                  borderBottom: tcTab === t ? '1.5px solid #fff' : '1.5px solid transparent',
                  transition: 'color 0.15s', textTransform: 'capitalize',
                }}>{t === 'testcase' ? 'Testcase' : 'Result'}</button>
              ))}

              {tcTab === 'testcase' && (
                <div style={{ display: 'flex', gap: '0.3rem', marginLeft: '0.75rem' }}>
                  {problem.testcases.map((_, i) => (
                    <button key={i} onClick={() => setActiveTestcase(i)} style={{
                      padding: '0.2rem 0.55rem', borderRadius: 'var(--r-xs)', fontSize: '0.7rem', fontWeight: 600,
                      border: `1px solid ${activeTestcase === i ? 'var(--border-bright)' : 'var(--border)'}`,
                      background: activeTestcase === i ? 'rgba(255,255,255,0.06)' : 'transparent',
                      color: activeTestcase === i ? '#fff' : 'var(--text-muted)',
                      cursor: 'pointer',
                    }}>Case {i + 1}</button>
                  ))}
                </div>
              )}
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: '0.8rem 1rem' }}>
              {tcTab === 'testcase' && (
                <div style={{ display: 'flex', gap: '1rem', height: '100%' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.09em', fontWeight: 700 }}>Input</div>
                    <textarea
                      value={userInput}
                      onChange={e => setUserInput(e.target.value)}
                      style={{
                        width: '100%', height: '75%',
                        background: C.sunken, border: `1px solid ${C.borderMid}`,
                        borderRadius: 'var(--r-md)', color: '#fff',
                        fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                        padding: '0.5rem', resize: 'none',
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.09em', fontWeight: 700 }}>Expected Output</div>
                    <div style={{
                      padding: '0.5rem 0.65rem', background: C.sunken,
                      border: `1px solid ${C.borderMid}`,
                      borderRadius: 'var(--r-md)', fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem', color: 'var(--green)',
                    }}>
                      {problem.testcases[activeTestcase]?.expectedOutput || ''}
                    </div>
                  </div>
                </div>
              )}

              {tcTab === 'result' && (
                <div style={{ height: '100%' }}>
                  <OutputPanel output={output} isRunning={isRunning} userInput={userInput} onInputChange={setUserInput} compact />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <SubmitModal result={submitResult} onClose={() => setShowModal(false)} onGetFeedback={handleGetFeedback} />
      )}
    </div>
  );
}
