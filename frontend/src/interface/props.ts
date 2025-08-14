import type { Direction } from "./business";

export interface PropCard {
  imageLogo: string;
  title: string;
  tags: { itemtag: string }[] /* string[]; */;
  shortDescription: string;
}

export interface PropCardMap {
  title: string;
  tags: { itemtag: string }[]; //string[];
  shortDescription: string;
  imageLogo: string;
  direction: Direction;
}
