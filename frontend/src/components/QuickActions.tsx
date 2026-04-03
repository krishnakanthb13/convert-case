import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Type, Sparkles, Binary, Settings2, ChevronDown, ChevronUp } from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Cases',
    icon: <Type size={14} />,
    transforms: ['sentenceCase', 'lowercase', 'uppercase', 'capitalizedCase', 'titleCase', 'alternatingCase', 'inverseCase']
  },
  {
    name: 'Coding',
    icon: <Settings2 size={14} />,
    transforms: ['camelCase', 'pascalCase', 'snakeCase', 'kebabCase', 'constantCase', 'dotCase', 'pathCase']
  },
  {
    name: 'Styles',
    icon: <Sparkles size={14} />,
    transforms: ['bold', 'italic', 'bubble', 'square', 'cursive', 'monospace', 'strikethrough', 'underline', 'wideText', 'upsideDown', 'zalgo']
  },
  {
    name: 'Utils',
    icon: <Binary size={14} />,
    transforms: ['morseCode', 'binaryCode', 'natoPhonetic', 'rot13', 'reverse', 'reverseWords', 'slugify', 'pigLatin', 'sortLines', 'removeUnderscores', 'removeDashes', 'trimWhitespace', 'removeLineBreaks', 'base64Encode', 'urlEncode']
  }
];

export function QuickActions() {
  const { addTransformToPipeline, isQuickActionsExpanded, toggleQuickActions, pipeline } = useAppStore();

  const handleQuickAction = (tName: string) => {
    addTransformToPipeline(tName);
  };

  return (
    <div style={containerStyle}>
      <div className="quick-actions-header" style={headerToggleStyle} onClick={toggleQuickActions}>
        <div style={headerLabelStyle}>
          <Sparkles size={16} color="var(--accent-main)" strokeWidth={2.5} />
          <span>Quick Access Tools</span>
        </div>
        <button style={toggleBtnStyle}>
          {isQuickActionsExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {isQuickActionsExpanded && (
        <div style={gridContainerStyle}>
          {CATEGORIES.map((cat) => (
            <div key={cat.name} style={categoryStyle}>
              <div className="category-header">
                {cat.icon}
                <span>{cat.name}</span>
              </div>
              <div style={gridStyle}>
                {cat.transforms.map((tName) => (
                  <button
                    key={tName}
                    className={`quick-action-btn ${pipeline.includes(tName) ? 'active' : ''}`}
                    onClick={() => handleQuickAction(tName)}
                    title={tName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  >
                    {tName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-surface)',
  borderRadius: '16px',
  border: '1px solid var(--border-subtle)',
  boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)',
  overflow: 'hidden',
};

const headerToggleStyle: React.CSSProperties = {
  padding: '12px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'background 0.2s',
  borderBottom: '1px solid transparent',
};

const headerLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: '0.9rem',
  fontWeight: 700,
  color: 'var(--text-primary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const toggleBtnStyle: React.CSSProperties = {
  color: 'var(--text-muted)',
  display: 'flex',
};

const gridContainerStyle: React.CSSProperties = {
  padding: '24px',
  paddingTop: '8px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '32px',
  borderTop: '1px solid var(--border-subtle)',
};

const categoryStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};

const gridStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
};
