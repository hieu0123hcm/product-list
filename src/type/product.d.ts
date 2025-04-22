interface Product {
  id: number;
  images: string[];
  title: string;
  description: string;
  price: number;
}

interface ProductResponseData {
  products: Product[];
  skip: number;
  total: number;
}
