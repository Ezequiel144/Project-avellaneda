import type { Direction, GaleryItem, SocialMedia } from "./business";

export interface PropCard {
  id: number;
  imageLogo: string;
  title: string;
  tags: { itemtag: string }[] /* string[]; */;
  shortDescription: string;
}

export interface PropCardMap {
  id: number;
  title: string;
  tags: { itemtag: string }[]; //string[];
  shortDescription: string;
  imageLogo: string;
  direction: Direction;
}

export interface PropsPerfilUser {
  imageLogo: string;
  title: string;
  tags: { itemtag: string }[];
  socialMedia: SocialMedia[];
  galery?: GaleryItem;
}

export interface PropCardGalery {
  id: number;
  title: string;
  imageLogo: { url: string };
  tags: { itemtag: string }[];
  shortDescription: string;
}
