const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: false,
    },
    company: {
      type: String,
      required: false,
    },
    logo: {
      type: String,
      required: false,
    },
    isnew: {
      type: Boolean,
      required: false,
    },
    featured: {
      type: Boolean,
      required: false,
    },
    position: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
    level: {
      type: String,
      required: false,
    },
    postedAt: {
      type: String,
      required: false,
    },
    contract: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    languages: {
      type: [String],
      required: false,
    },
    tools: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model('Goal', goalSchema);