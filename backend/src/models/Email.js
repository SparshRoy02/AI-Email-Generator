const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: [true, 'Prompt is required'],
      trim: true,
    },
    tone: {
      type: String,
      enum: ['formal', 'casual', 'friendly', 'apologetic'],
      default: 'formal',
    },
    length: {
      type: String,
      enum: ['short', 'medium', 'long'],
      default: 'medium',
    },
    recipient: {
      type: String,
      default: '',
      trim: true,
    },
    subject: {
      type: String,
      default: '',
      trim: true,
    },
    generatedEmail: {
      type: String,
      required: [true, 'Generated email content is required'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Email', emailSchema);
