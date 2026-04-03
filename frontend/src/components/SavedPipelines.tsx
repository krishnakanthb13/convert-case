import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Save, Download, Upload, Trash2, Play, Plus, X, GripVertical } from 'lucide-react';

export function SavedPipelines() {
  const { 
    pipeline, 
    savedPipelines, 
    saveCurrentPipeline, 
    deleteSavedPipeline, 
    setPipeline,
    importPipelines,
    isSavedPipelinesOpen,
    setSavedPipelinesOpen,
    reorderSavedPipelines
  } = useAppStore();

  const [newName, setNewName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  if (!isSavedPipelinesOpen) return null;

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      reorderSavedPipelines(draggedIndex, index);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };


  const handleSave = () => {
    if (!newName.trim()) return;
    saveCurrentPipeline(newName);
    setNewName('');
    setIsSaving(false);
  };

  const handleExport = async () => {
    const dataStr = JSON.stringify(savedPipelines, null, 2);
    try {
      if ('showSaveFilePicker' in window) {
        // @ts-ignore
        const handle = await window.showSaveFilePicker({
          suggestedName: `fluxtext-pipelines-${new Date().toISOString().split('T')[0]}.json`,
          types: [{
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          }],
        });
        const writable = await handle.createWritable();
        await writable.write(dataStr);
        await writable.close();
      } else {
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `fluxtext-pipelines-${new Date().toISOString().split('T')[0]}.json`;
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
      }
    } catch (e) {
      console.error("Export cancelled or failed", e);
    }
  };

  const handleImportClick = async () => {
    try {
      if ('showOpenFilePicker' in window) {
        // @ts-ignore
        const [fileHandle] = await window.showOpenFilePicker({
          types: [
            {
              description: 'JSON Files',
              accept: { 'application/json': ['.json'] },
            },
          ],
        });
        const file = await fileHandle.getFile();
        const content = await file.text();
        importPipelines(content);
      } else {
        document.getElementById('fallback-import-input')?.click();
      }
    } catch (e) {
      console.error("Import cancelled or failed", e);
    }
  };

  const handleImportFallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      importPipelines(content);
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  return (
    <div style={overlayStyle} onClick={() => setSavedPipelinesOpen(false)}>
      <div style={containerStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Save size={16} color="var(--accent-main)" strokeWidth={2.5} />
            <h3 style={titleStyle}>Saved Pipelines</h3>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button style={iconBtnStyle} onClick={handleExport} title="Export Pipelines (Save to File)">
              <Upload size={14} />
            </button>
            <button style={iconBtnStyle} onClick={handleImportClick} title="Import Pipelines (Load from File)">
              <Download size={14} />
            </button>
            <input id="fallback-import-input" type="file" accept=".json" onChange={handleImportFallback} style={{ display: 'none' }} />
            <button style={iconBtnStyle} onClick={() => setSavedPipelinesOpen(false)} title="Close">
              <X size={16} />
            </button>
          </div>
        </div>

      <div className="custom-scrollbar" style={listStyle}>
        {savedPipelines.length === 0 ? (
          <div style={emptyStyle}>No saved pipelines yet.</div>
        ) : (
          savedPipelines.map((p, index) => (
            <div 
              key={p.id} 
              style={{ ...itemStyle, opacity: draggedIndex === index ? 0.4 : 1, cursor: 'grab' }}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
            >
              <div style={{ color: 'var(--text-muted)' }}>
                <GripVertical size={16} />
              </div>
              <div style={{ flex: 1, minWidth: 0, marginLeft: '4px' }}>
                <div style={nameStyle}>{p.name}</div>
                <div style={tagContainerStyle}>
                  {p.transforms.map((t, i) => (
                    <span key={i} style={tagStyle}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button 
                  style={actionBtnStyle} 
                  onClick={() => {
                    setPipeline(p.transforms);
                    setSavedPipelinesOpen(false);
                  }}
                  title="Load Pipeline"
                >
                  <Play size={14} fill="currentColor" />
                </button>
                <button 
                  style={{ ...actionBtnStyle, color: 'var(--error-main)' }} 
                  onClick={() => deleteSavedPipeline(p.id)}
                  title="Delete Pipeline"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {pipeline.length > 0 && (
        <div style={footerStyle}>
          {isSaving ? (
            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
              <input 
                autoFocus
                style={inputStyle}
                placeholder="Pipeline name..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
              <button style={saveBtnStyle} onClick={handleSave}>Save</button>
              <button style={cancelBtnStyle} onClick={() => setIsSaving(false)}><X size={16} /></button>
            </div>
          ) : (
            <button style={addBtnStyle} onClick={() => setIsSaving(true)}>
              <Plus size={16} /> Save Current Pipeline
            </button>
          )}
        </div>
      )}
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
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const containerStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-surface)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '400px',
  maxHeight: '80vh',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
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
  fontSize: '1rem',
  fontWeight: 600,
  color: 'var(--text-primary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  padding: '8px',
  gap: '8px',
  overflowY: 'auto',
  flex: 1,
};

const itemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px 12px',
  backgroundColor: 'var(--bg-main)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '6px',
  transition: 'transform 0.1s, border-color 0.1s',
};

const nameStyle: React.CSSProperties = {
  fontSize: '0.88rem',
  fontWeight: 600,
  color: 'var(--text-primary)',
  marginBottom: '4px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const tagContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
};

const tagStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  padding: '1px 6px',
  backgroundColor: 'var(--bg-surface-active)',
  color: 'var(--text-muted)',
  borderRadius: '10px',
  border: '1px solid var(--border-subtle)',
};

const actionBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  borderRadius: '4px',
  color: 'var(--accent-main)',
  backgroundColor: 'var(--bg-surface)',
  border: '1px solid var(--border-subtle)',
  cursor: 'pointer',
};

const iconBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  borderRadius: '4px',
  color: 'var(--text-muted)',
  cursor: 'pointer',
  transition: 'color 0.2s',
};

const footerStyle: React.CSSProperties = {
  padding: '12px',
  borderTop: '1px solid var(--border-subtle)',
  backgroundColor: 'var(--bg-surface-hover)',
};

const addBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  width: '100%',
  padding: '8px',
  backgroundColor: 'transparent',
  border: '1px dashed var(--border-subtle)',
  borderRadius: '6px',
  color: 'var(--text-secondary)',
  fontSize: '0.95rem',
  cursor: 'pointer',
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  backgroundColor: 'var(--bg-main)',
  border: '1px solid var(--accent-main)',
  borderRadius: '4px',
  padding: '6px 10px',
  color: 'var(--text-primary)',
  fontSize: '0.95rem',
  outline: 'none',
};

const saveBtnStyle: React.CSSProperties = {
  backgroundColor: 'var(--accent-main)',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '6px 12px',
  fontSize: '0.95rem',
  fontWeight: 500,
  cursor: 'pointer',
};

const cancelBtnStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  border: 'none',
  color: 'var(--text-muted)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
};

const emptyStyle: React.CSSProperties = {
  padding: '20px',
  textAlign: 'center',
  color: 'var(--text-muted)',
  fontSize: '0.95rem',
  fontStyle: 'italic',
};
