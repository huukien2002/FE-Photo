import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Kiểm tra nếu user chưa đăng nhập thì chuyển hướng về trang login
  const token = request.cookies.get("accessToken");
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/my-blogs",
};
