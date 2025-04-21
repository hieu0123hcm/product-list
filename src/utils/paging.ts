export const getSkipValue = (page: number): number => {
  return (page - 1) * 20 || 0;
};
