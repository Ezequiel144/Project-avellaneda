export interface imagenGeneral {
  id: string;
  documentId: string;
  url: string;
}

export interface PromotionImagens {
  id: number;
  documentId: string;
  Title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  imagen: imagenGeneral;
}
