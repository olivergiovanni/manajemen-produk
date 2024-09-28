export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface IAddEditProduct {
  id?: string;
  name: string;
  price: number;
  stock: number;
}
