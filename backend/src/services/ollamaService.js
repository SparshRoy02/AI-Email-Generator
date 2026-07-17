const axios = require('axios');

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3';

const toneDescriptions = {
  formal: 'professional, formal, and respectful',
  casual: 'casual, relaxed, and conversational',
  friendly: 'warm, friendly, and personable',
  apologetic: 'sincere, empathetic, and apologetic',
};

const lengthDescriptions = {
  short: 'concise and brief (2-3 short paragraphs, under 150 words)',
  medium: 'moderately detailed (3-4 paragraphs, 150-300 words)',
  long: 'comprehensive and detailed (4-6 paragraphs, 300-500 words)',
};

/**
 * Build a structured system prompt for the email generation task.
 */
const buildSystemPrompt = ({ prompt, tone, length, recipient, subject }) => {
  const toneDesc = toneDescriptions[tone] || toneDescriptions.formal;
  const lengthDesc = lengthDescriptions[length] || lengthDescriptions.medium;

  return `You are an expert professional email writer. Your task is to generate a complete, polished, ready-to-send email.

STRICT RULES:
1. Output ONLY the email itself — no explanations, no commentary, no preamble.
2. Start with "Subject: [your subject line here]" on the very first line.
3. Leave one blank line after the subject, then write the full email body.
4. Use a proper greeting and sign-off.
5. Tone must be: ${toneDesc}.
6. Length must be: ${lengthDesc}.
${recipient ? `7. The email is addressed to: ${recipient}.` : ''}
${subject ? `8. Use this subject: "${subject}".` : ''}

EMAIL PURPOSE / CONTEXT:
${prompt}

Now write the email:`;
};

/**
 * Generate an email using the Ollama API (streaming mode).
 * Calls onChunk(text) for each streamed token, returns the full text when done.
 */
const generateEmailStream = async (emailData, onChunk) => {
  const prompt = buildSystemPrompt(emailData);

  const response = await axios.post(
    `${OLLAMA_BASE_URL}/api/generate`,
    {
      model: OLLAMA_MODEL,
      prompt,
      stream: true,
      options: {
        temperature: 0.7,
        top_p: 0.9,
      },
    },
    { responseType: 'stream' }
  );

  return new Promise((resolve, reject) => {
    let fullText = '';

    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n').filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.response) {
            fullText += parsed.response;
            onChunk(parsed.response);
          }
        } catch {
          // Skip malformed JSON lines
        }
      }
    });

    response.data.on('end', () => resolve(fullText));
    response.data.on('error', reject);
  });
};

module.exports = { generateEmailStream };
