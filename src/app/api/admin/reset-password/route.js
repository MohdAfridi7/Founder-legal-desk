import { resetPassword } from "@/controllers/adminController";

export async function POST(req) {
  return resetPassword(req);
}