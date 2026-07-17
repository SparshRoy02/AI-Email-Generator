const Email = require('../models/Email');
const { generateEmailStream } = require('../services/ollamaService');

// @desc    Generate email (streaming)
// @route   POST /api/email/generate
// @access  Public
const generateEmail = async (req, res) => {
  try {
    const { prompt, tone, length, recipient, subject } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Set headers for Server-Sent Events (SSE)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Generate email and stream chunks to the client
    const fullEmail = await generateEmailStream(
      { prompt, tone, length, recipient, subject },
      (chunk) => {
        // Send chunk to client
        res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
      }
    );

    // Send final completion message
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error('Error generating email:', error);
    // If headers are already sent, we just end the stream with an error
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: 'Failed to generate email' })}\n\n`);
      res.end();
    } else {
      res.status(500).json({ error: 'Failed to generate email' });
    }
  }
};

// @desc    Save generated email
// @route   POST /api/email/save
// @access  Public
const saveEmail = async (req, res) => {
  try {
    const { prompt, tone, length, recipient, subject, generatedEmail } = req.body;

    if (!prompt || !generatedEmail) {
      return res.status(400).json({ error: 'Prompt and generated email are required' });
    }

    const email = await Email.create({
      prompt,
      tone,
      length,
      recipient,
      subject,
      generatedEmail,
    });

    res.status(201).json(email);
  } catch (error) {
    console.error('Error saving email:', error);
    res.status(500).json({ error: 'Failed to save email' });
  }
};

// @desc    Get all saved emails
// @route   GET /api/email/history
// @access  Public
const getHistory = async (req, res) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 });
    res.status(200).json(emails);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch email history' });
  }
};

// @desc    Delete a saved email
// @route   DELETE /api/email/:id
// @access  Public
const deleteEmail = async (req, res) => {
  try {
    const email = await Email.findByIdAndDelete(req.params.id);

    if (!email) {
      return res.status(404).json({ error: 'Email not found' });
    }

    res.status(200).json({ message: 'Email deleted successfully' });
  } catch (error) {
    console.error('Error deleting email:', error);
    res.status(500).json({ error: 'Failed to delete email' });
  }
};

module.exports = {
  generateEmail,
  saveEmail,
  getHistory,
  deleteEmail,
};
