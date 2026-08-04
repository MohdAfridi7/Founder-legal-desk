import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    businessType: {
      type: String,
      required: true,
    },

    industry: {
      type: String,
      required: true,
    },

    numberOfEmployees: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    concern: {
      type: String,
      default: "",
    },

    preferredCallTime: {
      type: String,
      enum: ["Morning", "Afternoon", "Evening"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Contacted", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Consultation ||
mongoose.model("Consultation", consultationSchema);