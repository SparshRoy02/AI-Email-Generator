import React, { useState } from 'react';
import EmailForm from '../components/EmailForm';
import EmailOutput from '../components/EmailOutput';
import { saveEmailToHistory } from '../services/api';

const Home = () => {
  const [emailContent, setEmailContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPromptData, setCurrentPromptData] = useState(null);

  const generateEmail = async (formData) => {
    setIsGenerating(true);
    setEmailContent('');
    setCurrentPromptData(formData);

    try {
      const response = await fetch('http://localhost:5000/api/email/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        
        // SSE lines can be multiple, e.g. "data: {...}\n\ndata: {...}\n\n"
        const lines = chunk.split('\n\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.substring(6));
              if (data.chunk) {
                setEmailContent((prev) => prev + data.chunk);
              } else if (data.error) {
                setEmailContent((prev) => prev + '\n\n[Error: ' + data.error + ']');
                break;
              }
            } catch (e) {
              console.error('Error parsing SSE chunk', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to generate email', error);
      setEmailContent('Failed to generate email. Make sure the backend and Ollama are running.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!emailContent || !currentPromptData) return;
    try {
      await saveEmailToHistory({
        ...currentPromptData,
        generatedEmail: emailContent
      });
      // Could add a toast notification here
    } catch (error) {
      console.error('Failed to save email', error);
    }
  };

  const handleRegenerate = () => {
    if (currentPromptData) {
      generateEmail(currentPromptData);
    }
  };

  return (
    <div className="main-layout">
      <div className="form-section">
        <EmailForm onGenerate={generateEmail} isGenerating={isGenerating} />
      </div>
      <div className="output-section">
        <EmailOutput 
          emailContent={emailContent} 
          isGenerating={isGenerating} 
          onSave={handleSave}
          onRegenerate={handleRegenerate}
        />
      </div>
    </div>
  );
};

export default Home;
