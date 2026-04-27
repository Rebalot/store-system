import { Category } from "./category.type";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  image: string;
  description: string;
}

export interface PublicProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface PublicPaginatedProductsResponse {
  items: PublicProduct[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

