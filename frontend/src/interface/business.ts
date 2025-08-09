// src/interfaces/business.ts

/**
 * Representa la dirección física de un negocio.
 */
export interface Direction {
  id: string;
  country: string;
  province: string;
  locality: string;
  postcode: string;
  street: string;
  number: string;
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
}

/**
 * Representa una imagen dentro de la galería de un negocio.
 */
export interface GaleryItem {
  id: string;
  title: string;
  direction: string; // Referencia a la dirección del negocio (opcional, en este caso coincide)
  image: string;
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
