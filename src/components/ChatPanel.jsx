import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User } from 'lucide-react';

const ChatPanel = ({ code, messages, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (input.trim() && !isLoading) { onSendMessage(input); setInput(''); }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0.9rem' }}>

        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
            <div style={{
              width: 48, height: 48, margin: '0 auto 1rem',
              background: 'var(--bg-elevated)', borderRadius: 'var(--r-lg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--border-mid)',
            }}>
              <MessageSquare size={20} color="var(--text-muted)" />
            </div>
            <p style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.45rem' }}>AI Code Assistant</p>
            <p style={{ fontSize: '0.78rem', lineHeight: 1.7 }}>
              Ask me anything about your code.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {['"What does this function do?"', '"How can I optimise this?"', '"Why does this test fail?"'].map(q => (
                <div key={q} style={{
                  fontSize: '0.72rem', color: 'var(--text-muted)', padding: '0.3rem 0.75rem',
                  border: '1px solid var(--border)', borderRadius: 'var(--r-sm)',
                  cursor: 'pointer', transition: 'border-color 0.15s, color 0.15s',
                  background: 'var(--bg-elevated)', textAlign: 'left',
                }}
                  onClick={() => { setInput(q.replace(/"/g, '')); }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                  {q}
                </div>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: '0.7rem' }}>
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            }}>
              {/* Avatar */}
              <div style={{
                width: 24, height: 24, borderRadius: 'var(--r-xs)', flexShrink: 0,
                background: msg.role === 'user' ? 'rgba(255,255,255,0.1)' : 'var(--bg-elevated)',
                border: `1px solid ${msg.role === 'user' ? 'var(--border-bright)' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {msg.role === 'user'
                  ? <User size={12} color="#fff" />
                  : <Bot size={12} color="var(--text-muted)" />}
              </div>
              {/* Bubble */}
              <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'} style={{ maxWidth: '82%' }}>
                <div style={{
                  fontSize: '0.65rem', fontWeight: 700, marginBottom: '0.3rem',
                  color: msg.role === 'user' ? 'var(--text-secondary)' : 'var(--text-muted)',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                  {msg.role === 'user' ? 'You' : 'AI Assistant'}
                </div>
                <div style={{ fontSize: '0.835rem', whiteSpace: 'pre-wrap', lineHeight: 1.7, color: '#fff' }}>
                  {msg.content}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.6rem' }}>
            <div style={{
              width: 24, height: 24, borderRadius: 'var(--r-xs)', flexShrink: 0,
              background: 'var(--bg-elevated)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Bot size={12} color="var(--text-muted)" />
            </div>
            <div className="chat-bubble-ai" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.6rem 0.9rem' }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 5, height: 5, borderRadius: '50%', background: 'var(--text-muted)',
                  display: 'inline-block',
                  animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '0.75rem', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
          <textarea
            value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress}
            placeholder="Ask about your code…"
            disabled={isLoading} rows={2}
            style={{
              flex: 1, minHeight: '50px', maxHeight: '110px',
              padding: '0.5rem 0.75rem',
              background: 'var(--bg-sunken)',
              border: '1px solid var(--border-mid)',
              borderRadius: 'var(--r-md)',
              color: '#fff', fontSize: '0.82rem',
              fontFamily: 'var(--font-sans)', resize: 'none',
              lineHeight: 1.55, outline: 'none', transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--border-white)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-mid)'}
          />
          <button onClick={handleSend} disabled={!input.trim() || isLoading}
            className="btn btn-primary"
            style={{ padding: '0.55rem 0.85rem', borderRadius: 'var(--r-md)', alignSelf: 'flex-end', flexShrink: 0 }}>
            <Send size={13} />
          </button>
        </div>
        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.35rem', textAlign: 'right' }}>
          Enter to send · Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
