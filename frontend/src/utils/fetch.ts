import { defaultOptions } from "./configApi";

export const strapiFetch = async (endpoint: string,{...prop}) => {
  const response = await fetch(`${defaultOptions.urlApi}${endpoint}`, {
    ...prop,
    headers: defaultOptions.headers,
  }).then((res) => res.json());

  return response;
};
