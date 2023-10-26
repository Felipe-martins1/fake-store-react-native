import { api } from '@src/lib/api';

export type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
};

const findAll = ({ category }: { category?: string }) => {
  const categoryEndUrl = category ? `/category/${category}` : '';
  return api.get<Product[]>('/products' + categoryEndUrl).then((res) => res.data);
};

export const productsService = {
  findAll,
};
