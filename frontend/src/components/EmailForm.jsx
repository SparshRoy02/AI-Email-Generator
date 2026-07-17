import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

const EmailForm = ({ onGenerate, isGenerating }) => {
  const [formData, setFormData] = useState({
    prompt: '',
    tone: 'formal',
    length: 'medium',
    recipient: '',
    subject: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.prompt.trim()) return;
    onGenerate(formData);
  };

  return (
    <div className="glass-panel p-6">
      <h2 className="text-xl mb-4 gradient-text">What do you want to write?</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="prompt">Description *</label>
          <textarea
            id="prompt"
            name="prompt"
            className="form-control"
            placeholder="e.g. Write a professional apology email to my client for a delayed delivery..."
            value={formData.prompt}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="tone">Tone</label>
            <select
              id="tone"
              name="tone"
              className="form-control"
              value={formData.tone}
              onChange={handleChange}
            >
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
              <option value="apologetic">Apologetic</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="length">Length</label>
            <select
              id="length"
              name="length"
              className="form-control"
              value={formData.length}
              onChange={handleChange}
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="recipient">Recipient (Optional)</label>
            <input
              type="text"
              id="recipient"
              name="recipient"
              className="form-control"
              placeholder="e.g. John Doe"
              value={formData.recipient}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="subject">Subject (Optional)</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="form-control"
              placeholder="e.g. Project Update"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          style={{ width: '100%', marginTop: '1rem' }}
          disabled={isGenerating || !formData.prompt.trim()}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" size={20} style={{ animation: 'spin 1s linear infinite' }} />
              Generating...
            </>
          ) : (
            <>
              <Send size={20} />
              Generate Magic Mail
            </>
          )}
        </button>
      </form>

      <style>{`
        .p-6 { padding: 1.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .text-xl { font-size: 1.25rem; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default EmailForm;
