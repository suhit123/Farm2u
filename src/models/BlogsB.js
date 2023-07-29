const mongoose = require("mongoose");
const BlogsBSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: [120, "Title cannot be more than 40 characters"],
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  publishDate: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  bodycontent: {
    type: String,
    required: true,
  },
  comments: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      publishDate: {
        type: Date,
        required: true,
        trim: true,
      },
      comment: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});
module.exports =
  mongoose.models.BlogsB || mongoose.model("BlogsB", BlogsBSchema);