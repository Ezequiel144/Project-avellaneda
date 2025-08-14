import envVariants from "../helpers/envVariants";

const { URL_STRAPI, SECRET_API_KEY, API_KEY } = envVariants();
// Configuración por defecto para todas las llamadas a la API
export const defaultOptions = {
  baseUrl: URL_STRAPI,
  urlApi: API_KEY,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${SECRET_API_KEY}`,
  },
};
