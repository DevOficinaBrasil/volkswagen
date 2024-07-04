import { cookies } from "next/headers";
import {
  userIsLoggedInMiddleware,
  adminIsLoggedInMiddleware,
  redirectIfLoggedMiddleware,
  managerIsLoggedInMiddleware,
  generalIsLogged,
} from "@/middlewares";
import { redirect } from "next/dist/server/api-utils";
import liveIsOffMiddleware from "./src/middlewares/liveIsOffMiddleware";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};

export async function middleware(req) {
  const cookiesStore = cookies();

  let token = cookiesStore.get("token");

  if (!token) {
    token = "";
  }

  const url = req.nextUrl.clone();

  // Redireciona caso o usuário esteja logado
  if (req.nextUrl.pathname.startsWith("/users")) {
    return userIsLoggedInMiddleware(token, url);
  }

  // Redireciona caso o usuário não seja um administrador
  if (req.nextUrl.pathname.startsWith("/admin")) {
    return adminIsLoggedInMiddleware(token, url);
  }

  // Redireciona caso o usuário não seja uma concessionária
  if (req.nextUrl.pathname.startsWith("/concessionaria")) {
    return managerIsLoggedInMiddleware(token, url);
  }

  // Redirecionamento caso o usuário esteja logado
  if (
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/cadastro")
  ) {
    return redirectIfLoggedMiddleware(token, url);
  }

  // Redireciona caso o usuário ou concessionária não estejam logados
  if (req.nextUrl.pathname.startsWith("/treinamento-ao-vivo")) {
    const liveOn = await liveIsOffMiddleware();
    console.log(liveOn);
    return generalIsLogged(token, url, liveOn);
  }
}
