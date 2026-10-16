import type { APIRoute } from "astro";
import envVariants from "../../helpers/envVariants";

const { URL_STRAPI } = envVariants();

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { identifier, password } = await request.json();

    const response = await fetch(`http://localhost:1337/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: data?.error?.message || "Credenciales incorrectas",
        }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    cookies.set("jwt", data.jwt, {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: "lax",
      path: "/",
    });

    return new Response(
      JSON.stringify({
        user: data.user,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error en /api/login:", error);

    return new Response(
      JSON.stringify({
        error: "Error interno del servidor",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
