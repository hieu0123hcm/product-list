interface Product {
  id: number;
  images: string[];
  title: string;
  description: string;
  price: number;
}

interface ResponseData {
  products: Product[];
  skip: number;
  total: number;
}
