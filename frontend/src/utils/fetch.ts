import { defaultOptions } from "./configApi";

export const strapiFetch = async (endpoint: string, { ...prop }) => {
  try {
    const response = await fetch(`${defaultOptions.urlApi}${endpoint}`, {
      ...prop,
      headers: defaultOptions.headers,
    });

    if (!response.ok) {
      throw new Error(`Error al obtener los datos: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Hubo un problema con la operación fetch:", error);
    // Puedes lanzar el error de nuevo si necesitas manejarlo en otro lugar
    throw error;
  }
};
/* import { defaultOptions } from "./configApi";

export const strapiFetch = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  try {
    const response = await fetch(`${defaultOptions.urlApi}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener los datos: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Hubo un problema con la operación fetch:", error);
    // Puedes lanzar el error de nuevo si necesitas manejarlo en otro lugar
    throw error;
  }
};
 */
