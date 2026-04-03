import React, { useMemo, useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { runPipeline } from './core/engine';
import { CommandPalette } from './components/CommandPalette';
import { PipelineEditor } from './components/PipelineEditor';
import { QuickActions } from './components/QuickActions';
import { Copy, Download, FileText, Trash2, Moon, Sun } from 'lucide-react';

function App() {
  const { inputText, setInputText, pipeline, theme, toggleTheme } = useAppStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const outputText = useMemo(() => {
    return runPipeline(inputText, pipeline);
  }, [inputText, pipeline]);

  const getStats = (text: string) => {
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const lines = text === '' ? 0 : text.split(/\r\n|\r|\n/).length;
    return { chars, words, lines };
  };

  const inputStats = getStats(inputText);
  const outputStats = getStats(outputText);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fluxtext-output.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={appContainerStyle}>
      <CommandPalette />
      
      <header style={headerStyle}>
        <div style={logoStyle}>
          <div style={logoIconStyle}>
            <FileText size={20} color="#fff" strokeWidth={2.5} />
          </div>
          <h1>FluxText</h1>
        </div>
        <div style={headerRightStyle}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
            The All-in-One Offline Text Transformation Suite
          </span>
          <button style={actionBtnStyle} onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <Moon size={18} strokeWidth={2.5} /> : <Sun size={18} strokeWidth={2.5} />}
          </button>
        </div>
      </header>

      <main style={mainStyle}>
        <PipelineEditor />
        <QuickActions />

        <div style={splitPaneStyle}>
          {/* INPUT PANE */}
          <div style={paneStyle}>
            <div style={paneHeaderStyle}>
              <span style={paneTitleStyle}>Input</span>
              <div style={actionsStyle}>
                <span style={statsStyle}>
                  {inputStats.chars}c | {inputStats.words}w | {inputStats.lines}l
                </span>
                {inputText.length > 0 && (
                  <button style={actionBtnStyle} onClick={() => setInputText('')} title="Clear Text">
                    <Trash2 size={16} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>
            <textarea
              style={textareaStyle}
              placeholder="Type or paste your text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              autoFocus
            />
          </div>

          {/* OUTPUT PANE */}
          <div style={paneStyle}>
            <div style={paneHeaderStyle}>
              <span style={paneTitleStyle}>Output</span>
              <div style={actionsStyle}>
                <span style={statsStyle}>
                  {outputStats.chars}c | {outputStats.words}w | {outputStats.lines}l
                </span>
                <button style={actionBtnStyle} onClick={handleCopy} title="Copy to Clipboard">
                  <Copy size={16} strokeWidth={2.5} />
                </button>
                <button style={actionBtnStyle} onClick={handleDownload} title="Download File">
                  <Download size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
            <textarea
              style={{ ...textareaStyle, backgroundColor: 'var(--bg-surface-hover)' }}
              value={outputText}
              readOnly
              placeholder="Output will appear here..."
            />
          </div>
        </div>
      </main>
    </div>
  );
}

const appContainerStyle: React.CSSProperties = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const headerStyle: React.CSSProperties = {
  padding: '8px 32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid var(--border-subtle)',
  backgroundColor: 'var(--bg-surface)',
};

const logoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const headerRightStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const logoIconStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  backgroundColor: 'var(--accent-main)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  padding: '12px 32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const splitPaneStyle: React.CSSProperties = {
  display: 'flex',
  gap: '24px',
  flex: 1,
  minHeight: '200px',
};

const paneStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--bg-surface)',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  overflow: 'hidden',
};

const paneHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  borderBottom: '1px solid var(--border-subtle)',
};

const paneTitleStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '0.9rem',
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const actionsStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const statsStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  color: 'var(--text-muted)',
  fontFamily: 'var(--font-mono)',
};

const actionBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6px',
  borderRadius: '4px',
  color: 'var(--text-muted)',
  transition: 'all 0.2s',
  backgroundColor: 'var(--bg-main)',
  border: '1px solid var(--border-subtle)',
};

const textareaStyle: React.CSSProperties = {
  flex: 1,
  width: '100%',
  padding: '16px',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  fontSize: '1rem',
  lineHeight: '1.6',
  fontFamily: 'var(--font-mono)',
};

export default App;
