const express = require('express');
const router = express.Router();
const {
  generateEmail,
  saveEmail,
  getHistory,
  deleteEmail,
} = require('../controllers/emailController');

// POST /api/email/generate - Generate email (streams response)
router.post('/generate', generateEmail);

// POST /api/email/save - Save generated email to DB
router.post('/save', saveEmail);

// GET /api/email/history - Get all saved emails
router.get('/history', getHistory);

// DELETE /api/email/:id - Delete a saved email
router.delete('/:id', deleteEmail);

module.exports = router;
