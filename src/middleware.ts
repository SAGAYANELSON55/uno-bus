import { NextRequest, NextResponse } from "next/server";
import { useSession } from "next-auth/react";

export default async function Middleware(
  req: NextRequest,
  res: NextResponse,
  next
) {
  const session = useSession();

  if (!session.user) {
    return res.redirect("/login");
  }

  const path = req.nextUrl.pathname;

  if (path === "/admin" && !session.user.isAdmin) {
    return res.redirect("/");
  }

  await next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

//Working on it
