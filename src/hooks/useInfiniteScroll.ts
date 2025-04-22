import { useEffect } from 'react';

const useInfiniteScroll = (callback: () => void, offset: number = 0) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottomPosition = document.documentElement.scrollHeight - offset;

      if (scrollPosition >= bottomPosition) {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, offset]);
};

export default useInfiniteScroll;
