import { useEffect, useState } from 'react';
import { getSkipValue } from '@utils/paging';
import useFetch from '@hooks/useFetch';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { debounce } from 'lodash';
import { ProductCard } from '@components/products';

const PRODUCTS_PER_PAGE = 20;
const DEBOUNCE_DELAY = 300;

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [totalList, setTotalList] = useState<Product[]>([]);

  const increasePage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const debouncedIncreasePage = debounce(increasePage, DEBOUNCE_DELAY);

  // Fetch data from the API
  const { data, isLoading, error } = useFetch<ResponseData>(`https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${getSkipValue(page)}`);

  useInfiniteScroll(debouncedIncreasePage, 0);

  useEffect(() => {
    if (data?.products) {
      setTotalList((prevList) => [...prevList, ...data.products]);
    }
  }, [data]);

  const hasNoData = !isLoading && totalList.length === 0;

  return (
    <>
      {error && <p>{error}</p>}
      <div className="product-list">
        {totalList.length > 0 && totalList.map((product) => <ProductCard key={product.id} product={product} />)}
        {hasNoData && <p>No products found.</p>}
      </div>
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default ProductList;
