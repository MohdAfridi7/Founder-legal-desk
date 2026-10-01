import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function getBlog(slug) {
  await connectDB();
  return await Blog.findOne({ slug }).lean();
}

export async function getRelatedBlogs(id) {
  await connectDB();

  return await Blog.find({
    _id: { $ne: new mongoose.Types.ObjectId(id) },
  })
    .select("title slug shortDescription featuredImage category readTime createdAt")
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();
}

// Listing ke liye halka data (article body nahi)
export async function getAllBlogsLite() {
  await connectDB();

  const blogs = await Blog.find()
    .select(
      "title slug shortDescription featuredImage category author readTime createdAt updatedAt"
    )
    .sort({ createdAt: -1 })
    .lean();

  // ObjectId/Date ko client component ko pass karne ke liye serialize
  return JSON.parse(JSON.stringify(blogs));
}