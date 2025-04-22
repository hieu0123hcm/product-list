import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

const useFetch = <T = unknown>(url: string, options: AxiosRequestConfig = {}): UseFetchResult<T> => {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<T>(url, {
          ...options,
          signal: controller.signal,
        });
        setIsLoading(false);
        setResponseData(data);
      } catch (error) {
        if (axios.isAxiosError(error) && !axios.isCancel(error)) {
          setIsLoading(false);
          setErrorMessage(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return {
    data: responseData,
    isLoading,
    error: errorMessage,
  };
};

export default useFetch;
