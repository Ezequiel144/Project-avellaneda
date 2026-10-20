import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const pathname = context.url.pathname.replace(/\/+$/, "") || "/";
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  const hasJwt = Boolean(context.cookies.get("jwt")?.value);

  if (pathname === "/login" && hasJwt) {
    return context.redirect("/admin/home");
  }

  if (isAdminRoute && !hasJwt) {
    return context.redirect("/login");
  }

  if (pathname === "/admin" && hasJwt) {
    return context.redirect("/admin/home");
  }

  return next();
});
