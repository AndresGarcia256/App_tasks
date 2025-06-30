import jwt from "jsonwebtoken";

export async function requireAuth(req) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie
    .split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    return { authorized: false, user: null };
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || "secreto");
    return { authorized: true, user };
  } catch {
    return { authorized: false, user: null };
  }
}

// Handler para GET /api/auth/sesion
export async function GET(req) {
  const { authorized, user } = await requireAuth(req);

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:4200",
    "Access-Control-Allow-Credentials": "true"
  };

  if (!authorized) {
    return new Response(JSON.stringify({ session: false }), {
      status: 401,
      headers
    });
  }

  return new Response(JSON.stringify({ session: true, user }), {
    status: 200,
    headers
  });
}