import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { generateToken } from "@/lib/jwt";
import sendEmail from "@/utils/sendEmail";
import { protect } from "@/middleware/auth";

// ==============================
// LOGIN
// ==============================
export const loginAdmin = async (req) => {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          msg: "Invalid Email",
        },
        {
          status: 400,
        }
      );
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          msg: "Invalid Password",
        },
        {
          status: 400,
        }
      );
    }

    const token = generateToken(admin._id);

    return NextResponse.json({
      success: true,
      msg: "Login Success",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        msg: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};

// SEND OTP
// ==============================
export const sendOtp = async (req) => {
  try {
    await connectDB();

    const { email } = await req.json();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          msg: "Email not found",
        },
        {
          status: 404,
        }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    admin.otp = otp;
    admin.otpExpire = Date.now() + 5 * 60 * 1000;
    admin.isOtpVerified = false;

    await admin.save();

    await sendEmail(
      email,
      "Password Reset OTP",
      `Your OTP is ${otp}`
    );

    return NextResponse.json({
      success: true,
      msg: "OTP sent successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        msg: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};

// VERIFY OTP
// ==============================
export const verifyOtp = async (req) => {
  try {
    await connectDB();

    const { email, otp } = await req.json();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          msg: "Admin not found",
        },
        {
          status: 404,
        }
      );
    }

    if (admin.otp !== otp) {
      return NextResponse.json(
        {
          success: false,
          msg: "Invalid OTP",
        },
        {
          status: 400,
        }
      );
    }

    if (admin.otpExpire < Date.now()) {
      return NextResponse.json(
        {
          success: false,
          msg: "OTP expired",
        },
        {
          status: 400,
        }
      );
    }

    admin.isOtpVerified = true;

    await admin.save();

    return NextResponse.json({
      success: true,
      msg: "OTP verified successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        msg: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};


// RESET PASSWORD
// ==============================

export const resetPassword = async (req) => {
  try {
    await connectDB();

    const { email, newPassword } = await req.json();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          msg: "Admin not found",
        },
        {
          status: 404,
        }
      );
    }

    if (!admin.isOtpVerified) {
      return NextResponse.json(
        {
          success: false,
          msg: "OTP not verified",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;
    admin.otp = null;
    admin.otpExpire = null;
    admin.isOtpVerified = false;

    await admin.save();

    return NextResponse.json({
      success: true,
      msg: "Password updated successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        msg: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};

// CHANGE EMAIL (SEND OTP)
// ==============================

export const sendEmailChangeOtp = async (req) => {
  try {
    await connectDB();

    // JWT Verify
    const auth = await protect(req);

    if (!auth.success) {
      return NextResponse.json(
        {
          success: false,
          msg: auth.message,
        },
        {
          status: 401,
        }
      );
    }

    const { newEmail } = await req.json();

    const admin = await Admin.findById(auth.admin.id);

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          msg: "Admin not found",
        },
        {
          status: 404,
        }
      );
    }

    // Check if email already exists
    const emailExists = await Admin.findOne({ email: newEmail });

    if (emailExists) {
      return NextResponse.json(
        {
          success: false,
          msg: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    admin.emailChangeOtp = otp;
    admin.emailChangeOtpExpire = Date.now() + 5 * 60 * 1000;
    admin.newEmail = newEmail;

    await admin.save();

    await sendEmail(
      newEmail,
      "Change Email OTP",
      `Your OTP is ${otp}`
    );

    return NextResponse.json({
      success: true,
      msg: "OTP sent to new email",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        msg: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};


// VERIFY EMAIL CHANGE
// ==============================

export const verifyEmailChange = async (req) => {
  try {
    await connectDB();

    // JWT Verify
    const auth = await protect(req);

    if (!auth.success) {
      return NextResponse.json(
        {
          success: false,
          msg: auth.message,
        },
        {
          status: 401,
        }
      );
    }

    const { otp } = await req.json();

    const admin = await Admin.findById(auth.admin.id);

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          msg: "Admin not found",
        },
        {
          status: 404,
        }
      );
    }

    if (admin.emailChangeOtp !== otp) {
      return NextResponse.json(
        {
          success: false,
          msg: "Invalid OTP",
        },
        {
          status: 400,
        }
      );
    }

    if (admin.emailChangeOtpExpire < Date.now()) {
      return NextResponse.json(
        {
          success: false,
          msg: "OTP expired",
        },
        {
          status: 400,
        }
      );
    }

    admin.email = admin.newEmail;
    admin.newEmail = null;
    admin.emailChangeOtp = null;
    admin.emailChangeOtpExpire = null;

    await admin.save();

    return NextResponse.json({
      success: true,
      msg: "Email updated successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        msg: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};