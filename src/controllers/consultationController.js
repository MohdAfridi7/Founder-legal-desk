import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import Consultation from "@/models/Consultation";
import sendEmail from "@/utils/sendEmail";


export const createConsultation = async (req) => {
  try {
    await connectDB();

    const body = await req.json();

    const {
      fullName,
      businessName,
      businessType,
      industry,
      numberOfEmployees,
      phoneNumber,
      email,
      concern,
      preferredCallTime,
    } = body;

    if (
      !fullName ||
      !businessName ||
      !businessType ||
      !industry ||
      !numberOfEmployees ||
      !phoneNumber ||
      !email ||
      !preferredCallTime
    ) {
      return NextResponse.json(
        {
          success: false,
          msg: "All required fields are mandatory",
        },
        {
          status: 400,
        }
      );
    }

    const consultation = await Consultation.create({
      fullName,
      businessName,
      businessType,
      industry,
      numberOfEmployees,
      phoneNumber,
      email,
      concern,
      preferredCallTime,
    });

    // Mail User
    await sendEmail(
      email,
      "Consultation Request Received",
      `Hi ${fullName},

Thank you for booking your free consultation.

Our legal team will contact you within 24 hours.

Regards,
Legal Team`
    );

    // Mail Admin
    await sendEmail(
      process.env.EMAIL_USER,
      "New Consultation Request",
      `
Name : ${fullName}

Business : ${businessName}

Phone : ${phoneNumber}

Email : ${email}
`
    );

    return NextResponse.json({
      success: true,
      msg: "Consultation booked successfully",
      consultation,
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



export const getAllConsultations = async () => {
  try {
    await connectDB();

    const consultations = await Consultation.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      consultations,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
};


export const getConsultationById = async (id) => {
  try {
    await connectDB();

    const consultation = await Consultation.findById(id);

    if (!consultation) {
      return NextResponse.json(
        {
          success: false,
          msg: "Consultation not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      consultation,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};

export const updateConsultation = async (req, id) => {
  try {
    await connectDB();

    const body = await req.json();

    const consultation = await Consultation.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      }
    );

    if (!consultation) {
      return NextResponse.json(
        {
          success: false,
          msg: "Consultation not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      msg: "Consultation updated successfully",
      consultation,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};

export const deleteConsultation = async (id) => {
  try {
    await connectDB();

    const consultation = await Consultation.findByIdAndDelete(id);

    if (!consultation) {
      return NextResponse.json(
        {
          success: false,
          msg: "Consultation not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      msg: "Consultation deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};