import { verifyEmailChange } from "@/controllers/adminController";

export async function POST(req) {
  return verifyEmailChange(req);
}