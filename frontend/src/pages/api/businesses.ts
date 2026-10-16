import type { APIRoute } from "astro";
import { defaultOptions } from "../../utils/configApi";

const redirectToForm = (request: Request, status: string) =>
  new Response(null, {
    status: 303,
    headers: {
      Location: new URL(`/admin/newbusiness?status=${status}`, request.url).toString(),
    },
  });

const getText = (formData: FormData, name: string) => {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
};

const getTextEntries = (formData: FormData, name: string) =>
  formData.getAll(name).map((value) => (typeof value === "string" ? value.trim() : ""));

const parseLinkEntries = (formData: FormData, titleName: string, linkName: string) => {
  const titles = getTextEntries(formData, titleName);
  const links = getTextEntries(formData, linkName);

  if (titles.length !== links.length) {
    return { valid: false, entries: [] };
  }

  const entries: { title: string; link: string }[] = [];
  for (let index = 0; index < titles.length; index += 1) {
    const title = titles[index];
    const link = links[index];
    if (!title && !link) continue;
    if (!title || title.length > 150 || !link) {
      return { valid: false, entries: [] };
    }

    try {
      const url = new URL(link);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return { valid: false, entries: [] };
      }
    } catch {
      return { valid: false, entries: [] };
    }

    entries.push({ title, link });
  }

  return { valid: true, entries };
};

const uploadImage = async (file: File, jwt: string) => {
  const uploadData = new FormData();
  uploadData.append("files", file, file.name);

  const response = await fetch(`${defaultOptions.urlApi}/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: uploadData,
  });

  if (!response.ok) {
    const details = await response.text();
    console.error(`Error de Strapi al subir imagen (${response.status}):`, details);
    if (response.status === 403) {
      throw new Error("upload-permission");
    }
    if (response.status === 401) {
      throw new Error("auth");
    }
    throw new Error("upload");
  }

  const uploadedFiles: unknown = await response.json();
  if (
    !Array.isArray(uploadedFiles) ||
    uploadedFiles.length === 0 ||
    typeof uploadedFiles[0] !== "object" ||
    uploadedFiles[0] === null ||
    !("id" in uploadedFiles[0])
  ) {
    throw new Error("upload");
  }

  return uploadedFiles[0].id;
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const jwt = cookies.get("jwt")?.value;
  if (!jwt) {
    return redirectToForm(request, "auth");
  }
  const formData = await request.formData();
  const title = getText(formData, "title");
  const shortdescription = getText(formData, "shortdescription");
  const country = getText(formData, "country");
  const province = getText(formData, "province");
  const locality = getText(formData, "locality");
  const street = getText(formData, "street");
  const postalcode = Number(getText(formData, "postalcode"));
  const number = Number(getText(formData, "number"));
  const socialMedia = parseLinkEntries(formData, "socialMediaTitle", "socialMediaLink");
  const linksButtons = parseLinkEntries(formData, "linkButtonTitle", "linkButtonLink");
  const frontpage = formData.get("frontpage");
  const imagelogo = formData.get("imagelogo");

  if (
    !title ||
    title.length > 100 ||
    !shortdescription ||
    shortdescription.length > 100 ||
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
    !socialMedia.valid ||
    !linksButtons.valid ||
    (frontpage instanceof File && frontpage.size > 0 && !frontpage.type.startsWith("image/")) ||
    (imagelogo instanceof File && imagelogo.size > 0 && !imagelogo.type.startsWith("image/"))
  ) {
    return redirectToForm(request, "invalid");
  }

  const tags = getText(formData, "tags")
    .split(",")
    .map((itemtag) => itemtag.trim())
    .filter(Boolean)
    .map((itemtag) => ({ itemtag }));

  const data: Record<string, unknown> = {
    title,
    shortdescription,
    longdescription: getText(formData, "longdescription"),
    directions: {
      country,
      province,
      locality,
      postalcode,
      street,
      number,
    },
    tags,
    socialmedia: socialMedia.entries,
    linksbuttons: linksButtons.entries,
    publishedAt: new Date().toISOString(),
  };

  const categoryId = getText(formData, "categoryId");
  if (categoryId) {
    data.category = { connect: [categoryId] };
  }

  const galleryId = getText(formData, "galleryId");
  if (galleryId) {
    data.galery = { connect: [galleryId] };
  }

  try {
    if (frontpage instanceof File && frontpage.size > 0) {
      data.frontpage = await uploadImage(frontpage, jwt);
    }
    if (imagelogo instanceof File && imagelogo.size > 0) {
      data.imagelogo = await uploadImage(imagelogo, jwt);
    }

    const response = await fetch(`${defaultOptions.urlApi}/businesses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error(`Error de Strapi al crear negocio (${response.status}):`, details);
      if (response.status === 403) {
        return redirectToForm(request, "permission");
      }
      if (response.status === 401) {
        return redirectToForm(request, "auth");
      }
      return redirectToForm(request, "save");
    }

    return redirectToForm(request, "created");
  } catch (error) {
    if (error instanceof Error && ["upload-permission", "auth", "upload"].includes(error.message)) {
      return redirectToForm(request, error.message);
    }
    console.error("Error de conexión al crear negocio:", error);
    return redirectToForm(request, "save");
  }
};
