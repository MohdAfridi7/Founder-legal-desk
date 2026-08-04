import { verifyToken } from "@/lib/jwt";

export const protect = async (req) => {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return {
        success: false,
        message: "No token provided",
      };
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = verifyToken(token);

    return {
      success: true,
      admin: decoded,
    };
  } catch (error) {
    return {
      success: false,
      message: "Invalid token",
    };
  }
};