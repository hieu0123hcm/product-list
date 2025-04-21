import { getSkipValue } from '@utils/paging';
import useFetch from '@hooks/useFetch';
import { useEffect, useState } from 'react';

interface ResponseData {
  products: Product[];
  skip: number;
  total: number;
}

interface Product {
  id: number;
  images: string[];
  title: string;
  description: string;
  price: number;
}

const PRODUCTS_PER_PAGE = 20;

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [totalList, setTotalList] = useState<Product[]>([]);

  // Fetch data from the API
  const { data, isLoading, error } = useFetch<ResponseData>(`https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${getSkipValue(page)}`);

  useEffect(() => {
    if (data?.products) {
      setTotalList((prevList) => [...prevList, ...data.products]);
    }
  }, [data]);

  const handleFetch = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="product-list">
        {totalList.length > 0 ? (
          totalList.map((product) => (
            <div key={product.id} className="product">
              <h4>{product.title}</h4>
              <img src={product.images[0]} />
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
      <button onClick={handleFetch}>Click to fetch more</button>
    </>
  );
};

export default ProductList;
