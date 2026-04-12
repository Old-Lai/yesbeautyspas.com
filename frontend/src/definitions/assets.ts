export type Image = {
  src: string;
  alt: string;
};

export interface ImageList {
  [key: string]: Image;
}

export interface Service {
  internalName: string;
  displayName: string;
  categoryName: string; //oveall like facial includes (classic, lux) (from categorygroup)
  subCategoryName?: string; //sub category like classic or lux (from description)
  serviceType?: string; // service type like acne control facial in lux facial (from description)
  id: string;
  price: string;
  tags: string[]; //from description
  description: string; //substring of description
  usageTags: string[]; // from description
  totalDuration: number | null;
}
