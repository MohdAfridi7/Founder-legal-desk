import { NextResponse } from "next/server";
import { protect } from "@/middleware/auth";

import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
} from "@/controllers/contactController";

// ==============================
// CREATE CONTACT (PUBLIC)
// ==============================
export async function POST(req) {
  return createContact(req);
}

// ==============================
// GET CONTACT(S) (PROTECTED)
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
    return getContactById(id);
  }

  return getAllContacts();
}


// ==============================
// DELETE CONTACT (PROTECTED)
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

  return deleteContact(id);
}