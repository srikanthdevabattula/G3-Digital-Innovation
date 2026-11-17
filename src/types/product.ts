// A type is only a description of an object: field names and value kinds.

export type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
  reviews?: ProductReview[]; // ? means this field can be missing
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductInput = {
  title: string;
  price: number;
  discountPercentage?: number;
  stock: number;
  category: string;
  description?: string;
};
