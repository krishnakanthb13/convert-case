import React, { useEffect, useState, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import { transforms } from '../core/engine';
import { Search, X } from 'lucide-react';

export function CommandPalette() {
  const { isPaletteOpen, setPaletteOpen, addTransformToPipeline } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
      }
      if (e.key === 'Escape' && isPaletteOpen) {
        setPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaletteOpen, setPaletteOpen]);

  useEffect(() => {
    if (isPaletteOpen && inputRef.current) {
      inputRef.current.focus();
      setSearchTerm('');
    }
  }, [isPaletteOpen]);

  if (!isPaletteOpen) return null;

  const transformNames = Object.keys(transforms);
  const filteredTransforms = transformNames.filter((t) =>
    t.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={overlayStyle} onClick={() => setPaletteOpen(false)}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <Search size={18} color="var(--text-muted)" strokeWidth={2.5} />
          <input
            ref={inputRef}
            style={inputStyle}
            type="text"
            placeholder="Search transforms (e.g., Title Case)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button style={closeBtnStyle} onClick={() => setPaletteOpen(false)}>
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>
        <div style={listStyle}>
          {filteredTransforms.length === 0 ? (
            <div style={noResultsStyle}>No transforms found.</div>
          ) : (
            filteredTransforms.map((tName) => (
              <button
                key={tName}
                style={itemStyle}
                onClick={() => addTransformToPipeline(tName)}
              >
                {tName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '10vh',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '600px',
  backgroundColor: 'var(--bg-surface)',
  borderRadius: '8px',
  border: '1px solid var(--border-subtle)',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '60vh',
  overflow: 'hidden',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  borderBottom: '1px solid var(--border-subtle)',
  gap: '12px',
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  fontSize: '1.1rem',
  color: 'var(--text-primary)',
};

const closeBtnStyle: React.CSSProperties = {
  padding: '4px',
  color: 'var(--text-muted)',
  borderRadius: '4px',
};

const listStyle: React.CSSProperties = {
  overflowY: 'auto',
  padding: '8px',
};

const itemStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'left',
  padding: '12px 16px',
  borderRadius: '6px',
  fontSize: '0.95rem',
  color: 'var(--text-primary)',
  marginBottom: '2px',
  transition: 'background 0.1s',
};

const noResultsStyle: React.CSSProperties = {
  padding: '24px',
  textAlign: 'center',
  color: 'var(--text-muted)',
};
