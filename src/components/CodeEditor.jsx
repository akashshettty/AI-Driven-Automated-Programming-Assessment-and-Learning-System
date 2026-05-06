import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, onChange, onMount, monacoLanguage = 'cpp' }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.editor.defineTheme('premium-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment',  foreground: '444444', fontStyle: 'italic' },
        { token: 'keyword',  foreground: 'CCCCCC', fontStyle: 'bold' },
        { token: 'string',   foreground: 'A0A0A0' },
        { token: 'number',   foreground: 'BBBBBB' },
        { token: 'type',     foreground: 'E0E0E0' },
        { token: 'function', foreground: 'DDDDDD' },
      ],
      colors: {
        'editor.background':                '#1A1A1A',
        'editor.foreground':                '#E5E5E5',
        'editorLineNumber.foreground':      '#2E2E2E',
        'editorLineNumber.activeForeground':'#666666',
        'editor.lineHighlightBackground':   '#111111',
        'editor.lineHighlightBorder':       '#1C1C1C',
        'editorCursor.foreground':          '#FFFFFF',
        'editor.selectionBackground':       '#2A2A2A',
        'editor.inactiveSelectionBackground':'#1E1E1E',
        'editorIndentGuide.background':     '#161616',
        'editorIndentGuide.activeBackground':'#2A2A2A',
        'editorWhitespace.foreground':      '#1A1A1A',
        'minimap.background':               '#080808',
        'scrollbarSlider.background':       '#1E1E1E',
        'scrollbarSlider.hoverBackground':  '#2A2A2A',
        'scrollbarSlider.activeBackground': '#3A3A3A',
        'editorWidget.background':          '#111111',
        'editorWidget.border':              '#1E1E1E',
        'editorSuggestWidget.background':   '#111111',
        'editorSuggestWidget.border':       '#1E1E1E',
        'editorSuggestWidget.selectedBackground': '#1E1E1E',
        'list.hoverBackground':             '#1A1A1A',
        'list.activeSelectionBackground':   '#222222',
      }
    });
    monaco.editor.setTheme('premium-dark');
    if (onMount) onMount(editor, monaco);
  };

  return (
    <div className="code-editor-wrapper" style={{ height: '100%', width: '100%' }}>
      <Editor
        height="100%"
        language={monacoLanguage}
        value={code}
        theme="premium-dark"
        onChange={(value) => onChange && onChange(value || '')}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 13.5,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          fontLigatures: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          lineNumbers: 'on',
          glyphMargin: false,
          folding: true,
          wordWrap: 'off',
          renderLineHighlight: 'line',
          cursorStyle: 'line',
          cursorWidth: 2,
          smoothScrolling: true,
          roundedSelection: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
