import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, onChange, onMount, monacoLanguage = 'cpp' }) => {
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        monaco.editor.defineTheme('mentor-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '4B5563', fontStyle: 'italic' },
            ],
            colors: {
                'editor.background':               '#0B1120',
                'editor.foreground':               '#F1F5F9',
                'editorLineNumber.foreground':     '#374151',
                'editorLineNumber.activeForeground': '#06B6D4',
                'editor.lineHighlightBackground': '#111827',
                'editorCursor.foreground':         '#06B6D4',
                'editor.selectionBackground':      '#1E3A4C',
                'editorIndentGuide.background':    '#1F2937',
                'editorWhitespace.foreground':     '#1F2937',
                'minimap.background':              '#0B1120',
                'scrollbarSlider.background':      '#1F2937',
                'scrollbarSlider.hoverBackground': '#2D3748',
            }
        });
        monaco.editor.setTheme('mentor-dark');
        if (onMount) onMount(editor, monaco);
    };

    return (
        <div className="code-editor-wrapper" style={{ height: '100%', width: '100%' }}>
            <Editor
                height="100%"
                language={monacoLanguage}
                value={code}
                theme="mentor-dark"
                onChange={(value) => onChange && onChange(value || '')}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 14, bottom: 14 },
                    lineNumbers: 'on',
                    glyphMargin: false,
                    folding: true,
                    wordWrap: 'off',
                }}
            />
        </div>
    );
};

export default CodeEditor;

