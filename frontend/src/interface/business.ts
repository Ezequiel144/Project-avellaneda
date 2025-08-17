// src/interfaces/business.ts

/**
 * Representa la dirección física de un negocio.
 */
export interface Direction {
  id: string;
  country: string;
  province: string;
  locality: string;
  postalcode?: number /* string */;
  street: string;
  number: number /* string */;
}

/**
 * Representa un enlace a redes sociales.
 */
export interface SocialMedia {
  id: string;
  title: string;
  link: string;
}

/**
 * Representa un botón de enlace dentro del negocio.
 */
export interface LinkButton {
  id: string;
  title: string;
  link: string;
}

/**
 * Representa la categoría a la que pertenece un negocio.
 */
export interface Category {
  id: string;
  title: string;
  types: string;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  idcategories: string;
}

/**
 * Representa una imagen dentro de la galería de un negocio.
 */
export interface GaleryItem {
  id: number /* string; */;
  title: string;
  direction: Direction; // Referencia a la dirección del negocio (opcional, en este caso coincide)
  image?: {
    id: string;
    documentId: string;
    url: string;
  };
  documentId: string;
  idgaleries: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

/**
 * Representa la estructura completa de un negocio.
 */
export interface Business {
  id: string;
  title: string;
  tags: string[];
  longDescription: string;
  shortDescription: string;
  frontpage: string;
  imageLogo: string;
  socialMedia: SocialMedia[];
  links: LinkButton[];
  direction: Direction;
  categorys: Category[];
  galery: GaleryItem;
}

export interface BusinessItemCard {
  id: string;
  title: string;
  tags: { itemtag: string }[];
  shortdescription: string;
  imagelogo: { url: string };
  categories?: Category[];
}

export interface BusinessItemCardMap extends BusinessItemCard {
  directions: Direction;
}

export interface BusinessItemUserId extends BusinessItemCard {
  longdescription: string;
  frontpage: { url: string };
  imagelogo: { url: string };
  socialmedia: SocialMedia[];
  linksbuttons: LinkButton[];
  //categorys: Category[];
  galery?: GaleryItem;
}

export interface BusinessItemCardGalery extends BusinessItemCard {
  galery: GaleryItem;
}
