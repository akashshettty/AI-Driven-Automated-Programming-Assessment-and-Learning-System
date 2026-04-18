import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Code, Play, Sparkles, RotateCcw, Send, Zap, MessageSquare, Activity, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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

export default function ProblemDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const problem = getProblemBySlug(slug);

  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [activeTab, setActiveTab] = useState('analysis');   // analysis | chat | complexity | feedback
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [complexity, setComplexity] = useState(null);
  const [runGlow, setRunGlow] = useState(false);

  // Testcase panel
  const [tcTab, setTcTab] = useState('testcase'); // testcase | result
  const [activeTestcase, setActiveTestcase] = useState(0);
  const [tcResults, setTcResults] = useState([]);

  // Submit
  const [submitResult, setSubmitResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);

  // Load starter code when problem or language changes
  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[language] || '');
      setAnalysis(null); setOutput(null); setComplexity(null);
      setTcResults([]); setSubmitResult(null); setAiFeedback(null);
    }
  }, [problem, language]);

  // Prefill stdin with first testcase input
  useEffect(() => {
    if (problem && problem.testcases.length > 0) {
      setUserInput(problem.testcases[activeTestcase]?.input || '');
    }
  }, [problem, activeTestcase]);

  if (!problem) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', background: 'var(--bg-base)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Problem not found.</p>
        <button className="btn btn-primary" onClick={() => navigate('/problems')}>← Back to Problems</button>
      </div>
    );
  }

  // ── Prev / Next problem navigation
  const currentIdx = problems.findIndex(p => p.slug === slug);
  const prevProblem = currentIdx > 0 ? problems[currentIdx - 1] : null;
  const nextProblem = currentIdx < problems.length - 1 ? problems[currentIdx + 1] : null;

  // ── AI Analysis / Hint
  const handleGetHint = async () => {
    setIsAnalyzing(true); setAnalysis(null); setComplexity(null);
    setActiveTab('analysis');
    try {
      const res = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setAnalysis(data);
      if (data.complexity) setComplexity(data.complexity);
    } catch {
      setAnalysis({
        logicError: null,
        hints: problem.hints,
        testCases: [],
      });
    } finally { setIsAnalyzing(false); }
  };

  // ── Run Code
  const handleRunCode = async () => {
    setIsRunning(true); setRunGlow(true); setOutput(null);
    setTcTab('result');
    setTimeout(() => setRunGlow(false), 2000);
    try {
      const res = await fetch('http://localhost:3000/api/execute', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, input: userInput }),
      });
      const result = await res.json();
      setOutput(result);
      setTcResults([{ input: userInput, output: result.output, error: result.error, success: result.success }]);
    } catch {
      setOutput({ success: false, output: '', error: 'Failed to connect to backend.', exitCode: -1 });
    } finally { setIsRunning(false); }
  };

  // ── Submit (runs hidden tests)
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const allTests = [...problem.testcases, ...problem.hiddenTests];
    let passedCount = 0;
    let failedCase = null;
    for (const tc of allTests) {
      try {
        const res = await fetch('http://localhost:3000/api/execute', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, input: tc.input }),
        });
        const result = await res.json();
        const actual = (result.output || '').trim();
        const expected = (tc.expectedOutput || '').trim();
        if (actual === expected) {
          passedCount++;
        } else if (!failedCase) {
          failedCase = { input: tc.input, expected, got: actual };
        }
      } catch {
        failedCase = failedCase || { input: tc.input, expected: tc.expectedOutput, got: 'Error: Backend unavailable' };
      }
    }
    const passed = passedCount === allTests.length;
    const result = {
      passed, passedCount, total: allTests.length, failedCase,
      runtime: `${40 + Math.floor(Math.random() * 60)}ms`,
      memory: `${38 + Math.floor(Math.random() * 10)}MB`,
      runtimePct: `Beats ${50 + Math.floor(Math.random() * 45)}%`,
      memoryPct: `Beats ${50 + Math.floor(Math.random() * 45)}%`,
      score: passed ? 100 : Math.round((passedCount / allTests.length) * 100),
    };
    setSubmitResult(result);
    setShowModal(true);
    setIsSubmitting(false);
    setActiveTab('feedback');
    setAiFeedback(null);
  };

  // ── AI Chat
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

  // ── Get AI Feedback after submit fail
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

  const diffColor = { Easy: 'var(--green)', Medium: '#F59E0B', Hard: 'var(--danger)' };

  const aiTabs = [
    { id: 'analysis',   icon: <Zap size={13} />,           label: 'Analysis' },
    { id: 'chat',       icon: <MessageSquare size={13} />,  label: 'Chat' },
    { id: 'complexity', icon: <Activity size={13} />,       label: 'Complexity' },
    { id: 'feedback',   icon: <Sparkles size={13} />,       label: 'Feedback' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-base)', overflow: 'hidden' }}>

      {/* ── Top Bar ── */}
      <header style={{
        height: 52, flexShrink: 0,
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        background: 'rgba(11,17,32,0.96)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1rem', gap: '0.75rem',
      }}>
        {/* Left: Logo + breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', color: 'inherit' }}>
            <Code size={18} color="var(--cyan)" />
            <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>Code<span style={{ color: 'var(--cyan)' }}>Mentor</span></span>
          </Link>
          <span style={{ color: 'var(--border-accent)', fontSize: '0.75rem' }}>/</span>
          <Link to="/problems" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.78rem' }}>Problems</Link>
          <span style={{ color: 'var(--border-accent)', fontSize: '0.75rem' }}>/</span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{problem.title}</span>
        </div>

        {/* Center: Prev / Next */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button className="btn" style={{ padding: '0.3rem 0.5rem', fontSize: '0.72rem' }}
            disabled={!prevProblem} onClick={() => prevProblem && navigate(`/problems/${prevProblem.slug}`)}>
            <ChevronLeft size={13} />
          </button>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {currentIdx + 1}/{problems.length}
          </span>
          <button className="btn" style={{ padding: '0.3rem 0.5rem', fontSize: '0.72rem' }}
            disabled={!nextProblem} onClick={() => nextProblem && navigate(`/problems/${nextProblem.slug}`)}>
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <LanguageSelector value={language} onChange={setLanguage} />

          <button className="btn" style={{ padding: '0.35rem 0.7rem', fontSize: '0.75rem' }}
            onClick={() => { setCode(problem.starterCode[language]); setAnalysis(null); setOutput(null); }}>
            <RotateCcw size={13} /> Reset
          </button>

          <button className={`btn btn-run ${runGlow ? 'glow-green' : ''}`}
            onClick={handleRunCode} disabled={isRunning}
            style={{ padding: '0.38rem 0.85rem', fontSize: '0.78rem', minWidth: 90 }}>
            {isRunning
              ? <><span style={{ width:12,height:12,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block',animation:'rotateSpin 0.8s linear infinite' }} /> Running…</>
              : <><Play size={13} fill="white" /> Run</>}
          </button>

          <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}
            style={{ padding: '0.38rem 0.85rem', fontSize: '0.78rem', minWidth: 90 }}>
            {isSubmitting
              ? <><span style={{ width:12,height:12,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block',animation:'rotateSpin 0.8s linear infinite' }} /> Submitting…</>
              : <><Send size={13} /> Submit</>}
          </button>

          <button className="btn" style={{ padding: '0.38rem 0.85rem', fontSize: '0.78rem', background: 'rgba(139,92,246,0.1)', borderColor: 'rgba(139,92,246,0.3)', color: 'var(--purple)', minWidth: 90 }}
            onClick={handleGetHint} disabled={isAnalyzing}>
            {isAnalyzing
              ? <><span style={{ width:12,height:12,border:'2px solid rgba(139,92,246,0.3)',borderTopColor:'var(--purple)',borderRadius:'50%',display:'inline-block',animation:'rotateSpin 0.8s linear infinite' }} /> Analyzing…</>
              : <><Sparkles size={13} /> Get Hint</>}
          </button>
        </div>
      </header>

      {/* ── Main Split Layout ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* LEFT: Problem Description */}
        <div style={{ width: '40%', minWidth: 340, maxWidth: 520, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
          <ProblemDescription problem={problem} />
        </div>

        {/* RIGHT: Editor + AI Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

          {/* Editor + AI side panel */}
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

            {/* Code Editor column */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border)', overflow: 'hidden', minWidth: 0 }}>
              {/* Editor header */}
              <div style={{ height: 36, display: 'flex', alignItems: 'center', padding: '0 0.75rem', background: 'rgba(11,17,32,0.7)', borderBottom: '1px solid var(--border)', flexShrink: 0, gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  {['#EF4444','#F59E0B','#10B981'].map(c => <div key={c} style={{ width:10,height:10,borderRadius:'50%',background:c,opacity:0.7 }} />)}
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft:'0.3rem', fontFamily:'var(--font-mono)' }}>
                  solution.{language === 'cpp' ? 'cpp' : language === 'java' ? 'java' : language === 'python' ? 'py' : 'js'}
                </span>
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <CodeEditor code={code} onChange={setCode} monacoLanguage={LANG_MONACO[language]} />
              </div>
            </div>

            {/* AI Panel */}
            <div style={{ width: 370, display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)', flexShrink: 0 }}>
              <nav className="tab-nav">
                {aiTabs.map(t => (
                  <button key={t.id} className={`tab-btn ${activeTab === t.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(t.id)} style={{ fontSize: '0.72rem', padding: '0.6rem 0.25rem' }}>
                    {t.icon}<span>{t.label}</span>
                  </button>
                ))}
              </nav>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {activeTab === 'analysis'   && <MentorPanel analysis={analysis} isAnalyzing={isAnalyzing} />}
                {activeTab === 'chat'       && <ChatPanel code={code} messages={chatMessages} onSendMessage={handleSendMessage} isLoading={isChatLoading} />}
                {activeTab === 'complexity' && <ComplexityPanel complexity={complexity} />}
                {activeTab === 'feedback'   && <FeedbackPanel feedback={aiFeedback} submitResult={submitResult} />}
              </div>
            </div>
          </div>

          {/* ── Testcase Panel ── */}
          <div style={{ height: 200, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)', flexShrink: 0 }}>
            {/* TC Tab bar */}
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'rgba(11,17,32,0.6)', flexShrink: 0 }}>
              {['testcase', 'result'].map(t => (
                <button key={t} onClick={() => setTcTab(t)} style={{
                  padding: '0.5rem 1rem', background: 'transparent', border: 'none',
                  color: tcTab === t ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: tcTab === t ? 600 : 400, fontSize: '0.78rem',
                  cursor: 'pointer', fontFamily: 'var(--font-sans)',
                  borderBottom: tcTab === t ? '2px solid var(--cyan)' : '2px solid transparent',
                  transition: 'color 0.15s',
                  textTransform: 'capitalize',
                }}>
                  {t === 'testcase' ? 'Testcase' : 'Result'}
                </button>
              ))}
              {/* Testcase selector */}
              {tcTab === 'testcase' && (
                <div style={{ display: 'flex', gap: '0.3rem', marginLeft: '0.75rem' }}>
                  {problem.testcases.map((_, i) => (
                    <button key={i} onClick={() => setActiveTestcase(i)} style={{
                      padding: '0.2rem 0.6rem', borderRadius: 99, fontSize: '0.7rem', fontWeight: 600,
                      border: `1px solid ${activeTestcase === i ? 'var(--cyan)' : 'var(--border)'}`,
                      background: activeTestcase === i ? 'var(--cyan-dim)' : 'transparent',
                      color: activeTestcase === i ? 'var(--cyan)' : 'var(--text-muted)',
                      cursor: 'pointer',
                    }}>
                      Case {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* TC Content */}
            <div style={{ flex: 1, overflow: 'auto', padding: '0.75rem 1rem' }}>
              {tcTab === 'testcase' && (
                <div style={{ display: 'flex', gap: '1rem', height: '100%' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Input</div>
                    <textarea
                      value={userInput}
                      onChange={e => setUserInput(e.target.value)}
                      style={{ width: '100%', height: '80%', background: 'rgba(6,10,22,0.9)', border: '1px solid var(--border-accent)', borderRadius: 'var(--r-md)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', padding: '0.5rem', resize: 'none' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Expected Output</div>
                    <div style={{ padding: '0.5rem', background: 'rgba(6,10,22,0.9)', border: '1px solid var(--border-accent)', borderRadius: 'var(--r-md)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--green)' }}>
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

      {/* ── Submit Modal ── */}
      {showModal && (
        <SubmitModal
          result={submitResult}
          onClose={() => setShowModal(false)}
          onGetFeedback={handleGetFeedback}
        />
      )}
    </div>
  );
}
