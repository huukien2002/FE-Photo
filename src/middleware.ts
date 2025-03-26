import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Chỉ chặn admin, không chặn my-blogs
  if (request.nextUrl.pathname.startsWith("/admin")) {
    try {
      // Gửi request đến API Laravel để lấy thông tin user từ token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const user = await response.json();

      // Nếu không phải admin, chặn truy cập
      if (user.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-blogs", "/admin/:path*"], // Áp dụng middleware cho cả 2, nhưng chỉ chặn admin
};
