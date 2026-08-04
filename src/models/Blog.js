import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    tags: [
      {
        type: String,
      },
    ],

    featuredImage: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      default: "Admin",
    },

    date: {
      type: Date,
      default: Date.now,
    },

    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },

    keywords: {
      type: String,
      default: "",
    },

readTime: {
  type: String,
  required: true,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog ||
mongoose.model("Blog", blogSchema);