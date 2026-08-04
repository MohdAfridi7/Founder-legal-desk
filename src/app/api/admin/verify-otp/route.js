import { verifyOtp } from "@/controllers/adminController";

export async function POST(req) {
  return verifyOtp(req);
}