export enum Category {
  ELECTRONICS = 'ELECTRONICS',
  CLOTHING = 'CLOTHING',
  BOOKS = 'BOOKS',
  SPORTS = 'SPORTS',
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  stock: number;
}
