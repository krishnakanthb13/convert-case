import React, { useEffect, useState, useRef, useMemo, useDeferredValue, memo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { transforms } from '../core/engine';
import { Search, Check } from 'lucide-react';

// Memoized item component to prevent unnecessary re-renders
const PaletteItem = memo(({ tName, displayName, isActive, onSelect }: { 
  tName: string, 
  displayName: string, 
  isActive: boolean, 
  onSelect: (name: string) => void 
}) => {
  return (
    <button
      className={`palette-item ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(tName)}
    >
      <span>{displayName}</span>
      {isActive && <Check size={14} color="var(--accent-main)" strokeWidth={3} />}
    </button>
  );
});

export function CommandPalette() {
  const { isPaletteOpen, setPaletteOpen, addTransformToPipeline, pipeline } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
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

  // Pre-calculate display names and keys
  const transformList = useMemo(() => {
    return Object.keys(transforms).map(name => ({
      name,
      displayName: name.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
    }));
  }, []);
  
  // Use deferred value for filtering to keep UI snappy
  const filteredTransforms = useMemo(() => {
    if (!deferredSearchTerm) return transformList;
    const lowerSearch = deferredSearchTerm.toLowerCase();
    return transformList.filter((t) =>
      t.displayName.toLowerCase().includes(lowerSearch) || 
      t.name.toLowerCase().includes(lowerSearch)
    );
  }, [deferredSearchTerm, transformList]);

  if (!isPaletteOpen) return null;

  return (
    <div style={overlayStyle} onClick={() => setPaletteOpen(false)}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <Search size={18} color="var(--accent-main)" strokeWidth={2.5} />
          <input
            ref={inputRef}
            style={inputStyle}
            type="text"
            placeholder="Search transforms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <kbd style={kbdStyle}>ESC</kbd>
        </div>
        <div className="custom-scrollbar" style={listStyle}>
          {filteredTransforms.length === 0 ? (
            <div style={noResultsStyle}>No transforms found.</div>
          ) : (
            filteredTransforms.map((t) => (
              <PaletteItem
                key={t.name}
                tName={t.name}
                displayName={t.displayName}
                isActive={pipeline.includes(t.name)}
                onSelect={addTransformToPipeline}
              />
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
  backgroundColor: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(12px)',
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '10vh',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '600px',
  backgroundColor: 'var(--bg-surface)',
  borderRadius: '12px',
  border: '1px solid var(--border-subtle)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '60vh',
  overflow: 'hidden',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '16px 20px',
  borderBottom: '1px solid var(--border-subtle)',
  gap: '12px',
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  fontSize: '1.2rem',
  color: 'var(--text-primary)',
  fontWeight: 500,
};

const kbdStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-main)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '4px',
  padding: '2px 6px',
  fontSize: '0.7rem',
  color: 'var(--text-muted)',
  fontWeight: 700,
};

const listStyle: React.CSSProperties = {
  overflowY: 'auto',
  padding: '8px',
};

const noResultsStyle: React.CSSProperties = {
  padding: '32px',
  textAlign: 'center',
  color: 'var(--text-muted)',
  fontSize: '0.95rem',
};
