import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Play, X, Trash2, Plus, Save } from 'lucide-react';

export function PipelineEditor() {
  const { pipeline, removeTransformFromPipeline, setPaletteOpen, setSavedPipelinesOpen, clearPipeline } = useAppStore();

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Play size={16} color="var(--accent-main)" strokeWidth={2.5} />
          <h3 style={titleStyle}>Transformation Pipeline</h3>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
             {pipeline.length > 0 && (
                <button style={{ ...btnStyle, backgroundColor: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }} onClick={clearPipeline} title="Clear Pipeline">
                   <Trash2 size={16} strokeWidth={2.5} /> Clear All
                </button>
             )}
            <button style={{ ...btnStyle, backgroundColor: 'var(--success)' }} onClick={() => setSavedPipelinesOpen(true)}>
              <Save size={16} strokeWidth={2.5} /> Saved
            </button>
            <button style={btnStyle} onClick={() => setPaletteOpen(true)}>
              <Plus size={16} strokeWidth={2.5} /> Add Transform (Ctrl+K)
            </button>
        </div>
      </div>
      
      <div className="custom-scrollbar" style={listStyle}>
        {pipeline.length === 0 ? (
          <div style={emptyStyle}>
            No transforms active. Press <kbd style={kbdStyle}>Ctrl+K</kbd> to add.
          </div>
        ) : (
          pipeline.map((tName, i) => (
            <div key={`${tName}-${i}`} style={itemStyle}>
              <span style={numberStyle}>{i + 1}</span>
              <span style={nameStyle}>{tName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</span>
              <button style={removeBtnStyle} onClick={() => removeTransformFromPipeline(i)}>
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>
          ))
        )}
      </div>
      
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-surface)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  borderBottom: '1px solid var(--border-subtle)',
  backgroundColor: 'var(--bg-surface-hover)',
};

const titleStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  fontWeight: 600,
  color: 'var(--text-primary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const btnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '6px 12px',
  backgroundColor: 'var(--accent-main)',
  color: '#fff',
  borderRadius: '4px',
  fontSize: '0.85rem',
  fontWeight: 500,
  transition: 'background 0.2s',
};


const listStyle: React.CSSProperties = {
  display: 'flex',
  padding: '16px',
  gap: '12px',
  overflowX: 'auto',
  alignItems: 'center',
  minHeight: '70px',
};

const emptyStyle: React.CSSProperties = {
  color: 'var(--text-muted)',
  fontSize: '0.9rem',
  fontStyle: 'italic',
};

const kbdStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-main)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '3px',
  padding: '2px 6px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8rem',
};

const itemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: 'var(--bg-main)',
  border: '1px solid var(--border-subtle)',
  padding: '6px 12px',
  borderRadius: '20px',
  whiteSpace: 'nowrap',
};

const numberStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: 'var(--bg-surface-active)',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: 'var(--text-muted)',
};

const nameStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  color: 'var(--text-primary)',
};

const removeBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text-muted)',
  padding: '2px',
  borderRadius: '50%',
};

