export interface Filters {
  searchQuery?: string;
  sizes?: string[];
  availability?: string[];
  categories?: string[];
  colors?: string[];
  price?: number[];
  collections?: string[];
  tags?: string[];
  ratings?: string[];
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  rating?: number;
  colors?: string[];
  collections?: string[];
  description?: string;
  tags?: string[];
  categories?: string[];
  availability?: "available" | "outOfStock";
}
