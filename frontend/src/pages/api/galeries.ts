import type { APIRoute } from "astro";
import { defaultOptions } from "../../utils/configApi";

const redirectToForm = (request: Request, status: string) =>
  new Response(null, {
    status: 303,
    headers: {
      Location: new URL(`/admin/newgaleries?status=${status}`, request.url).toString(),
    },
  });

const getText = (formData: FormData, name: string) => {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
};

const uploadImage = async (file: File, jwt: string) => {
  const uploadData = new FormData();
  uploadData.append("files", file, file.name);

  const response = await fetch(`${defaultOptions.urlApi}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`
    },
    body: uploadData,
  });

  if (!response.ok) {
    const details = await response.text();
    console.error(`Error de Strapi al subir imagen (${response.status}):`, details);
    if (response.status === 403) throw new Error("upload-permission");
    if (response.status === 401) throw new Error("auth");
    throw new Error("upload");
  }

  const uploadedFiles: unknown = await response.json();
  if (
    !Array.isArray(uploadedFiles) ||
    uploadedFiles.length === 0 ||
    typeof uploadedFiles[0] !== "object" ||
    uploadedFiles[0] === null ||
    !("id" in uploadedFiles[0]) ||
    typeof uploadedFiles[0].id !== "number"
  ) {
    throw new Error("upload");
  }

  return uploadedFiles[0].id;
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const jwt = cookies.get("jwt")?.value;
  if (!jwt) return redirectToForm(request, "auth");

  const formData = await request.formData();
  const idgaleries = getText(formData, "idgaleries");
  const title = getText(formData, "title");
  const country = getText(formData, "country");
  const province = getText(formData, "province");
  const locality = getText(formData, "locality");
  const street = getText(formData, "street");
  const postalcode = Number(getText(formData, "postalcode"));
  const number = Number(getText(formData, "number"));
  const image = formData.get("image");
  const itemtags = formData.getAll("itemtag").map((item) => (typeof item === "string" ? item.trim() : ""));
  const keys = itemtags.filter(Boolean).map((itemtag) => ({ itemtag }));

  if (
    !idgaleries ||
    !title ||
    !country ||
    country.length > 150 ||
    !province ||
    province.length > 150 ||
    !locality ||
    locality.length > 150 ||
    !street ||
    street.length > 200 ||
    !Number.isSafeInteger(postalcode) ||
    postalcode < 0 ||
    !Number.isSafeInteger(number) ||
    number < 1 ||
    itemtags.some((itemtag) => itemtag.length > 100) ||
    (image instanceof File && image.size > 0 && !image.type.startsWith("image/"))
  ) {
    return redirectToForm(request, "invalid");
  }

  const data: Record<string, unknown> = {
    idgaleries,
    title,
    direction: { country, province, locality, postalcode, street, number },
    keys,
    publishedAt: new Date().toISOString(),
  };

  try {
    if (image instanceof File && image.size > 0) {
      data.image = await uploadImage(image, jwt);
    }

    const response = await fetch(`${defaultOptions.urlApi}/galeries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error(`Error de Strapi al crear galería (${response.status}):`, details);
      if (response.status === 403) return redirectToForm(request, "permission");
      if (response.status === 401) return redirectToForm(request, "auth");
      return redirectToForm(request, "save");
    }

    return redirectToForm(request, "created");
  } catch (error) {
    if (error instanceof Error && ["upload-permission", "auth", "upload"].includes(error.message)) {
      return redirectToForm(request, error.message);
    }
    console.error("Error de conexión al crear galería:", error);
    return redirectToForm(request, "save");
  }
};
