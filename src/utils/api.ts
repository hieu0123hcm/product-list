import { BASE_PRODUCT_URL } from '@const/api';

export const buildProductUrl = (params: QueryParams = {}) => {
  const url = new URL(params.search ? `${BASE_PRODUCT_URL}/search` : BASE_PRODUCT_URL);

  if (params.search) url.searchParams.append('q', params.search);
  if (params.limit) url.searchParams.append('limit', params.limit.toString());
  if (params.skip) url.searchParams.append('skip', params.skip.toString());

  return url.toString();
};

export function deserializeProductFromJson(json: unknown): Product {
  if (typeof json !== 'object' || json === null) {
    throw new Error('Invalid JSON object');
  }

  const obj = json as Record<string, unknown>;

  return {
    id: obj.id as number,
    images: Array.isArray(obj.images) ? obj.images : [],
    title: typeof obj.title === 'string' ? obj.title : '',
    description: typeof obj.description === 'string' ? obj.description : '',
    price: typeof obj.price === 'number' ? obj.price : 0,
  };
}
