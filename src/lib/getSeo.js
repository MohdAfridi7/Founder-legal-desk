import { connectDB } from "@/lib/db";
import SEO from "@/models/SEO";

export async function getSeo(pageName) {
  await connectDB();

  const seo = await SEO.findOne({
    pageName: pageName.toLowerCase(),
  }).lean();

  return seo;
}