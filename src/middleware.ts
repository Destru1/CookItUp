import NextAuth from "next-auth";
import authConfig from "auth.config";
import {
  apiRoutesPrefix,
  protectedRoutes,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "routes";

const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiRuthRoute = nextUrl.pathname.startsWith(apiRoutesPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = protectedRoutes.includes(nextUrl.pathname);

  if (isApiRuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return Response.redirect(new URL("/login", nextUrl));
  }
  if (!isLoggedIn && !isPublicRoute) {
    return console.log("Redirecting to login page");
  }
  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
