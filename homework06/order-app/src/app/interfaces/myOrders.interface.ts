import { Category } from './product.inteface';

export interface MyOrder {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  stock: number;
  quantity: number;
}
