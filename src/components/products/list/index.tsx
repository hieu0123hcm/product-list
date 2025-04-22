import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { ProductCard } from '@components/products';
import Input from '@components/common/input-field';
import useProductFetch from '@hooks/useProductFetch';

import './list.css';

const PRODUCTS_PER_PAGE = 20;
const DEBOUNCE_DELAY = 500; //miliseconds
const DEFAULT_PAGE = 1;
const BOTTOM_OFFSET = 1000; //pixels

const ProductList = () => {
  const [totalList, setTotalList] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(DEFAULT_PAGE);

  //Using debounce to limit the number of API calls
  //when the user spams scroll event
  const increasePage = debounce(() => {
    if (!isLoading) setPage((prevPage) => prevPage + 1);
  }, DEBOUNCE_DELAY);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const resetParams = () => {
    setPage(1);
    setTotalList([]);
  };

  // Fetch products from the API
  const { products, isLoading, error } = useProductFetch({
    searchQuery,
    page,
    pageLimit: PRODUCTS_PER_PAGE,
  });

  useInfiniteScroll(increasePage, BOTTOM_OFFSET);

  //Reset the page number and totalList when the search query changes
  useEffect(() => {
    resetParams();
  }, [searchQuery]);

  // Append new data to the totalList when data changes
  useEffect(() => {
    if (products) {
      setTotalList((prevList) => [...prevList, ...products]);
    }
  }, [products]);

  const hasNoData = !isLoading && totalList.length === 0;

  return (
    <>
      <Input onChange={handleSearchChange} placeholder="Search for products..." label="Search Products" />
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
