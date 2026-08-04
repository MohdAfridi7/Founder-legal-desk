import { NextResponse } from "next/server";
import { protect } from "@/middleware/auth";

import {
  createBlog,
  getAllBlogs,
  getBlogById,
   getBlogBySlug,
  updateBlog,
  deleteBlog,
getRelatedBlogs,
} from "@/controllers/blogController";

// ==============================
// CREATE BLOG (PROTECTED)
// ==============================
export async function POST(req) {
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

  return createBlog(req);
}

// ==============================
// GET BLOG(S)
// ==============================
export async function GET(req) {
  const { searchParams } = new URL(req.url);

 const id = searchParams.get("id");
const slug = searchParams.get("slug");
const related = searchParams.get("related");

if (related) {
  return getRelatedBlogs(related);
}

if (slug) {
  return getBlogBySlug(slug);
}

if (id) {
  return getBlogById(id);
}

return getAllBlogs();
}

// ==============================
// UPDATE BLOG (PROTECTED)
// ==============================
export async function PUT(req) {
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

  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        msg: "Blog ID is required",
      },
      {
        status: 400,
      }
    );
  }

  return updateBlog(req, id);
}

// ==============================
// DELETE BLOG (PROTECTED)
// ==============================
export async function DELETE(req) {
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

  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        msg: "Blog ID is required",
      },
      {
        status: 400,
      }
    );
  }

  return deleteBlog(id);
}

