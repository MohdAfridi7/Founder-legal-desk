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
    _id: {
      $ne: new mongoose.Types.ObjectId(id),
    },
  })
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();
}