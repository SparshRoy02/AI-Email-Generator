import React, { useState } from 'react';
import { Copy, Check, Save, RotateCcw } from 'lucide-react';

const EmailOutput = ({ emailContent, isGenerating, onSave, onRegenerate }) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = () => {
    if (!emailContent) return;
    navigator.clipboard.writeText(emailContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!emailContent || saved) return;
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="glass-panel output-panel">
      <div className="output-header">
        <h2 className="text-xl gradient-text">Generated Email</h2>
        <div className="output-actions">
          <button 
            className="btn-icon tooltip" 
            onClick={handleCopy} 
            disabled={!emailContent || isGenerating}
            data-tooltip="Copy"
          >
            {copied ? <Check size={18} color="#00ff88" /> : <Copy size={18} />}
          </button>
          <button 
            className="btn-icon tooltip" 
            onClick={handleSave}
            disabled={!emailContent || isGenerating || saved}
            data-tooltip="Save to History"
          >
            {saved ? <Check size={18} color="#00ff88" /> : <Save size={18} />}
          </button>
          <button 
            className="btn-icon tooltip" 
            onClick={onRegenerate}
            disabled={!emailContent || isGenerating}
            data-tooltip="Regenerate"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="output-content-area">
        {!emailContent && !isGenerating ? (
          <div className="empty-state">
            <p>Your magic mail will appear here...</p>
          </div>
        ) : (
          <div className="email-content-wrapper">
            <div className="email-content">
              {emailContent}
              {isGenerating && <span className="loading-cursor">|</span>}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .output-panel {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 500px;
        }
        .output-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }
        .output-actions {
          display: flex;
          gap: 8px;
        }
        .output-content-area {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
          background: rgba(0, 0, 0, 0.2);
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
        }
        .empty-state {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-style: italic;
        }
        .tooltip {
          position: relative;
        }
        .tooltip:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          pointer-events: none;
          margin-bottom: 5px;
        }
        .loading-cursor {
          display: inline-block;
          width: 8px;
          animation: blink 1s step-end infinite;
          color: var(--accent-purple);
          font-weight: bold;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default EmailOutput;
