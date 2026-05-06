import React from 'react';
import { ChevronDown } from 'lucide-react';

export const LANGUAGES = [
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
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-mid)',
          borderRadius: 'var(--r-md)',
          color: '#fff',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.78rem',
          fontWeight: 500,
          padding: '0.35rem 2rem 0.35rem 0.75rem',
          cursor: 'pointer',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--border-white)'}
        onBlur={e => e.target.style.borderColor = 'var(--border-mid)'}
      >
        {LANGUAGES.map(l => (
          <option key={l.value} value={l.value} style={{ background: '#1E1E1E', color: '#fff' }}>
            {l.label}
          </option>
        ))}
      </select>
      <ChevronDown size={11} color="var(--text-muted)" style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
    </div>
  );
}
