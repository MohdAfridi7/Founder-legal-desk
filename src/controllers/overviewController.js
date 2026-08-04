import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import Blog from "@/models/Blog";
import Contact from "@/models/Contact";
import Consultation from "@/models/Consultation";

export const getOverview = async () => {
  try {
    await connectDB();

    const [
      totalConsultations,
      pendingConsultations,
      completedConsultations,
      cancelledConsultations,
      totalContactInquiries,
      totalBlogs,
      recentConsultations,
      recentContacts,
    ] = await Promise.all([
      Consultation.countDocuments(),

      Consultation.countDocuments({
        status: "Pending",
      }),

      Consultation.countDocuments({
        status: "Completed",
      }),

      Consultation.countDocuments({
        status: "Cancelled",
      }),

      Contact.countDocuments(),

      Blog.countDocuments(),

      Consultation.find()
        .sort({ createdAt: -1 })
        .limit(5),

      Contact.find()
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalConsultations,
        pendingConsultations,
        completedConsultations,
        cancelledConsultations,
        totalContactInquiries,
        totalBlogs,
      },
      recentConsultations,
      recentContacts,
    });
  } catch (error) {
    console.error("OVERVIEW ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};