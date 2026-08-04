import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    otp: String,

    otpExpire: Date,

    isOtpVerified: {
      type: Boolean,
      default: false,
    },

    emailChangeOtp: String,

    emailChangeOtpExpire: Date,

    newEmail: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Admin ||
  mongoose.model("Admin", adminSchema);