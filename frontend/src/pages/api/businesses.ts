import type { APIRoute } from "astro";
import { defaultOptions } from "../../utils/configApi";

const redirectToForm = (request: Request, status: string) =>
  new Response(null, {
    status: 303,
    headers: {
      Location: new URL(`/admin/newbusiness?status=${status}`, request.url).toString(),
    },
  });

export const POST: APIRoute = async ({ request, cookies }) => {
  const jwt = cookies.get("jwt")?.value;
  if (!jwt) {
    return redirectToForm(request, "auth");
  }

  const formData = await request.formData();
  const getText = (name: string) => {
    const value = formData.get(name);
    return typeof value === "string" ? value.trim() : "";
  };

  const title = getText("title");
  const shortdescription = getText("shortdescription");
  const country = getText("country");
  const province = getText("province");
  const locality = getText("locality");
  const street = getText("street");
  const postalcode = Number(getText("postalcode"));
  const number = Number(getText("number"));

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
    number < 1
  ) {
    return redirectToForm(request, "invalid");
  }

  const tags = getText("tags")
    .split(",")
    .map((itemtag) => itemtag.trim())
    .filter(Boolean)
    .filter((itemtag) => itemtag.length <= 100)
    .map((itemtag) => ({ itemtag }));

  const data: Record<string, unknown> = {
    title,
    shortdescription,
    longdescription: getText("longdescription"),
    directions: {
      country,
      province,
      locality,
      postalcode,
      street,
      number,
    },
    tags,
    publishedAt: new Date().toISOString(),
  };

  const categoryId = getText("categoryId");
  if (categoryId) {
    data.category = { connect: [categoryId] };
  }

  try {
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
      return redirectToForm(request, "save");
    }

    return redirectToForm(request, "created");
  } catch (error) {
    console.error("Error de conexión al crear negocio:", error);
    return redirectToForm(request, "save");
  }
};
