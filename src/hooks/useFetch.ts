import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

const useFetch = <T = unknown>(
  url: string,
  options: AxiosRequestConfig = {}
): UseFetchResult<T> => {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      axios
        .get<T>(url, {
          ...options,
          signal: controller.signal,
        })
        .then((res) => {
          setIsLoading(false);
          setResponseData(res.data);
        })
        .catch((error) => {
          setIsLoading(false);
          if (axios.isAxiosError(error) && !axios.isCancel(error)) {
            setErrorMessage(error);
          }
        });
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
