import { loginAdmin } from "@/controllers/adminController";

export async function POST(req) {
  return loginAdmin(req);
}