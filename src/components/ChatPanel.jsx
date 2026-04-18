import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User } from 'lucide-react';

const ChatPanel = ({ code, messages, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0.9rem' }}>

        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
            <div style={{
              width: 56, height: 56, margin: '0 auto 1rem',
              background: 'rgba(6,182,212,0.07)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(6,182,212,0.15)',
            }}>
              <MessageSquare size={24} color="var(--cyan)" style={{ opacity: 0.7 }} />
            </div>
            <p style={{ fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>AI Code Assistant</p>
            <p style={{ fontSize: '0.78rem', marginTop: '0.4rem', lineHeight: 1.65 }}>
              Ask me anything about your code!<br />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                "What does this do?" · "How to optimize?" · "Why does this fail?"
              </span>
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: '0.6rem' }}>
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            }}>
              {/* Avatar */}
              <div style={{
                width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                background: msg.role === 'user' ? 'var(--cyan-dim)' : 'var(--purple-dim)',
                border: `1px solid ${msg.role === 'user' ? 'rgba(6,182,212,0.3)' : 'rgba(139,92,246,0.3)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {msg.role === 'user'
                  ? <User size={12} color="var(--cyan)" />
                  : <Bot size={12} color="var(--purple)" />}
              </div>

              {/* Bubble */}
              <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}
                style={{ maxWidth: '82%' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, marginBottom: '0.35rem',
                  color: msg.role === 'user' ? 'var(--cyan)' : 'var(--purple)',
                  letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {msg.role === 'user' ? 'You' : 'AI Assistant'}
                </div>
                <div style={{ fontSize: '0.835rem', whiteSpace: 'pre-wrap', lineHeight: 1.65, color: 'var(--text-primary)' }}>
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
              width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
              background: 'var(--purple-dim)', border: '1px solid rgba(139,92,246,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Bot size={12} color="var(--purple)" />
            </div>
            <div className="chat-bubble-ai" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.6rem 0.9rem' }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--purple)',
                  display: 'inline-block',
                  animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '0.75rem',
        background: 'rgba(11,17,32,0.6)',
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your code…"
            disabled={isLoading}
            rows={2}
            style={{
              flex: 1,
              minHeight: '52px',
              maxHeight: '120px',
              padding: '0.5rem 0.75rem',
              background: 'rgba(6,10,22,0.9)',
              border: '1px solid var(--border-accent)',
              borderRadius: 'var(--r-lg)',
              color: 'var(--text-primary)',
              fontSize: '0.825rem',
              fontFamily: 'var(--font-sans)',
              resize: 'none',
              lineHeight: 1.55,
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="btn btn-primary"
            style={{ padding: '0.55rem 0.9rem', borderRadius: 'var(--r-lg)', alignSelf: 'flex-end', flexShrink: 0 }}
            title="Send (Enter)"
          >
            <Send size={15} />
          </button>
        </div>
        <div style={{ fontSize: '0.67rem', color: 'var(--text-muted)', marginTop: '0.35rem', textAlign: 'right' }}>
          Enter to send · Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
