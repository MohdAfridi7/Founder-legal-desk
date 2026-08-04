import { getOverview } from "@/controllers/overviewController";
import { protect } from "@/middleware/auth";

export async function GET(request) {
  try {
    await protect(request);

    return await getOverview();
  } catch (error) {
    return error;
  }
}