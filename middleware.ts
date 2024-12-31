import { auth } from "./auth";

export default auth((req) => {
  const isAuth = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isPublicPage = req.nextUrl.pathname === "/";

  if (isAuthPage && isAuth) {
    return Response.redirect(new URL("/", req.nextUrl));
  }

  if (!isAuth && !isPublicPage && !isAuthPage) {
    return Response.redirect(new URL("/auth/signin", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
