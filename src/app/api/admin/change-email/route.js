import { sendEmailChangeOtp } from "@/controllers/adminController";

export async function POST(req) {
  return sendEmailChangeOtp(req);
}