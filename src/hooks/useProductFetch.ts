import { useMemo } from 'react';
import useFetch from '@hooks/useFetch';
import { buildProductUrl, deserializeProductFromJson } from '@utils/api';
import { getSkipValue } from '@utils/paging';

const useProductFetch = ({ searchQuery, page, pageLimit }: { searchQuery: string; page: number; pageLimit: number }) => {
  const url = useMemo(() => {
    return buildProductUrl({
      search: searchQuery,
      limit: pageLimit,
      skip: getSkipValue(page),
    });
  }, [searchQuery, page, pageLimit]);

  const { data, isLoading, error } = useFetch<ProductResponseData>(url);

  const deserializedProducts = useMemo(() => {
    if (!data?.products) return [];

    return data.products.map((product) => {
      return deserializeProductFromJson(product);
    });
  }, [data]);

  return { products: deserializedProducts, isLoading, error };
};

export default useProductFetch;
