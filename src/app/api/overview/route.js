import { NextResponse } from "next/server";
import { getOverview } from "@/controllers/overviewController";
import { protect } from "@/middleware/auth";

export async function GET(request) {
  const auth = await protect(request);

  if (!auth.success) {
    return NextResponse.json(
      { success: false, msg: auth.message },
      { status: 401 }
    );
  }

  try {
    return await getOverview();
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: error.message },
      { status: 500 }
    );
  }
}