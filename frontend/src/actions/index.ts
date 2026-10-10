import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import envVariants from "../helpers/envVariants";

const { URL_STRAPI } = envVariants();

export const server = {
  login: defineAction({
    accept: "json",

    input: z.object({
      identifier: z.string().min(1),
      password: z.string().min(1),
    }),

    handler: async ({ identifier, password }, context) => {
      const response = await fetch(`${URL_STRAPI}/api/auth/local`, {
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
        throw new Error(
          data?.error?.message || "Credenciales incorrectas",
        );
      }

      context.cookies.set("jwt", data.jwt, {
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: "lax",
        path: "/",
      });

      return {
        user: data.user,
      };
    },
  }),
};