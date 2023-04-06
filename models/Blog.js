const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    title: String,
    image: String,
    description: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const BlogModel = model("Blog", blogSchema);

module.exports = BlogModel;
