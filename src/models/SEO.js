import mongoose from "mongoose";

const seoSchema = new mongoose.Schema(
  {
    pageName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    metaTitle: {
      type: String,
      required: true,
      trim: true,
    },

    metaDescription: {
      type: String,
      required: true,
      trim: true,
    },

    canonicalUrl: {
      type: String,
      required: true,
      trim: true,
    },

    metaKeywords: {
      type: String,
      default: "",
      trim: true,
    },

    ogTitle: {
      type: String,
      default: "",
      trim: true,
    },

    ogDescription: {
      type: String,
      default: "",
      trim: true,
    },

    ogImage: {
      type: String,
      default: "",
      trim: true,
    },

    twitterTitle: {
      type: String,
      default: "",
      trim: true,
    },

    twitterDescription: {
      type: String,
      default: "",
      trim: true,
    },

    twitterImage: {
      type: String,
      default: "",
      trim: true,
    },

    schemaType: {
      type: String,
      default: "",
      trim: true,
    },

    schemaJson: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

seoSchema.index({
  pageName: 1,
});

export default mongoose.models.SEO ||
  mongoose.model("SEO", seoSchema);