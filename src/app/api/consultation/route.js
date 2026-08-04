import { NextResponse } from "next/server";
import { protect } from "@/middleware/auth";

import {
  createConsultation,
  getAllConsultations,
  getConsultationById,
  updateConsultation,
  deleteConsultation,
} from "@/controllers/consultationController";

// ==============================
// CREATE CONSULTATION (PUBLIC)
// ==============================
export async function POST(req) {
  return createConsultation(req);
}

// ==============================
// GET CONSULTATION(S) (PROTECTED)
// ==============================
export async function GET(req) {
  const auth = await protect(req);

  if (!auth.success) {
    return NextResponse.json(
      {
        success: false,
        msg: auth.message,
      },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    return getConsultationById(id);
  }

  return getAllConsultations();
}

// ==============================
// UPDATE CONSULTATION (PROTECTED)
// ==============================
export async function PUT(req) {
  const auth = await protect(req);

  if (!auth.success) {
    return NextResponse.json(
      {
        success: false,
        msg: auth.message,
      },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        msg: "Consultation ID is required",
      },
      { status: 400 }
    );
  }

  return updateConsultation(req, id);
}

// ==============================
// DELETE CONSULTATION (PROTECTED)
// ==============================
export async function DELETE(req) {
  const auth = await protect(req);

  if (!auth.success) {
    return NextResponse.json(
      {
        success: false,
        msg: auth.message,
      },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        msg: "Consultation ID is required",
      },
      { status: 400 }
    );
  }

  return deleteConsultation(id);
}