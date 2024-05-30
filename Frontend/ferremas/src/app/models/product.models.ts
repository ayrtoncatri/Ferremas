export interface Price {
  Fecha: string;
  Valor: number;
}

export interface Product {
  productCode: string;
  brand: string;
  code: string;
  name: string;
  price: Price[];
  image: string; 
  stock: number;
}
