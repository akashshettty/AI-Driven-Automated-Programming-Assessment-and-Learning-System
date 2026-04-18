import React from 'react';
import { ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { value: 'cpp', label: 'C++', monaco: 'cpp' },
  { value: 'java', label: 'Java', monaco: 'java' },
  { value: 'python', label: 'Python', monaco: 'python' },
  { value: 'javascript', label: 'JavaScript', monaco: 'javascript' },
];

export default function LanguageSelector({ value, onChange }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          appearance: 'none', WebkitAppearance: 'none',
          background: 'rgba(22,32,50,0.9)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--r-lg)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8rem',
          fontWeight: 500,
          padding: '0.4rem 2.25rem 0.4rem 0.85rem',
          cursor: 'pointer',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--cyan)'}
        onBlur={e => e.target.style.borderColor = 'var(--border-accent)'}
      >
        {LANGUAGES.map(l => (
          <option key={l.value} value={l.value} style={{ background: '#111827' }}>{l.label}</option>
        ))}
      </select>
      <ChevronDown size={12} color="var(--text-muted)" style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
    </div>
  );
}

export { LANGUAGES };
