import { NextRequest, NextResponse } from "next/server";
import { publicRoutes, authRoutes, protectedRoutes } from "@/routes";
import { CookiesSchema } from "@/schemas";
export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const cookieToken: unknown = request.cookies.get("session");
  const cookieUserType: unknown = request.cookies.get("adminType");
  const validatedToken = CookiesSchema.safeParse(cookieToken);
  const validatedAdminType = CookiesSchema.safeParse(cookieUserType);

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return;
  }

  //If the user is not authenticated, redirect to the login page
  if (!validatedToken.success && !isAuthRoute) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
  //If the user is authenticated, he is allowed to use /api route handlers(server side)
  return null;
}

//Runs the middleware every time the matcher is triggered
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
