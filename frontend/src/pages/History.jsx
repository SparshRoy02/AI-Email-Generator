import React, { useState, useEffect } from 'react';
import { getEmailHistory, deleteEmail } from '../services/api';
import { Trash2, Copy, Check, Calendar, User, Tag } from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getEmailHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to fetch history', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmail(id);
      setHistory(history.filter(item => item._id !== id));
    } catch (error) {
      console.error('Failed to delete email', error);
    }
  };

  const handleCopy = (id, content) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="history-loading">
        <div className="loading-spinner"></div>
        <p>Loading history...</p>
      </div>
    );
  }

  return (
    <div className="history-page">
      <h1 className="text-2xl mb-6 gradient-text">Your Email History</h1>
      
      {history.length === 0 ? (
        <div className="glass-panel empty-history">
          <p>You haven't saved any emails yet.</p>
        </div>
      ) : (
        <div className="history-grid">
          {history.map((email) => (
            <div key={email._id} className="glass-panel history-card">
              <div className="history-header">
                <div className="history-meta">
                  <span className="badge badge-tone">{email.tone}</span>
                  <span className="badge badge-length">{email.length}</span>
                </div>
                <div className="history-actions">
                  <button 
                    className="btn-icon" 
                    onClick={() => handleCopy(email._id, email.generatedEmail)}
                    title="Copy to clipboard"
                  >
                    {copiedId === email._id ? <Check size={16} color="#00ff88" /> : <Copy size={16} />}
                  </button>
                  <button 
                    className="btn-icon delete-btn" 
                    onClick={() => handleDelete(email._id)}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="history-context">
                <p><strong>Prompt:</strong> {email.prompt}</p>
                <div className="context-details">
                  {email.recipient && <span><User size={14} /> To: {email.recipient}</span>}
                  {email.subject && <span><Tag size={14} /> Subject: {email.subject}</span>}
                </div>
              </div>
              
              <div className="history-content">
                {email.generatedEmail}
              </div>
              
              <div className="history-footer">
                <Calendar size={14} />
                <span>{formatDate(email.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .history-page {
          padding-bottom: 4rem;
        }
        .text-2xl {
          font-size: 1.8rem;
          margin-bottom: 2rem;
        }
        .history-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
          color: var(--text-secondary);
        }
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(138, 43, 226, 0.2);
          border-top-color: var(--accent-purple);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        .empty-history {
          padding: 4rem;
          text-align: center;
          color: var(--text-secondary);
        }
        .history-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 1.5rem;
        }
        .history-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: rgba(0,0,0,0.2);
        }
        .history-meta {
          display: flex;
          gap: 8px;
        }
        .badge {
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }
        .badge-tone {
          background: rgba(138, 43, 226, 0.2);
          color: #d8b4fe;
        }
        .badge-length {
          background: rgba(65, 105, 225, 0.2);
          color: #93c5fd;
        }
        .history-actions {
          display: flex;
          gap: 4px;
        }
        .delete-btn:hover {
          color: #ff4d4d;
          background: rgba(255, 77, 77, 0.1);
        }
        .history-context {
          padding: 1.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          border-bottom: 1px dashed rgba(255,255,255,0.05);
        }
        .context-details {
          display: flex;
          gap: 1rem;
          margin-top: 0.8rem;
          font-size: 0.8rem;
        }
        .context-details span {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .history-content {
          padding: 1.5rem;
          flex: 1;
          white-space: pre-wrap;
          font-size: 0.95rem;
          line-height: 1.6;
          max-height: 250px;
          overflow-y: auto;
        }
        .history-content::-webkit-scrollbar {
          width: 6px;
        }
        .history-content::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        .history-footer {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 1rem 1.5rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          border-top: 1px solid rgba(255,255,255,0.05);
          background: rgba(0,0,0,0.1);
        }
        @media (max-width: 768px) {
          .history-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default History;
