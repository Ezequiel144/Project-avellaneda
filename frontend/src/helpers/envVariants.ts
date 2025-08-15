export default function envVariants() {
  const URL_STRAPI = import.meta.env.PUBLIC_API_URL || "http://localhost:1337";
  const PUBLIC_API_KEY = import.meta.env.PUBLIC_API_KEY || "default_key";
  const API_KEY = `${URL_STRAPI}/api` || "http://localhost:1337/api";

  return { URL_STRAPI, PUBLIC_API_KEY, API_KEY };
}
