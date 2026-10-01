import { NextResponse } from "next/server";

import { protect } from "@/middleware/auth";

import {
  createSEO,
  getAllSEO,
  getSEOById,
   getSeoByPageName,
  updateSEO,
  deleteSEO,
} from "@/controllers/seoController";

async function requireAuth(req) {
  const auth = await protect(req);
  if (auth.success) return null;
  return NextResponse.json(
    { success: false, msg: auth.message },
    { status: 401 }
  );
}
// GET
// Get All SEO OR Single SEO OR SEO by Page Name
// ==========================================

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    const pageName = searchParams.get("pageName");

    if (id) {
      return await getSEOById(id);
    }

    if (pageName) {
      return await getSeoByPageName(pageName);
    }

    return await getAllSEO();
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: error.message,
      },
      {
        status: 500,
      }
    );
  }
}



// ==========================================
// POST
// Create SEO
// ==========================================

export async function POST(req) {
  try {
    const denied = await requireAuth(req);
if (denied) return denied;

    return await createSEO(req);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================================
// PUT
// Update SEO
// ==========================================

export async function PUT(req) {
  try {
   const denied = await requireAuth(req);
if (denied) return denied;

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          msg: "SEO ID is required",
        },
        {
          status: 400,
        }
      );
    }

    return await updateSEO(req, id);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// ==========================================
// DELETE
// Delete SEO
// ==========================================

export async function DELETE(req) {
  try {
  const denied = await requireAuth(req);
if (denied) return denied;

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          msg: "SEO ID is required",
        },
        {
          status: 400,
        }
      );
    }

    return await deleteSEO(id);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: error.message,
      },
      {
        status: 500,
      }
    );
  }
}