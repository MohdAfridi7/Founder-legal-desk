import { sendOtp } from "@/controllers/adminController";

export async function POST(req) {
  return sendOtp(req);
}